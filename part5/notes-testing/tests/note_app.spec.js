const { test, expect, describe, beforeEach } = require("@playwright/test");
const { loginWith, createNote } = require("./helper");

describe("Note app", () => {
  beforeEach(async ({ page, request }) => {
    await request.post("/api/testing/reset");
    await request.post("/api/users", {
      data: {
        name: "Jon Jones",
        username: "Jon",
        password: "hello",
      },
    });

    await page.goto("/");
  });

  test("front page can be opened", async ({ page }) => {
    const locator = await page.getByText("Notes");

    await expect(locator).toBeVisible();
    await expect(
      page.getByText(
        "Note app, Department of Computer Science, University of Helsinki 2023"
      )
    ).toBeVisible();
  });

  test("user can log in", async ({ page }) => {
    // await page.getByRole("button", { name: "Log in" }).click();
    // await page.getByTestId("username").fill("Jon");
    // await page.getByTestId("password").fill("hello");
    // await page.getByRole("button", { name: "log in" }).click();
    await loginWith(page, "Jon", "hello");

    await expect(page.getByText("Jon Jones logged in")).toBeVisible();
  });

  describe("when logged in", () => {
    beforeEach(async ({ page }) => {
      // await page.getByRole("button", { name: "Log in" }).click();
      // await page.getByTestId("username").fill("Jon");
      // await page.getByTestId("password").fill("hello");
      // await page.getByRole("button", { name: "log in" }).click();
      await loginWith(page, "Jon", "hello");
    });

    test("a new note can be created", async ({ page }) => {
      // await page.getByRole("button", { name: "Add a new note" }).click();
      // await page.getByRole("textbox").fill("a new note created by playwright");
      // await page.getByRole("button", { name: "save" }).click();
      await createNote(page, "a note created by playwright");
      await expect(
        page.getByText("a note created by playwright")
      ).toBeVisible();
    });

    describe("and a note exists", () => {
      beforeEach(async ({ page }) => {
        await createNote(page, "first note");
        await createNote(page, "second note");
        await createNote(page, "third note");
      });

      test("importance can be changed", async ({ page }) => {
        await page.pause();
        const otherNoteText = await page.getByText("second note");
        // retrieve parent element
        const otherNoteElement = await otherNoteText.locator("..");

        await otherNoteElement
          .getByRole("button", { name: "make not importan" })
          .click();
        await expect(
          otherNoteElement.getByText("make important")
        ).toBeVisible();
      });
    });

    test("login fails with wrong password", async ({ page }) => {
      await page.getByRole("button", { name: "Log in" }).click();

      await page.getByTestId("username").fill("Jon");
      await page.getByTestId("password").fill("bye");

      await page.getByRole("button", { name: "log in" }).click();

      const errorDiv = await page.locator(".error");
      await expect(errorDiv).toContainText("wrong credentials");
      await expect(errorDiv).toHaveCSS("border-style", "solid");
    });

    describe("and several notes exist", () => {
      beforeEach(async ({ page }) => {
        await createNote(page, "first note");
        await createNote(page, "second note");
      });
      test("one of those ca be made nonimportant", async ({ page }) => {
        await page.pause();
        const otherNoteText = await page.getByText("first note");
        // retrieve parent element
        const otherNoteElement = await otherNoteText.locator("..");

        await otherNoteElement
          .getByRole("button", { name: "make not important" })
          .click();
        await expect(
          otherNoteElement.getByText("make important")
        ).toBeVisible();
      });
    });
  });
});
// npm test -- -g "login fails with wrong password"
// npx playwright test --grep="exist"
// npm test -- --ui
// npm run start:test
