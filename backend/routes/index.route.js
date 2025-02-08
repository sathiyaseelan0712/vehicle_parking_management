const express = require("express");
const vehiclRoutes = require("./vehicle.route");
const slotRoutes = require("./slot.route");

const router = express.Router();

router.use("/vehicle", vehiclRoutes);
router.use("/slot", slotRoutes);

module.exports = router;
