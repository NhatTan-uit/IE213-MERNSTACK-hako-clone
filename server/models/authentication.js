const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: { type: String, required: true },
    username: { type: String, required: true },
    password: { type: String, required: true },
    usertype: { type: String },
    userImage: { type: String },
    aboutme: { type: String },
    cart: []
})

const Users = mongoose.model("Users", userSchema);

module.exports = Users;