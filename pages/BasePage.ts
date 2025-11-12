// pages/BasePage.ts

import { Page } from '@playwright/test';

export class BasePage {
    // 1. Declare the Playwright Page object and URL
    readonly page: Page;
    readonly baseUrl: string = 'https://practicetestautomation.com/';
    readonly url: string = '';


    // 3. Constructor: Initializes the Page and Locators
    constructor(practicePage: string, page: Page) {
        this.url = `${this.baseUrl}${practicePage}/`
        this.page = page;
    }

    // 4. Action Methods (Public)
    
    async goto() {
        await this.page.goto(this.url);
    }
    
}