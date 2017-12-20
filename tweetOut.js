var request = require("request");
var cheerio = require("cheerio");
var mongoose = require("mongoose");
var Post = require("./models/Post.js");
var postTweet = require('./tweet.js');

//MongoDB/Mongoose Connection
mongoose.Promise = Promise;
mongoose.connect("mongodb://localhost/fleece-scrapper");
var db = mongoose.connection;
db.on("error", function(error) {
  console.log("Mongoose Error: ", error);
});
db.once("open", function() {
  console.log("Mongoose connection successful.");
});

var tweetOut =
    function() {
      Post.find({}, function(error, data) {
        if (error) {
          console.log(error);
        }
        else {
          var indexNum = Math.floor(Math.random() * data.length);
          postTweet(data[indexNum].title + ' ' + data[indexNum].link);

        }
      });
    };


module.exports = tweetOut;
