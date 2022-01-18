const express = require("express"),
  router = express.Router(),
  caseController = require("../controllers/caseController"),
  checkAuth = require("../middleware/check-auth");

router.post("/", caseController.addCase);
router.get("/", caseController.getCases);
router.patch("/:id", caseController.updateCase);
router.delete("/:id", caseController.deleteCase);
router.get("/:id/case", caseController.getCase);

module.exports = router;
