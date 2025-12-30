const express = require('express');
const worldwiseAppController = require('../controller/worldwiseAppController');
const authController = require('../controller/authController');

const router = express.Router();

router
  .route('/city/:id')
  .get(worldwiseAppController.getCity)
  .patch(
    // authController.protect,
    worldwiseAppController.updateCity,
  )
  .delete(worldwiseAppController.deleteCity);
// .delete(authController.protect, worldwiseAppController.deleteCity);

router
  .route('/country/:id')
  .get(worldwiseAppController.getCountry)
  .patch(
    // authController.protect,
    worldwiseAppController.updateCountry,
  )
  .delete(worldwiseAppController.deleteCountry);
// .delete(authController.protect, worldwiseAppController.deleteCountry);

router
  .route('/city')
  .get(worldwiseAppController.getAllCities)
  .post(worldwiseAppController.createCity);

router
  .route('/country')
  .get(worldwiseAppController.getAllCountries)
  .post(worldwiseAppController.createCountry);

module.exports = router;
