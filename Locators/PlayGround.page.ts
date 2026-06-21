import { Page, Locator } from '@playwright/test';

export class PlaygroundPage {
  readonly page: Page;
  
  // Section 1: Forms
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
  readonly numberField: Locator;
  readonly emailField: Locator;
  readonly dateField: Locator;
  readonly disabledField: Locator;
  readonly readonlyField: Locator;

  // Section 2: Interactive Elements
  readonly singleCheckbox: Locator;
  readonly feature1Checkbox: Locator;
  readonly feature2Checkbox: Locator;
  readonly radioPaypal: Locator;
  readonly radioCredit: Locator;
  readonly standardDropdown: Locator;
  readonly multiDropdown: Locator;

  // Section 3: Dynamic Elements
  readonly triggerConfirmBtn: Locator;
  readonly triggerPromptBtn: Locator;
  readonly triggerDelayBtn: Locator;
  readonly dynamicParagraph: Locator;
  readonly triggerLoaderBtn: Locator;
  readonly loadingSpinner: Locator;
  readonly mutableButton: Locator;

  // Section 4: Complex Elements
  readonly bobSmithRow: Locator;
  readonly deleteBobBtn: Locator;
  readonly fileInput: Locator;
  readonly dragSource: Locator;
  readonly dropZone: Locator;
  readonly openModalBtn: Locator;
  readonly modalContainer: Locator;
  readonly closeModalBtn: Locator;

  constructor(page: Page) {
    this.page = page;

    // Initialize Locators using user-facing test-ids
    this.usernameInput = page.getByTestId('username-input');
    this.passwordInput = page.getByTestId('password-input');
    this.loginButton = page.getByTestId('login-button');
    this.numberField = page.getByTestId('number-field');
    this.emailField = page.getByTestId('email-field');
    this.dateField = page.getByTestId('date-field');
    this.disabledField = page.getByTestId('disabled-field');
    this.readonlyField = page.getByTestId('readonly-field');

    this.singleCheckbox = page.getByTestId('single-checkbox');
    this.feature1Checkbox = page.getByTestId('checkbox-f1');
    this.feature2Checkbox = page.getByTestId('checkbox-f2');
    this.radioCredit = page.getByTestId('radio-credit');
    this.radioPaypal = page.getByTestId('radio-paypal');
    this.standardDropdown = page.getByTestId('standard-dropdown');
    this.multiDropdown = page.getByTestId('multi-dropdown');

    this.triggerConfirmBtn = page.getByTestId('trigger-confirm');
    this.triggerPromptBtn = page.getByTestId('trigger-prompt');
    this.triggerDelayBtn = page.getByTestId('trigger-delay');
    this.dynamicParagraph = page.getByTestId('dynamic-paragraph');
    this.triggerLoaderBtn = page.getByTestId('trigger-loader');
    this.loadingSpinner = page.getByTestId('loading-spinner');
    this.mutableButton = page.getByTestId('mutable-button');

    this.bobSmithRow = page.getByTestId('table-row-2');
    this.deleteBobBtn = page.getByTestId('delete-row-2');
    this.fileInput = page.getByTestId('file-input');
    this.dragSource = page.getByTestId('drag-source');
    this.dropZone = page.getByTestId('drop-zone');
    this.openModalBtn = page.getByTestId('open-modal-button');
    this.modalContainer = page.getByTestId('modal-container');
    this.closeModalBtn = page.getByTestId('close-modal-button');
  }
  async goto() {
    // 1. Resolve the absolute path relative to this script's location
    // Adjust the '../' depending on how deep your page object file is nested
    const localFilePath = path.resolve(__dirname, './TestMeSite.html'); 
    
    // 2. Build the correct file:// URL dynamically
    await this.page.goto(`file://${localFilePath}`);
  }
}
