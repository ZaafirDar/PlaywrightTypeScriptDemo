import { Page, enterText, clickButton, verifyElementVisible } from '../utilities/helpers';
import loginLocator from '../locators/locators.json';

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
    await verifyElementVisible(this.page, loginLocator.loginSuccessHeader);
  }
  
  async userLogout() {
    await clickButton(this.page, loginLocator.logoutButton);
  }
}
