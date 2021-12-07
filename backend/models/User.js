const mongoose = require("mongoose"),
  uniqueValidator = require("mongoose-unique-validator"),
  userSchema = mongoose.Schema({
    _id: String,
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: { type: String, required: true },
    resetLink: { type: String },
    name: { type: String },
    fname: { type: String },
    phone: { type: String },
    userType: { type: String },
    partnerId: { type: String },
    children: { type: [String] },
  });

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model("User", userSchema);
