var request = require("request");
var cheerio = require("cheerio");
var mongoose = require("mongoose");
var Post = require("./models/Post.js");

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

var scrape = {
  scrapeJSFeeds: function() {
    console.log('inside scrapeJSFeeds');
      request("http://jsfeeds.com/", function(error, response, html) {
        var $ = cheerio.load(html);
        $(".article").each(function(i, element) {
          var $this = $(this);
          var result = {};
          var title = $(this).children("div").children(".article_body").children("div.container-fluid").children("div.row").children("div.col-md-18").children("h3").children("a").text();
          splitTitle = title.split('');
          var shortTitle = []
          for(var i = 0; i<300; i++) {
            shortTitle.push(splitTitle[i]);
          }
          shortTitle = shortTitle.join('')
          result.title = shortTitle + '...';
          var link = $(this).children("div").children(".article_body").children("div.container-fluid").children("div.row").children("div.col-md-18").children("h3").children("a").attr("href");
          result.link = 'http://jsfeeds.com' + link;
          console.log('result: >>>>>>>>>>>>>>', result.title);

          //Save to database
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
    },
    scrapeMediumFCC: function() {
      console.log('inside scrapeMediumFCC');
        request("https://medium.freecodecamp.org/", function(error, response, html) {
          var $ = cheerio.load(html);
          $(".postArticle").each(function(i, element) {
            var $this = $(this);
            var result = {};

            var title = $(this).children(".js-trackedPost").children('a').children('.postArticle-content').children('.section').children('.section-content').children('.section-inner').children("h3").text();
            splitTitle = title.split('');
            var shortTitle = []
            for(var i = 0; i<300; i++) {
              shortTitle.push(splitTitle[i]);
            }
            shortTitle = shortTitle.join('')

            result.title = shortTitle + '...';
            var link = $(this).children(".js-trackedPost").children('a').attr("href");
            result.link = link;
            console.log('result: >>>>>>>>>>>>>>', result.title);

            var entry = new Post(result);
            entry.save(function(err, data) {
              console.log('<<<<<after save');
                if (err) {
                  console.log(err);
                }
                else {
                  console.log('Saved To Database: ' + data);
                }
              });
            });
          });
        }
}

module.exports = scrape;
