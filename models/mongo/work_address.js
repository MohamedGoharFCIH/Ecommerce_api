const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const Schema = mongoose.Schema;

const workAddressSchema = new Schema({
  workPlaceName: { type: String, required: true },
  workPlaceNameNumber: { type: Number, required: true },
  contactPerson: { type: String, required: true },
  staffNumbers: { type: Number, required: true },
}, { timestamps: true });

workAddressSchema.plugin(uniqueValidator);

module.exports = mongoose.model("WorkAddress", workAddressSchema);
