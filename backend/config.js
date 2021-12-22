const mongoose = require("mongoose");
let db;
module.exports.connectDb = async function () {
  try {
    const client = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
    });
    db = client.connections[0].db;
    console.log("Connected to DB!");
  } catch (err) {
    console.log(err);
    console.log("Connection failed!");
    process.exit(1);
  }
};

module.exports.getDB = () => {
  return db;
};
