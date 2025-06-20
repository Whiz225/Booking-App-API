const Guests = require('../models/guest.js');
const factoryController = require('./factoryController.js');
const APIFeatures = require('../utils/APIFeatures.js');
const AppError = require('../utils/AppError.js');
const catchAsync = require('../utils/catchAsync.js');

exports.getAllGuests = factoryController.getAll(Guests);
// exports.getGuest = factoryController.getOne(Guests);
exports.createGuest = factoryController.createOne(Guests);
exports.updateGuest = factoryController.UpdateDoc(Guests);
exports.deleteGuest = factoryController.deleteOne(Guests);

exports.getGuest = catchAsync(async (req, res, next) => {
  const doc = await Guests.find(req.body);

  if (!doc) return next(new AppError('Guest could not be found', 404));

  res.status(202).json({
    status: 'success',
    data: {
      data: doc,
    },
  });
});
