chrome.runtime.onInstalled.addListener(() => {
    chrome.browserAction.onClicked.addListener(() => {
        chrome.tabs.query({ active: true, currentWindow: true }, () => {
            chrome.tabs.create({ url: chrome.extension.getURL('index.html') });
        });
    });
});

chrome.browserAction.setTitle({ title: 'Open Notiful' });