exports.ProductsPage = class ProductsPage {
  constructor(page) {
    this.page = page;
    this.inventoryItems = page.locator('.inventory_item');
    this.searchInput = page.locator('.inventory_search'); // simulando pesquisa
    this.firstProductTitle = page.locator('.inventory_item_name').first();
    this.addToCartButton = page.locator('button[id^="add-to-cart"]');
    this.cartButton = page.locator('.shopping_cart_link');
  }

  async selectFirstProduct() {
    await this.firstProductTitle.click();
  }

  async addToCart() {
    await this.addToCartButton.first().click();
  }

  async goToCart() {
    await this.cartButton.click();
  }
};