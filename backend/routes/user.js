const express = require("express"),
  router = express.Router(),
  userController = require("../controllers/userController"),
  checkAuth = require("../middleware/check-auth");

router.post("/sign-up", userController.createUser);

router.post("/login", userController.userLogin);

//router.get("/", checkAuth, userController.getUsers);

module.exports = router;
