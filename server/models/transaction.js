const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const transactionSchema = new Schema({
  ticker: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true },
  amount: { type: Number },
  date: { type: Date, default: Date.now },
  user: { type: String, required: true },
});

module.exports = mongoose.model('TRANSACTION', transactionSchema);
