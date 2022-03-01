const express = require('express');

const transactionsControllers = require('../controllers/transactions-controllers');

const router = express.Router();

router.get('/:uid', transactionsControllers.getTransactionsByUserId);

router.get('/:uid/:tid', transactionsControllers.getTransactionsById);

router.post('/', transactionsControllers.addTransaction);

router.patch('/:uid/:tid', transactionsControllers.updateTransactionById);

router.delete('/:uid/:tid', transactionsControllers.deleteTransactionById);

module.exports = router;
