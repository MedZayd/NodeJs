const express = require('express');
const shopController = require('../controllers/shop');

const router = express.Router();

router.get('/', shopController.getIndex);

router.get('/products', shopController.getProducts);

router.get('/products/:productId', shopController.getProduct);

router.get('/cart', shopController.getCart);

router.post('/cart', shopController.postCart);

router.get(
	'/cart/increment-quantity/:productId',
	shopController.getIncrementQuantity
);

router.get(
	'/cart/decrement-quantity/:productId',
	shopController.getDecrementQuantity
);

router.get('/cart/delete/:productId', shopController.getDeleteProduct);

router.get('/orders', shopController.getOrders);

router.get('/checkout', shopController.getCheckout);

router.post('/create-order', shopController.postOrder);

module.exports = router;
