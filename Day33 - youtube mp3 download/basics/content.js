console.log("Chrome Extension go!");

chrome.runtime.onMessage.addListener(gotMessage);

function gotMessage(message, sender, sendResponse){
    console.log(message.text);
    if(message.text === "hello"){
        let paragraphs = document.getElementsByTagName('p');
        for( let i = 0; i< Object.keys(paragraphs).length; i++){
            paragraphs[i].style['background-color'] = '#FF00FF';
        }
        
    }
}