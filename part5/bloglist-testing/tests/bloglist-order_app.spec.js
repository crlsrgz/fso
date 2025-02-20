import { test, expect, describe, beforeEach } from "@playwright/test";
import {
  createDummyEntry,
  generateArrayofRandomNumbers,
  loginWith,
} from "./helper";

describe("order", () => {
  beforeEach(async ({ page, request }) => {
    await request.post("api/testing/reset");

    await request.post("api/users", {
      data: {
        name: "Aragorn son of Arathorn",
        username: "aragorn",
        password: "hello",
      },
    });

    await request.post("api/users", {
      data: {
        name: "Legolas",
        username: "legolas",
        password: "ethelum",
      },
    });

    await page.goto("/");
    await loginWith(page, "aragorn", "hello");
    await createDummyEntry(page, [
      {
        blogTitle: "The Hobbit",
        blogAuthor: "Bilbo",
        blogUrl: "theshire.com",
      },
      {
        blogTitle: "Gondor",
        blogAuthor: "Bilbo",
        blogUrl: "gondor.com",
      },
      {
        blogTitle: "Rohan",
        blogAuthor: "Theoden",
        blogUrl: "horses.com",
      },
      {
        blogTitle: "Mordor",
        blogAuthor: "Sauron",
        blogUrl: "vulcan.com",
      },
    ]);
  });

  test("check blogs order", async ({ page }) => {
    // Close Add Blog button
    const closeAddBlogButton = page
      .getByRole("button", { name: "Cancel" })
      .first();
    await closeAddBlogButton.click();

    // Select the containers  of blog elementes
    let containers = page.getByTestId("blogEntry");
    const count = await containers.count();
    // generate Arrays with likes
    const arrayofLikes = generateArrayofRandomNumbers(count, 9, 2);
    await page.waitForTimeout(300);
    const arrayofLikesSorted = arrayofLikes.sort().reverse();

    await page.waitForTimeout(300);
    await page.pause();
    /**
     * Iterate to like entries
     */
    for (let i = 0; i < count; i++) {
      const viewButton = containers
        .nth(i)
        .getByRole("button", { name: "view" });
      await viewButton.click();

      const likeButton = containers
        .nth(i)
        .getByRole("button", { name: "like" });

      await page.waitForTimeout(300);
      await likeButton.click({ clickCount: arrayofLikes[i] });

      await page.waitForTimeout(300);
    }

    await page.reload();
    await page.pause();

    // Select container after liked
    let containersAfter = page.getByTestId("blogEntry");
    console.log(arrayofLikes);
    console.log(arrayofLikesSorted);

    await page.pause();
    /**
     * Iterate check the element likes and compare with ordered likes
     */
    let testArray = [];
    for (let i = 0; i < count; i++) {
      const viewButton = await containers
        .nth(i)
        .getByRole("button", { name: "view" });

      await viewButton.click();

      await page.waitForTimeout(300);
      const entryLikes = await containersAfter.nth(i).getByTestId("entryLikes");
      const entryLikesText = await entryLikes.textContent();

      console.log(
        entryLikesText.slice(7),
        arrayofLikesSorted[i],
        Number(entryLikesText.slice(7)) === Number(arrayofLikesSorted[i])
      );
      testArray.push(Number(entryLikesText.slice(7)));
      // await page.waitForTimeout(300);
      await expect(Number(entryLikesText.slice(7))).toEqual(
        arrayofLikesSorted[i]
      );
      // await page.waitForTimeout(300);
    }
    console.log(arrayofLikes);
    console.log(arrayofLikesSorted);
    console.log(testArray);

    await page.pause();

    await expect(testArray).toEqual(arrayofLikesSorted);
    const checkText = page.getByText("The Hobbit");

    await expect(checkText).toBeVisible();
  });
});
