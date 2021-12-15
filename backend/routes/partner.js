const express = require("express"),
  router = express.Router(),
  partnerController = require("../controllers/partnerController"),
  checkAuth = require("../middleware/check-auth");

router.post("/", checkAuth, partnerController.addPartner);
router.get("/", checkAuth, partnerController.getPartners);
router.patch("/:id", checkAuth, partnerController.updatePartner);
router.delete("/:id", checkAuth, partnerController.deletePartner);
router.get("/partner", checkAuth, partnerController.getPartner);

module.exports = router;
