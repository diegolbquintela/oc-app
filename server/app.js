const express = require('express');
const bodyParser = require('body-parser');

const transactionsRoutes = require('./routes/transactions-routes');
const usersRoutes = require('./routes/users-routes');

const app = express();

app.use('/api/users', usersRoutes);
app.use('/api/transactions', transactionsRoutes);

app.use((error, req, res, next) => {
  if (res.headerSent) {
    return next(error);
  }
  res
    .status(error.code || 500)
    .json({ message: error.message || 'An unknown error occurred' });
});

app.listen(8000);
