import { expect, test } from '@playwright/test';
import { ACCOUNTS, login } from './helpers';

test.describe('Admin', () => {
  test('login shows Admin nav and can open ATS', async ({ page }) => {
    await login(page, ACCOUNTS.admin.email, ACCOUNTS.admin.password);

    await expect(page.getByTestId('nav-admin')).toBeVisible();
    await expect(page.getByTestId('nav-ats')).toBeVisible();
    await expect(page.getByTestId('nav-xray')).toBeVisible();
    await expect(page.getByTestId('plan-chip')).toContainText(/admin/i);

    await page.getByTestId('nav-ats').click();
    await expect(page).toHaveURL(/\/ats/);
    await expect(page.getByTestId('ats-workspace')).toBeVisible();
    await expect(page.getByTestId('ats-clients')).toBeVisible();
    await expect(page.getByTestId('ats-roles')).toBeVisible();
    await expect(page.getByTestId('pipeline-board').or(page.getByText(/select a role/i))).toBeVisible();
  });
});
