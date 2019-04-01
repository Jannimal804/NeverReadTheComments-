var mongoose = require("mongoose");


var Schema = mongoose.Schema;


var CommentSchema = new Schema({
  nickname: {
      type: String,
      default: "???"
    },
  body: String,
  timestamp: {
      type: Date,
      default: Date.now
  }
});

var Comment = mongoose.model("Comment", CommentSchema);

module.exports = Comment;