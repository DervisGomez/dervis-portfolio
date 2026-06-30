import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

test.describe("Portfolio accessibility", () => {
  test("home has no critical accessibility violations", async ({ page }) => {
    await page.goto("/es");

    const results = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
      .analyze();

    const criticalViolations = results.violations.filter(
      (violation) => violation.impact === "critical"
    );

    expect(criticalViolations).toEqual([]);
  });

  test("case study modal has no critical accessibility violations", async ({
    page,
  }) => {
    await page.goto("/es");

    await page
      .getByRole("button", {
        name: /Ver caso técnico — Devoción Diaria/i,
      })
      .click();

    const modal = page.getByTestId("case-study-modal");
    await expect(modal).toBeVisible();

    const results = await new AxeBuilder({ page })
      .include('[data-testid="case-study-modal"]')
      .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
      .analyze();

    const criticalViolations = results.violations.filter(
      (violation) => violation.impact === "critical"
    );

    expect(criticalViolations).toEqual([]);
  });
});
