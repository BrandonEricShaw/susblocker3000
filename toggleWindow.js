//Const
const toggleButton = document.getElementById("toggleButton");

//Change Buttons State
function updateButton(enabled) {
  toggleButton.textContent = enabled
    ? "Disable Susblocker"
    : "Enable Susblocker";
}

//Update Button, Toggle Capability
chrome.storage.local.get(["enabled"], (result) => {
  const enabled = result.enabled !== false;
  updateButton(enabled);
});

//Button Event Listener
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
