const mongoose = require('mongoose');

const settingSchema = new mongoose.Schema({
  breakfastPrice: {
    type: Number,
    required: [true, 'Please provide your Breakfast Price!'],
  },
  maxGuestsPerBooking: {
    type: Number,
    required: [true, 'PLease provide your max Booking per guest!'],
  },
  maxBookingLength: {
    type: Number,
    required: [true, 'Please provide your max Length of Booking!'],
  },
  minBookingLength: {
    type: Number,
    required: [true, 'Please provide your min Length of Booking!'],
  },
});

settingSchema.pre(/^find/, function (next) {
  this.id = this._id;
  next();
});

const Settings = mongoose.model('Settings', settingSchema);
module.exports = Settings;
