const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema(
  {
    createdAt: { type: Date, default: Date.now(), select: false },
    startDate: {
      type: Date,
      required: [true, 'A booking must have a start date'],
    },
    endDate: {
      type: Date,
      required: [true, 'A booking must have an end date'],
    },
    status: { type: String, default: 'unconfirmed' },
    cabinId: {
      type: mongoose.Schema.ObjectId,
      ref: 'Cabins',
      required: [true, 'A booking must have a cabin'],
    },
    guestId: {
      type: mongoose.Schema.ObjectId,
      ref: 'Guests',
      required: [true, 'A booking must have a user'],
    },
    totalPrice: Number,
    discount: { type: Number, default: 0 },
    hasBreakfast: { type: Boolean, default: false },
    isPaid: { type: Boolean, default: false },
    numGuests: { type: Number, required: true },
    observations: {
      type: String,
      min: [10, 'Not less than 10 characters'],
      max: [1000, 'Not more than 1000 characters'],
    },
    extrasPrice: { type: Number, default: 0 },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

bookingSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'cabinId',
    select: 'name image',
  })
    .populate({
      path: 'guestId',
      // select: 'fullName email',
    })
    .select('+createdAt');

  this.id = this._id;
  next();
});

const Bookings = mongoose.model('Bookings', bookingSchema);
module.exports = Bookings;
