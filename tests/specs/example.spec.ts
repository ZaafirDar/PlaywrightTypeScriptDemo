import { test } from '../utilities/setup'; // Import extended test
import testData from '../data/example.json';

test.beforeEach('Verify Header and title', async ({ examplePage }) => {
  await examplePage.navigateTo(testData.BASE_URL);
  await examplePage.verifyHeader();
  await examplePage.verifyTitle()
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
