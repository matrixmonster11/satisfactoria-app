const mongoose = require("mongoose");

const navigationItem = mongoose.Schema({
  id: { type: String },
  title: { type: String },
  icon: { type: String },
  link: { type: String },
  children: [
    {
      id: { type: String },
      title: { type: String },
      icon: { type: String },
      link: { type: String },
    },
  ],
});

const navigationSchema = mongoose.Schema({
  userType: String,
  navigation: [navigationItem],
});

module.exports = mongoose.model("Navigation", navigationSchema);
