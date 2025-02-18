const loginWith = async (page, username, password) => {

      const loginButton = page.getByRole("button", {name: "login"})
      const usernameInput = page.getByTestId("username")
      const passwordInput = page.getByTestId("password")

      await usernameInput.fill(username)
      await  passwordInput.fill(password)

      await loginButton.click()
}

const createDummyEntry = async (page) => {

      const addBlogButton = page.getByRole("button", {name: "Add new Blog"})
      await addBlogButton.click()
      
      const addNewButton = page.getByRole("button", {name:"Add new"})
      const inputBlogTitle = page.getByTestId("blogTitle")
      const inputBlogAuthor = page.getByTestId("blogAuthor")
      const inputBlogUrl = page.getByTestId("blogUrl")


      await inputBlogTitle.fill("The Hobbit")
      await inputBlogAuthor.fill("Bilbo")
      await inputBlogUrl.fill("theshire.com")

      await addNewButton.click()
}

export {loginWith, createDummyEntry}