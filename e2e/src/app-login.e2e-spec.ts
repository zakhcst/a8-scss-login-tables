import { AppPage } from './app.po';
import { browser, logging } from 'protractor';
import { fakeUserWithPolicies, fakeUserWithoutPolicies, waitForUrl } from './shared';

describe('workspace-project App: Login', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should display Login title', () => {
    page.navigateTo();
    expect(page.getTitleText()).toBe('Login');
  });

  it('should login and display logged in user', () => {
    page.navigateTo();
    page.setEmailInput(fakeUserWithPolicies.email);
    page.setPasswordInput(fakeUserWithPolicies.password);
    page.clickSubmitButton();
    expect(page.getLoggedUser().getText()).toBe('User: admin');
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
