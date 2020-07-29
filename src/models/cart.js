const heplers = require('../utils/helpers');

module.exports = class Cart {
	static fetchCart(callback) {
		heplers.getCartFromFile((cart) => {
			callback(cart);
		});
	}

	static addProduct(id, price, callback) {
		heplers.getCartFromFile((cart) => {
			const existingProductIndex = cart.products.findIndex(
				(p) => p.id === id
			);
			const existingProduct = cart.products[existingProductIndex];
			let updatedProduct;
			if (existingProduct) {
				updatedProduct = {
					...existingProduct,
					quantity: existingProduct.quantity + 1,
				};
				cart.products = [...cart.products];
				cart.products[existingProductIndex] = updatedProduct;
			} else {
				updatedProduct = {
					id,
					quantity: 1,
				};
				cart.products = [...cart.products, updatedProduct];
			}
			cart.totalPrice = (+cart.totalPrice + +price).toFixed(2);
			heplers.updateCart(cart, callback);
		});
	}

	static decrement(id, price, callback) {
		heplers.getCartFromFile((cart) => {
			const existingProductIndex = cart.products.findIndex(
				(p) => p.id === id
			);
			const existingProduct = cart.products[existingProductIndex];
			let updatedProduct;
			if (existingProduct) {
				updatedProduct = {
					...existingProduct,
					quantity: existingProduct.quantity - 1,
				};
				cart.products = [...cart.products];
				cart.products[existingProductIndex] = updatedProduct;
			}
			cart.totalPrice = (+cart.totalPrice - +price).toFixed(2);
			heplers.updateCart(cart, callback);
		});
	}

	static deleteProduct(product, callback) {
		heplers.getCartFromFile((cart) => {
			const existingProductIndex = cart.products.findIndex(
				(p) => p.id === product.id
			);
			if (existingProductIndex === -1) {
				return callback();
			}
			let products = [...cart.products];
			const cartProduct = products[existingProductIndex];
			const totalPrice =
				cart.totalPrice -
				cartProduct.quantity * parseFloat(product.price).toFixed(2);
			products = products.filter((p) => p.id !== product.id);
			const updatedCart = { products, totalPrice: totalPrice.toFixed(2) };
			heplers.updateCart(updatedCart, callback);
		});
	}
};
