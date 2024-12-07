const { test, describe } = require("node:test");
const assert = require("node:assert");

const blogEntries = require("../utils/list_helper_data");
const totalLikes = require("../utils/list_helper").totalLikes;

describe("Likes Test", () => {
  test("Sum of likes", () => {
    const blogs = blogEntries.blogEntries;
    const result = totalLikes(blogs);
    assert.strictEqual(result, 36);
  });
});

describe("Likes Test", () => {
  test("First entry likes", () => {
    const result = blogEntries.oneBlogEntry[0].likes;
    assert.strictEqual(result, 7);
  });
});

describe("Likes Test", () => {
  test("Empty array", () => {
    const blogs = [];
    const result = totalLikes(blogs);
    assert.strictEqual(result, "No Blog entries");
  });
});
