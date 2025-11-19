import { Page, expect } from '@playwright/test';

export { Page, expect };

// Navigation
export const navigateTo = async (page: Page, url: string): Promise<void> => {
  await page.goto(url);
};

// Interactions
export const clickButton = async (page: Page, selector: string): Promise<void> => {
  await page.click(selector);
};

export const enterText = async (page: Page, selector: string, text: string): Promise<void> => {
  await page.fill(selector, text);
};

// Getters
export const getText = async (page: Page, selector: string): Promise<string> => {
  return (await page.textContent(selector)) ?? '';
};

// Assertions
export const verifyTextContains = async (page: Page, selector: string, expectedText: string): Promise<void> => {
  expect(await page.textContent(selector)).toContain(expectedText);
};

export const verifyTitle = async (page: Page, expectedTitle: string): Promise<void> => {
  expect(await page.title()).toContain(expectedTitle);
};

export const verifyElementVisible = async (page: Page, selector: string): Promise<void> => {
  await expect(page.locator(selector)).toBeVisible();
};
