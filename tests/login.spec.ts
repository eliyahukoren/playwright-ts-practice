// tests/login.spec.ts

import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage'; // Adjust the path as needed

const SUCCESS_URL_PART = 'logged-in-successfully/';

test.describe('Login Functionality', () => {
  let loginPage: LoginPage;

  // Set up the Page Object before each test
  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.goto();
  });


  test('Test case 1: Positive LogIn test', async ({ page }) => {
    await loginPage.login('student', 'Password123');

    // Verify new page URL contains expected success part
    await expect(page).toHaveURL(new RegExp(SUCCESS_URL_PART));

    // Verify success message
    const successMessage = page.getByText(/Congratulations|successfully logged in/i);
    await expect(successMessage).toBeVisible();

    // Verify Log out button is displayed
    const logoutButton = page.getByRole('link', { name: 'Log out' });
    await expect(logoutButton).toBeVisible();
  });

  test('Test case 2: Negative username test', async () => {

    // Attempt login with bad username
    await loginPage.login('incorrectUser', 'Password123');

    // Assert error message
    await loginPage.assertErrorAlert(/Your username is invalid/i);
  });

  test('Test case 3: Negative password test', async () => {
    // Attempt login with bad password
    await loginPage.login('student', 'incorrectPassword');

    // Assert error message
    await loginPage.assertErrorAlert(/Your password is invalid/i);
  });
});