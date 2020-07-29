const fs = require('fs');
const path = require('path');
const p = path.join(__dirname, '..', 'data', 'products.json');
const c = path.join(__dirname, '..', 'data', 'cart.json');

exports.getProductsFromFile = (callback) => {
	fs.readFile(p, (err, data) => {
		if (err) {
			console.log(err);
			return callback([]);
		}
		callback(JSON.parse(data));
	});
};

exports.getCartFromFile = (callback) => {
	fs.readFile(c, (err, data) => {
		if (err) {
			console.log(err);
			return callback({ products: [], totalPrice: 0 });
		}
		callback(JSON.parse(data));
	});
};

exports.updateCart = (cart, callback) => {
	fs.writeFile(c, JSON.stringify(cart), (err) => {
		callback(err);
	});
};
