const express = require('express');
const router =express.Router();
const shopController = require('../controllers/shop');
const isAuthenticated = require('../middleware/authentication');
const csrf = require('../middleware/csrf');

router.get('/', csrf, shopController.getIndex);

router.get('/products', csrf, shopController.getProducts);

router.get('/products/:productid', csrf, shopController.getProduct);
router.get('/categories/:categoryid', csrf, shopController.getProductsByCategoryId);

router.get('/card', csrf, isAuthenticated, shopController.getCard);
router.post('/card', csrf, isAuthenticated, shopController.postCard);

router.post('/delete-carditem', csrf, isAuthenticated, shopController.postCardItemDelete);

router.get('/orders', csrf, isAuthenticated, shopController.getOrders);
router.post('/create-order', csrf, isAuthenticated, shopController.postOrder);

module.exports = router;
