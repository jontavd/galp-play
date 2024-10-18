import { test, expect } from '@playwright/test';
import 'dotenv/config';
require('dotenv').config();

const user = process.env.USERNAME;
const pass = process.env.PASSWORD;

console.log(`user: ${user}`);

test('has title', async ({ page }) => {
  await page.goto('https://app.galpsolar.com//');
  await expect(page).toHaveTitle(/Galp Solar/);

  await page.getByRole('button', { name: 'Português' }).click()
  await page.getByRole('button', { name: 'Ok' }).click();
  await expect(page.getByLabel('E-mail')).toBeVisible();

  await page.getByLabel('E-mail').fill(user);
  await page.getByLabel('Palavra-passe').fill(pass)
  await page.getByRole('button', { name: 'Entrar' }).click();
  await expect(page.locator('#tab-button-status')).toBeVisible();

  await page.locator('#tab-button-status').click();
  await page.getByLabel('Go to slide 2').click();
  
  const solarPower = await page.locator('div.power-layout-container__small-cards-row:nth-child(2) > div:nth-child(1) > div:nth-child(1) > p:nth-child(1)').textContent();
  const networkPower = await page.locator('div.power-layout-container__small-cards-row:nth-child(2) > div:nth-child(2) > div:nth-child(1) > p:nth-child(1)').textContent();
  const disposablePower = await page.locator('div.power-layout-container__small-cards-row:nth-child(4) > div:nth-child(2) > div:nth-child(1) > p:nth-child(1)').textContent();

  console.log(`solarPower: ${solarPower}`);
  console.log(`networkPower: ${networkPower}`);
  console.log(`disposablePower: ${disposablePower}`);
});
