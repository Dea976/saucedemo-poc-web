exports.OverviewPage = class OverviewPage {
  constructor(page) {
    this.page = page;
    this.finishButton = page.locator('#finish');
    this.successMsg = page.locator('.complete-header');
  }

  async finishOrder() {
    await this.finishButton.click();
  }

  async validateSuccess() {
    await this.successMsg.waitFor();
    return await this.successMsg.textContent();
  }
};