const express = require('express');
const guestController = require('../controller/guestController');
const authController = require('../controller/authController');

const router = express.Router();

router.use(authController.protect);

router
  .route('/')
  .get(guestController.getAllGuests)
  .post(guestController.createGuest);

router
  .route('/:id')
  .get(guestController.getGuest)
  .patch(guestController.updateGuest)
  .delete(guestController.deleteGuest);

// router.route('/').post(cabinController.createCabin);

module.exports = router;
