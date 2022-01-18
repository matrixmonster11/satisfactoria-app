const express = require("express"),
  router = express.Router(),
  ticketController = require("../controllers/ticketController"),
  checkAuth = require("../middleware/check-auth");

router.post("/", checkAuth, ticketController.addCase);
router.get("/", checkAuth, ticketController.getCases);
router.patch("/:id", checkAuth, ticketController.updateCase);
router.delete("/:id", checkAuth, ticketController.deleteCase);
router.get("/:id/ticket", checkAuth, ticketController.getCase);

module.exports = router;
