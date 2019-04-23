var mongoose = require("mongoose");


var Schema = mongoose.Schema;


var NoteSchema = new Schema({
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

var Note = mongoose.model("Note", NoteSchema);

module.exports = Note;