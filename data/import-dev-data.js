const fs = require('fs');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const Bookings = require('../models/booking');
const Cabins = require('../models/cabin');
const { bookingData } = require('./data-bookings');
const { cabinsData } = require('./data-cabins');
const Guests = require('../models/guest');
const { guestsData } = require('./data-guests');

dotenv.config({ path: './config.env' });

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD,
);

mongoose
  .connect(DB, {
    // .connect(process.env.DATABASE_LOCAL, {
    useNewUrlParser: true,
    // useCreateIndex: true,
    // useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then((con) => {
    console.log('DB connected...');
    // console.log(console.log(con.connections));
  });

// const bookings = JSON.parse(
//   fs.readFileSync(`${__dirname}/data-bookings.js`, 'utf-8'),
// );
// const users = JSON.parse(fs.readFileSync(`${__dirname}/users.json`, 'utf-8'));
// const reviews = JSON.parse(
//   fs.readFileSync(`${__dirname}/reviews.json`, 'utf-8'),
// );

const importData = async () => {
  try {
    await Bookings.create(bookingData(), { validateBeforeSave: false });
    // await Cabins.create(cabinsData, { validateBeforeSave: false });
    // await Guests.create(guestsData, { validateBeforeSave: false });
    console.log('Data successfully loaded');
  } catch (err) {
    console.log(err);
  } finally {
    process.exit();
  }
};

const deleteData = async () => {
  try {
    await Bookings.deleteMany();
    // await Cabins.deleteMany();
    // await Guests.deleteMany();
    console.log('Data successfully deleted');
  } catch (err) {
    console.log(err);
  } finally {
    process.exit();
  }
};

if (process.argv[2] === '--import') {
  importData();
} else if (process.argv[2] === '--delete') {
  deleteData();
}
