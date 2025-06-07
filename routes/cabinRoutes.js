const express = require('express');
const cabinController = require('../controller/cabinController');
const authController = require('../controller/authController');

const router = express.Router();

router.route('/').get(cabinController.getAllCabins).post(
  authController.protect,
  // cabinController.checkCabinPhoto,
  cabinController.uploadCabinPhoto,
  cabinController.resizeCabinPhoto,
  cabinController.createCabin,
);

router
  .route('/:id')
  .get(cabinController.getCabin)
  .patch(
    authController.protect,
    // cabinController.checkCabinPhoto,
    cabinController.uploadCabinPhoto,
    cabinController.resizeCabinPhoto,
    cabinController.updateCabin,
  )

  .delete(authController.protect, cabinController.deleteCabin);

// router.route('/').post(cabinController.createCabin);

module.exports = router;
