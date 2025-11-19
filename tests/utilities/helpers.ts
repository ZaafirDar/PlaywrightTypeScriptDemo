import { Page, expect } from '@playwright/test';

/**
 * Navigate to a specified URL
 */
export async function navigateTo(page: Page, url: string): Promise<void> {
  await page.goto(url);
}

/**
 * Click a button or element by selector
 */
export async function clickButton(page: Page, selector: string): Promise<void> {
  await page.click(selector);
}

/**
 * Enter text into an input field
 */
export async function enterText(page: Page, selector: string, text: string): Promise<void> {
  await page.fill(selector, text);
}

/**
 * Get text content from an element
 */
export async function getText(page: Page, selector: string): Promise<string> {
  const text = await page.textContent(selector);
  return text ?? '';
}

/**
 * Verify text content contains expected value
 */
export async function verifyTextContains(page: Page, selector: string, expectedText: string): Promise<void> {
  const text = await page.textContent(selector);
  expect(text).toContain(expectedText);
}

/**
 * Verify page title contains expected value
 */
export async function verifyTitle(page: Page, expectedTitle: string): Promise<void> {
  const title = await page.title();
  expect(title).toContain(expectedTitle);
}
