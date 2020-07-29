const express = require('express');
const router = express.Router();
const adminController = require('../controllers/admin');

router.get('/add-product', adminController.getAddPRoduct);

router.get('/products', adminController.getProducts);

router.post('/add-product', adminController.postAddProduct);

router.get('/edit-product/:productId', adminController.getEditProduct);

router.post('/edit-product', adminController.postEditProduct);

router.get('/delete-product/:productId', adminController.deleteProduct);

module.exports = router;
