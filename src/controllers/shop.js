const Product = require('../models/product');
const Cart = require('../models/cart');

exports.getProducts = (_, res) => {
	Product.fetchAll()
		.then(([rows]) => {
			res.render('shop/product-list', {
				products: rows,
				pageTitle: 'Products',
				path: '/products',
			});
		})
		.catch((err) => console.log(err));
};

exports.getIndex = (_, res) => {
	Product.fetchAll()
		.then(([rows]) => {
			res.render('shop/index', {
				products: rows,
				pageTitle: 'Shop',
				path: '/',
			});
		})
		.catch((err) => console.log(err));
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

	Product.fetchById(productId).then(([rows]) => {
		if (rows.length === 0) {
			return res.redirect('/404');
		}
		res.render('shop/product-detail', {
			product: rows[0],
			pageTitle: 'Product detail',
			path: '/products',
		});
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
