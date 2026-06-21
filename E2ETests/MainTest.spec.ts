import { test, expect } from '@playwright/test';
import { PlaygroundPage } from '/Locators/PlayGround.page';
import * as testData from '/TestData/testData.json';

test.describe('Automation Practice Playground Decoupled Suite', () => {
  let playground: PlaygroundPage;

  test.beforeEach(async ({ page }) => {
    playground = new PlaygroundPage(page);
    await playground.goto();
  });

  // ==========================================
  // SUITE 1: TEXT INPUTS & FORMS
  // ==========================================
  test.describe('1. Text Inputs & Forms', () => {
    test('should submit login form and handle alert', async ({ page }) => {
      page.on('dialog', async (dialog) => {
        expect(dialog.message()).toBe(testData.expectedText.alertMessage);
        await dialog.accept();
      });

      await playground.usernameInput.fill(testData.login.username);
      await playground.passwordInput.fill(testData.login.password);
      await playground.loginButton.click();
    });

    test('should fill input varieties', async () => {
      await playground.numberField.fill(testData.inputs.number);
      await expect(playground.numberField).toHaveValue(testData.inputs.number);

      await playground.emailField.fill(testData.inputs.email);
      await expect(playground.emailField).toHaveValue(testData.inputs.email);

      await playground.dateField.fill(testData.inputs.date);
      await expect(playground.dateField).toHaveValue(testData.inputs.date);
    });

    test('should validate disabled and read-only states', async () => {
      await expect(playground.disabledField).toBeDisabled();
      await expect(playground.readonlyField).toHaveAttribute('readonly', '');
    });
  });

  // ==========================================
  // SUITE 2: INTERACTIVE ELEMENTS
  // ==========================================
  test.describe('2. Interactive Elements', () => {
    test('should toggle checkboxes', async () => {
      await playground.singleCheckbox.check();
      await expect(playground.singleCheckbox).toBeChecked();

      await playground.feature1Checkbox.check();
      await playground.feature2Checkbox.check();
      await expect(playground.feature1Checkbox).toBeChecked();
      await expect(playground.feature2Checkbox).toBeChecked();
    });

    test('should verify mutual exclusivity on radio buttons', async () => {
      await playground.radioPaypal.check();
      await expect(playground.radioPaypal).toBeChecked();
      await expect(playground.radioCredit).not.toBeChecked();
    });

    test('should handle dropdown choices', async () => {
      await playground.standardDropdown.selectOption({ value: 'ca' });
      await expect(playground.standardDropdown).toHaveValue('ca');

      await playground.multiDropdown.selectOption([{ value: 'js' }, { value: 'py' }]);
      await expect(playground.multiDropdown).toHaveValues(['js', 'py']);
    });
  });

  // ==========================================
  // SUITE 3: DYNAMIC ELEMENTS
  // ==========================================
  test.describe('3. Dynamic Elements', () => {
    test('should wait for dynamically added text', async () => {
      await playground.triggerDelayBtn.click();
      await expect(playground.dynamicParagraph).toHaveText(testData.expectedText.delayedParagraph);
    });

    test('should monitor temporary loader visibility tracking', async () => {
      await playground.triggerLoaderBtn.click();
      await expect(playground.loadingSpinner).toBeVisible();
      await expect(playground.loadingSpinner).toBeHidden();
    });

    test('should alter states upon hover and click triggers', async () => {
      await playground.mutableButton.hover();
      await expect(playground.mutableButton).toHaveText('Hovered!');

      await playground.mutableButton.click();
      await expect(playground.mutableButton).toHaveText('Clicked!');
    });
  });

  // ==========================================
  // SUITE 4: COMPLEX COMPONENTS
  // ==========================================
  test.describe('4. Complex UI Components', () => {
    test('should verify data and remove a table row target', async () => {
      await expect(playground.bobSmithRow).toContainText('Bob Smith');
      await playground.deleteBobBtn.click();
      await expect(playground.bobSmithRow).toBeHidden();
    });

    test('should process a mocked system layer file upload stream', async () => {
      await playground.fileInput.setInputFiles({
        name: 'test-document.txt',
        mimeType: 'text/plain',
        buffer: Buffer.from('Playwright Test Payload')
      });
      await expect(playground.fileInput).toHaveValue(/test-document.txt/);
    });

    test('should coordinate drag and drop events', async () => {
      await playground.dragSource.dragTo(playground.dropZone);
      await expect(playground.dropZone).toHaveText(testData.expectedText.droppedState);
    });

    test('should toggle the target contextual modal overlay context', async () => {
      await playground.openModalBtn.click();
      await expect(playground.modalContainer).toBeVisible();

      await playground.closeModalBtn.click();
      await expect(playground.modalContainer).toBeHidden();
    });
  });
});
