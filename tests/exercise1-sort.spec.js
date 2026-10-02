// tests/exercise1-sort.spec.js
const { test, expect } = require('@playwright/test');

test('Exercise 1: Verify prices are sorted from Low to High', async ({ page }) => {
  // 1. Login เข้าสู่ระบบ
  await page.goto('https://www.saucedemo.com/');
  await page.fill('#user-name', 'standard_user');
  await page.fill('#password', 'secret_sauce');
  await page.click('#login-button');

  // 2. Select Price Low to High
  await page.selectOption('.product_sort_container', 'lohi');

  // 3. ดึงราคาสินค้าทั้งหมดมาตรวจสอบ
  const priceElements = await page.locator('.inventory_item_price').allTextContents();
  const actualPrices = priceElements.map(price => parseFloat(price.replace('$', '')));

  // 4. Verify prices are ascending
  const expectedPrices = [...actualPrices].sort((a, b) => a - b);
  expect(actualPrices).toEqual(expectedPrices);
});