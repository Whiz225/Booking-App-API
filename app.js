const path = require('path');

const cabinRoutes = require('./routes/cabinRoutes');
const bookingRoutes = require('./routes/bookingRoutes');
const guestRoutes = require('./routes/guestRoutes');
const userRoutes = require('./routes/userRoutes');
const settingRoutes = require('./routes/settingRoutes');
const globalErrorHandler = require('./controller/errorController');
const AppError = require('./utils/AppError');

const cors = require('cors');
const express = require('express');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const morgan = require('morgan');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');
const cookieParser = require('cookie-parser');
const compression = require('compression');

const app = express();

//Enable CORS for all origins (during development)
// access to only my frontend

app.use(
  cors({
    origin: [
      'http://localhost:5173',
      'http://localhost:3000',
      'https://booking-app-v1-website.vercel.app',
      'https://booking-app-v2.onrender.com',
    ],
    credentials: true,
  }),
);
// access to all
// app.use(cors())

// app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));
// Serving static fills
// app.use(express.static(`${__dirname}/public`));
app.use(express.static(path.join(__dirname, 'public')));
// Set security HTTP headers
app.use(helmet({ contentSecurityPolicy: false }));
// app.use(helmet());
// Development logging
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}
// Limit request from same API to prevent abuse
const limiter = rateLimit({
  max: 1000,
  windowMs: 60 * 60 * 1000,
  message: 'Too many request from this IP, Please try again in an hour!',
});

app.use('/api', limiter);
// Body parser, reading data from body into req.body
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));
app.use(cookieParser());
app.use(mongoSanitize());
app.use(xss());
// Prevent duplicate parameter attacks
app.use(
  hpp({
    whitelist: [
      'duration',
      'ratingsQuantity',
      'ratingsAverage',
      'maxGroupSize',
    ],
  }),
);

app.use(compression());

app.use('/api/v1/cabins', cabinRoutes);
app.use('/api/v1/bookings', bookingRoutes);
app.use('/api/v1/guests', guestRoutes);
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/settings', settingRoutes);

// app.all('*', (req, res, next) => {
//   next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
// });

app.use(globalErrorHandler);

module.exports = app;
