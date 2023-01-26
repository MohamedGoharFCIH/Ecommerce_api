const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");
const Schema = mongoose.Schema;

const productSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String },
  price: { type: Number, required: true },
  quantity: { type: Number },
  litrs: { type: Number, required: true },
  image: { type: String },
  currency: { type: String, default:"AED" },
  addedBy: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  discount:{ type: Number, default:0 }
},  { timestamps: true });

productSchema.plugin(uniqueValidator);

module.exports = mongoose.model("Product", userSchema);
