const { test, describe } = require("node:test");
const assert = require("node:assert");

const blogEntries = require("../utils/list_helper_data");
const favoriteBlog = require("../utils/list_helper").favoriteBlog;

test("Most Liked", () => {
    const expected = {
        title: "Canonical string reduction",
        author: "Edsger W. Dijkstra",
        likes: 12,
    };
    const blogs = blogEntries.blogEntries;
    const result = favoriteBlog(blogs);
    // strictEqual return error "values have the same structure but are not ref-equal "
    //   assert.strictEqual(result, expected);
    assert.deepStrictEqual(result, expected);
});
