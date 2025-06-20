const express = require('express');
const bookingController = require('../controller/bookingController');
const authController = require('../controller/authController');

const router = express.Router();

router.route('/guestWeb/:guestId').get(bookingController.getBooking);
router.route('/web').post(bookingController.createBooking);
router.route('/cabinWeb').get(bookingController.getBookedDatesByCabinId);

router
  .route('/web/:id')
  .get(bookingController.getBooking)
  .patch(bookingController.updateBooking)
  .delete(bookingController.deleteBooking);

router.use(authController.protect);

router.get('/StaysAfterDate/:date', bookingController.getStaysAfterDate);
router.get('/BookingsAfterDate/:date', bookingController.getBookingsAfterDate);

router
  .route('/')
  .get(authController.protect, bookingController.getAllBookings)
  .post(bookingController.createBooking);

router
  .route('/:id')
  .get(bookingController.getBooking)
  .patch(bookingController.updateBooking)
  .delete(bookingController.deleteBooking);

module.exports = router;
