const User = require("../models/User"),
  bcrypt = require("bcrypt"),
  jwt = require("jsonwebtoken"),
  { nanoid } = require("nanoid"),
  nodemailer = require("nodemailer");

// env = require("dotenv").config();

module.exports = {
  createUser: async (req, res, next) => {
    console.log("CREATE USER!!");
    bcrypt.hash(req.body.password, 10).then((hash) => {
      const user = new User({
        _id: nanoid(12),
        email: req.body.email,
        password: hash,
        name: req.body.name,
        fname: req.body.fname,
        phone: req.body.phone,
        userType: req.body.userType,
        partnerId: req.body.partnerId,
      });
      user
        .save()
        .then((createdUser) => {
          res.status(201).send({ message: "user created!", user: createdUser });
        })
        .catch((err) => {
          console.log("Create user : ", err);
          res
            .status(500)
            .send({ message: "Something went wrong while creating a User!" });
        });
    });
  },
  userLogin: async (req, res, next) => {
    let fetchedUser;
    console.log("USER LOGIN!!");
    User.findOne({ email: req.body.email })
      .lean()
      .then((user) => {
        if (!user) {
          return res.status(401).send({ message: "Wrong email or password" });
        }

        fetchedUser = user;
        console.log("fetchedUser :", fetchedUser);
        // compare the password in DB with the one provided by user
        return bcrypt.compare(req.body.password, user.password);
      })
      .then((result) => {
        if (!result) {
          return res.status(401).send({ message: "Auth failed!" });
        }
        // let's create a toekn
        // sign() create a token based on input data of your choice
        // second argument: is the secret that will used to create hashes,
        //and it will be used to validate these hashes, this is what makes
        // them uncrackable

        let userType = "";
        let userName = "";

        const token = jwt.sign(
          {
            email: fetchedUser.email,
            userType: result.userType,
            partnerId: result.partnerId,
          },
          process.env.JWT_KEY,
          { expiresIn: "2h" }
        );
        console.log("fetched profile :", result);
        userName = result.name;
        userType = result.userType;
        return res.status(200).send({
          userId: result._id,
          token: token,
          expiresIn: 7200,
          userType: userType,
          userName: userName,
        });
      });
  },
};
