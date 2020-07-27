const Product = require('../models/product');

exports.getAddPRoduct = (_, res) => {
	res.render('add-product', {
		pageTitle: 'Add Product',
		path: '/admin/add-product',
	});
};

exports.postAddProduct = (req, res) => {
	const { title } = req.body;
	const product = new Product(title);
	product.save();
	res.redirect('/');
};

exports.getProducts = (_, res) => {
	const products = Product.fetchAll();
	res.render('shop', {
		products,
		pageTitle: 'My Shopify',
		path: '/',
	});
};
