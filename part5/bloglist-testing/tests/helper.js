import { expect } from "@playwright/test";

const loginWith = async (page, username, password) => {
  const loginButton = page.getByRole("button", { name: "login" });
  const usernameInput = page.getByTestId("username");
  const passwordInput = page.getByTestId("password");

  await usernameInput.fill(username);
  await passwordInput.fill(password);

  await loginButton.click();
};
const logOutFrom = async (page) => {
  const logoutButton = page.getByRole("button", { name: "logout" });
  await logoutButton.click();
};
/**
 *
 * @param {*} page
 * @param {Array} data Array of Objects
 */
const createDummyEntry = async (page, data) => {
  const addBlogButton = await page.getByRole("button", {
    name: "Add new Blog",
  });
  await addBlogButton.click();

  for (let i = 0; i < data.length; i++) {
    const addNewButton = await page.getByRole("button", { name: "Add new" });
    const inputBlogTitle = await page.getByTestId("blogTitle");
    const inputBlogAuthor = await page.getByTestId("blogAuthor");
    const inputBlogUrl = await page.getByTestId("blogUrl");

    await inputBlogTitle.fill(data[i].blogTitle);
    await inputBlogAuthor.fill(data[i].blogAuthor);
    await inputBlogUrl.fill(data[i].blogUrl);

    await addNewButton.click();
    await page.waitForTimeout(200);
    // const checkPage = await page.getByText(data[i].blogTitle);
    // await expect(checkPage).toBeVisible();
  }
};
/**
 *
 * @param {Number} max high
 * @param {Number} min low
 */
const generateRandomNumber = (max, min) => {
  const randNumber = Math.floor(Math.random() * (max - min + 2)) + min;
  return randNumber;
};
/**
 *
 * @param {Number} n array lenght
 * @param {Number} max high
 * @param {Number} min low
 */
const generateArrayofRandomNumbers = (n, max, min) => {
  let minC = Math.ceil(min);
  let maxF = Math.floor(max);
  const arr = [];
  for (let i = 0; i < n; i++) {
    arr.push(generateRandomNumber(maxF, minC));
  }
  return arr;
};

export {
  loginWith,
  createDummyEntry,
  logOutFrom,
  generateRandomNumber,
  generateArrayofRandomNumbers,
};
