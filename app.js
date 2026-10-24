// UI code: reads clicks, shows and hides things on the page.

const tabButtons = document.querySelectorAll(".tab");
const panels = document.querySelectorAll(".panel");

function showTab(tabName) {
  tabButtons.forEach(function (button) {
    // aria-selected tells screen readers (and our CSS) which tab is active
    const isActive = button.dataset.tab === tabName;
    button.setAttribute("aria-selected", String(isActive));
  });

  panels.forEach(function (panel) {
    panel.hidden = panel.id !== tabName;
  });
}

tabButtons.forEach(function (button) {
  button.addEventListener("click", function () {
    showTab(button.dataset.tab);
  });
});
