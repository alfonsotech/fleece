var express = require("express");
var bodyParser = require("body-parser");
var logger = require("morgan");
var app = express();
var router = require('./routes/router.js')

app.use(logger("dev"));
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(express.static("public"));
app.use('/', router)

app.listen(3000, function() {
  console.log("App running on port 3000!");
});
