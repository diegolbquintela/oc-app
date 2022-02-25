const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const transactionsRoutes = require('./routes/transactions-routes');
const usersRoutes = require('./routes/users-routes');
const HttpError = require('./models/http-error');
const { url } = require('./config');

const app = express();

app.use(bodyParser.json());

app.use('/api/users', usersRoutes);
app.use('/api/transactions', transactionsRoutes);

// Unsupported routes
app.use((req, res, next) => {
  next(new HttpError('Could not find this route.', 404));
});

app.use((error, req, res, next) => {
  if (res.headerSent) {
    return next(error);
  }
  res
    .status(error.code || 500)
    .json({ message: error.message || 'An unknown error occurred' });
});

mongoose
  .connect(url)
  .then(() => app.listen(8000))
  .catch((err) => console.log(err));
