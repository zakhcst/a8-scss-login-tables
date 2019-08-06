import { browser, logging, protractor as prot } from 'protractor';

export const loadTimeout = 3000;

export const fakeUserWithPolicies = {
  email: 'admin@admin.com',
  password: 'admin'
};

export const fakeUserWithoutPolicies = {
  email: '2@2',
  password: '123456'
};

export function waitForUrl(url: string) {
  const ec = prot.ExpectedConditions;
  browser.wait(ec.urlContains(url), loadTimeout);
}
