const Case = require("../models/Case"),
  { nanoid } = require("nanoid");

module.exports = {
  addCase: (request, reply) => {
    console.log("request.body :", request.body);
    const caase = new Case({
      id: nanoid(10),
      _id: nanoid(10),
      name: request.body.name,
      gender: request.body.gender,
      age: request.body.age,
      address: request.body.address,
      city: request.body.city,
      country: request.body.country,
      status: request.body.status,
      updated: request.body.updated ?? "false",
    });
    console.log("Added case ", caase);
    caase
      .save()
      .then((createdCase) => {
        console.log(createdCase);
        reply.status(201).json(createdCase);
      })
      .catch((error) => {
        console.log("Add case error: ", error);
        reply.status(500).json({ message: "Creating a case failed!" });
      });
  },

  getCases: (request, reply) => {
    console.log("GET CASES!");
    Case.find()
      .lean()
      .then((documents) => {
        reply.status(200).json(documents);
      })
      .catch((error) => {
        reply.status(500).json({ message: "Fetching cases failed!" });
      });
  },
  deleteCase: (request, reply) => {
    console.log("DELETE Case: ", request.params.id);
    Case.deleteOne({ _id: request.params.id })
      .then((result) => {
        if (result.n > 0) {
          console.log("DELETED CASE");
          reply.status(200).json(true);
        } else {
          console.log("NOT DELETED CASE");
          reply.status(401).json(false);
        }
      })
      .catch((error) => {
        console.log("ERROR DELETING :", error);
        reply.status(500).json({ message: "Deleting case failed!" });
      });
  },

  updateCase: (request, reply) => {
    const caase = new Case({
      name: request.body.name,
      gender: request.body.gender,
      age: request.body.age,
      address: request.body.address,
      city: request.body.city,
      country: request.body.country,
      status: request.body.status,
      updated: request.body.updated ?? "true",
    });
    console.log("UPDATE CASE !!!!!!!!");
    Case.updateOne({ _id: request.params.id }, caase)
      .then((result) => {
        if (result.n > 0) {
          reply.status(200).json({ message: "Update successfull!" });
        } else {
          reply.status(401).json({ message: "Not Successfull!" });
        }
      })
      .catch((error) => {
        console.log("Case Update error: ", error);
        reply.status(500).json({ message: "Couldn't update case!" });
      });
  },
  getCase: (request, reply) => {
    Case.findOne({ _id: request.params.id })
      .then((caase) => {
        if (caase) {
          console.log("get case :", caase);
          reply.status(200).json(caase);
        } else {
          reply.status(404).json({ message: "Case not found!" });
        }
      })
      .catch((error) => {
        reply.status(500).json({ message: "Fetching case failed!" });
      });
  },
};
