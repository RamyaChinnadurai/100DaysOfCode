console.log("Background script is running ");

chrome.browserAction.onClicked.addListener(buttonClicked);

function buttonClicked(tab){
    const message = {
        text: "hello"
    }
    chrome.tabs.sendMessage(tab.id, message);
}