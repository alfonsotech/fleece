var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var PostSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  link: {
    type: String,
    required: true
  }
});

var Post = mongoose.model("Post", PostSchema);

module.exports = Post;
