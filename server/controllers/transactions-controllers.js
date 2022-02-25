const HttpError = require('../models/http-error');

const DUMMY_TRANSACTIONS = [
  {
    id: 't1',
    ticker: 'PLTR',
    price: 10,
    quantity: 10,
    date: '02/27/2022',
    user: 'u1',
  },
];

// Get all transactions
exports.getTransactions = async (req, res, next) => {
  try {
    const transactions = await DUMMY_TRANSACTIONS; // TODO:needs fix when added mongodb

    return res.status(200).json({
      success: true,
      count: transactions.length,
      data: transactions,
    });
  } catch (err) {
    next(new HttpError('Could not find transactions.', 500));
  }
};

exports.addTransaction = async (req, res, next) => {
  try {
    // TODO:add date later
    const { ticker, price, quantity } = req.body;
    const transaction = await DUMMY_TRANSACTIONS.push(req.body);

    return res.status(201).json({
      success: true,
      data: transaction,
    });
  } catch (err) {
    next(new HttpError('Could not add the transaction.', 500));
  }
};

exports.updateTransactionById = async (req, res, next) => {};

exports.deleteTransactionById = async (req, res, next) => {};
