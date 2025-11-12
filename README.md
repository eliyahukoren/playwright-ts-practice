# 🎭 Playwright E2E Testing with Page Object Model (POM)

This repository showcases robust **End-to-End (E2E) automation** using the **Playwright** framework and **TypeScript**, meticulously structured with the **Page Object Model (POM)** design pattern.

## 🎯 Resources Under Test

The tests target the following practice areas on the Practice Test Automation website:

* **Login Functionality:** `https://practicetestautomation.com/practice-test-login/`
* **Dynamic Table Functionality:** `https://practicetestautomation.com/practice-test-table/`

---

## 📐 Project Structure & Methodology

### Page Object Model (POM) Structure

The POM pattern is used to separate test logic from the page elements, making the code more readable and maintainable.

| File/Class | Description | Key Purpose |
| :--- | :--- | :--- |
| `pages/BasePage.ts` | The **foundational class** for all Page Objects. | Provides reusable methods like `goto()` and handles the construction of the base URL for all derived pages. |
| `pages/LoginPage.ts` | Page Object for the Login form. | Holds login element locators and high-level actions (e.g., `login(user, pass)`). |
| `pages/TablePage.ts` | Page Object for the Dynamic Table. | Holds element locators and complex action methods related to filtering and sorting. |

### Dependencies

This project requires **Node.js (v18+)** and uses the following key dependencies, defined in `package.json`:

* `@playwright/test`: The core E2E testing framework.
* `typescript` & `ts-node`: Used for writing and executing tests and Page Objects in TypeScript.

---

## 🚀 Getting Started (Installation & Setup)

### Prerequisites

You must have **Node.js (v18+)** and **Git** installed on your system.

### Installation Steps

1.  **Clone the repository:**
    ```bash
    git clone [YOUR_REPOSITORY_URL]
    cd [YOUR_REPOSITORY_NAME]
    ```

2.  **Install project dependencies:**
    ```bash
    npm install
    ```

3.  **Install Playwright browsers:**
    ```bash
    npx playwright install
    ```

---

## ▶️ Running the Tests

### Command Line Execution

| Command | Description |
| :--- | :--- |
| `npx playwright test` | Runs **all tests** (Login and Table) across all configured browsers. |
| `npx playwright test --headed` | Runs tests but launches the browser visually for easier debugging. |
| `npx playwright test tests/login.spec.ts` | Runs only the tests in the specified file. |

### Viewing the Test Report

A detailed **HTML report** is automatically generated after every test run.

```bash
npx playwright show-report