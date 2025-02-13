import { test, expect,describe, beforeEach } from '@playwright/test';

describe("Blog app",() => {
  beforeEach(async ({page}) => {
    await page.goto("http://localhost:5173")
  })
  test("Homepage is loaded", async({page})=>{
    const locator = await page.getByText("blogs list")
    await expect(locator).toBeVisible()
  })

  describe("Form testing", () => {

    test("Login form is shown", async({page}) => {

      const loginButton = page.getByRole("button",  {name: "login"})
      const usernameInput = page.getByTestId("username")
      const passwordInput = page.getByTestId("password")

      await expect(loginButton).toBeVisible()
      await expect(usernameInput).toBeVisible()
      await expect(passwordInput).toBeVisible()
      
    })

    test("User can log in", async({page}) =>{
      const loginButton = page.getByRole("button", {name: "login"})
      const usernameInput = page.getByTestId("username")
      const passwordInput = page.getByTestId("password")

      await usernameInput.fill("legolas")
      await  passwordInput.fill("ethelum")
      await loginButton.click()

      await(expect(page.getByText("logged in as legolas"))).toBeVisible()
      
    })

  })
})
