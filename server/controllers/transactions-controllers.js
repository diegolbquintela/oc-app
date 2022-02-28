const HttpError = require('../models/http-error');
const Transaction = require('../models/transaction');

let DUMMY_TRANSACTIONS = [
  {
    id: 't1',
    ticker: 'PLTR',
    price: 10,
    quantity: 10,
    date: '02/27/2022',
    user: 'u1',
  },
];

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
  const { ticker, price, quantity, date, user } = req.body;

  const createdTransaction = new Transaction({
    ticker,
    price,
    quantity,
    date,
    user,
  });

  try {
    await createdTransaction.save();
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
  const { price, quantity, date } = req.body;
  const transactionId = req.params.tid;

  let updatedTransaction;
  let transactionIndex;
  try {
    updatedTransaction = await Transaction.findById(transactionId);
  } catch (err) {
    return next(new HttpError('Transaction not found', 404));
  }

  updatedTransaction.price = price;
  updatedTransaction.quantity = quantity;
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
    transaction = await Transaction.findById(transactionId);
  } catch (err) {
    return next(
      new HttpError(
        'Something went wrong, could not delete the transaction.',
        500
      )
    );
  }

  try {
    transaction.remove();
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
    message: 'Deleted transaction.',
  });
};
