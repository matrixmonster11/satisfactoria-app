const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

router.post("/user/sign-up", userController.createUser);

router.post("/user/login", userController.userLogin);

module.exports = router;
