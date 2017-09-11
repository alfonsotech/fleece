var express = require("express");
var bodyParser = require("body-parser");
var logger = require("morgan");
var mongoose = require("mongoose");
var Post = require("./models/Post.js");
var request = require("request");
var cheerio = require("cheerio");

mongoose.Promise = Promise;

var app = express();

app.use(logger("dev"));
app.use(bodyParser.urlencoded({
  extended: false
}));

app.use(express.static("public"));

mongoose.connect("mongodb://localhost/fleece-scrapper");
var db = mongoose.connection;

db.on("error", function(error) {
  console.log("Mongoose Error: ", error);
});

db.once("open", function() {
  console.log("Mongoose connection successful.");
});


// Routes
app.get('/', function(req, res) {
    res.render('index.html');
});

app.get("/scrape", function(req, res) {
  request("http://www.philosophymatters.org/", function(error, response, html) {
    var $ = cheerio.load(html);
    $(".post").each(function(i, element) {
      var result = {};
      result.title = $(this).children(".entry-title").text();
      result.body = $(this).children(".entry-summary").text().trim();
      result.link = $(this).children(".entry-title").children("a").attr("href");
      console.log('result: ', result);

      var entry = new Post(result);
      entry.save(function(err, doc) {
        if (err) {
          console.log(err);
        }
        else {
          console.log(doc);
        }
      });
    });
  });
  res.send("Scrape Complete");
});

app.get("/posts", function(req, res) {
  Post.find({}, function(error, doc) {
    if (error) {
      console.log(error);
    }
    else {
      res.json(doc);
    }
  });
});

app.get("/posts/:id", function(req, res) {
  Post.findOne({ "_id": req.params.id })
  .populate("note")
  .exec(function(error, doc) {
    if (error) {
      console.log(error);
    }
    else {
      res.json(doc);
    }
  });
});

app.post("/posts/:id", function(req, res) {
  var newNote = new Note(req.body);
  newNote.save(function(error, doc) {
    if (error) {
      console.log(error);
    }
    else {
      Post.findOneAndUpdate({ "_id": req.params.id }, { "note": doc._id })
      .exec(function(err, doc) {
        if (err) {
          console.log(err);
        }
        else {
          res.send(doc);
        }
      });
    }
  });
});

//Twitter Bot
var Twitter = require("twitter");
var config = require('./config.js');
// console.log('config: ', config);
var client = new Twitter(config);

var params = {screen_name: 'tPhilosophia'};

client.get('statuses/user_timeline', params, function(error, tweets, response) {
  if (error) {
    console.log('error:', error);
  } else {
    console.log(tweets);
  }
});
client.get('favorites/list', function(error, tweets, response) {
  if (error) {
    console.log('error:', error);
  } else {
    console.log(tweets);
  }
});

app.listen(3000, function() {
  console.log("App running on port 3000!");
});