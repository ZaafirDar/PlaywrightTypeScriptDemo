import { Page, expect } from '@playwright/test';
import loginLocator from '../locators/locators.json';

export class LoginPage {
  constructor(private page: Page) {}

  async loginValidCredentials(username: string, password: string) {
    await this.page.fill(loginLocator.username, username);
    await this.page.fill(loginLocator.password, password);
    await this.page.click(loginLocator.loginButton);
    await this.page.waitForTimeout(3000)
  }

  async verifyLoginSucess() {
    await expect(this.page.locator(loginLocator.loginSuccessHeader)).toBeVisible();
  }
  
  async userLogout() {
    await this.page.click(loginLocator.logoutButton);
  }
}
