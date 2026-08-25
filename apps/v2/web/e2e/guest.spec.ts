import { expect, test } from '@playwright/test';

test.describe('Guest', () => {
  test('marketplace is visible, Apply is locked, no ATS in nav', async ({ page }) => {
    await page.goto('/');

    await expect(page.getByTestId('wordmark')).toContainText('RecXchange');
    await expect(page.getByTestId('v2-chip')).toHaveText('v2');
    await expect(page.getByRole('heading', { name: /live roles/i })).toBeVisible();
    await expect(page.getByTestId('kind-tabs')).toBeVisible();
    await expect(page.getByTestId('tab-direct')).toBeVisible();
    await expect(page.getByTestId('tab-xchange')).toBeVisible();
    await expect(page.getByTestId('tab-referral')).toBeVisible();

    await expect(page.getByTestId('nav-login')).toBeVisible();
    await expect(page.getByTestId('nav-ats')).toHaveCount(0);
    await expect(page.getByTestId('nav-xray')).toHaveCount(0);
    await expect(page.getByTestId('nav-admin')).toHaveCount(0);
    await expect(page.getByTestId('guest-banner')).toBeVisible();

    await expect(page.getByTestId('role-card').first()).toBeVisible({ timeout: 20_000 });
    const overlay = page.getByTestId('locked-overlay').first();
    await expect(overlay).toBeVisible();
    await expect(overlay).toContainText(/log in/i);

    const apply = page.getByTestId('apply-control').first();
    await expect(apply).toBeVisible();
    await expect(page.getByTestId('locked-control').first()).toBeVisible();

    await page.getByTestId('tab-referral').click();
    await expect(page.locator('[data-testid="role-card"][data-kind="referral"]').first()).toBeVisible({
      timeout: 20_000,
    });
    await expect(page.getByTestId('locked-overlay').first()).toContainText(/log in/i);
  });
});
