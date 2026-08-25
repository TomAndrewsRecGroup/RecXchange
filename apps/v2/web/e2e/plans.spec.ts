import { expect, test } from '@playwright/test';
import { ACCOUNTS, login, openFirstRole } from './helpers';

test.describe('Plans', () => {
  test('entry: Referral Apply locked; Direct Work available', async ({ page }) => {
    await login(page, ACCOUNTS.entry.email, ACCOUNTS.entry.password);

    await openFirstRole(page, 'referral');
    const referralOverlay = page.getByTestId('locked-overlay');
    await expect(referralOverlay).toBeVisible();
    await expect(referralOverlay).toContainText(/upgrade to lite/i);

    await openFirstRole(page, 'direct');
    await expect(page.getByTestId('work-control')).toBeVisible();
    await expect(page.getByTestId('work-control')).toBeEnabled();
    await expect(
      page.locator('[data-testid="locked-control"] [data-testid="work-control"]'),
    ).toHaveCount(0);
  });

  test('lite: Referral available', async ({ page }) => {
    await login(page, ACCOUNTS.lite.email, ACCOUNTS.lite.password);

    await openFirstRole(page, 'referral');
    await expect(page.getByTestId('apply-control')).toBeVisible();
    await expect(page.getByTestId('apply-control')).toBeEnabled();
    await expect(
      page.locator('[data-testid="locked-control"] [data-testid="apply-control"]'),
    ).toHaveCount(0);
    await expect(page.getByTestId('locked-overlay')).toHaveCount(0);
  });

  test('direct role: client name absent until Work Role', async ({ page }) => {
    await login(page, ACCOUNTS.admin.email, ACCOUNTS.admin.password);
    await openFirstRole(page, 'direct');

    await expect(page.getByTestId('client-hidden')).toBeVisible();
    await expect(page.getByTestId('client-hidden')).toContainText(
      /client hidden until you work this role/i,
    );
    await expect(page.getByTestId('client-name')).toHaveCount(0);

    await page.getByTestId('work-control').click();
    await expect(page.getByTestId('terms-modal')).toBeVisible();
    await page.getByTestId('accept-work').click();

    await expect(page.getByTestId('client-name')).toBeVisible({ timeout: 20_000 });
    await expect(page.getByTestId('client-hidden')).toHaveCount(0);
    await expect(page.getByTestId('client-name')).not.toHaveText(/^\s*$/);
  });

  test('xchange publish: Friction meters render', async ({ page }) => {
    await login(page, ACCOUNTS.admin.email, ACCOUNTS.admin.password);
    await page.goto('/ats');
    await expect(page.getByTestId('ats-workspace')).toBeVisible();

    const existing = page.locator('[data-testid="ats-role-edit"][data-kind="xchange"]');
    if ((await existing.count()) > 0) {
      await existing.first().click();
    } else {
      await page.getByTestId('add-role').click();
      await page.getByLabel('Role title').fill('Senior Controls Engineer — Xchange fixture');
      await page.getByLabel('Kind').selectOption('xchange');
      await page.getByLabel('Location').fill('Manchester, UK');
      await page.getByLabel('Salary min').fill('65000');
      await page.getByLabel('Salary max').fill('80000');
      await page.getByLabel('Owner bps').fill('5000');
      await page.getByLabel('Partner bps').fill('5000');
      await page.getByLabel('Description').fill(
        'Demo Xchange role used to render Friction meters. Plant and controls. Not a live vacancy. '.repeat(8),
      );
      await page.getByRole('button', { name: 'Save role' }).click();
      await page.getByRole('link', { name: 'Edit' }).first().click();
    }

    await expect(page.getByTestId('friction-meters')).toBeVisible({ timeout: 20_000 });
    await expect(page.getByTestId('friction-advert')).toBeVisible();
    await expect(page.getByTestId('friction-split')).toBeVisible();
    await expect(page.getByTestId('publish-role')).toBeVisible();
  });
});
