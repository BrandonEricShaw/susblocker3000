const domains = [
    "googlesyndication.com",
    "google-analytics.com",
    "quantserve.com",
    "scorecardresearch.com",
    "zedo.com",
    "doubleclick.net",
    "googleadservices.com",
    "fbcdn.net",
    "adbrite.com",
    "exponential.com"
];

chrome.runtime.onInstalled.addListener(() => {
    const rules = domains.map((domain, index) => ({
        id: 1000 + index, // avoid collisions
        priority: 1,
        action: {type: "block"},
        condition: {
            urlFilter: domain,
            resourceTypes: ["script", "image", "xmlhttprequest"]
        }
    }));

    chrome.declarativeNetRequest.updateDynamicRules({
        removeRuleIds: rules.map(r => r.id),
        addRules: rules
    },() => {
        if (chrome.runtime.lastError) {
            console.error("Rule error:", chrome.runtime.lastError);
        } else {
            console.log("Rules successfully added");
        }
    });
});