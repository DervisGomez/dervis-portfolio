import { expect, test } from "@playwright/test";

test.describe("Portfolio smoke and happy path", () => {
  test("home loads correctly", async ({ page }) => {
    await page.goto("/es");

    await expect(
      page.getByRole("heading", { level: 1, name: /Construyo productos/i })
    ).toBeVisible();
    await expect(
      page.getByRole("navigation", {
        name: /Navegación principal de escritorio/i,
      })
    ).toBeVisible();
  });

  test("English route loads correctly", async ({ page }) => {
    await page.goto("/en");

    await expect(
      page.getByRole("heading", { level: 1, name: /I build scalable digital products/i })
    ).toBeVisible();
    await expect(
      page.getByRole("navigation", { name: /Desktop main navigation/i })
    ).toBeVisible();
  });

  test("language switcher changes locale", async ({ page }) => {
    await page.goto("/es");

    await page.getByRole("link", { name: /Cambiar idioma a English/i }).click();

    await expect(page).toHaveURL(/\/en$/);
    await expect(
      page.getByRole("heading", { level: 1, name: /I build scalable digital products/i })
    ).toBeVisible();
  });

  test("theme switcher changes the active theme", async ({ page }) => {
    await page.goto("/es");

    const darkModeButton = page.getByRole("button", { name: /Modo oscuro/i });
    await darkModeButton.click();

    await expect(darkModeButton).toHaveAttribute("aria-pressed", "true");
  });

  test("opens and closes a case study", async ({ page }) => {
    await page.goto("/es");

    await page
      .getByRole("button", {
        name: /Ver caso técnico — Devoción Diaria/i,
      })
      .click();

    await expect(page.getByTestId("case-study-modal")).toBeVisible();
    await expect(page.getByRole("dialog")).toContainText("Devoción Diaria");

    await page.getByTestId("case-study-modal-close").click();

    await expect(page.getByTestId("case-study-modal")).toBeHidden();
  });

  test("header navigation links scroll to their sections", async ({ page }) => {
    await page.goto("/es");

    const desktopNav = page.getByRole("navigation", {
      name: /Navegación principal de escritorio/i,
    });

    await desktopNav.getByRole("link", { name: "Proyectos" }).click();
    await expect(page).toHaveURL(/#projects$/);
    await expect(page.locator("#projects")).toBeInViewport();

    await desktopNav.getByRole("link", { name: "Experiencia" }).click();
    await expect(page).toHaveURL(/#experience$/);
    await expect(page.locator("#experience")).toBeInViewport();

    await desktopNav.getByRole("link", { name: "Stack" }).click();
    await expect(page).toHaveURL(/#stack$/);
    await expect(page.locator("#stack")).toBeInViewport();
  });
});
