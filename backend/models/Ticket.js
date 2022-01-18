const mongoose = require("mongoose"),
  ticketSchema = mongoose.Schema({
    _id: String,
    name: { type: String },
    childId: { type: String },
    image: { type: String },
    voice: { type: String },
  });

module.exports = mongoose.model("Ticket", ticketSchema);
