function open_editor_in_tab() {
    chrome.tabs.create({ url: chrome.extension.getURL('index.html') });
}

/*if(!chrome.browserAction.onClicked.hasListener(open_editor_in_tab)) {
    chrome.browserAction.onClicked.removeListener(open_editor_in_tab);
}*/

chrome.browserAction.onClicked.addListener(open_editor_in_tab);

chrome.browserAction.setTitle({
    title: 'Open Notiful'
});