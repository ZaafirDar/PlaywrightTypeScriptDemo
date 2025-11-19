import { test } from '../utilities/setup';
import { navigateTo, verifyTextContains, verifyTitle } from '../utilities/helpers';
import testData from '../data/example.json';
import locators from '../locators/locators.json';

test.beforeEach('Verify Header and title', async ({ page }) => {
  await navigateTo(page, testData.BASE_URL);
  await verifyTextContains(page, locators.homePageLogo, testData.Header);
  await verifyTitle(page, testData.pageTitle);
});

test('Login Success and verify', async ({ loginPage }) => {
 await loginPage.loginValidCredentials(testData.username, testData.password);
 await loginPage.verifyLoginSucess()
});

test('Logout Successfully', async ({ loginPage }) => {
  await loginPage.loginValidCredentials(testData.username, testData.password);
  await loginPage.verifyLoginSucess()
  await loginPage.userLogout()
 });
