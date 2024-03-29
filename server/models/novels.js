const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const novelsSchema = new Schema({
    noveltitle: { type: String, required: true },
    novelcontent: { type: String, required: true },
    authorname: { type: String, required: true },
    novelImage: { type: String, required: true },
    novelprice: { type: Number, required: true },
    chapter: [],
    comments: []
});

const Novels = mongoose.model("Novels", novelsSchema);

module.exports = Novels;


