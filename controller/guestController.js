const Guests = require('../models/guest.js');
const factoryController = require('./factoryController.js');
const APIFeatures = require('../utils/APIFeatures.js');
const AppError = require('../utils/AppError.js');
const catchAsync = require('../utils/catchAsync.js');

exports.getAllGuests = factoryController.getAll(Guests);
exports.getGuest = factoryController.getOne(Guests);
exports.createGuest = factoryController.createOne(Guests);
exports.updateGuest = factoryController.UpdateDoc(Guests);
exports.deleteGuest = factoryController.deleteOne(Guests);
