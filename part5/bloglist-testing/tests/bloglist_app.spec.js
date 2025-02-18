import { test, expect,describe, beforeEach } from '@playwright/test';
import { createDummyEntry, loginWith } from './helper';

describe("Blog app",() => {
  beforeEach(async ({page, request}) => {
    await request.post("api/testing/reset")
    await request.post("api/users", {
      data:{
        name: "Aragorn son of Arathorn",
        username: "aragorn",
        password: "hello"
      }
    })
    
    await request.post("api/users", {
      data:{
        name: "Legolas",
        username: "legolas",
        password: "ethelum"
      }
    })

    await page.goto("/")

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
  describe( "when logged in", ()=> {
    beforeEach(async ({page}) => {
      await loginWith(page, "aragorn", "hello")
      await createDummyEntry(page)
    })

    test("a new blog can be created", async({page}) => {
      const addBlogButton = page.getByRole("button", {name: "Add new Blog"})
      await addBlogButton.click()
      
      const addNewButton = page.getByRole("button", {name:"Add new"})
      const inputBlogTitle = page.getByTestId("blogTitle")
      const inputBlogAuthor = page.getByTestId("blogAuthor")
      const inputBlogUrl = page.getByTestId("blogUrl")


      await inputBlogTitle.fill("Adventures in the Middle Earth")
      await inputBlogAuthor.fill("Gimli")
      await inputBlogUrl.fill("google.com")

      await addNewButton.click()

      await expect(addNewButton).toBeVisible()
      const locator = page.getByText("Adventures in the Middle Earth").first()
      await expect(locator).toBeVisible()

    })

    test("like a blog", async({page}) => {
      const viewEntryButton = page.getByRole("button", {name:"view"})
      await viewEntryButton.click()

      const likesSpan = page.getByTestId("entryLikes")

      const likeButton = page.getByRole("button", {name: "like"})
      await expect(likesSpan).toContainText("likes: 0")

      await likeButton.click({clickCount:2})
      const likesSpanAfter = page.getByTestId("entryLikes")
      await expect(likesSpanAfter).toContainText("likes: 2")

      

    })
    test("delete blog", async({page}) => {
      const viewEntryButton = page.getByRole("button", {name:"view"})
      await viewEntryButton.click()


      const deleteButton = page.getByRole("button", {name: "- remove -"})

      await deleteButton.click({clickCount:1})
      const entryNotFound = page.getByTestId("The Hobbit")
      await expect(entryNotFound).toHaveCount(0)

      

    })

  })
})
