const express = require('express');
const router =express.Router();
//const path = require('path');

const shopController = require('../controllers/shop');

router.get('/', shopController.getIndex);


router.get('/products', shopController.getProducts);


router.get('/details', shopController.getProductDetails);


router.get('/card', shopController.getCard);


router.get('/orders', shopController.getOrders);

module.exports = router;
