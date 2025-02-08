const Slot = require("../models/slot.model");
const Vehicle = require("../models/vehicle.model");

const initializeSlots = async (req, res) => {
  try {
    const { slotCount } = req.body;
    if (!slotCount) {
      return res.status(400).json({ message: "Slot count is Required" });
    }
    for (let i = 1; i <= slotCount; i++) {
      const existingSlot = await Slot.findOne({ slotNumber: i });
      if (!existingSlot) {
        const slot = new Slot({ slotNumber: i });
        await slot.save();
      }
    }
    res.status(201).json({ message: "Slots initialized" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error", error });
  }
};

const deleteSlots = async (req, res) => {
  try {
    await Slot.deleteMany();
    res.status(200).json({ message: "All Slots deleted SuccessFully" });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};

const checkAvailable = async (req, res) => {
  try {
    const totalSlots = await Slot.countDocuments();
    const occupiedSlots = await Slot.countDocuments({ isOccupied: true });
    const remainingSlots = totalSlots - occupiedSlots;
    res.status(200).json({ totalSlots, occupiedSlots, remainingSlots });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};

const findTheVehicleSlots = async (req, res) => {
  try {
    const { vehicleNumber } = req.body;
    const vehicle = await Vehicle.findOne({
      vehicleNumber : vehicleNumber,
    });
    if (vehicle) {
      const slot = await Slot.findOne({
        slotNumber: vehicle.slot,
        isOccupied: true,
      });
      if (slot) {
        res.status(200).json({ slotNumber: slot.slotNumber });
      } else {
        res.status(404).json({ message: "Slot not found or not occupied" });
      }
    } else {
      res.status(404).json({ message: "Vehicle not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};

module.exports = {
  initializeSlots,
  deleteSlots,
  checkAvailable,
  findTheVehicleSlots,
};
