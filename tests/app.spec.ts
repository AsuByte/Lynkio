import { test, expect } from "@playwright/test";

const BASE_URL = process.env.BASE_URL || "http://localhost:3000";
const LINK_PLACEHOLDER = "https://yourlink.com/example";

test.describe("Header", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(BASE_URL);
  });

  test.describe("Header", () => {
    test("Show titles and icons", async ({ page }) => {
      await expect(page.getByText("Lynkio")).toBeVisible();
      await expect(page.getByLabel("Language")).toBeVisible();
      await expect(page.getByLabel("Change theme")).toBeVisible();
    });

    test("Responsive", async ({ page }) => {
      await page.emulateMedia({ colorScheme: "light" });
      await page.setViewportSize({ width: 375, height: 812 });
      const title = await page.locator("text=Lynkio").boundingBox();
      expect(title).not.toBeNull();
    });
  });

  test.describe("LinkForm", () => {
    test("Have input button and shorten button", async ({ page }) => {
      await expect(
        page.getByPlaceholder(LINK_PLACEHOLDER)
      ).toBeVisible();
      await expect(
        page.getByRole("button", { name: /Get link/i })
      ).toBeVisible();
    });

    test("The copy button works", async ({ page }) => {
      await page.evaluate(() => {
        navigator.clipboard.writeText = (_text: string) => Promise.resolve();
      });
      await page.fill("input", LINK_PLACEHOLDER);
      await page.click('button:has-text("Get link")');
      await expect(page.getByRole("button", { name: /Copy/i })).toBeVisible();
      await page.click('button:has-text("Copy")');
    });
  });

  test.describe("QRForm", () => {
    test("Generated QR", async ({ page }) => {
      await page.fill("input", LINK_PLACEHOLDER);
      await page.click('button:has-text("Generate QR")');
      const qr = page.locator("#qr-svg");
      await qr.waitFor({ state: "visible", timeout: 5000 });
      await expect(qr).toBeVisible();
    });

    test("Can be customized", async ({ page }) => {
      await page.fill("input", LINK_PLACEHOLDER);
      await page.click('button:has-text("Generate QR")');
      await page.click('button:has-text("Customize")');
      await expect(page.locator("input[type=color]")).toBeVisible();
    });
  });

  test.describe("Footer", () => {
    test("Show text and current year", async ({ page }) => {
      const year = new Date().getFullYear();
      await expect(page.getByText(`${year}`)).toBeVisible();
    });

    test("The icons are seen on mobile", async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 812 });
      await expect(page.getByLabel("Visit Github profile")).toBeVisible();
      await expect(page.getByLabel("Visit LinkedIn profile")).toBeVisible();
    });
  });

  test.describe("General layout", () => {
    test("No unnecessary scrolling on medium-sized screens", async ({
      page,
    }) => {
      await page.setViewportSize({ width: 1024, height: 768 });
      const bodyHeight = await page.evaluate(() => document.body.scrollHeight);
      const viewportHeight = await page.evaluate(() => window.innerHeight);
      expect(bodyHeight).toBeLessThanOrEqual(viewportHeight + 5);
    });
  });
});
