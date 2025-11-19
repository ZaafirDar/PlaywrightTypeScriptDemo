# Copilot Instructions for PlaywrightTypeScriptDemo

## Project Architecture

This is a Playwright TypeScript test automation framework using the **Page Object Model (POM)** pattern with a custom fixture-based architecture. Tests run against external practice sites.

### Key Structure
- `tests/specs/` - Test specifications using extended fixtures
- `tests/pageObejcts/` - Page object classes (note: typo in directory name is intentional)
- `tests/locators/` - JSON files containing element selectors
- `tests/data/` - JSON test data files
- `tests/utilities/setup.ts` - Custom Playwright fixture extensions

## Critical Framework Pattern: Custom Fixtures

**This project uses a custom test fixture pattern in `tests/utilities/setup.ts` that automatically instantiates page objects.**

```typescript
// In tests, import from setup.ts, NOT from @playwright/test
import { test } from '../utilities/setup';

// Page objects are injected as fixtures:
test('example', async ({ loginPage, examplePage }) => {
  // loginPage and examplePage are already instantiated
  await loginPage.loginValidCredentials(user, pass);
});
```

**Never import `{ test }` directly from '@playwright/test' in specs** - always use the extended test from `setup.ts`.

## Locator Management

All selectors live in JSON files in `tests/locators/`:

```json
{
  "username": "input[id='username']",
  "loginButton": "button[id='submit']",
  "loginSuccessHeader": ".post-title:has-text('Logged In Successfully')"
}
```

Import and use in page objects:
```typescript
import loginLocator from '../locators/example.json';
await this.page.fill(loginLocator.username, username);
```

**Never hardcode selectors in page objects or tests.** Use Playwright's `:has-text()` for text-based selectors with specific text content.

## Page Object Pattern

Constructor signature:
```typescript
export class LoginPage {
  constructor(private page: Page) {}
  // Methods use this.page
}
```

Use `private page: Page` in constructor (TypeScript shorthand). Methods should be async and focused on user actions, not assertions.

## Test Data

Centralized in JSON files at `tests/data/`. Contains URLs, credentials, and expected values:
```typescript
import testData from '../data/example.json';
await examplePage.navigateTo(testData.BASE_URL);
```

## Test Execution

**Primary test command (from package.json):**
```bash
npm run test  # Runs example.spec.ts in headed mode
```

Standard Playwright commands work but respect `testDir: './tests'` in config:
```bash
npx playwright test                    # Run all tests
npx playwright test example.spec.ts    # Specific test
npx playwright show-report             # View HTML report
```

Tests run in Chromium only (Firefox/WebKit commented out in config).

## Adding New Features

### New Page Object
1. Create class in `tests/pageObejcts/` with `constructor(private page: Page)`
2. Create locators JSON in `tests/locators/`
3. Add fixture to `tests/utilities/setup.ts`:
```typescript
const test = base.extend<{ 
  newPage: NewPage;
}>({
  newPage: async ({ page }, use) => {
    await use(new NewPage(page));
  },
});
```

### New Test
1. Import extended test: `import { test } from '../utilities/setup'`
2. Use page object fixtures in test signatures
3. Reference `FRAMEWORK_RULES.md` for error handling, screenshots, and resilience patterns

## Common Patterns

- **Waits**: Use `await this.page.waitForTimeout(3000)` sparingly; prefer `waitForSelector` or `expect().toBeVisible()`
- **Assertions**: Import `expect` from setup.ts, use in page objects when verifying page state
- **BeforeEach**: Used for navigation and common setup, receives page objects as fixtures

## Important Context

- Directory `tests/pageObejcts/` has intentional typo - maintain consistency
- Tests target external site: for example `https://practicetestautomation.com/practice-test-login/`
- Framework follows strict separation: locators → page objects → tests → data
- See `FRAMEWORK_RULES.md` for comprehensive patterns on resilience, error handling, TypeScript best practices, and framework conventions
