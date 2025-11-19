import { Page, expect } from '@playwright/test';
import loginLocator from '../locators/locators.json';
import { enterText, clickButton } from '../utilities/helpers';

export class LoginPage {
  
  constructor(private page: Page) {

  }

  async loginValidCredentials(username: string, password: string) {
    await enterText(this.page, loginLocator.username, username);
    await enterText(this.page, loginLocator.password, password);
    await clickButton(this.page, loginLocator.loginButton);
    await this.page.waitForTimeout(3000);
  }

  async verifyLoginSucess() {
    await expect(this.page.locator(loginLocator.loginSuccessHeader)).toBeVisible();
  }
  
  async userLogout() {
    await clickButton(this.page, loginLocator.logoutButton);
  }
}
