const Product = require('../models/product');
const Cart = require('../models/cart');

exports.getProducts = (_, res) => {
	Product.findAll()
		.then((products) => {
			console.log(products);
			res.render('shop/product-list', {
				products,
				pageTitle: 'Products',
				path: '/products',
			});
		})
		.catch((err) => console.log(err));
};

exports.getIndex = (_, res) => {
	Product.findAll()
		.then((products) => {
			res.render('shop/index', {
				products,
				pageTitle: 'Shop',
				path: '/',
			});
		})
		.catch((err) => console.log(err));
};

exports.getProduct = (req, res) => {
	const {
		params: { productId },
	} = req;

	Product.findByPk(productId).then((product) => {
		if (!product) {
			console.log(product);
			return res.redirect('/404');
		}
		res.render('shop/product-detail', {
			product,
			pageTitle: product.title,
			path: '/products',
		});
	});
};

exports.getCart = (req, res) => {
	const { user } = req;
	user.getCart()
		.then((cart) => cart.getProducts())
		.then((products) => {
			const totalPrice = products
				.reduce((acc, product) => {
					let total = product.price * product.cartItem.quantity;
					return acc + total;
				}, 0)
				.toFixed(2);
			res.render('shop/cart', {
				pageTitle: 'Your Cart',
				path: '/cart',
				products,
				totalPrice,
			});
		})
		.catch((err) => console.log(err));
};

exports.postCart = (req, res) => {
	const {
		user,
		body: { productId },
	} = req;
	let userCart;
	let quantity = 1;
	user.getCart()
		.then((cart) => {
			userCart = cart;
			return cart.getProducts({ where: { id: +productId } });
		})
		.then((products) => {
			if (products.length > 0) {
				const oldQuantity = products[0].cartItem.quantity;
				quantity += oldQuantity;
				return products[0];
			}
			return Product.findByPk(productId);
		})
		.then((product) => {
			return userCart.addProduct(product, {
				through: { quantity },
			});
		})
		.then(() => res.redirect('/cart'))
		.catch((err) => console.log(err));
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

exports.getIncrementQuantity = (req, res) => {
	const {
		params: { productId },
		user,
	} = req;

	let userCart;
	let quantity = 1;
	user.getCart()
		.then((cart) => {
			userCart = cart;
			return cart.getProducts({ where: { id: productId } });
		})
		.then((products) => {
			if (products.length > 0) {
				const oldQuantity = products[0].cartItem.quantity;
				quantity += oldQuantity;
				return products[0];
			}
			return res.redirect('/404');
		})
		.then((product) => {
			return userCart.addProduct(product, {
				through: { quantity },
			});
		})
		.then(() => res.redirect('/cart'))
		.catch((err) => console.log(err));
};

exports.getDecrementQuantity = (req, res) => {
	const {
		params: { productId },
		user,
	} = req;

	let userCart;
	let quantity = 1;
	user.getCart()
		.then((cart) => {
			userCart = cart;
			return cart.getProducts({ where: { id: productId } });
		})
		.then((products) => {
			if (products.length > 0) {
				const oldQuantity = products[0].cartItem.quantity;
				quantity = oldQuantity - 1;
				if (quantity === 0) {
					return res.redirect('/cart/delete/' + productId);
				}
				return products[0];
			}
			return res.redirect('/404');
		})
		.then((product) => {
			return userCart.addProduct(product, {
				through: { quantity },
			});
		})
		.then(() => res.redirect('/cart'))
		.catch((err) => console.log(err));
};

exports.getDeleteProduct = (req, res) => {
	const {
		params: { productId },
		user,
	} = req;

	user.getCart()
		.then((cart) => {
			return cart
				.getProducts({ where: { id: productId } })
				.then((products) => {
					if (products.length === 1) {
						return products[0];
					}
					return res.redirect('/404');
				})
				.catch((err) => console.log(err));
		})
		.then((product) => product.cartItem.destroy())
		.then(() => res.redirect('/cart'))
		.catch((err) => console.log(err));
};
