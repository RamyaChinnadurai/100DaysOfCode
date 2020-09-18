console.log("this is popup console");

chrome.tabs.query({currentWindow: true, active: true}, function(tabs){
    console.log(tabs[0].url);
    const queryString = /\?[^#]+(?=#|$)|$/.exec(tabs[0].url);
    console.log('queryString: ', queryString);
    const youtube_id = queryString[0].split("=")[1].split("&")[0];
    console.log(youtube_id);

    const new_tab = `https://www.yt-download.org/api/widget/mp3/${youtube_id}`
    chrome.tabs.create({'url': new_tab}, function(tab) {
        console.log("new tab is created")
      });

});