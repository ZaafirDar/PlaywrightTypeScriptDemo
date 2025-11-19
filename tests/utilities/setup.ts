import { test as base, expect } from '@playwright/test';
import { LoginPage } from '../pageObejcts/login';

// Extend Playwright's test object
const test = base.extend<{ 
    loginPage: LoginPage;
}>({
  loginPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await use(loginPage);
  },
});

export { test, expect };
