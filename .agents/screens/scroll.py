from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    b = p.chromium.launch(headless=True)
    ctx = b.new_context(viewport={"width": 1440, "height": 900}, device_scale_factor=1)
    page = ctx.new_page()
    page.goto("http://localhost:3000/", wait_until="networkidle", timeout=60000)
    page.wait_for_timeout(1200)

    total = page.evaluate("document.documentElement.scrollHeight")
    step = 900
    i = 0
    y = 0
    while y < total:
        page.evaluate(f"window.scrollTo(0, {y})")
        page.wait_for_timeout(500)
        page.screenshot(path=f".agents/screens/scroll-{i:02d}.png", full_page=False)
        i += 1
        y += step
    b.close()
print("ok", i)
