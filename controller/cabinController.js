const multer = require('multer');
const sharp = require('sharp');
const Cabins = require('../models/cabin.js');
const factoryController = require('./factoryController.js');
const APIFeatures = require('../utils/APIFeatures.js');
const AppError = require('../utils/AppError.js');
const catchAsync = require('../utils/catchAsync.js');

// // Disk storage
// const updateMulterStorage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, 'public/img/users');
//   },
//   filename: (req, file, cb) => {
//     const ext = file.mimetype.split('/')[1];
//     cb(null, `user-${req.user._id}-${Date.now()}.${ext}`);
//   },
// });

const multerStorage = multer.memoryStorage();
const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image')) {
    cb(null, true);
  } else {
    cb(false, 'Not an Image! please upload only image.');
  }
};

const upload = multer({ Storage: multerStorage, fileFilter: multerFilter });

exports.uploadCabinPhoto = upload.single('image');

exports.resizeCabinPhoto = catchAsync(async (req, res, next) => {
  if (!req.file) return next();
  if (req.file) req.file.filename = `cabin-${req.user._id}-${Date.now()}.jpeg`;

  await sharp(req.file.buffer)
    .resize(2000, 1333)
    .toFormat('jpeg')
    .jpeg({ quality: 90 })
    .toFile(`public/imgCabin/${req.file?.filename || req.body?.filename}`);
  next();
});

exports.getAllCabins = factoryController.getAll(Cabins);
exports.getCabin = factoryController.getOne(Cabins);
exports.createCabin = factoryController.createOne(Cabins);
exports.updateCabin = factoryController.UpdateDoc(Cabins);
exports.deleteCabin = factoryController.deleteOne(Cabins);
