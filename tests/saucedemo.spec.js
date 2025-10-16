const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pages/LoginPage');
const { ProductsPage } = require('../pages/ProductsPage');
const { CartPage } = require('../pages/CartPage');
const { CheckoutPage } = require('../pages/CheckoutPage');
const { OverviewPage } = require('../pages/OverviewPage');

test('Fluxo completo de compra no SauceDemo', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const productsPage = new ProductsPage(page);
  const cartPage = new CartPage(page);
  const checkoutPage = new CheckoutPage(page);
  const overviewPage = new OverviewPage(page);

  //Login
  await loginPage.goto();
  await loginPage.login('standard_user', 'secret_sauce');
  await expect(page).toHaveURL(/inventory/);

  //Selecionar produto
  await productsPage.selectFirstProduct();
  await expect(page.locator('.inventory_details_name')).toBeVisible();

  //Validar nome, preço e descrição
  const title = await page.locator('.inventory_details_name').textContent();
  const price = await page.locator('.inventory_details_price').textContent();
  const desc = await page.locator('.inventory_details_desc').textContent();

  console.log(`Produto: ${title} | ${price} | ${desc}`);
  expect(title).not.toBeNull();
  expect(price).toContain('$');

  //Adicionar ao carrinho
  await page.locator('button[id="add-to-cart"]').click();
  await productsPage.goToCart();

  //Checkout
  await cartPage.checkout();
  await checkoutPage.fillCheckoutData('Andrea', 'Fonseca', '20000-000');

  //Finalizar pedido
  await overviewPage.finishOrder();
  const message = await overviewPage.validateSuccess();
  expect(message).toContain('Thank you');
});