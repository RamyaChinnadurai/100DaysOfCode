const Twitter = require("twitter-lite");

const client = new Twitter({
  subdomain: "api", // "api" is the default (change for other subdomains)
  version: "1.1", // version "1.1" is the default (change for other subdomains)
  consumer_key: process.env.twitter_consumer_key, // from Twitter.
  consumer_secret: process.env.twitter_consumer_secret, // from Twitter.
  access_token_key: process.env.twitter_access_token_key, // from your User (oauth_token)
  access_token_secret: process.env.twitter_access_token_secret, // from your User (oauth_token_secret)
});

exports.handler = ()=>{

  client
  .get("account/verify_credentials")
  .then((results) => {
    const followerCount = results.followers_count;
    const string      = followerCount.toString();
    const stringSplit = string.split("");
    const followers = stringSplit.reduce((acc, val)=>{ return acc + numberMatch[val]},'')
    const user_name = "Rams | 👩‍💻 |" + followers;
    console.log('user_name: ', user_name);
    
    const response =  client.post("account/update_profile", {
    name: user_name
    });
   
  })
  .catch(console.error);

}


const numberMatch = {
  "0": "0️⃣",
  "1": "1️⃣",
  "2": "2️⃣",
  "3": "3️⃣",
  "4": "4️⃣",
  "5": "5️⃣",
  "6": "6️⃣",
  "7": "7️⃣",
  "8": "8️⃣",
  "9": "9️⃣",
};
