chrome.runtime.onInstalled.addListener(() => {
  console.log("Susblocker installed and rules loaded from rules.json");
});
chrome.runtime.onMessage.addListener((msg) => {
  if (msg.type === "TOGGLE_ADBLOCK") {

    chrome.declarativeNetRequest.updateEnabledRulesets({
      enableRulesetIds: msg.enabled ? ["rules"] : [],
      disableRulesetIds: msg.enabled ? [] : ["rules"]
    });

    console.log(
      msg.enabled
        ? "Susblocker enabled"
        : "Susblocker disabled"
    );
  }
});