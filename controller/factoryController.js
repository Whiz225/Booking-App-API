const APIFeatures = require('../utils/APIFeatures');
const AppError = require('../utils/AppError');
const catchAsync = require('../utils/catchAsync');

exports.deleteOne = (model) =>
  catchAsync(async (req, res, next) => {
    const { id } = req.params;
    const doc = await model.findByIdAndDelete(id);
    if (!doc) return next(new AppError('No document found with this ID', 404));

    res.status(204).json({
      status: 'success',
      data: null,
    });
  });

exports.createOne = (model) =>
  catchAsync(async (req, res, next) => {
    if (!req.body.image) req.body.image = req?.file?.filename;

    const newTour = await model.create(req.body);
    res.status(201).json({
      status: 'success',
      data: {
        data: newTour,
      },
    });
  });

exports.UpdateDoc = (model) =>
  catchAsync(async (req, res, next) => {
    req.body.image = req.body?.filename;

    const { id, guestId } = req.params;
    const doc = await model.findByIdAndUpdate(id || guestId, req.body, {
      new: true,
      runValidators: true,
    });

    if (!doc) return next(new AppError('No document found with this ID', 404));

    res.status(202).json({
      status: 'success',
      data: {
        data: doc,
      },
    });
  });

exports.getOne = (model, popOption) =>
  catchAsync(async (req, res, next) => {
    const { id, guestId } = req.params;
    // console.log('id', id, 'guest', guestId);
    let query;
    if (id) query = model.findById(id);
    if (guestId) query = model.find({ guestId });
    if (popOption) query = query.populate(popOption);

    const doc = await query;
    // const tour = await Tour.findById(id);
    // const tour = await Tour.findOne({ _id: req.params.id });
    if (!doc) return next(new AppError('No document with the ID', 404));

    res.status(200).json({
      status: 'success',
      data: {
        data: doc,
      },
    });
  });

exports.getAll = (model) =>
  catchAsync(async (req, res, next) => {
    let filter = {};
    if (req.params.tourId) filter = { tour: req.params.tourId };

    const features = new APIFeatures(model.find(filter), req.query)
      .filter()
      .sortField()
      .limitFields()
      .pagination();
    const doc = await features.query;
    res.status(200).json({
      status: 'success',
      result: doc.length,
      data: {
        data: doc,
      },
    });
  });
