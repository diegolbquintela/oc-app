const express = require('express');
const expressValidator = require('express-validator');

const transactionsControllers = require('../controllers/transactions-controllers');

const router = express.Router();

router.get('/:uid', transactionsControllers.getTransactionsByUserId);

router.get('/:uid/:tid', transactionsControllers.getTransactionsById);

router.post(
  '/',
  [
    expressValidator.check('ticker').not().isEmpty(),
    expressValidator.check('price').not().isEmpty(),
    expressValidator.check('quantity').not().isEmpty(),
  ],
  transactionsControllers.addTransaction
);

router.patch('/:uid/:tid', transactionsControllers.updateTransactionById);

router.delete('/:uid/:tid', transactionsControllers.deleteTransactionById);

module.exports = router;
