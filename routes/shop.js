const express = require('express');
const router =express.Router();
const shopController = require('../controllers/shop');
const isAuthenticated = require('../middleware/authentication');

router.get('/', shopController.getIndex);

router.get('/products', shopController.getProducts);

router.get('/products/:productid', shopController.getProduct);
router.get('/categories/:categoryid', shopController.getProductsByCategoryId);

router.get('/card', isAuthenticated, shopController.getCard);
router.post('/card', isAuthenticated, shopController.postCard);

router.post('/delete-carditem', isAuthenticated, shopController.postCardItemDelete);

router.get('/orders', isAuthenticated, shopController.getOrders);
router.post('/create-order', isAuthenticated, shopController.postOrder);

module.exports = router;
