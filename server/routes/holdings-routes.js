const express = require('express');

const holdingsControllers = require('../controllers/holdings-controllers');

const router = express.Router();

router.get('/:uid', holdingsControllers.getHoldings);

module.exports = router;
