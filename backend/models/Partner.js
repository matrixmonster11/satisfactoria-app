const mongoose = require("mongoose"),
  uniqueValidator = require("mongoose-unique-validator"),
  userSchema = mongoose.Schema({
    _id: String,
    nom: { type: String },
    address: { type: String },
    phone: { type: String },
  });

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model("User", userSchema);
