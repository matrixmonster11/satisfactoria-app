const express = require("express"),
  router = express.Router(),
  trackController = require("../controllers/trackController"),
  checkAuth = require("../middleware/check-auth");

router.get("/:id", trackController.getTrack);
router.post("/", trackController.postTrack);

module.exports = router;
