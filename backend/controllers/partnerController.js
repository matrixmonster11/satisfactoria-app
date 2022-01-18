const Partner = require("../models/Partner"),
  { nanoid } = require("nanoid");

module.exports = {
  addPartner: (request, reply) => {
    console.log("request.body :", request.body);
    const partner = new Partner({
      id: nanoid(10),
      _id: nanoid(10),
      name: request.body.name,
      address: request.body.address,
      phone: request.body.phone,
      city: request.body.city,
      userRoutes: request.body.userRoutes,
    });
    console.log("Added partner ", partner);
    partner
      .save()
      .then((createdPartner) => {
        console.log(createdPartner);
        reply.status(201).json({
          message: "Partner added succesfully",
          partner: createdPartner,
        });
      })
      .catch((error) => {
        reply.status(500).json({ message: "Creating a partner failed!" });
      });
  },

  getPartners: (request, reply) => {
    let partnerQuery;
    partnerQuery
      .then((documents) => {
        reply.status(200).json({
          message: "Partners fetched succesfully!",
          partners: documents,
          maxPartners: documents.length,
        });
      })
      .catch((error) => {
        reply.status(500).json({ message: "Fetching partners failed!" });
      });
  },
  deletePartner: (request, reply) => {
    Partner.deleteOne({ _id: request.params.id })
      .then((result) => {
        if (result.n > 0) {
          reply.status(200).json({ message: "Deletion successfull!" });
        } else {
          reply.status(401).json({ message: "Not deleted successfully!" });
        }
      })
      .catch((error) => {
        reply.status(500).json({ message: "Deleting partner failed!" });
      });
  },

  updatePartner: (request, reply) => {
    const partner = new Partner({
      name: request.body.name,
      address: request.body.address,
      phone: request.body.phone,
      city: request.body.city,
      userRoutes: request.body.userRoutes,
    });
    console.log("UPDATE PARTNER !!!!!!!!");
    Partner.updateOne({ _id: request.params.id }, partner)
      .then((result) => {
        if (result.n > 0) {
          reply.status(200).json({ message: "Update successfull!" });
        } else {
          reply.status(401).json({ message: "Not Successfull!" });
        }
      })
      .catch((error) => {
        console.log("Partner Update error: ", error);
        reply.status(500).json({ message: "Couldn't update partner!" });
      });
  },
  getPartner: (request, reply) => {
    Partner.findOne({ _id: request.params.id })
      .then((partner) => {
        if (partner) {
          console.log("get partner :", partner);
          reply.status(200).json(partner);
        } else {
          reply.status(404).json({ message: "Partner not found!" });
        }
      })
      .catch((error) => {
        reply.status(500).json({ message: "Fetching partner failed!" });
      });
  },
};
