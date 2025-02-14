import { test, expect,describe, beforeEach } from '@playwright/test';
import { loginWith } from './helper';

describe("Blog app",() => {
  beforeEach(async ({page}) => {
    await page.goto("http://localhost:5173")
  })
  test("Homepage is loaded", async({page})=>{
    const locator = await page.getByText("blogs list")
    await expect(locator).toBeVisible()
  })

  describe("Loging Form testing", () => {

    test("Login form is shown", async({page}) => {

      const loginButton = page.getByRole("button",  {name: "login"})
      const usernameInput = page.getByTestId("username")
      const passwordInput = page.getByTestId("password")

      await expect(loginButton).toBeVisible()
      await expect(usernameInput).toBeVisible()
      await expect(passwordInput).toBeVisible()
      
    })

    test("succeeds with correct credentiaals", async({page}) =>{
      // const loginButton = page.getByRole("button", {name: "login"})
      // const usernameInput = page.getByTestId("username")
      // const passwordInput = page.getByTestId("password")

      // await usernameInput.fill("legolas")
      // await  passwordInput.fill("ethelum")
      // await loginButton.click()
      await loginWith(page, "legolas", "ethelum")

      await(expect(page.getByText("logged in as legolas"))).toBeVisible()
      
    })

    test("fails with wrong credentials", async({page}) => {
      const loginButton = page.getByRole("button", {name: "login"})
      const usernameInput = page.getByTestId("username")
      const usernamePassword = page.getByTestId("password")

      await usernameInput.fill("legolas")
      await usernamePassword.fill("edro")
      await loginButton.click()

      await(expect(page.getByText("wrong username or password"))).toBeVisible()

    })

  })
})
