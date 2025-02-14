const loginWith = async (page, username, password) => {

      const loginButton = page.getByRole("button", {name: "login"})
      const usernameInput = page.getByTestId("username")
      const passwordInput = page.getByTestId("password")

      await usernameInput.fill(username)
      await  passwordInput.fill(password)

      await loginButton.click()
}

export {loginWith}