const express = require("express"),
  bodyParser = require("body-parser"),
  mongoose = require("mongoose"),
  userRoutes = require("./routes/user"),
  partnerRoutes = require("./routes/partner");
(cors = require("cors")), (path = require("path")), (app = express());

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
  })
  .then((db) => {
    console.log("Connected to DB!");
  })
  .catch(() => {
    console.log("Connection failed!");
  });
//   app.all('*', (req, res, next) => {
//     req.db = dbo;
//     next();
// })
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/images", express.static(path.join("backend/images")));

app.use((req, res, next) => {
  // not matter which domain sends the request, it's allowed to access our resources
  res.setHeader("Access-Control-Allow-Origin", "*");
  //Allow these other headers
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET,POST,PATCH,DELETE,PUT,OPTIONS"
  );
  next();
});
// mongoPsw: jupx2zt0MiXyMTni;

app.get("/", (req, res, next) => {
  res.send("Hello World");
});

app.get("/testing", (req, res, next) => {
  res.send("Just testing this mate");
});

app.use("/user", userRoutes);
app.use("/partners", partnerRoutes);

module.exports = app;
