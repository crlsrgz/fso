const {test, expect, describe, beforeEach} = require("@playwright/test")

describe("Note app", () => {

beforeEach(async ({page,request}) => {
    await request.post("http://localhost:5173/api/testing/reset")
    await request.post("http://localhost:5173/api/users", {
      data:{
        name: "Jon Jones",
        username: "Jon",
        password : "hello"
      }
    })
    
    await page.goto("http://localhost:5173")
})

  test("front page can be opened", async({page}) => {

    const locator = await page.getByText("Notes")
    await expect(locator).toBeVisible()
    await expect(page.getByText("HTML is easy")).toBeVisible()
    await expect(page.getByText("Browser can execute only JavaScript")).toBeVisible()

  })

  test("login form can be opened", async({page}) => {

    await page.getByRole("button", {name:"Log in"}).click()

    // await page.getByRole("textbox").first().fill("Jon")
    // await page.getByRole("textbox").last().fill("hello")

    await page.getByTestId("username").fill("Jon")
    await page.getByTestId("password").fill("hello")

    await page.getByRole("button", {name: "log in"}).click()
    
    await expect(page.getByText("Jon Jones logged in")).toBeVisible()
  })

  describe("when logged in",() => {

    beforeEach(async({page}) => {
      await page.getByRole("button", {name:"Log in"}).click()

     await page.getByTestId("username").fill("Jon")
     await page.getByTestId("password").fill("hello")

     await page.getByRole("button", {name: "log in"}).click()

    })
    test("a new note can be created", async({page}) => {
      await page.getByRole("button", {name: "Add a new note"}).click()
      await page.getByRole("textbox").fill("a new note created by playwright")
      await page.getByRole("button", {name:"save"}).click()
      await expect(page.getByText("a new note created by playwright")).toBeVisible()
    })


    describe("and a note exist", () => {
      beforeEach(async ({page}) => {
        await page.getByRole("button", {name:"Add a new note"}).click()
        await page.getByRole("textbox").fill("a new note created by playwright")
        await page.getByRole("button", {name:"save"}).click()
      })

      test("importance can be changed", async({page}) => {
        await page.getByRole("button", {name: "make not important"}).click()
        await expect(page.getByText("make important")).toBeVisible()
      })
    })

    test("login fails with wrong password", async({page}) => {
     await page.getByRole("button", {name:"Log in"}).click()

     await page.getByTestId("username").fill("Jon")
     await page.getByTestId("password").fill("bye")
     
     await page.getByRole("button", {name:"log in"}).click()


     await expect(page.getByText("wrong credentials")).toBeVisible()

    })
  })
})

// npx playwright test --grep="exist"
// npm test -- --ui
// npm run start:test


