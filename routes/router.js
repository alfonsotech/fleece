var express = require('express')
var router = express.Router()
var request = require("request");
var cheerio = require("cheerio");
var mongoose = require("mongoose");
var Post = require("../models/Post.js");
var postTweet = require('../tweet.js');
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
    res.render('index.html');
});

//API Routes
router.get("/scrape", function(req, res) {
  request("http://www.philosophymatters.org/", function(error, response, html) {
    var $ = cheerio.load(html);
    $(".post").each(function(i, element) {
      var result = {};
      result.title = $(this).children(".entry-title").text();
      result.body = $(this).children(".entry-summary").text().trim();
      result.link = $(this).children(".entry-title").children("a").attr("href");

      var entry = new Post(result);
      entry.save(function(err, data) {
        if (err) {
          console.log(err);
        }
        else {
          console.log('Saved To Database: ' + data);
        }
      });
    });
  });
  res.send("Scrape Complete");
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
  Post.findOne({}, function(error, data) {
    if (error) {
      console.log(error);
    }
    else {
      postTweet(data.title + ' ' + data.link);
      console.log('Tweeted out: '+ data.title + ' ' + data.link);
      res.redirect('/')
    }
  });
});

router.post('/search', searchController.handleSearch)


// app.get("/posts/:id", function(req, res) {
//   Post.findOne({ "_id": req.params.id })
//   .populate("note")
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
//   var newNote = new Note(req.body);
//   newNote.save(function(error, data) {
//     if (error) {
//       console.log(error);
//     }
//     else {
//       Post.findOneAndUpdate({ "_id": req.params.id }, { "note": data._id })
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
