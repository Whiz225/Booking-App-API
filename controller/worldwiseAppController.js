// const multer = require('multer');
// const sharp = require('sharp');
const WorldwiseApp = require('../models/worldwiseApp.js');
const factoryController = require('./factoryController.js');
// const APIFeatures = require('../utils/APIFeatures.js');
// const AppError = require('../utils/AppError.js');
// const catchAsync = require('../utils/catchAsync.js');

exports.getAllCities = factoryController.getAll(WorldwiseApp);
exports.getAllCountries = factoryController.getAll(WorldwiseApp);
exports.getCity = factoryController.getOne(WorldwiseApp);
exports.getCountry = factoryController.getOne(WorldwiseApp);
exports.createCity = factoryController.createOne(WorldwiseApp);
exports.createCountry = factoryController.createOne(WorldwiseApp);
exports.deleteCity = factoryController.deleteOne(WorldwiseApp);
exports.deleteCountry = factoryController.deleteOne(WorldwiseApp);
exports.updateCity = factoryController.UpdateDoc(WorldwiseApp);
exports.updateCountry = factoryController.UpdateDoc(WorldwiseApp);
