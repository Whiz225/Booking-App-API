const Settings = require('../models/setting.js');
const factoryController = require('./factoryController.js');
const APIFeatures = require('../utils/APIFeatures.js');
const AppError = require('../utils/AppError.js');
const catchAsync = require('../utils/catchAsync.js');

exports.getSettings = factoryController.getAll(Settings);
// exports.updateSetting = factoryController.UpdateDoc(Settings);
// exports.getAllGuests = factoryController.getAll(Guests);
// exports.createGuest = factoryController.createOne(Guests);
// exports.deleteGuest = factoryController.deleteOne(Guests);

exports.updateSetting = catchAsync(async (req, res, next) => {
  const doc = await Settings.findByIdAndUpdate(
    '684324793019c62a15f976aa',
    req.body,
    {
      new: true,
      runValidators: true,
    },
  );

  if (!doc) return next(new AppError('No document found with this ID', 404));

  res.status(202).json({
    status: 'success',
    data: {
      data: doc,
    },
  });
});
