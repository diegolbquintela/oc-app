const mongoose = require('mongoose');
const expressValidator = require('express-validator');

const HttpError = require('../models/http-error');
const Transaction = require('../models/transaction');
const User = require('../models/user');

exports.getTransactionsById = async (req, res, next) => {
  const transactionId = req.params.tid;

  let transaction;
  try {
    transaction = await Transaction.findById(transactionId);
  } catch (err) {
    return next(
      new HttpError('Something went wrong, could not find a transaction.', 500)
    );
  }

  if (!transaction) {
    return next(
      new HttpError('Could not find a transaction for the provided id.', 404)
    );
  }
  res.json({ transaction });
};

// Get all transactions by user id
exports.getTransactionsByUserId = async (req, res, next) => {
  const userId = req.params.uid;

  let transactions;
  try {
    transactions = await Transaction.find({ user: userId });
  } catch (err) {
    return next(
      new HttpError(
        'Fetching transactions failed, please try again later.',
        500
      )
    );
  }

  return res.status(200).json({
    success: true,
    transactions: transactions.map((transaction) =>
      transaction.toObject({ getters: true })
    ),
  });
};

exports.addTransaction = async (req, res, next) => {
  const errors = expressValidator.validationResult(req);
  if (!errors.isEmpty()) {
    res.status(422);
    return next(new HttpError('Invalid inputs passed.', 422));
  }

  const { ticker, price, quantity, date, user } = req.body;

  const createdTransaction = new Transaction({
    ticker,
    price,
    quantity,
    amount: price * quantity,
    date,
    user,
  });

  // check if user exists
  let creator;
  try {
    creator = await User.findById(user);
  } catch (error) {
    return next(
      new HttpError('Creating transaction failed, please try again', 500)
    );
  }

  if (!creator) {
    return next(new HttpError('Could not find user for provided id', 404));
  }

  try {
    const sess = await mongoose.startSession();
    sess.startTransaction();
    await createdTransaction.save({ session: sess });
    creator.transactions.push(createdTransaction);
    await creator.save({ session: sess });
    await sess.commitTransaction();
  } catch (err) {
    return next(
      new HttpError('Creating transaction failed, please try again.', 500)
    );
  }

  res.status(201).json({
    success: true,
    transaction: createdTransaction.toObject({ getters: true }),
  });
};

exports.updateTransactionById = async (req, res, next) => {
  const errors = expressValidator.validationResult(req);
  if (!errors.isEmpty()) {
    res.status(422);
    const error = new HttpError('Invalid inputs passed.', 422);
    return next(error);
  }

  const { price, quantity, date } = req.body;
  const transactionId = req.params.tid;

  let updatedTransaction;
  try {
    updatedTransaction = await Transaction.findById(transactionId);
  } catch (err) {
    return next(new HttpError('Transaction not found', 404));
  }

  updatedTransaction.price = price;
  updatedTransaction.quantity = quantity;
  updatedTransaction.amount = price * quantity;
  updatedTransaction.date = date;

  try {
    await updatedTransaction.save();
  } catch (err) {
    return next(
      new HttpError(
        'Something went wrong, could not updated the transaction.',
        500
      )
    );
  }

  res.status(200).json({
    success: true,
    transaction: updatedTransaction.toObject({ getters: true }),
  });
};

exports.deleteTransactionById = async (req, res, next) => {
  const transactionId = req.params.tid;

  let transaction;
  try {
    transaction = await Transaction.findById(transactionId).populate('user');
  } catch (err) {
    return next(
      new HttpError(
        'Something went wrong, could not delete the transaction.',
        500
      )
    );
  }

  if (!transaction) {
    return next(
      new HttpError('Could not find a transaction with the id provided.', 404)
    );
  }

  try {
    const sess = await mongoose.startSession();
    sess.startTransaction();
    await transaction.remove({ session: sess });
    transaction.user.transactions.pull(transaction);
    await transaction.user.save({ session: sess });
    await sess.commitTransaction();
  } catch (err) {
    return next(
      new HttpError(
        'Something went wrong, could not delete the transaction.',
        500
      )
    );
  }

  res.status(200).json({
    success: true,
    message: 'Deleted transaction.',
  });
};
