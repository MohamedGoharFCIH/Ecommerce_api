const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const Schema = mongoose.Schema;

const residentailAddressSchema = new Schema({
  street: { type: String, required: true },
  name: { type: String, required: true },
  number: { type: Number, required: true },
  landMark: { type: String, required: true },
  groupType: { type: String, required: true },
  contactPerson: { type: String, required: true },
  personsNumber: { type: Number, required: true },
  
}, { timestamps: true });


residentailAddressSchema.plugin(uniqueValidator);

module.exports = mongoose.model("ResidentailAddress", residentailAddressSchema);
