"""Expanded browser acceptance tests for practical report/export workflows.

Run with: python tests/browser_regression.py
Requires Playwright + Chromium (same image as GitHub quality gate).
"""
import base64
import json
import socket
import subprocess
import time
from pathlib import Path
from playwright.sync_api import sync_playwright, expect

ROOT = Path(__file__).resolve().parents[1]

def run():
    with socket.socket() as s:
        s.bind(("127.0.0.1", 0))
        port = s.getsockname()[1]
    server = subprocess.Popen(
        ["python3", "-m", "http.server", str(port), "--bind", "127.0.0.1"],
        cwd=ROOT, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
    try:
        time.sleep(.5)
        with sync_playwright() as pw:
            browser = pw.chromium.launch(headless=True, args=["--no-sandbox"])
            for width, height in ((1440, 900), (390, 844)):
                page = browser.new_page(viewport={"width": width, "height": height}, accept_downloads=True)
                page.on("dialog", lambda dialog: dialog.accept())
                errors = []
                page.on("pageerror", lambda error: errors.append(str(error)))
                base = f"http://127.0.0.1:{port}"

                # End-to-end estimate: line extension, taxable discount, deposit, backup, restore, print.
                page.goto(base + "/apps/quickquote/", wait_until="networkidle")
                assert page.evaluate("document.documentElement.scrollWidth <= innerWidth+2"), "QuickQuote page overflow"
                page.locator("#business").fill("Sample Painter LLC")
                page.locator("#customer").fill("Demo Client")
                page.locator("#items input[aria-label='Line item description']").first.fill("Materials")
                page.locator("#items input[aria-label='Quantity']").first.fill("2")
                page.locator("#items input[aria-label='Unit price']").first.fill("100")
                page.locator("#items input[aria-label='Taxable item']").first.check()
                page.locator("#tax").fill("8")
                page.locator("#discount").fill("10")
                page.locator("#deposit").fill("25")
                for selector, expected in {
                    "#subtotal": "$200.00", "#discountAmount": "$20.00",
                    "#taxAmount": "$14.40", "#total": "$194.40",
                    "#inlineTotal": "$194.40", "#depositAmount": "$48.60",
                    "#balance": "$145.80",
                }.items():
                    assert page.locator(selector).inner_text() == expected, f"{selector} incorrect"
                with page.expect_download() as pdf_download:
                    page.locator("#pdf").click()
                pdf_file=pdf_download.value
                assert pdf_file.suggested_filename.startswith("QuickQuote-")
                assert pdf_file.suggested_filename.endswith(".pdf")
                pdf_bytes=Path(pdf_file.path()).read_bytes()
                assert pdf_bytes.startswith(b"%PDF-1.4"), "Not a valid PDF header"
                assert b"$194.40" in pdf_bytes, "Estimate total missing from downloaded PDF"
                assert b"Sample Painter LLC" in pdf_bytes, "Business name missing from PDF"
                assert pdf_bytes.rstrip().endswith(b"%%EOF"), "PDF document is incomplete"
                with page.expect_download() as dl:
                    page.locator("#export").click()
                payload = Path(dl.value.path()).read_bytes()
                saved = json.loads(payload)
                assert len(saved["items"]) == 1
                page.locator("#clear").click()
                assert page.locator("#total").inner_text() == "$0.00"
                page.locator("#upload").set_input_files({
                    "name": "quickquote-estimate.json", "mimeType": "application/json", "buffer": payload})
                expect(page.locator("#total")).to_have_text("$194.40", timeout=10000)
                page.evaluate("window.__printCalled=false;window.print=()=>{window.__printCalled=true}")
                page.locator("#print").click()
                assert page.evaluate("window.__printCalled"), "QuickQuote print action did not fire"
                assert page.pdf(print_background=True).startswith(b"%PDF"), "QuickQuote PDF failed"
                # Multi-estimate library: explicit save survives reload and an edited quote.
                page.locator("#saveQuote").click()
                expect(page.locator("#libraryCount")).to_have_text("Saved estimates: 1/25")
                page.locator("#clear").click()
                expect(page.locator("#total")).to_have_text("$0.00")
                page.reload(wait_until="networkidle")
                expect(page.locator("#libraryCount")).to_have_text("Saved estimates: 1/25")
                page.locator("#savedQuotes").select_option(index=1)
                page.locator("#openQuote").click()
                expect(page.locator("#total")).to_have_text("$194.40")
                page.locator("#job").fill("Revised demo project")
                page.locator("#saveQuote").click()
                expect(page.locator("#libraryCount")).to_have_text("Saved estimates: 1/25")
                with page.expect_download() as dl:
                    page.locator("#backupLibrary").click()
                full_library=Path(dl.value.path()).read_bytes()
                library_json=json.loads(full_library)
                assert library_json["format"]=="practicalkit-quickquote-library-v1"
                assert len(library_json["estimates"])==1
                page.locator("#deleteQuote").click()
                expect(page.locator("#libraryCount")).to_have_text("Saved estimates: 0/25")
                page.locator("#uploadLibrary").set_input_files({
                    "name":"quickquote-library-backup.json",
                    "mimeType":"application/json",
                    "buffer":full_library
                })
                expect(page.locator("#libraryCount")).to_have_text("Saved estimates: 1/25")
                page.locator("#savedQuotes").select_option(index=1)
                page.locator("#deleteQuote").click()
                expect(page.locator("#libraryCount")).to_have_text("Saved estimates: 0/25")
                expect(page.locator("#total")).to_have_text("$194.40")

                # Full photo + backup/restore + print workflow.
                page.goto(base + "/apps/finishline/", wait_until="networkidle")
                assert page.evaluate("document.documentElement.scrollWidth <= innerWidth+2"), "FinishLine page overflow"
                page.locator("#project").fill("Demo hallway")
                page.locator("#room").fill("Hall")
                page.locator("#title").fill("Uneven flooring")
                page.locator("#cost").fill("425")
                page.locator("#details").fill("High spot near doorway")
                png_data=page.evaluate("""() => {
                    const c=document.createElement('canvas');
                    c.width=6;c.height=6;
                    c.getContext('2d').fillRect(0,0,6,6);
                    return c.toDataURL('image/png').split(',')[1];
                }""")
                page.locator("#photo").set_input_files({
                    "name":"evidence.png","mimeType":"image/png",
                    "buffer":base64.b64decode(png_data)})
                page.locator("#form button[type=submit]").click()
                expect(page.locator("#count")).to_have_text("(1)", timeout=10000)
                assert page.locator("#total").inner_text() == "$425.00"
                assert page.locator("#entries img").count() == 1
                with page.expect_download() as dl:
                    page.locator("#savejson").click()
                payload=Path(dl.value.path()).read_bytes()
                saved=json.loads(payload)
                assert len(saved["issues"])==1 and saved["issues"][0]["photo"].startswith("data:image/jpeg;base64,")
                page.locator("#clear").click()
                expect(page.locator("#count")).to_have_text("(0)", timeout=10000)
                page.locator("#importfile").set_input_files({
                    "name":"finishline-punchlist.json","mimeType":"application/json","buffer":payload})
                expect(page.locator("#count")).to_have_text("(1)", timeout=10000)
                assert page.locator("#entries img").count() == 1
                page.evaluate("window.__printCalled=false;window.print=()=>{window.__printCalled=true}")
                page.locator("#print").click()
                assert page.evaluate("window.__printCalled"), "FinishLine print action did not fire"
                assert page.pdf(print_background=True).startswith(b"%PDF"), "FinishLine PDF failed"

                # Main screen width checks for the two calculation apps.
                for path in ("settlement-studio", "shift-math"):
                    page.goto(base + f"/apps/{path}/", wait_until="networkidle")
                    assert page.evaluate("document.documentElement.scrollWidth <= innerWidth+2"), f"{path} page overflow"
                assert not errors, f"Uncaught browser errors: {errors}"
                print(f"PASS {width}x{height}: quote arithmetic, import/export, photo, PDFs, all app widths")
                page.close()
            browser.close()
    finally:
        server.terminate()
        server.wait(timeout=5)

if __name__ == "__main__":
    run()
