    
var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var ArticleSchema = new Schema({
  title: {
    type: String,
    unique: true
  },
  link: String,
  summary: String,
  comment: [{
    type: Schema.Types.ObjectId,
    ref: "Comment"
  }],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

var Article = mongoose.model("Article", ArticleSchema);

module.exports = Article;