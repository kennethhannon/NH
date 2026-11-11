"""Desktop/mobile Chromium smoke test for all PracticalKit beta apps."""
import os, socket, subprocess, time
from pathlib import Path
from playwright.sync_api import sync_playwright

ROOT=Path(__file__).resolve().parents[1]

def run():
    with socket.socket() as sock:
        sock.bind(("127.0.0.1",0))
        port=sock.getsockname()[1]
    server=subprocess.Popen(["python3","-m","http.server",str(port),"--bind","127.0.0.1"],cwd=ROOT,stdout=subprocess.DEVNULL,stderr=subprocess.DEVNULL)
    try:
        time.sleep(0.5)
        url=f"http://127.0.0.1:{port}"
        with sync_playwright() as p:
            path=os.environ.get("CHROMIUM_BINARY")
            opts={"headless":True,"args":["--no-sandbox"]}
            if path: opts["executable_path"]=path
            browser=p.chromium.launch(**opts)
            for viewport in [{"width":1440,"height":900},{"width":390,"height":844}]:
                page=browser.new_page(viewport=viewport,accept_downloads=True)
                errors=[]
                page.on("pageerror",lambda error: errors.append(str(error)))
                page.goto(url,wait_until="networkidle")
                assert page.locator("h1").count()==1
                assert page.locator('a[href="apps/finishline/"]').count()==1
                assert page.evaluate("document.documentElement.scrollWidth <= innerWidth + 2"),"Home overflow"
                page.goto(url+"/apps/settlement-studio/",wait_until="networkidle")
                assert page.locator("#cost").inner_text()=="$32,119.00"
                page.locator("#offer").fill("28000")
                assert page.locator("#check").inner_text()=="$27,000.00"
                with page.expect_download() as dl: page.locator("#export").click()
                assert dl.value.suggested_filename=="settlement-studio.json"
                page.goto(url+"/apps/shift-math/",wait_until="networkidle")
                assert page.locator("#gross").inner_text()=="$665.50"
                page.locator("#base").fill("40")
                assert page.locator("#gross").inner_text()=="$697.50"
                page.locator("#breakMin").fill("999")
                assert "valid unpaid break" in page.locator("#error").inner_text().lower()
                page.goto(url+"/apps/finishline/",wait_until="networkidle")
                page.locator("#project").fill("Test renovation")
                page.locator("#room").fill("Kitchen")
                page.locator("#title").fill("Cabinet door scrape")
                page.locator("#cost").fill("450")
                page.locator('#form button[type="submit"]').click()
                assert page.locator("#count").inner_text()=="(1)"
                assert page.locator("#total").inner_text()=="$450.00"
                page.reload(wait_until="networkidle")
                assert "Cabinet door scrape" in page.locator("#entries").inner_text()
                with page.expect_download() as dl: page.locator("#savejson").click()
                assert dl.value.suggested_filename=="finishline-punchlist.json"
                assert not errors, f"JS errors: {errors}"
                print(f"PASS {viewport['width']}x{viewport['height']} all three apps")
                page.close()
            browser.close()
    finally:
        server.terminate()
        server.wait(timeout=5)

if __name__=="__main__":
    run()
