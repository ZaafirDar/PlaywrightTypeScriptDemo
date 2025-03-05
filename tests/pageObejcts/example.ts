import { Page } from '@playwright/test';
import { test, expect } from '@playwright/test';
import locators from '../locators/example.json';
import testData from '../data/example.json'; 

export class ExamplePage {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async navigateTo(url: string) {
        await this.page.goto(url);
    }

    async clickButton(selector: string) {
        await this.page.click(selector);
    }

    async enterText(selector: string, text: string) {
        await this.page.fill(selector, text);
    }

    async getText(selector: string): Promise<string> {
        const text = await this.page.textContent(selector);
        return text ?? '';
    }

    async verifyHeader() {
        let header = await this.page.textContent(locators.homePageLogo);
        expect(header).toContain(testData.Header)
    }

    async verifyTitle() {
        let title = await this.page.title()
        expect(title).toContain(testData.pageTitle)
    }
}