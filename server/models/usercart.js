const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const cartSchema = new Schema({
    noveltitle: { type: String },
    authorname: { type: String },
    quantity: { type: Number },
    totalprice: { type: Number }
})

const Carts = mongoose.model("Carts", cartSchema);

module.exports = Carts;