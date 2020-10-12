const firebaseConfig = {
    apiKey: PROCESS.ENV.APIKEY,
    authDomain: PROCESS.ENV.authDomain,
    databaseURL: PROCESS.ENV.databaseURL,
    projectId: PROCESS.ENV.projectId,
    storageBucket: PROCESS.ENV.storageBucket,
    messagingSenderId: PROCESS.ENV.messagingSenderId,
    appId: PROCESS.ENV.appId
  };

// Initialize Firebase
firebase.initializeApp(firebaseConfig);


console.log(firebase);

var db = firebase.firestore();

/*
var db = firebase.firestore();
db.collection("cities").doc("LA").set({
    name: "Los Angeles",
    state: "CA",
    country: "USA"
})
.then(function() {
    console.log("Document successfully written!");
})
.catch(function(error) {
    console.error("Error writing document: ", error);
});
*/

chrome.runtime.onMessage.addListener((msg, sender, resp) => {

  if(msg.command == "post"){
    db.collection("cities").doc("test-doc").set({
        data: msg.data
    })
    .then(function() {
        console.log("Document successfully written!");
    })
    .catch(function(error) {
        console.error("Error writing document: ", error);
    });
  }
  if(msg.command == "fetch"){
    var docRef = db.collection("cities").doc("LA");
    docRef.get().then(function(doc) {
        if (doc.exists) {
          //doc.data()
          resp({type: "result", status: "success", data: doc.data(), request: msg});
        } else {
            //No such document!
            resp({type: "result", status: "error", data: 'No such document!', request: msg});
        }
    }).catch(function(error) {
      //Error getting document:",error
      resp({type: "result", status: "error", data: error, request: msg});
    });
  }

  //submit  data..
  if(msg.command == "post"){
   //...
  }

  return true;


})
