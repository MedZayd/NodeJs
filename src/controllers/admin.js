const Product = require('../models/product');

exports.getAddPRoduct = (_, res) => {
	res.render('admin/add-product', {
		pageTitle: 'Add Product',
		path: '/admin/add-product',
	});
};

exports.postAddProduct = (req, res) => {
	const { title, description, image, price } = req.body;
	const product = new Product(title, description, image, price);
	product.save();
	res.redirect('/');
};

exports.getProducts = (_, res) => {
	Product.fetchAll((products) => {
		res.render('admin/products', {
			products,
			pageTitle: 'Admin products',
			path: '/admin/products',
		});
	});
};
