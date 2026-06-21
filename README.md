🛠️ Getting Started & Installation
Prerequisites
Ensure you have Node.js installed (v18 or higher is recommended).
1. Clone the RepositoryBashgit clone [https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git](https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git)
cd YOUR_REPO_NAME
2. Install Project DependenciesInstall the engine packages along with required Node environment type definitions:Bashnpm install
3. Install Playwright Browser BinariesDownload the system dependencies and headless browser binaries (Chromium, Firefox, WebKit):Bashnpx playwright install --with-deps
🚀 Running Tests LocallyAll specs resolve file system paths dynamically, eliminating machine-specific absolute folder references (file:///C:/...).CommandActionnpx playwright testExecutes all E2E test blocks headlesslynpx playwright test --headedLaunches visible test execution inside actual browsersnpx playwright test --uiOpens the rich interactive Playwright UI Test Runner dashboardnpx playwright show-reportLaunches the local server to inspect the detailed HTML test reports🤖 Continuous Integration & Daily Runs (GitHub Actions)This repository includes a native automation pipeline that executes daily via GitHub Actions.Automated Trigger SequenceScheduled (cron): Runs fully headlessly every single day at 00:00 UTC.Manual (workflow_dispatch): Can be executed manually at any point via the Actions tab inside your GitHub repository overview.Outgoing Status EmailsWhen the pipeline finishes running, it sends an email notification utilizing secure repository configuration secrets:Passing Run: Dispatches a plain text email signaling a successful test deployment.Failing Run: Flags the run failure state, links directly to the broken pipeline logs, and attaches a compressed archive payload (playwright-report.tar.gz) containing the native HTML report overview.Pipeline Credentials SetupTo activate the mail functionality safely, add these environment variables under your repository settings at Settings > Secrets and variables > Actions:EMAIL_USERNAME - The SMTP authentication sender profile name (e.g., your Gmail handle).EMAIL_PASSWORD - The associated target server integration password or unique App Password token.

# Playwright Test Automation Sandbox

A robust end-to-end (E2E) automation testing framework built with **Playwright**, **TypeScript**, and structured using the **Page Object Model (POM)**. This repository houses a practice playground website designed specifically for UI automation training along with its complete detached automation test suite.

## 🏗️ Project Architecture

The project decouples test data, element locators, and automated specs to maximize maintainability and simplify scaling:

```text
├── .github/workflows/
│   └── playwright.yml         # GitHub Actions CI Daily Workflow Scheduler
├── src/
│   ├── pages/
│   │   └── playground.page.ts # Page Object Model (POM) containing UI Locators
│   └── testdata/
│       └── testData.json      # Centralized Static Strings & Environment Test Data
├── tests/
│   └── playground.spec.ts     # Organized Playwright E2E Execution Specs
├── TestMeSite.html            # Core Sandbox Target Application Document
├── playwright.config.ts       # Central Playwright Configuration
└── package.json               # Main Application Dependency Registry
