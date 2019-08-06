import { browser, by, element } from 'protractor';

export class AppPage {
  navigateTo() {
    return browser.get(browser.baseUrl) as Promise<any>;
  }

  getCurrentUrl() {
    return browser.driver.getCurrentUrl() as Promise<string>;
  }

  getTitleText() {
    return element(by.css('.title')).getText() as Promise<string>;
  }

  getAnchorLink() {
    return element(by.css('a.in-form-button'));
  }

  getSubmitButton() {
    return element(by.css('button.in-form-button'));
  }

  clickSubmitButton() {
    const button = this.getSubmitButton();
    button.click();
  }

  getEmailInput() {
    return element(by.css('#input-email'));
  }

  async setEmailInput(email) {
    const el = this.getEmailInput();
    await el.clear();
    el.sendKeys(email);
  }

  getPasswordInput() {
    return element(by.css('#input-password'));
  }

  async setPasswordInput(password) {
    const el = this.getPasswordInput();
    await el.clear();
    el.sendKeys(password);
  }

  getLoggedUser() {
    return element(by.css('.right.active-link'));
  }

  getNoDataText() {
    return element(by.css('.no-data')).getText();
  }

  getTableRows() {
    return element.all(by.css('.table-row'));
  }

  getContentTableRow(index) {
    return element.all(by.css('#nested-data-content .table-row')).filter((el, i) => i === index);
  }

  getSubTableRows() {
    return element.all(by.css('.table-box-sub1 .table-content .table-row-sub1'));
  }

  getSubTableNoData() {
    return element(by.css('.table-box-sub1 .no-data'));
  }

  getCurrentStatusButton() {
    return element(by.css('#current-status'));
  }

  clickCurrentStatusButton() {
    const button = this.getCurrentStatusButton();
    button.click();
  }

  getNestedDataButton() {
    return element(by.css('#nested-data'));
  }

  clickNestedDataButton() {
    const button = this.getNestedDataButton();
    button.click();
  }
}
