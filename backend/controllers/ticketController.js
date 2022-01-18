const Ticket = require("../models/Ticket"),
  { nanoid } = require("nanoid");

module.exports = {
  addTicket: (request, reply) => {
    console.log("request.body :", request.body);
    const ticket = new Ticket({
      _id: nanoid(10),
      name: request.body.name,
      childId: request.body.childId,
      image: request.body.image,
      voice: request.body.voice,
    });
    console.log("Added ticket ", ticket);
    ticket
      .save()
      .then((createdTicket) => {
        console.log(createdTicket);
        reply.status(201).json(createdTicket);
      })
      .catch((error) => {
        console.log("Add ticket error: ", error);
        reply.status(500).json({ message: "Creating a ticket failed!" });
      });
  },

  getTickets: (request, reply) => {
    console.log("GET TICKETS!");
    Ticket.find()
      .lean()
      .then((documents) => {
        reply.status(200).json(documents);
      })
      .catch((error) => {
        reply.status(500).json({ message: "Fetching tickets failed!" });
      });
  },
  deleteTicket: (request, reply) => {
    console.log("DELETE Ticket: ", request.params.id);
    Ticket.deleteOne({ _id: request.params.id })
      .then((result) => {
        if (result.n > 0) {
          console.log("DELETED TICKET");
          reply.status(200).json(true);
        } else {
          console.log("NOT DELETED TICKET");
          reply.status(401).json(false);
        }
      })
      .catch((error) => {
        console.log("ERROR DELETING :", error);
        reply.status(500).json({ message: "Deleting ticket failed!" });
      });
  },

  updateTicket: (request, reply) => {
    const ticket = new Ticket({
      name: request.body.name,
      childId: request.body.childId,
      image: request.body.image,
      voice: request.body.voice,
    });
    console.log("UPDATE TICKET !!!!!!!!");
    Ticket.updateOne({ _id: request.params.id }, ticket)
      .then((result) => {
        if (result.n > 0) {
          reply.status(200).json({ message: "Update successfull!" });
        } else {
          reply.status(401).json({ message: "Not Successfull!" });
        }
      })
      .catch((error) => {
        console.log("Ticket Update error: ", error);
        reply.status(500).json({ message: "Couldn't update ticket!" });
      });
  },
  getTicket: (request, reply) => {
    Ticket.findOne({ _id: request.params.id })
      .then((ticket) => {
        if (ticket) {
          console.log("get ticket :", ticket);
          reply.status(200).json(ticket);
        } else {
          reply.status(404).json({ message: "Ticket not found!" });
        }
      })
      .catch((error) => {
        reply.status(500).json({ message: "Fetching ticket failed!" });
      });
  },
};
