"""Run real desktop/mobile Chromium smoke tests; requires Playwright and Chromium.

Usage: python tests/browser_smoke.py
This script creates a temporary local HTTP server, tests interactions, and exits.
"""
from __future__ import annotations
import io
import json
import socket
import subprocess
import time
from pathlib import Path
from playwright.sync_api import sync_playwright

ROOT = Path(__file__).resolve().parents[1]

def pick_port():
    s = socket.socket()
    s.bind(('127.0.0.1', 0))
    port = s.getsockname()[1]
    s.close()
    return port


def run():
    port = pick_port()
    server = subprocess.Popen(['python3', '-m', 'http.server', str(port), '--bind', '127.0.0.1'], cwd=ROOT, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
    try:
        time.sleep(.5)
        url = f'http://127.0.0.1:{port}'
        with sync_playwright() as pw:
            browser = pw.chromium.launch(headless=True, **({'executable_path':'/usr/bin/chromium'} if Path('/usr/bin/chromium').exists() else {}), args=['--no-sandbox'])
            for viewport in [{'width': 1440, 'height': 900}, {'width': 390, 'height': 844}]:
                page = browser.new_page(viewport=viewport, accept_downloads=True)
                errors=[]
                page.on('pageerror', lambda err: errors.append(str(err)))
                page.goto(url, wait_until='networkidle')
                assert page.locator('h1').count()==1
                assert page.locator('a[href="apps/finishline/"]').count()==1
                assert page.evaluate('document.documentElement.scrollWidth <= window.innerWidth + 2'), 'Home horizontal overflow'

                page.goto(url + '/apps/settlement-studio/', wait_until='networkidle')
                assert page.locator('#cost').inner_text() == '$32,119.00'
                page.locator('#offer').fill('28000')
                assert page.locator('#check').inner_text() == '$27,000.00'
                with page.expect_download() as dl: page.locator('#export').click()
                assert dl.value.suggested_filename == 'settlement-studio.json'

                page.goto(url + '/apps/shift-math/', wait_until='networkidle')
                assert page.locator('#gross').inner_text() == '$665.50'
                page.locator('#base').fill('40')
                assert page.locator('#gross').inner_text() == '$697.50'
                page.locator('#breakMin').fill('999')
                assert 'valid unpaid break' in page.locator('#error').inner_text().lower()

                page.goto(url + '/apps/finishline/', wait_until='networkidle')
                page.locator('#project').fill('Demo kitchen renovation')
                page.locator('#room').fill('Kitchen')
                page.locator('#title').fill('Cabinet door scrape')
                page.locator('#cost').fill('450')
                page.locator('#form button[type=submit]').click()
                assert page.locator('#count').inner_text() == '(1)'
                assert page.locator('#total').inner_text() == '$450.00'
                page.reload(wait_until='networkidle')
                assert 'Cabinet door scrape' in page.locator('#entries').inner_text()
                with page.expect_download() as dl: page.locator('#savejson').click()
                assert dl.value.suggested_filename == 'finishline-punchlist.json'
                page.goto(url + '/apps/quickquote/', wait_until='networkidle')
                page.locator('#business').fill('Example Contractor')
                page.locator('#customer').fill('Sample Customer')
                page.locator('#items input[aria-label="Line item description"]').first.fill('Drywall patch')
                page.locator('#items input[aria-label="Unit price"]').first.fill('150')
                assert page.locator('#total').inner_text() == '$150.00'
                page.locator('#add').click()
                assert page.locator('#items tr').count() == 2
                page.reload(wait_until='networkidle')
                assert page.locator('#items tr').count() == 2
                assert not errors, f'JS errors: {errors}'
                print(f"PASS: {viewport['width']}x{viewport['height']} home, settlement, shift, finishline; no browser JS errors")
                page.close()
            browser.close()
    finally:
        server.terminate()
        server.wait(timeout=5)

if __name__ == '__main__':
    run()
