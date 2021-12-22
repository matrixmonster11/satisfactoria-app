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
    let pageSize = +request.query.size;
    let currentPage = +request.query.page;
    let sort = request.query.sort || "name";
    let order = request.query.order || "asc";
    let search = request.query.search;

    partnerQuery = Partner.find(
      search != ""
        ? { name: { $regex: search ? search : "", $options: "i" } }
        : {}
    ).lean();

    console.log("query :", request.query);
    if (sort == "name") {
      partnerQuery.sort({ name: order });
    }

    partnerQuery.skip(pageSize * currentPage).limit(pageSize);

    // return is optional, as this is the latest statement so it will returned automatically
    partnerQuery
      .then((documents) => {
        reply.status(200).json({
          message: "Partners fetched succesfully!",
          partners: documents,
          maxPartners: documents.length,
          pagination: {
            page: currentPage,
            size: pageSize,
            length: documents.length,
          },
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
      _id: request.body.id,
      name: request.body.name,
      cities: request.body.cities,
      serviceIds: request.body.services,
      tags: request.body.tags,
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
    Partner.findById(request.params.id)
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
