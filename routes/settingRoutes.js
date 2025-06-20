const express = require('express');
const settingController = require('../controller/settingController');
const authController = require('../controller/authController');

const router = express.Router();

router.route('/web')
  .get(settingController.getSettings)

router.use(authController.protect);

router
  .route('/')
  .get(settingController.getSettings)
  .patch(settingController.updateSetting);

// router
//   .route('/:id')
//   .get(guestController.getGuest)
//   .patch(guestController.updateGuest)
//   .delete(guestController.deleteGuest);

// router.route('/:id').patch(settingController.updateSetting);

module.exports = router;
