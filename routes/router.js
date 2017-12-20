var express = require('express');
var router = express.Router()
var request = require("request");
var cheerio = require("cheerio");
var mongoose = require("mongoose");
var Post = require("../models/Post.js");
// var postTweet = require('../tweet.js');
var scrape = require('../scrape.js');
var tweetOut = require('../tweetOut.js');
// var nightmare = require('../nightmare.js');
var searchController = require('../controllers/searchController');

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


//HTML Routes
router.get('/', function(req, res) {
    //Scrape JSFeeds and MediumFCC every 24 hours
    setInterval(scrape.scrapeJSFeeds, 86400000);
    setInterval(scrape.scrapeMediumFCC, 86400000);
});

//API Routes
router.get("/scrape", function(req, res) {
  //Scrape JSFeeds and MediumFCC every 24 hours
  setInterval(scrape.scrapeJSFeeds, 86400000);
  setInterval(scrape.scrapeMediumFCC, 86400000);
});

router.get("/posts", function(req, res) {
  Post.find({}, function(error, data) {
    if (error) {
      console.log(error);
    }
    else {
      res.json(data);
    }
  });
});


router.get("/tweetout", function(req, res) {
  setInterval(tweetOut, 300000)
});


//TODO: CURRENTLY UNUSED ROUTES
// router.post('/search', searchController.handleSearch)


// app.get("/posts/:id", function(req, res) {
//   Post.findOne({ "_id": req.params.id })
//   .populate("post")
//   .exec(function(error, data) {
//     if (error) {
//       console.log(error);
//     }
//     else {
//       res.json(data);
//     }
//   });
// });

// app.post("/posts/:id", function(req, res) {
//   var newPost = new Post(req.body);
//   newPost.save(function(error, data) {
//     if (error) {
//       console.log(error);
//     }
//     else {
//       Post.findOneAndUpdate({ "_id": req.params.id }, { "post": data._id })
//       .exec(function(err, data) {
//         if (err) {
//           console.log(err);
//         }
//         else {
//           res.send(data);
//         }
//       });
//     }
//   });
// });

module.exports = router
