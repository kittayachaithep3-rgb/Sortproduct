// tests/exercise2-remove.spec.js
const { test, expect } = require('@playwright/test');

test('Exercise 2: Remove product before checkout and verify overview', async ({ page }) => {
  // 1. Login เข้าสู่ระบบ
  await page.goto('https://www.saucedemo.com/');
  await page.fill('#user-name', 'standard_user');
  await page.fill('#password', 'secret_sauce');
  await page.click('#login-button');

  // 2. Add 2 Products
  await page.click('[data-test="add-to-cart-sauce-labs-backpack"]');
  await page.click('[data-test="add-to-cart-sauce-labs-bike-light"]');

  // 3. Cart
  await page.click('.shopping_cart_link');

  // 4. Remove 1 Product
  await page.click('[data-test="remove-sauce-labs-bike-light"]');

  // 5. Checkout & กรอกข้อมูล
  await page.click('[data-test="checkout"]');
  await page.fill('[data-test="firstName"]', 'กฤตยะ');
  await page.fill('[data-test="lastName"]', 'ไชยเทพ');
  await page.fill('[data-test="postalCode"]', '10110');
  await page.click('[data-test="continue"]');

  // 6. Overview ต้องเหลือเพียง 1 Product
  const cartItems = page.locator('.cart_item');
  await expect(cartItems).toHaveCount(1);
});