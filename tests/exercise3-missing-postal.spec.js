// tests/exercise3-missing-postal.spec.js
const { test, expect } = require('@playwright/test');

test('Exercise 3: Missing Postal Code error verification', async ({ page }) => {
  // 1. Login เข้าสู่ระบบ
  await page.goto('https://www.saucedemo.com/');
  await page.fill('#user-name', 'standard_user');
  await page.fill('#password', 'secret_sauce');
  await page.click('#login-button');

  // 2. Add Product
  await page.click('[data-test="add-to-cart-sauce-labs-backpack"]');

  // 3. Cart -> Checkout
  await page.click('.shopping_cart_link');
  await page.click('[data-test="checkout"]');

  // 4. กรอก First Name + Last Name แต่ไม่กรอก Postal Code
  await page.fill('[data-test="firstName"]', 'กฤตยะ');
  await page.fill('[data-test="lastName"]', 'ไชยเทพ');
  await page.click('[data-test="continue"]');

  // 5. Expected: Postal Code is required
  const errorMessage = page.locator('[data-test="error"]');
  await expect(errorMessage).toBeVisible();
  await expect(errorMessage).toContainText('Error: Postal Code is required');
});