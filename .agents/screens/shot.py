from playwright.sync_api import sync_playwright

URL = "http://localhost:3000/"


def shoot(ctx, path):
    page = ctx.new_page()
    page.goto(URL, wait_until="networkidle", timeout=60000)
    page.wait_for_timeout(800)
    # Scroll the page to trigger whileInView animations / lazy images
    page.evaluate(
        """
        async () => {
          const total = document.documentElement.scrollHeight;
          const step = Math.floor(window.innerHeight * 0.6);
          for (let y = 0; y <= total; y += step) {
            window.scrollTo(0, y);
            await new Promise(r => setTimeout(r, 220));
          }
          window.scrollTo(0, 0);
          await new Promise(r => setTimeout(r, 400));
        }
        """
    )
    # Now wait for all images to actually decode
    page.evaluate(
        """
        async () => {
          const imgs = Array.from(document.querySelectorAll('img'));
          await Promise.all(imgs.map(i => i.complete ? Promise.resolve() : new Promise(res => { i.addEventListener('load', res); i.addEventListener('error', res); })));
        }
        """
    )
    page.wait_for_timeout(600)
    page.screenshot(path=path, full_page=True)


with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    ctx_d = browser.new_context(viewport={"width": 1440, "height": 900}, device_scale_factor=1)
    shoot(ctx_d, ".agents/screens/homepage-desktop.png")
    ctx_d.close()

    ctx_m = browser.new_context(viewport={"width": 390, "height": 844}, device_scale_factor=2)
    shoot(ctx_m, ".agents/screens/homepage-mobile.png")
    ctx_m.close()

    browser.close()
print("ok")
