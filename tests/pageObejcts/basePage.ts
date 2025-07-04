import { Page, expect } from '@playwright/test';
// Note: locators and testData are not imported here; subclasses should provide them if needed

export class BasePage {
  constructor(public page: Page) {}

  async navigateTo(url: string): Promise<void> {
    await this.page.goto(url);
  }

  async clickButton(selector: string): Promise<void> {
    await this.page.click(selector);
  }

  async enterText(selector: string, text: string): Promise<void> {
    await this.page.fill(selector, text);
  }

  async getText(selector: string): Promise<string> {
    const text = await this.page.textContent(selector);
    return text ?? '';
  }

   async verifyHeaderInBase(homePageLogoSelector: string, expectedHeader: string): Promise<void> {
    const header = await this.page.textContent(homePageLogoSelector);
    expect(header).toContain(expectedHeader);
  }

  async verifyTitleInBase(expectedTitle: string): Promise<void> {
    const title = await this.page.title();
    expect(title).toContain(expectedTitle);
  }
}
