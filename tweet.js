//Twitter Bot
var Twitter = require("twitter");
var config = require('./config.js');
// console.log('config: ', config);
var client = new Twitter(config);

var params = {screen_name: 'tPhilosophia', trim_user: true, exclude_replies: true, include_rts: false, count: 200};

client.get('statuses/user_timeline', params, function(error, tweets, response) {
  if (error) {
    console.log('error:', error);
  } else {
    console.log('tweets from user timeline posted to db: nice!');

  }
});
client.get('favorites/list', function(error, tweets, response) {
  if (error) {
    console.log('error:', error);
  } else {
    console.log('+++++++++favorite tweets added');
  }
});

var postTweet = function (title, link) {
  client.post('statuses/update', {status: title, link},  function(error, tweet, response) {
  if(error) {
    console.log('error:', error);
  };
  console.log('tweet posted to Twitter');
});
}
module.exports = postTweet
