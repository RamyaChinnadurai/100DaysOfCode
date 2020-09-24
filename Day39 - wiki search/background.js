const menuItem = {
    "id": "wiki-search",
    "title": "wiki search",
    "contexts": ["selection"]
}

chrome.contextMenus.create(menuItem);

function fixedEncodeURI(string){
    return encodeURI(string).replace(/%5B/g, '[').replace(/%5D/g, ']');
}

chrome.contextMenus.onClicked.addListener(function(clickData){
    const selectedText = clickData.selectionText;
    if(clickData.menuItemId == "wiki-search" && selectedText) {
        const wikiUrl = "https://en.wikipedia.org/wiki/" + fixedEncodeURI(selectedText);
        const request = {
            "url" : wikiUrl,
            "type": "popup",
            "top": 5,
            "left": 5,
            "width": screen.availWidth/2,
            "height": screen.availHeight/2
        };
      chrome.windows.create(request, function(){});
    }
})