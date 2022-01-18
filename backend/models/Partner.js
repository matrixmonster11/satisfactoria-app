const mongoose = require("mongoose"),
  partnerSchema = mongoose.Schema({
    _id: String,
    nom: { type: String },
    address: { type: String },
    phone: { type: String },
    city: { type: String },
    userRoutes: [{ userType: String, routes: [String] }],
  });

module.exports = mongoose.model("Partner", partnerSchema);
