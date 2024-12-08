const { test, after, describe } = require("node:test");
const assert = require("node:assert");

describe.only("Initial", () => {
  test.only("API test initial setup", () => {
    const result = 111;
    assert.strictEqual(result, 111);
  });
  test.only("Another API test initial setup", () => {
    const result = 111;
    assert.strictEqual(result, 111);
  });
});
