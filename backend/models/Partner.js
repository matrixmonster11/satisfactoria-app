const mongoose = require("mongoose"),
  partnerSchema = mongoose.Schema({
    _id: String,
    nom: { type: String },
    address: { type: String },
    phone: { type: String },
  });

module.exports = mongoose.model("Partner", partnerSchema);
