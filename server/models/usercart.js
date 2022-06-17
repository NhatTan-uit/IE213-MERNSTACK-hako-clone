const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const cartSchema = new Schema({
    usercart: [],
    totalcartprice: { type: Number },
    cartstatus: { type: Boolean }
})

const Carts = mongoose.model("Carts", cartSchema);

module.exports = Carts;