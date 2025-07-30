const express = require('express');
const router =express.Router();
//const path = require('path');

const shopController = require('../controllers/shop');

router.get('/', shopController.getIndex);

router.get('/products', shopController.getProducts);

router.get('/products/:productid', shopController.getProduct);
router.get('/categories/:categoryid', shopController.getProductsByCategoryId);

router.get('/card', shopController.getCard);
router.post('/card', shopController.postCard);

router.get('/orders', shopController.getOrders);

module.exports = router;
