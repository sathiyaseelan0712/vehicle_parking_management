const Vehicle = require("../models/vehicle.model");
const Slot = require("../models/slot.model");

const createVehicle = async (req, res) => {
  try {
    const { vehicleNumber } = req.body;
    if (!vehicleNumber) {
      return res.status(400).json({ message: "Vehicle number is required" });
    }

    const availableSlot = await Slot.findOne({ isOccupied: false });
    if (!availableSlot) {
      return res.status(400).json({ message: "No available slots" });
    }

    const newVehicle = new Vehicle({
      vehicleNumber,
      slot: availableSlot.slotNumber,
    });
    await newVehicle.save();

    availableSlot.isOccupied = true;
    await availableSlot.save();

    res.status(201).json(newVehicle);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};

const checkoutVehicle = async (req, res) => {
  const { vehicleNumber } = req.body;

  if (!vehicleNumber) {
    return res.status(400).json({ message: "Vehicle number is required" });
  }

  try {
    const vehicle = await Vehicle.findOne({ vehicleNumber });
    if (!vehicle) {
      return res.status(404).json({ message: "Vehicle not found" });
    }

    if (vehicle.checkoutTime) {
      return res
        .status(400)
        .json({ message: "Vehicle has already checked out" });
    }

    vehicle.checkoutTime = Date.now();

    const duration =
      (vehicle.checkoutTime - vehicle.entryTime) / (1000 * 60 * 60);
    const rate = 10;
    vehicle.fee = Math.ceil(duration) * rate;

    await vehicle.save();

    const slot = await Slot.findOne({ slotNumber: vehicle.slot });
    slot.isOccupied = false;
    slot.vehicleNumber = null;
    await slot.save();
    const entryTimeIST = new Date(vehicle.entryTime).toLocaleString("en-IN", {
      timeZone: "Asia/Kolkata",
    });
    const checkoutTimeIST = new Date(vehicle.checkoutTime).toLocaleString(
      "en-IN",
      { timeZone: "Asia/Kolkata" }
    );
    const response = {
      vehicleNumber: vehicle.vehicleNumber,
      fee: vehicle.fee,
      slot: vehicle.slot,
      entryTime: entryTimeIST,
      checkoutTime: checkoutTimeIST,
    };

    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};

module.exports = { createVehicle, checkoutVehicle };
