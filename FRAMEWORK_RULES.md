# Rule Set for Playwright Automation Framework

## Code Organization and Structure

### Page Object Model (POM)
- **Always follow the Page Object Model pattern**
  - Keep page interactions in page classes (`tests/pageObejcts/` directory - note the intentional typo)
  - Store locators separately in JSON files (`tests/locators/` directory)
  - Implement tests in the specs directory (`tests/specs/` directory)
  - Centralize test data in JSON files (`tests/data/` directory)
  - Define custom fixtures in `tests/utilities/setup.ts`

### Class Naming
- Page classes should match the page name (e.g., `login.ts`, `example.ts`)
- Test files should end with `.spec.ts`
- Locator files should be JSON format (e.g., `example.json`)
- Test data files should be JSON format (e.g., `example.json`)

## Locator Management

### Centralized Locators in JSON
- All selectors must be defined in JSON files in `tests/locators/` directory
- Import locators as JSON objects in page classes
- Never hardcode selectors in page objects or test files

**Example locator file (`tests/locators/example.json`):**
```json
{
  "username": "input[id='username']",
  "loginButton": "button[id='submit']",
  "loginSuccessHeader": ".post-title:has-text('Logged In Successfully')"
}
```

**Import and use in page objects:**
```typescript
import loginLocator from '../locators/example.json';
await this.page.fill(loginLocator.username, username);
```

### Resilient Selectors
- Use Playwright's `:has-text()` pseudo-class for text-based selectors
- Prefer ID selectors when available (e.g., `input[id='username']`)
- Use CSS class selectors with text matching for dynamic content
- Keep selectors simple and maintainable

## Page Object Implementation

### Constructor Pattern
Each page class should:
- Accept a Playwright `Page` object in the constructor using TypeScript shorthand
- Use `private page: Page` for automatic property declaration

**Example from actual codebase:**
```typescript
export class LoginPage {
  constructor(private page: Page) {}
  
  async loginValidCredentials(username: string, password: string) {
    await this.page.fill(loginLocator.username, username);
    await this.page.fill(loginLocator.password, password);
    await this.page.click(loginLocator.loginButton);
    await this.page.waitForTimeout(3000);
  }
}
```

### Method Documentation
- Keep method names descriptive and action-oriented
- Methods should be async when performing page interactions
- Include assertions within page methods when verifying page state

**Example from actual codebase:**
```typescript
async verifyLoginSucess() {
  await expect(this.page.locator(loginLocator.loginSuccessHeader)).toBeVisible();
}

async userLogout() {
  await this.page.click(loginLocator.logoutButton);
}
```

### Test Data Management
- Store all test data in JSON files in `tests/data/` directory
- Import test data as JSON objects in tests and page objects
- Include URLs, credentials, expected values, and validation data

**Example test data file (`tests/data/example.json`):**
```json
{
  "BASE_URL": "https://practicetestautomation.com/practice-test-login/",
  "username": "student",
  "password": "Password123",
  "Header": "Test login",
  "pageTitle": "Test Login | Practice Test Automation"
}
```

## Test Implementation

### Custom Fixture Pattern (CRITICAL)
- **Always import `test` from `../utilities/setup.ts`, NOT from `@playwright/test`**
- Page objects are automatically instantiated as fixtures
- Access page objects directly in test parameters

**Example from actual codebase:**
```typescript
import { test } from '../utilities/setup'; // Import extended test
import testData from '../data/example.json';

test('Login Success and verify', async ({ loginPage }) => {
  // loginPage is already instantiated via fixture
  await loginPage.loginValidCredentials(testData.username, testData.password);
  await loginPage.verifyLoginSucess();
});
```

### Test Setup with Fixtures
- Use `test.beforeEach()` for common setup operations
- Page object fixtures are injected automatically
- Import test data from JSON files

**Example:**
```typescript
test.beforeEach('Verify Header and title', async ({ examplePage }) => {
  await examplePage.navigateTo(testData.BASE_URL);
  await examplePage.verifyHeader();
  await examplePage.verifyTitle();
});
```

### Adding New Page Object Fixtures
When creating a new page object, add it to `tests/utilities/setup.ts`:

```typescript
import { test as base, expect } from '@playwright/test';
import { NewPage } from '../pageObejcts/newPage';

const test = base.extend<{ 
  newPage: NewPage;
}>({
  newPage: async ({ page }, use) => {
    const newPage = new NewPage(page);
    await use(newPage);
  },
});

export { test, expect };
```

### Assertions and Waits
- Import `expect` from `tests/utilities/setup.ts` alongside `test`
- Use `expect().toBeVisible()` for element visibility checks
- Use `expect().toContain()` for text content validation
- Use `waitForTimeout()` sparingly; prefer built-in waits when possible

**Example from actual codebase:**
```typescript
import { test, expect } from '../utilities/setup';

// In page object
async verifyHeader() {
  let header = await this.page.textContent(locators.homePageLogo);
  expect(header).toContain(testData.Header);
}

async verifyLoginSucess() {
  await expect(this.page.locator(loginLocator.loginSuccessHeader)).toBeVisible();
}
```

## Test Execution

### Running Tests
- **Primary command**: `npm run test` - Runs `example.spec.ts` in headed mode
- Standard Playwright commands work with `testDir: './tests'` configuration:
  - `npx playwright test` - Run all tests
  - `npx playwright test example.spec.ts` - Run specific test
  - `npx playwright show-report` - View HTML report

### Browser Configuration
- Tests run in Chromium only (Firefox/WebKit commented out in config)
- Configured in `playwright.config.ts`
- HTML reporter enabled by default

## Best Practices

### TypeScript Patterns
- Use `constructor(private page: Page)` shorthand for page objects
- Define `readonly page: Page` when using explicit property declaration
- Type method parameters appropriately (e.g., `username: string`)
- Use `Promise<string>` or `Promise<void>` for async return types

**Example:**
```typescript
async getText(selector: string): Promise<string> {
  const text = await this.page.textContent(selector);
  return text ?? '';
}
```

### Code Organization
- Keep page interaction methods focused and single-purpose
- Import locators and test data at the top of files
- Group related methods together in page objects
- Use descriptive variable names (e.g., `loginPage`, `examplePage`)

## Important Notes

- The directory `tests/pageObejcts/` has an intentional typo - maintain consistency
- Tests target external site: `https://practicetestautomation.com/practice-test-login/`
- Framework uses strict separation: locators (JSON) → page objects → fixtures → tests → data (JSON)
- Always extend fixtures in `setup.ts` when adding new page objects

## Actual Project Structure

```
/
├── tests/
│   ├── specs/
│   │   └── example.spec.ts
│   ├── pageObejcts/           # Note: intentional typo
│   │   ├── example.ts
│   │   └── login.ts
│   ├── locators/
│   │   └── example.json       # JSON format, not .ts
│   ├── data/
│   │   └── example.json       # Test data in JSON
│   └── utilities/
│       └── setup.ts           # Custom fixture definitions
├── playwright.config.ts
├── FRAMEWORK_RULES.md
├── package.json
└── README.md
```

## Checklist for New Tests

- [ ] Locators defined in JSON file in `tests/locators/`
- [ ] Test data defined in JSON file in `tests/data/`
- [ ] Page object created in `tests/pageObejcts/` with `constructor(private page: Page)`
- [ ] Page object added as fixture in `tests/utilities/setup.ts`
- [ ] Test imports `test` from `../utilities/setup`, NOT from `@playwright/test`
- [ ] Test uses page object fixtures (e.g., `async ({ loginPage }))`
- [ ] Test imports data from JSON files
- [ ] Descriptive test names that explain behavior
- [ ] Assertions use `expect` imported from setup.ts
- [ ] No hardcoded selectors or test data in test files

---

**Last Updated:** November 19, 2025
