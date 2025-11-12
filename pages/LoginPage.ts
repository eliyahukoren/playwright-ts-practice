// pages/LoginPage.ts

import { expect, Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class LoginPage extends BasePage {
    // 2. Declare Locators (private properties)
    private readonly usernameField: Locator;
    private readonly passwordField: Locator;
    private readonly submitButton: Locator;
    private readonly errorAlert: Locator;

    // 3. Constructor: Initializes the Page and Locators
    constructor(page: Page) {
        super('practice-test-login', page)
        this.usernameField = this.page.locator('#username');
        this.passwordField = this.page.locator('#password');
        this.submitButton = this.page.locator('#submit');
        this.errorAlert = this.page.locator('#error');
    }

    /**
     * Performs the full login action
     * @param username The username to enter
     * @param password The password to enter
     */
    async login(username: string, password: string) {
        await this.usernameField.fill(username);
        await this.passwordField.fill(password);
        await this.submitButton.click();
    }

    // 5. Assertion Methods (Public)

    async assertErrorAlert(expectedText: string | RegExp) {
        await expect(this.errorAlert).toBeVisible();
        await expect(this.errorAlert).toContainText(expectedText);
    }
}