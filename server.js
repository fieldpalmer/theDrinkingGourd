// Dependencies
var express = require("express");
// var logger = require("morgan");
var mongojs = require("mongojs");

// Initialize Express
var app = express();

// Parse request body as JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Make public a static folder
app.use(express.static("public"));

// Mongojs configuration
var databaseUrl = "warmup";
var collections = ["books"];

// Hook our mongojs config to the db var
var db = mongojs(databaseUrl, collections);
db.on("error", function(error) {
  console.log("Database Error:", error);
});

//Callback functions
var error = function (err, response, body) {
  console.log('ERROR [%s]', err);
};

// var success = function (data) {
//   console.log('Success! Data: ' + data);
// };

var Twitter = require('twitter-node-client').Twitter;

//connecting to the app to the Twitter API
var config = {
  "consumerKey": "n1k9CplNcHeL0Z3oCdj582cE9",
  "consumerSecret": "i435CHIFPfh1JLg7xu2v1NBbh1Gn9lv7q511CXERrKyKss0ssz",
  "accessToken": "1078007783751065601-sYDQNmZxCIdDrsixDzMiIO8tH41p1l",
  "accessTokenSecret": "39g5Ay4wVXoRuMq3n9HYNbBRS3hGq4qaYv5Yai24lwvbq",
  "callBackUrl": "https://fieldpalmer.github.io/theDrinkingGourd/"
};

var twitter = new Twitter(config);

//api calls

twitter.getCustomApiCall(
  '/friends/list.json', 
  {screen_name: 'feldspar910'}, 
  error,
  function (data) {
    let res = JSON.parse(data);
    // let friends = res.users;

  // console.log(res);
  console.log("*********************************************")
  console.log("*********************************************")

    for (var i = 0; i < res.users.length ; i++) {

      let screenName = res.users[i].screen_name;
      let profPic = res.users[i].profile_image_url;
      let name = res.users[i].name;
      let userWeb = res.users[i].url;
      console.log(screenName);
      console.log(name);
      console.log(userWeb);
      console.log(profPic);
      console.log("*********************************************")
      
      // if (res.next_cursor != 0){
      //   twitter.getCustomApiCall(
      //     'friends/list.json',
      //     {screen_name: 'feldspar910'}, 
      //     {cursor: res.next_cursor},
      //     error,
      //     function(data){
      //       let res = JSON.parse(data);
      //       console.log(res.users[i].screen_name);
      //     }
      //   )
      // }
    }
    console.log("*********************************************")
    console.log("next cursor: " + res.next_cursor_str);
  
  }
);
