# Learning notes

## Decisions

- **Plain `<script>` tags, not ES modules (0.1).** Browsers refuse to load
  `type="module"` scripts from a `file://` page, and the app must work by
  double-clicking `index.html`. So every file defines plain global functions,
  and `index.html` loads them in order.
- **`logic.js` exports itself only when running in Node (0.1).** The line
  `if (typeof module !== "undefined")` lets the same file work in the browser
  (as globals) and in `tests.js` (with `require`).
- **The trivial test checks `kgToLb` (0.1).** Instead of testing `1 + 1`, the
  first test checks a function the app will really use: weights are stored in
  kg and shown in lb when that setting is on. Results are rounded to 1 decimal.
- **`storage.js` already has `loadData` and `saveData` (0.1).** They are tiny
  and later tasks need them; nothing calls them yet.

---

## 0.1 Project skeleton (2026-10-24)

### What we built

We created every file the app will grow into. `index.html` is the page itself:
a title, a row of three tab buttons (Routines, Log, Learn) and three sections,
one per tab. `style.css` makes it look clean on a phone and switches to dark
colours if your phone is in dark mode. `app.js` listens for clicks on the tabs
and shows the matching section while hiding the others. `logic.js` holds our
first pure function, `kgToLb`. `storage.js` has two helpers to save and load
data in the browser. `data/splits.js` holds an empty list for the starter
routines we'll write in phase 3. `tests.js` runs one test with `node tests.js`.

### New concepts

**Separation of files by job.** Each file has one job. `logic.js` only does
maths and data shaping, so it can be tested without a browser. `storage.js` is
the only place that touches saved data, so when we move to an online database
in phase 4, we change one file instead of hunting through the whole app.

**Pure function.** A function that gives the same output for the same input
and changes nothing outside itself. `kgToLb(100)` is always `220.5`. That makes
it trivial to test: call it, compare the answer.

**The DOM.** The browser turns your HTML into a tree of objects called the DOM
(Document Object Model). JavaScript changes the page by changing those objects,
for example `panel.hidden = true` hides a section.

**Events.** The browser tells your code when something happens (a click, a key
press). `addEventListener("click", fn)` means "run `fn` every time this is
clicked".

**`data-*` attributes.** You can put your own information on an HTML element
with any attribute starting with `data-`. `data-tab="log"` on a button is read
in JavaScript as `button.dataset.tab`, which gives `"log"`.

**ARIA attributes.** `role="tab"` and `aria-selected="true"` don't change how
the page looks; they tell screen readers (used by blind people) that these
buttons are tabs and which one is active. We also reuse `aria-selected` in CSS
to colour the active tab, so there's one source of truth.

**localStorage and JSON.** `localStorage` is a small notebook the browser keeps
for each website. It only stores text, so we convert objects to text with
`JSON.stringify` before saving, and back with `JSON.parse` after loading.

**try/catch.** Code inside `try` runs normally; if it throws an error, the
`catch` block runs instead of the whole app crashing. Storage can fail (private
browsing, full disk), so we catch that and return a fallback.

**`assert`.** Node's built-in checker. `assert.strictEqual(a, b)` does nothing
if `a === b` and throws an error otherwise, which stops the test run and tells
you what went wrong.

### Most important lines

```js
panel.hidden = panel.id !== tabName;
```
For each section: if its id is not the tab we clicked, `hidden` becomes `true`
(hidden). Only the matching one gets `false` (shown). One line, no `if`.

```js
return Math.round(kg * LB_PER_KG * 10) / 10;
```
Multiply by 10, round to a whole number, divide by 10: that's the classic trick
to round to 1 decimal. 100 kg → 220.462 → 2204.62 → 2205 → 220.5.

```js
if (typeof module !== "undefined") {
  module.exports = { kgToLb };
}
```
`module` exists in Node but not in the browser. `typeof` is safe to use on a
name that doesn't exist (it returns `"undefined"` instead of crashing), so this
check lets one file work in both places.

```html
<script src="data/splits.js"></script>
<script src="logic.js"></script>
<script src="storage.js"></script>
<script src="app.js"></script>
```
The browser runs these top to bottom. `app.js` is last because it may use
anything the others define. They sit at the end of `<body>` so the HTML
elements already exist when `app.js` looks for them.

### Quiz

1. If you deleted `hidden` from the Log section in `index.html` and reloaded
   the page, what would you see, and what changes as soon as you click a tab?
2. Why would `kgToLb` be harder to test if it also wrote the result onto the
   page?

Answers

1. Routines and Log would both show on load, one under the other, because
   only the HTML decides what's hidden before any click. As soon as you click
   any tab, `showTab` sets `hidden` on every section, so the page fixes itself.
2. It would need a page (the DOM) to exist, and Node has no page. You'd have to
   fake one. Keeping logic pure means the test is just "call it, check the
   number".
