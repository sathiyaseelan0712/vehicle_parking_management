const mongoose = require('mongoose');

const vehicleSchema = new mongoose.Schema({
    vehicleNumber: {
        type: String,
        required: true,
        validate: {
            validator: function(v) {
                return /^[A-Za-z]{2}\d{2}[A-Za-z]{2}\d{4}$/.test(v);
            },
            message: props => `${props.value} is not a valid vehicle number! Format should be: AA99AA9999`
        }
    },
    entryTime: {
        type: Date,
        default: Date.now,
    },
    checkoutTime: {
        type: Date,
    },
    fee: {
        type: Number,
    },
    slot: {
        type: Number,
    },
});

const Vehicle = mongoose.model('Vehicle', vehicleSchema);

module.exports = Vehicle;
