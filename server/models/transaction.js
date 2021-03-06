const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const transactionSchema = new Schema({
  ticker: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true },
  amount: { type: Number },
  date: { type: Date, default: Date.now },
  user: { type: mongoose.Types.ObjectId, required: true, ref: 'User' },
});

module.exports = mongoose.model('Transaction', transactionSchema);
