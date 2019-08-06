import { AppPage } from './app.po';
import { browser, logging, protractor as prot } from 'protractor';
import { fakeUserWithPolicies, fakeUserWithoutPolicies, waitForUrl } from './shared';

describe('workspace-project App: Tables', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should login and display current status table', () => {
    page.navigateTo();
    page.setEmailInput(fakeUserWithPolicies.email);
    page.setPasswordInput(fakeUserWithPolicies.password);
    page.clickSubmitButton();
    waitForUrl('nested-data');
    expect(page.getTableRows().count()).toBeGreaterThan(0);
    page.clickCurrentStatusButton();
    waitForUrl('current-status');
    expect(page.getTableRows().count()).toBeGreaterThan(0);
  });

  it('should login and display current status table sub-table with elements', () => {
    page.navigateTo();
    page.setEmailInput(fakeUserWithPolicies.email);
    page.setPasswordInput(fakeUserWithPolicies.password);
    page.clickSubmitButton();
    waitForUrl('nested-data');
    page.getContentTableRow(1).click();
    browser.waitForAngular();
    expect(page.getSubTableRows().count()).toBeGreaterThan(0);
  });

  it('should login and display current status table sub-table no details', () => {
    page.navigateTo();
    page.setEmailInput(fakeUserWithPolicies.email);
    page.setPasswordInput(fakeUserWithPolicies.password);
    page.clickSubmitButton();
    waitForUrl('nested-data');
    page.getContentTableRow(0).click();
    browser.waitForAngular();
    expect(page.getSubTableNoData().getText()).toBe('No Details');
  });

  it('should login and display nested data table empty', () => {
    page.navigateTo();
    page.setEmailInput(fakeUserWithoutPolicies.email);
    page.setPasswordInput(fakeUserWithoutPolicies.password);
    page.clickSubmitButton();
    waitForUrl('nested-data');
    expect(page.getTableRows().count()).toBe(1);
    expect(page.getNoDataText()).toBe('No Policies');
  });

  it('should login and display current status table empty', () => {
    page.navigateTo();
    page.setEmailInput(fakeUserWithoutPolicies.email);
    page.setPasswordInput(fakeUserWithoutPolicies.password);
    page.clickSubmitButton();
    waitForUrl('nested-data');
    page.clickCurrentStatusButton();
    waitForUrl('current-status');
    expect(page.getTableRows().count()).toBe(1);
    expect(page.getNoDataText()).toBe('No Policies');
  });

  afterEach(async () => {
    // Assert that there are no errors emitted from the browser
    const logs = await browser
      .manage()
      .logs()
      .get(logging.Type.BROWSER);
    expect(logs).not.toContain(
      jasmine.objectContaining({
        level: logging.Level.SEVERE
      } as logging.Entry)
    );
  });
});
