const multer = require("multer"),
  ObjectID = require("mongodb").ObjectID,
  mongodb = require("mongodb"),
  { Readable } = require("stream"),
  config = require("../config");

let db;

module.exports = {
  getTrack: (request, reply) => {
    try {
      var trackID = new ObjectID(request.params.id);
    } catch (err) {
      return reply.status(400).send({
        message:
          "Invalid trackID in URL parameter. Must be a single String of 12 bytes or a string of 24 hex characters",
      });
    }
    reply.set("content-type", "audio/mp3");
    reply.set("accept-ranges", "bytes");
    db = config.getDB();
    let bucket = new mongodb.GridFSBucket(db, {
      bucketName: "tracks",
    });
    console.log("GOT BUcKET");
    let downloadStream = bucket.openDownloadStream(trackID);

    downloadStream.on("data", (chunk) => {
      reply.write(chunk);
    });

    downloadStream.on("error", () => {
      reply.status(404).send({ message: "Error " });
    });

    downloadStream.on("end", () => {
      reply.end();
    });
  },
  postTrack: (request, reply) => {
    console.log("POST TRACK");
    const storage = multer.memoryStorage();
    const upload = multer({
      storage: storage,
      limits: { fields: 1, fileSize: 6000000, files: 1, parts: 2 },
    });
    upload.single("track")(request, reply, (err) => {
      if (err) {
        return reply
          .status(400)
          .send({ message: "Upload Request Validation Failed" });
      } else if (!request.body.name) {
        return reply
          .status(400)
          .send({ message: "No track name in request body" });
      }
      console.log("UPLOAD SINGLE");
      let trackName = request.body.name;
      console.log(" FILE : ", request.file);
      // Covert buffer to Readable Stream
      const readableTrackStream = new Readable();
      console.log("BUFFERING");
      readableTrackStream.push(request.file.buffer);
      console.log("ENDED BUFFERING!");
      readableTrackStream.push(null);
      db = config.getDB();
      let bucket = new mongodb.GridFSBucket(db, {
        bucketName: "tracks",
      });
      console.log("BUCKETs");
      let uploadStream = bucket.openUploadStream(trackName);
      console.log("UPLOAD STREAM : ", uploadStream);
      let id = uploadStream.id;
      readableTrackStream.pipe(uploadStream);

      uploadStream.on("error", (err) => {
        console.log("error track upload: ", err);
        return reply.status(500).send({ message: "Error uploading file" });
      });

      uploadStream.on("finish", () => {
        return reply.status(201).send({
          message:
            "File uploaded successfully, stored under Mongo ObjectID: " + id,
        });
      });
      console.log("END");
    });
  },
};
