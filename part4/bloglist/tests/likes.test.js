const { test, describe } = require("node:test");
const assert = require("node:assert");

const blogEntries = require("../utils/list_helper_data");
const totalLikes = require("../utils/list_helper").totalLikes;
// test for a total, no entries and one entry
describe("Likes Test", () => {
  test("Sum of likes", () => {
    const blogs = blogEntries;
    const result = totalLikes(blogEntries);
    assert.strictEqual(result, 36);
  });
});
describe("Likes Test", () => {
  test("First entry likes", () => {
    const result = blogEntries[0].likes;
    assert.strictEqual(result, 7);
  });
});
