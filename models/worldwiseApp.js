const mongoose = require('mongoose');

const worldwiseApp = new mongoose.Schema({
  cityName: {
    type: String,
    // unique: true,
    trim: true,
    required: [true, 'A city should have name!'],
  },
  country: {
    type: String,
    // unique: true,
    trim: true,
    required: [true, 'A country should have name!'],
  },
  emoji: {
    type: String,
  },
  note: {
    type: String,
  },
  position: {
    lat: { type: String, required: true },
    lng: { type: String, required: true },
  },
  date: {
    type: Date,
    default: Date.now(),
  },
});

worldwiseApp.pre(/^find/, function (next) {
  this.id = this._id;
  next();
});

const WorldwiseApp = mongoose.model('worldwiseApp', worldwiseApp);
module.exports = WorldwiseApp;
