// Run with: node tests.js
// No test library: Node's built-in assert throws an error when a check fails.

const assert = require("assert");
const { kgToLb } = require("./logic.js");

let passed = 0;

function test(name, fn) {
  fn();
  passed++;
  console.log("ok - " + name);
}

test("kgToLb converts kg to lb, rounded to 1 decimal", function () {
  assert.strictEqual(kgToLb(0), 0);
  assert.strictEqual(kgToLb(100), 220.5);
});

console.log(passed + " test(s) passed");
