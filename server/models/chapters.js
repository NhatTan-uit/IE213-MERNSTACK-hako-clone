const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const chapterSchema = new Schema({
    chaptername: { type: String },
    chaptercontent: { type: String }
})

const Chapters = mongoose.model("Chapters", chapterSchema);

module.exports = Chapters;