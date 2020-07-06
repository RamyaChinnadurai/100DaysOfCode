const Twitter = require("twitter-lite");

const client = new Twitter({
  subdomain: "api", // "api" is the default (change for other subdomains)
  version: "1.1", // version "1.1" is the default (change for other subdomains)
  consumer_key: process.env.twitter_consumer_key, // from Twitter.
  consumer_secret: process.env.twitter_consumer_secret, // from Twitter.
  access_token_key: process.env.twitter_access_token_key, // from your User (oauth_token)
  access_token_secret: process.env.twitter_access_token_secret, // from your User (oauth_token_secret)
});
const name = "Rams"; // Change to your name;
const emoji = "👩‍💻"; // Change as per your wish

const numberMatch = ['0️⃣', '1️⃣', '2️⃣', '3️⃣', '4️⃣', '5️⃣', '6️⃣', '7️⃣', '8️⃣', '9️⃣'];
const countToEmojis = count => {
  const countAsStringArray = count.toString().split('');

  return countAsStringArray
    .map(number => numberMatch[+number])
    .join('');
};

exports.handler = () => {
  client
    .get("account/verify_credentials")
    .then((results) => {
      const followers = countToEmojis(results.followers_count);
      const user_name = `${name} | ${emoji} |" + ${followers}`;
      console.log("user_name: ", user_name);
      const response = client.post("account/update_profile", {
        name: user_name,
      });
    })
    .catch(console.error);
};
