const express = require("express");
const slotController = require("../controllers/slot.controller");

const router = express.Router();

router.post("/initialize", slotController.initializeSlots);
router.delete("/deleteSlots", slotController.deleteSlots);
router.get("/status", slotController.checkAvailable);
router.post("/find", slotController.findTheVehicleSlots);

module.exports = router;
