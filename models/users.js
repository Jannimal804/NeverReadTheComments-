const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// super simple user schema- users have names, and can comment
const UserSchema = new Schema({
    name:{
        type: String,
        required: true,
        unique: true
    }
    // should this be associated with an array of comments?
});

const User = mongoose.model("User", UserSchema);
module.exports = User;