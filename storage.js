// The ONLY file that reads or writes saved data.
// Today that's localStorage; in phase 4 it becomes an online database,
// and only this file should need to change.

const STORAGE_PREFIX = "workout-app:";

// localStorage only holds text, so we turn data into JSON text and back.
// try/catch because storage can be blocked (private mode) or full.
function loadData(key, fallback) {
  try {
    const text = localStorage.getItem(STORAGE_PREFIX + key);
    return text === null ? fallback : JSON.parse(text);
  } catch (error) {
    console.warn("Could not load " + key, error);
    return fallback;
  }
}

function saveData(key, value) {
  try {
    localStorage.setItem(STORAGE_PREFIX + key, JSON.stringify(value));
    return true;
  } catch (error) {
    console.warn("Could not save " + key, error);
    return false;
  }
}
