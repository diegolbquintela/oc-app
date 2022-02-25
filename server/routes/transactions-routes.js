const express = require('express');

const HttpError = require('../models/http-error');
const transactionsControllers = require('../controllers/transactions-controllers');

const router = express.Router();

router.get('/', transactionsControllers.getTransactions);

router.post('/', transactionsControllers.addTransaction);

router.patch('/:tid', transactionsControllers.updateTransactionById);

router.delete('/:tid', transactionsControllers.deleteTransactionById);

module.exports = router;
