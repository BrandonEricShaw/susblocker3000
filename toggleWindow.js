const toggleButton = document.getElementById("toggleButton");

function updateButton(enabled) {
  toggleButton.textContent = enabled
    ? "Disable Susblocker"
    : "Enable Susblocker";
}

chrome.storage.local.get(["enabled"], (result) => {
  const enabled = result.enabled !== false;
  updateButton(enabled);
});

toggleButton.addEventListener("click", () => {
  chrome.storage.local.get(["enabled"], (result) => {
    const enabled = result.enabled !== false;

    const newState = !enabled;

    chrome.storage.local.set({ enabled: newState });

    chrome.runtime.sendMessage({
      type: "TOGGLE_ADBLOCK",
      enabled: newState
    });

    updateButton(newState);
  });
});