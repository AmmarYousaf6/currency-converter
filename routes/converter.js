var express = require('express');
var router = express.Router();
var converterController = require('../controller/converterController');

router.get('/get-exchange-rates',converterController.getExchangeRates);
router.get('/send-transactions',converterController.transformTransactions);

module.exports = router;
