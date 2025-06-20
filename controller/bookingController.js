const Bookings = require('../models/booking.js');
const factoryController = require('./factoryController.js');
const APIFeatures = require('../utils/APIFeatures.js');
const AppError = require('../utils/AppError.js');
const catchAsync = require('../utils/catchAsync.js');

exports.getAllBookings = factoryController.getAll(Bookings);
exports.getBooking = factoryController.getOne(Bookings);
exports.createBooking = factoryController.createOne(Bookings);
exports.updateBooking = factoryController.UpdateDoc(Bookings);
exports.deleteBooking = factoryController.deleteOne(Bookings);

exports.getBookingsAfterDate = catchAsync(async (req, res, next) => {
  const date = req.params.date;
  const plan = await Bookings.aggregate([
    {
      $match: {
        createdAt: {
          $gte: new Date(date),
          $lte: new Date(),
        },
      },
    },
  ]);

  res.status(200).json({
    status: 'success',
    data: {
      plan,
    },
  });
});

exports.getStaysAfterDate = catchAsync(async (req, res, next) => {
  const date = req.params.date;
  const plan = await Bookings.aggregate([
    {
      $match: {
        startDate: {
          $gte: new Date(date),
          $lte: new Date(),
        },
      },
    },
  ]);

  res.status(200).json({
    status: 'success',
    data: {
      plan,
    },
  });
});

exports.getBookedDatesByCabinId = catchAsync(async (req, res, next) => {
  // const { cabinId } = req.params;

  let today = new Date();
  today.setUTCHours(0, 0, 0, 0);
  today = today.toISOString();

  const plan = await Bookings.aggregate([
    {
      $match: {
        startDate: {
          $gte: new Date(today),
        },
        status: 'checked-in',
        // cabinId: cabinId,
      },
    },
  ]);

  res.status(200).json({
    status: 'success',
    data: {
      plan,
    },
  });
});

// // Getting all bookings
// const { data, error } = await supabase
//   .from("bookings")
//   .select("*")
//   .eq("cabinId", cabinId)
//   .or(`startDate.gte.${today},status.eq.checked-in`);

// exports.getTourStats = catchAsync(async function (req, res, next) {
//   const stats = await Tour.aggregate([
//     { $match: { ratingsAverage: { $gte: 4.5 } } },
//     {
//       $group: {
//         // _id: null,
//         // _id: '$difficulty',
//         _id: { $toUpper: '$difficulty' },
//         numTour: { $sum: 1 },
//         numRatings: { $sum: '$ratingsQuantity' },
//         avgRatings: { $avg: '$ratingsAverage' },
//         avgPrice: { $avg: '$price' },
//         minPrice: { $min: '$price' },
//         maxPrice: { $max: '$price' },
//       },
//     },
//     {
//       $sort: { avgPrice: 1 },
//     },
//     // {
//     //   $match: { _id: { $ne: 'EASY' } },
//     // },
//   ]);

//   res.status(200).json({
//     status: 'success',
//     data: {
//       stats,
//     },
//   });
// });

// exports.getMonthlyPlan = catchAsync(async (req, res, next) => {
//   const year = req.params.year;

//   const plan = await Tour.aggregate([
//     { $unwind: '$startDates' },
//     {
//       $match: {
//         startDates: {
//           $gte: new Date(`${year}-01-01`),
//           $lte: new Date(`${year}-12-31`),
//         },
//       },
//     },
//     {
//       $group: {
//         _id: { $month: '$startDates' },
//         numTourStats: { $sum: 1 },
//         tour: { $push: '$name' },
//       },
//     },
//     { $addFields: { month: '$_id' } },
//     { $project: { _id: 0 } },
//     { $sort: { numTourStats: -1 } },
//     { $limit: 12 },
//   ]);

//   res.status(200).json({
//     status: 'success',
//     data: {
//       plan,
//     },
//   });
// });

// exports.getToursWithin = catchAsync(async (req, res, next) => {
//   const { distance, latlng, unit } = req.params;
//   const [lat, lng] = latlng.split(',');
//   const radius = unit === 'ml' ? distance / 3963.2 : distance / 6378.1;

//   if (!lng || !lat) {
//     return next(
//       new AppError(
//         'Please provide latitude and longitude in the format lat,lng',
//         400,
//       ),
//     );
//   }

//   const tour = await Tour.find({
//     startLocation: { $geoWithin: { $centerSphere: [[lng, lat], radius] } },
//   });

//   res.status(200).json({
//     status: 'success',
//     results: tour.length,
//     data: {
//       data: tour,
//     },
//   });
// });

// exports.calcDistances = catchAsync(async (req, res, next) => {
//   const { latlng, unit } = req.params;
//   const [lat, lng] = latlng.split(',');
//   const multiplier = unit === 'ml' ? 0.000621371 : 0.001;

//   if (!lng || !lat) {
//     return next(
//       new AppError(
//         'Please provide latitude and longitude in the format lat,lng',
//         400,
//       ),
//     );
//   }

//   const distances = await Tour.aggregate([
//     {
//       $geoNear: {
//         near: {
//           type: 'Point',
//           coordinates: [+lng, +lat],
//         },
//         distanceField: 'distance',
//         distanceMultiplier: multiplier,
//       },
//     },
//     {
//       $project: {
//         distance: 1,
//         name: 1,
//       },
//     },
//   ]);

//   res.status(200).json({
//     status: 'success',
//     results: distances.length,
//     data: {
//       data: distances,
//     },
//   });
// });
