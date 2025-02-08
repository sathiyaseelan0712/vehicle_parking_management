const express = require("express");
const vehicleControlller = require("../controllers/vehicle.controller");

const router = express.Router();

router.post("/checkIn", vehicleControlller.createVehicle);
router.patch("/checkout", vehicleControlller.checkoutVehicle);

module.exports = router;
