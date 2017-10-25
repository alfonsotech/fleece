var express = require('express');
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
    // res.render('index.html');
});

//API Routes
router.get("/scrape", function(req, res) {
  request("http://jsfeeds.com/", function(error, response, html) {
    var $ = cheerio.load(html);
    $(".article").each(function(i, element) {
      var $this = $(this);
      var result = {};

      var title = $(this).children("div").children(".article_body").children("div.container-fluid").children("div.row").children("div.col-md-18").children("h3").children("a").text();
      splitTitle = title.split('');
      var shortTitle = []
      for(var i = 0; i<120; i++) {
        shortTitle.push(splitTitle[i]);
      }
      shortTitle = shortTitle.join('')

      result.title = shortTitle + '...';
      var link = $(this).children("div").children(".article_body").children("div.container-fluid").children("div.row").children("div.col-md-18").children("h3").children("a").attr("href");
      result.link = 'http://jsfeeds.com' + link;
      console.log(result);

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
  res.redirect("/scrapemediumfcc");
});

router.get("/scrapemediumfcc", function(req, res) {
  request("https://medium.freecodecamp.org/", function(error, response, html) {
    var $ = cheerio.load(html);
    $(".postArticle").each(function(i, element) {
      var $this = $(this);
      var result = {};

      var title = $(this).children(".js-trackedPost").children('a').children('.postArticle-content').children('.section').children('.section-content').children('.section-inner').children("h3").text();
      splitTitle = title.split('');
      var shortTitle = []
      for(var i = 0; i<120; i++) {
        shortTitle.push(splitTitle[i]);
      }
      shortTitle = shortTitle.join('')

      result.title = shortTitle + '...';
      var link = $(this).children(".js-trackedPost").children('a').attr("href");
      result.link = link;
      console.log(result);

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
    res.redirect("/tweetout");
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
  Post.find({}, function(error, data) {
    if (error) {
      console.log(error);
    }
    else {
      console.log('data', data);
      var indexNum = Math.floor(Math.random() * data.length);
      console.log('indexNum', indexNum);
      postTweet(data[indexNum].title + ' ' + data[indexNum].link);
      console.log('Tweeted out: '+ data.title + ' ' + data.link);
      res.redirect('/posts');
    }
  });

});

// router.post('/search', searchController.handleSearch)


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
//   var newNote = new Post(req.body);
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
