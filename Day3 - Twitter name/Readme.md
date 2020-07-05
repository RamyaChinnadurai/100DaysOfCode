# Twitter Dynamic Name Generator 

![Alt Text](https://dev-to-uploads.s3.amazonaws.com/i/1j189nwdo2g4lzp7tez2.png)

Twitter dynamic name generator is a pet project in which my twitter profile name updates for every minute by appending the name with the followers count. I just written this readme as a journel note, how I did this.

It was did as a challenge for #100DaysOfCode.  Thanks for to [Suren](https://twitter.com/radnerus93) and [Vadim Bauer](https://twitter.com/BauerVadim) for their idea inspiration. Special thanks to [Karthikeyan](https://twitter.com/_karthikyn) for his guidance.

##### Tech Stack Includes, 
  * [Twitter lite](https://www.npmjs.com/package/twitter-lite) - to communicate with twitter API
  * [node.js](https://nodejs.org/) - script to update the twitter profile name
  * [AWS Lambda with serverless](https://aws.amazon.com/lambda/) - to run cron part

# How I did this? What all the steps? 
Initially started with the guidance of [this aritcle](https://dev.to/radnerus/twitter-api-is-followers-count-mda) written by [Suren](https://twitter.com/radnerus93). I majorly break down this task into 3 parts.

1. Getting  Twitter API key from Twitter Dev account.
2. Node js script to update the profile name.
3. Cron part to update the profile name for every 1 minute.

## Step 1 - Getting twitter API keys

1. Go to [twitter developers page](https://developer.twitter.com/) and sign in. 
2. Verify your developers account by providing the required informatios.
3. After verifying with the email, you developers account will be created.
4. Once completed, in to the [Get Started](https://developer.twitter.com/en/account/get-started) page, Click [Create an app](https://developer.twitter.com/en/apps/create).
5. There enter the required details like, app name, app description, website url, and so on.
6. You have to clearly explain the reason of how your are going to use the app. 
7. After reviewing the terms, your app will be created. 
8. Now you can get the key and tokens in the second tab. Note down the Consumer API key and Consumer API Secret key.
9. Click the Generate button near the Access token & access token secret to get the Access token and Access token secret. Note it down too!
10. At the end of this step you will get the **Consumer API key**, **Consumer API Secret key**, **Access token**, **Access secret key**.

Now you are ready to dive into the coding part!

## Step 2 - Script to update the profile name. 

Okay, now it coding time. Fire mode on🔥
So I choosed [node.js](https://nodejs.org/) as I'am familiar with that. From the [Suren article](https://twitter.com/radnerus93) I came to know about the [twitter-lite](https://www.npmjs.com/package/twitter-lite). 

Started with the simple, 
```
$ npm init
$ npm install twitter-lite
```
In the index.js file, imported the twitter-lite and update the required keys as we got from the previous step, 
```
const Twitter = require("twitter-lite");
const client = new Twitter({
  subdomain: "api", // api is the default
  version: "1.1", // version 1.1 is the default
  consumer_key: process.env.twitter_consumer_key,
  consumer_secret: process.env.twitter_consumer_secret,
  access_token_key: process.env.twitter_access_token_key, 
  access_token_secret: process.env.twitter_access_token_secret, 
});
```
Now comes the actually coding part.
So what is the logic to do this? 
1. We need to get the followers count using twitter api. 
2. We need to append the followers count with the name, but with emoji🤔 (Hmm)
3. We need to update the new name to profile name using twitter api. 

Cool, lets do it! 
To get the followers count, used the twitter lite api. 
```
client
    .get("account/verify_credentials")
    .then((results) => {
      const followerCount = results.followers_count;
    });
    .catch(console.error);
};
```
Now, some little tricks! I got all the logic but struck with how to update the emoji dynamically. So asked [Suren](https://twitter.com/code_rams/status/1278585965963956225?s=20) in the twitter. He just replied with, Have JSON with matching emoji. Gotcha, now continue with the journey! 
Next simple logics like, get the followers count, convert to string, change to string array, then finally reduce the followers count with mapped emoji. 

```
exports.handler = () => {
  client
    .get("account/verify_credentials")
    .then((results) => {
      const followerCount = results.followers_count;
      const string = followerCount.toString();
      const stringSplit = string.split("");
      const followers = stringSplit.reduce((acc, val) => {
        return acc + numberMatch[val];
      }, "");
      const user_name = `${name} | ${emoji} |" + ${followers}`;
      console.log("user_name: ", user_name);
    })
    .catch(console.error);
};

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
```
Checked with by running, 
```
node index.js
```
Coool!, now got the console with the new name, appended with the emoji. Now next is, need to update the profile name. Used the same twitter-lite api, to update the profile. 
```
  const response = client.post("account/update_profile", {
        name: user_name,
      });
```
Ran again to check whether the name gets updated. ( Tik tik tik moments) Hurray 🎉  
It works! Now comes the finaly part!

### Step 3 - Cron to update the profile name for every 1 minute. 

Okay! Now all works fine, but how to make this to run for every minute? Here comes my technical guru [Karthikeyan](https://twitter.com/_karthikyn) into the play. Since he is an serverless expert, he suggested me to run the cron in AWS Lambda function since I'm already familiar with lambda. Okay! Cool let's do it. I'm skipping the AWS setup, since it takes too long, and diving direcly into the cron part. 

```
service: twitter-scheduler

custom:
    twitter_consumer_key: ${ssm:/twitter_consumer_key~true}
    twitter_consumer_secret: ${ssm:/twitter_consumer_secret~true}
    twitter_access_token_key: ${ssm:/twitter_access_token_key~true}
    twitter_access_token_secret: ${ssm:/twitter_access_token_secret~true}

provider:
  name: aws
  runtime: nodejs12.x
  stage: prod
  region: ap-south-1
  environment:
      STAGE: prod
  
functions:
  subscription:
    handler: index.handler
    environment: 
      twitter_consumer_key: ${self:custom.twitter_consumer_key}
      twitter_consumer_secret: ${self:custom.twitter_consumer_secret}
      twitter_access_token_key: ${self:custom.twitter_access_token_key}
      twitter_access_token_secret: ${self:custom.twitter_access_token_secret}
    events:
      - schedule: rate(1 minute)
```

This cron runs for every 1 minute, and the new profile name is updated dynamically. New profile name is consoled in cloud watch. 

I have used another service [AWS System Manager(SSM)](https://www.amazonaws.cn/en/systems-manager/). In order to avoid the exposure of explicit keys. 

Finally, my work is done. Link to the [source code](https://github.com/RamyaChinnadurai/100DaysOfCode/tree/master/Day3%20-%20Twitter%20name).

For any doubts, suggestions and feedback contact me in my twitter profile [@code_rams](https://twitter.com/code_rams). Hope you enjoyed and find this useful. Thanks for reading.

