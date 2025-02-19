const loginWith = async (page, username, password) => {

      const loginButton = page.getByRole("button", {name: "login"})
      const usernameInput = page.getByTestId("username")
      const passwordInput = page.getByTestId("password")

      await usernameInput.fill(username)
      await  passwordInput.fill(password)

      await loginButton.click()
}
const logOutFrom = async (page) => {
      const logoutButton = page.getByRole("button", {name:"logout"})
      await logoutButton.click()
}
/**
 * 
 * @param {*} page 
 * @param {Array} data Array of Objects
 */
const createDummyEntry = async (page, data) => {

      const addBlogButton = page.getByRole("button", {name: "Add new Blog"})
      await addBlogButton.click()
      
      for (let i = 0; i < data.length; i++) {

      const addNewButton = page.getByRole("button", {name:"Add new"})
      const inputBlogTitle = page.getByTestId("blogTitle")
      const inputBlogAuthor = page.getByTestId("blogAuthor")
      const inputBlogUrl = page.getByTestId("blogUrl")


      await inputBlogTitle.fill(data[i].blogTitle)
      await inputBlogAuthor.fill(data[i].blogAuthor)
      await inputBlogUrl.fill(data[i].blogUrl)

      await addNewButton.click()
      }
}

export {loginWith, createDummyEntry, logOutFrom}