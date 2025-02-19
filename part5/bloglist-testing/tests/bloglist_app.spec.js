import { test, expect,describe, beforeEach } from '@playwright/test';
import { createDummyEntry, logOutFrom, loginWith } from './helper';

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

  })

   describe("other user logged in", () => {

    beforeEach(async ({page}) => {
      await loginWith(page, "aragorn", "hello")
      await createDummyEntry(page, [{blogTitle: "The Hobbit", blogAuthor: "Bilbo", blogUrl: "theshire.com"}, {blogTitle: "The Shire", blogAuthor: "Sam", blogUrl: "theshire.com"}])
    })

    test("user cannot delete entry", async({page}) => {
      await logOutFrom(page)
      await loginWith(page, "legolas", "ethelum")

      await(expect(page.getByText("logged in as legolas"))).toBeVisible()
      await expect(page.getByText("The Hobbit")).toBeVisible()

      let viewEntryButton = page.getByRole("button", {name:"view"}).first()
      let removeEntryButton = page.getByRole("button", {name:"- remove -"}).first()
      
      await viewEntryButton.click() 
      await removeEntryButton.click()
      await expect(page.getByText("The Hobbit")).toBeVisible()

      // DElete entry
      await logOutFrom(page)
      await loginWith(page, "aragorn", "hello")

      viewEntryButton = page.getByRole("button", {name:"view"}).first()
      removeEntryButton = page.getByRole("button", {name:"- remove -"}).first()

      await viewEntryButton.click() 
      await removeEntryButton.click()

      const deletedBlog = page.getByText("The Hobbit")
      await expect(page.getByText("The Shire")).toBeVisible()
      
      await expect(deletedBlog).toBeHidden()


    })

   })

   describe("order", () => {

    beforeEach(async ({page}) => {
      await loginWith(page, "aragorn", "hello")
      await createDummyEntry(page, [{blogTitle: "The Hobbit", blogAuthor: "Bilbo", blogUrl: "theshire.com"}, {blogTitle: "The Shire", blogAuthor: "Sam", blogUrl: "theshire.com"}])
    })

    test("check blogs order", async({page}) => {
      

      let viewEntryButton = page.getByRole("button", {name:"view"}).first()
      await viewEntryButton.click() 
      await page.reload()

      const likeButtons = page.locator('.entryLikes').all()

      for (let button of likeButtons) {
        button.click()
      }
      

      const checkText = page.getByText("The Hobbit")
      
      await expect(checkText).toBeVisible()

    })
   })

})
