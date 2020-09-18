console.log("Background script is running ");

chrome.browserAction.onClicked(buttonClicked);

function buttonClicked(){
    console.log("button is clicked");
}