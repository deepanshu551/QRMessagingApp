const mongoose = require('mongoose');

const CarSchema = new mongoose.Schema({
    carId:{
        type: String,
        required: true,
        trim: true,
        unique: true,
    },
    phone:{
        type: String,
        required: true,
        trim: true,
        unique: true,
    },
    timestamp: {
        type: Date,
        default: Date.now,
      },

})


module.exports = mongoose.model('UserCar', CarSchema);