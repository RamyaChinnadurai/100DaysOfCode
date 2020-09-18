console.log("Chrome Extension go!");

let paragraphs = document.getElementsByTagName('p');
for( let i = 0; i< Object.keys(paragraphs).length; i++){
    paragraphs[i].style['background-color'] = '#FF00FF';
}

console.log('its applied')