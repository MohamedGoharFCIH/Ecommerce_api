const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");


const Schema = mongoose.Schema;

const userSchema = new Schema({
  fullName: { type: String, required: true },
  emiratesID: { type: String, required: true,  unique: true },
  nationality: { type: String, required: true },
  callNumber: { type: String, required: true, unique: true },
  whatsappNumber: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  birthdate: { type: String },
  emiratesCity: { type: String, required: true },
  area: { type: String, required: true },
  residentailAddress: {
    type: Schema.Types.ObjectId,
    ref: "ResidentailAddress",
  },
  workAddress: { type: Schema.Types.ObjectId, ref: "WorkAddress" },
  isAdmin: { type: Boolean, default: false },
},  { timestamps: true });

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model("User", userSchema);
