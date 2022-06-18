const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const commentShema = new Schema({
    userid: { type: String, required: true },
    crrusername: { type: String, required: true },
    crruserImg: { type: String },
    usercomment: { type: String, required: true },
    userreplies: []
})

const Comments = mongoose.model("Comments", commentShema);

module.exports = Comments;