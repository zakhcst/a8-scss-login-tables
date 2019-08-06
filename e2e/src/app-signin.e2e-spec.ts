import { AppPage } from './app.po';
import { browser, logging } from 'protractor';
import { fakeUserWithPolicies, fakeUserWithoutPolicies, waitForUrl } from './shared';

describe('workspace-project App: Sign in', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should navigate to sign in and display Signin title', () => {
    page.navigateTo();
    const link = page.getAnchorLink();
    link.click();
    expect(page.getTitleText()).toBe('Sign in');
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
