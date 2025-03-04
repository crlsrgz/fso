const loginWith = async (page, username, password) => {
  await page.getByRole("button", { name: "Log in" }).click();
  await page.getByTestId("username").fill(username);
  await page.getByTestId("password").fill(password);
  await page.getByRole("button", { name: "log in" }).click();
};

const createNote = async (page, content) => {
  await page.getByRole("button", { name: "Add a new note" }).click();
  await page.getByRole("textbox").fill(content);
  await page.getByRole("button", { name: "save" }).click();
  // slow down note creation, wait for content to be created
  await page.getByText(content).waitFor();
};

export { loginWith, createNote };
