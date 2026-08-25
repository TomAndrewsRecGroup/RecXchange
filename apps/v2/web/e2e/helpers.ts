import { expect, type Page } from '@playwright/test';

export const ACCOUNTS = {
  admin: { email: 'admin@recxchange.io', password: 'RecX-Admin-2026!' },
  pro: { email: 'pro@recxchange.io', password: 'RecX-Pro-2026!' },
  lite: { email: 'lite@recxchange.io', password: 'RecX-Lite-2026!' },
  entry: { email: 'entry@recxchange.io', password: 'RecX-Entry-2026!' },
};

export async function login(page: Page, email: string, password: string) {
  await page.goto('/login');
  await page.getByLabel('Email').fill(email);
  await page.getByLabel('Password').fill(password);
  await page.getByRole('button', { name: 'Log in' }).click();
  await expect(page.getByTestId('nav-logout')).toBeVisible({ timeout: 20_000 });
}

export async function openFirstRole(page: Page, kind: 'direct' | 'xchange' | 'referral') {
  await page.goto('/');
  await page.getByTestId(`tab-${kind}`).click();
  const card = page.locator(`[data-testid="role-card"][data-kind="${kind}"]`).first();
  await expect(card).toBeVisible({ timeout: 20_000 });
  await card.getByRole('link').first().click();
  await expect(page).toHaveURL(/\/roles\//);
  await expect(page.getByTestId('role-detail')).toBeVisible();
}
