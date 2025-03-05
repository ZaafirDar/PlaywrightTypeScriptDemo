import { test as base, expect } from '@playwright/test';
import { ExamplePage } from '../pageObejcts/example';
import { LoginPage } from '../pageObejcts/login';
import testData from '../data/example.json';

// Extend Playwright's test object
const test = base.extend<{ 
    examplePage: ExamplePage;
    loginPage: LoginPage;
 
}>({
  examplePage: async ({ page }, use) => {
    const examplePage = new ExamplePage(page);
    await use(examplePage);
  },

  loginPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await use(loginPage);
  },

});

export { test, expect };
