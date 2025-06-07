const mongoose = require('mongoose');

const cabinSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
    trim: true,
    required: [true, 'A cabin should have name!'],
  },
  maxCapacity: {
    type: Number,
    required: [true, 'A cabin should have max capacity!'],
  },
  regularPrice: {
    type: Number,
    required: [true, 'A cabin should have price!'],
  },
  discount: { type: Number, default: 0 },
  description: String,
  image: { type: String, required: [true, 'A cabin should have photo!'] },
});

cabinSchema.pre(/^find/, function (next) {
  this.id = this._id;
  next();
});

const Cabins = mongoose.model('Cabins', cabinSchema);
module.exports = Cabins;
// validate: {
//   validator: function (val) {
//     // this only points to current doc on NEW document creation
//     return val < this.price;
//   },
//   message: 'Discount price ({VALUE}) should be below normal price',
// },

// createdAt: { type: Date, default: Date.now(), select: false },
//     startDates: [Date],

// guides: [
//   {
//     type: mongoose.Schema.ObjectId,
//     ref: 'User',
//   },
// ],

// {
//   toJSON: { virtuals: true },
//   toObject: { virtuals: true },
// },

// tourSchema.virtual('reviews', {
//   // type: mongoose.Schema.ObjectId,
//   ref: 'Review',
//   foreignField: 'tour',
//   localField: '_id',
// });
