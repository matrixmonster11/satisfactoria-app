const mongoose = require("mongoose"),
  caseSchema = mongoose.Schema({
    _id: String,
    id: String,
    name: { type: String },
    gender: { type: String },
    age: { type: Number },
    address: { type: String },
    city: { type: String },
    country: { type: String },
    status: { type: String },
    updated: { type: String },
  });

module.exports = mongoose.model("Case", caseSchema);
