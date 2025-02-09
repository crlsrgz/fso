const {test, expect} = require("@playwright/test")
const { describe } = require("node:test")

describe("Note app", () => {

  test("front page can be opened", async({page}) => {
    await page.goto("http://localhost:5173")

    const locator = await page.getByText("Notes")
    await expect(locator).toBeVisible()
    await expect(page.getByText("CSS is easy")).toBeVisible()
    await expect(page.getByText("Single page app token based auth")).toBeVisible()
  })

  test("login form can be opened", async({page}) => {
    await page.goto("http://localhost:5173")

    await page.getByRole("button", {name:"Log in"}).click()

    // await page.getByRole("textbox").first().fill("Jon")
    // await page.getByRole("textbox").last().fill("hello")

    await page.getByTestId("username").fill("Jon")
    await page.getByTestId("password").fill("hello")

    await page.getByRole("button", {name: "log in"}).click()
    
    await expect(page.getByText("Jon Jones logged in")).toBeVisible()
  })
})

