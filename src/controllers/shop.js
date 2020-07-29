const Product = require('../models/product');
const Cart = require('../models/cart');

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
	Cart.fetchCart((cart) => {
		Product.fetchAll((products) => {
			const cartProducts = [];
			for (product of products) {
				const p = cart.products.find((e) => e.id === product.id);
				if (p) {
					cartProducts.push({ ...product, quantity: p.quantity });
				}
			}
			res.render('shop/cart', {
				pageTitle: 'Your Cart',
				path: '/cart',
				products: cartProducts,
				totalPrice: cart.totalPrice,
			});
		});
	});
};

exports.postCart = (req, res) => {
	const { productId } = req.body;
	Product.fetchById(productId, (product) => {
		if (product) {
			Cart.addProduct(product.id, product.price, () => {
				res.redirect('/cart');
			});
		} else {
			res.redirect('/404');
		}
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

exports.getIncrementQuantity = (req, res) => {
	const {
		params: { productId },
	} = req;

	Product.fetchById(productId, (product) => {
		if (product) {
			Cart.addProduct(product.id, product.price, () => {
				res.redirect('/cart');
			});
		} else {
			res.redirect('/404');
		}
	});
};

exports.getDecrementQuantity = (req, res) => {
	const {
		params: { productId },
	} = req;

	Product.fetchById(productId, (product) => {
		if (product) {
			Cart.decrement(product.id, product.price, () => {
				res.redirect('/cart');
			});
		} else {
			res.redirect('/404');
		}
	});
};

exports.getDeleteProduct = (req, res) => {
	const {
		params: { productId },
	} = req;

	Product.fetchById(productId, (product) => {
		if (product) {
			Cart.deleteProduct(product, () => {
				res.redirect('/cart');
			});
		} else {
			res.redirect('/404');
		}
	});
};
