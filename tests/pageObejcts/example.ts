



import locators from '../locators/example.json';
import testData from '../data/example.json';
import { BasePage } from './basePage';

export class ExamplePage extends BasePage {
    constructor(page: any) {
        super(page);
    }

    async checkHeader(): Promise<void> {
        await this.verifyHeaderInBase(locators.homePageLogo, testData.Header);
    }

    async checkTitle(): Promise<void> {
        await this.verifyTitleInBase(testData.pageTitle);
    }
}
