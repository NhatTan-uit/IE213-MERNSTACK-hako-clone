const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const cartSchema = new Schema({
    usercart: [],
    totalcartprice: { type: Number }
})

const Carts = mongoose.model("Carts", cartSchema);

module.exports = Carts;