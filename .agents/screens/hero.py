from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    b = p.chromium.launch(headless=True)
    ctx = b.new_context(viewport={"width": 1440, "height": 900}, device_scale_factor=2)
    page = ctx.new_page()
    page.goto("http://localhost:3000/", wait_until="networkidle", timeout=60000)
    page.wait_for_timeout(1500)  # let shader paint
    page.screenshot(path=".agents/screens/hero.png", full_page=False, clip={"x": 0, "y": 0, "width": 1440, "height": 900})
    b.close()
print("ok")
