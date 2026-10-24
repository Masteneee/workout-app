// Pure functions only: same input always gives the same output.
// No DOM, no storage, so they can be tested in Node.

const LB_PER_KG = 2.20462;

// Weights are stored in kg; this is only for showing them in lb.
// Rounded to 1 decimal because nobody loads a bar to 0.001 lb.
function kgToLb(kg) {
  return Math.round(kg * LB_PER_KG * 10) / 10;
}

// In the browser this file just defines globals. In Node (tests.js)
// `module` exists, so we also export the functions for require().
if (typeof module !== "undefined") {
  module.exports = { kgToLb };
}
