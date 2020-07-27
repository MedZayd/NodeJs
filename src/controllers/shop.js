const Product = require('../models/product');

exports.getProducts = (_, res) => {
	Product.fetchAll((products) => {
		res.render('shop/product-list', {
			products,
			pageTitle: 'All Products',
			path: '/products',
		});
	});
};

exports.getIndex = (_, res) => {
	Product.fetchAll((products) => {
		res.render('shop/index', {
			products,
			pageTitle: 'Shop',
			path: '/',
		});
	});
};

exports.getCart = (_, res) => {
	res.render('shop/cart', {
		pageTitle: 'Your Cart',
		path: '/cart',
	});
};

exports.getOrders = (_, res) => {
	res.render('shop/orders', {
		pageTitle: 'Your Cart',
		path: '/orders',
	});
};

exports.getCheckout = (_, res) => {
	res.render('shop/checkout', {
		pageTitle: 'Checkout',
		path: '/checkout',
	});
};

exports.getProduct = (req, res) => {
	const {
		params: { productId },
	} = req;

	Product.fetchById(productId, (product) => {
		console.log(product);
		if (product) {
			res.render('shop/product-detail', {
				product,
				pageTitle: 'Product detail',
				path: '/products',
			});
		} else {
			res.redirect('/404');
		}
	});
};
