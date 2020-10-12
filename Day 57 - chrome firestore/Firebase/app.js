//Get current domain

chrome.runtime.sendMessage({command: "fetch"}, (response) => {
    showData(response.data);
  });
  
  
  chrome.runtime.sendMessage({command: "post", data:"Test Data"}, (response) => {
    showData(response.data);
  });
  
  
  
  
  
  var showData = function(data) {
    console.log('From Extension--', data);
  }