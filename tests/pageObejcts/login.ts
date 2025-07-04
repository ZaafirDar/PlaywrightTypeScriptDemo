

import { expect } from '@playwright/test';
import loginLocator from '../locators/example.json';
import { BasePage } from './basePage';

export class LoginPage extends BasePage {
  constructor(page: any) {
    super(page);
  }

  async loginValidCredentials(username: string, password: string): Promise<void> {
    await this.page.fill(loginLocator.username, username);
    await this.page.fill(loginLocator.password, password);
    await this.page.click(loginLocator.loginButton);
    // Prefer waiting for a selector or navigation instead of a static timeout
    await this.page.waitForSelector(loginLocator.loginSuccessHeader, { timeout: 5000 });
  }

  async verifyLoginSuccess(): Promise<void> {
    await expect(this.page.locator(loginLocator.loginSuccessHeader)).toBeVisible();
  }
  
  async userLogout(): Promise<void> {
    await this.page.click(loginLocator.logoutButton);
  }
}
