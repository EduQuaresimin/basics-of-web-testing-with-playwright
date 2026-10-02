import { test, expect } from "@playwright/test";

test.describe("TAT CSC form", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/index.html");
  });

  test("successfully submits the form", async ({ page }) => {
    await page.getByLabel("First name").fill("Eduardo");
    await page.getByLabel("Last name").fill("Santos");
    await page.getByLabel("Email").fill("test@test.com");
    await page.getByLabel("How can we help you?").fill("Test Message");
    await page.getByRole("button", { name: "Send" }).click();

    const successMessage = page.locator(".success");
    await expect(successMessage).toBeVisible();
    await expect(successMessage).toHaveText("Message successfully sent.");
  });

  test("sends an empty form", async ({ page }) => {
    await page.getByRole("button", { name: "Send" }).click();

    const successMessage = page.locator(".error");
    await expect(successMessage).toBeVisible();
    await expect(successMessage).toHaveText("Validate the required fields!");
  });

  test("submits the form with an invalid email format", async ({ page }) => {
    await page.getByLabel("First name").fill("Eduardo");
    await page.getByLabel("Last name").fill("Santos");
    await page.getByLabel("Email").fill("test.com");
    await page.getByLabel("How can we help you?").fill("Test Message");
    await page.getByRole("button", { name: "Send" }).click();

    const successMessage = page.locator(".error");
    await expect(successMessage).toBeVisible();
    await expect(successMessage).toHaveText("Validate the required fields!!!");
  });
});
