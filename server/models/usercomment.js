const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const commentShema = new Schema({
    userid: { type: String, required: true },
    usercomment: { type: String, required: true }
})

const Comments = mongoose.model("Comments", commentShema);

module.exports = Comments;