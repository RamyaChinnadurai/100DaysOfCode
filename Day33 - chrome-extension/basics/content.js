console.log("Chrome Extension go! Have it changed !");

let paragraphs = document.getElementsByTagName('p');
console.log("paragraphs ", paragraphs);
console.log("type of paragraphs ", typeof(paragraphs));
console.log("object keys ", Object.keys(paragraphs));
console.log("paragraph length ", Object.keys(paragraphs).length);
for( let i = 0; i< Object.keys(paragraphs).length; i++){
    console.log("inside loop")
    console.log("paragraphs ", paragraphs);
    console.log("paragraphs ", paragraphs[i]);
    paragraphs[i].style['background-color'] = '#FF00FF';
}

console.log('its applied')