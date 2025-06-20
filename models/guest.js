const mongoose = require('mongoose');

const guestSchema = new mongoose.Schema({
  fullName: {
    type: String,
    trim: true,
    required: [true, 'Please provide your name!'],
  },
  email: {
    type: String,
    required: [true, 'PLease provide your email address!'],
  },
  nationality: String,
  nationalID: Number,
  countryFlag: String,
  // nationality: {
  //   type: String,
  //   required: [true, 'Please provide your nationality!'],
  // },
  // nationalID: { type: Number, required: 'Please provide your nationalID:)' },
  // countryFlag: String,
  // guides: [
  //   {
  //     type: mongoose.Schema.ObjectId,
  //     ref: 'Cabins',
  //     required: [true, 'A guest must have a booking'],
  //   },
  // ],
});

guestSchema.pre(/^find/, function (next) {
  this.id = this._id;
  next();
});

const Guests = mongoose.model('Guests', guestSchema);
module.exports = Guests;
//  // id: 1000,
//  fullName: 'Jonas Schmedtmann',
//  email: 'hello@jonas.io',
//  nationality: 'Portugal',
//  nationalID: '3525436345',
//  countryFlag: 'https://flagcdn.com/pt.svg',
