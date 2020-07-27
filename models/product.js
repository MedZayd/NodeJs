const fs = require('fs');
const path = require('path');
const p = path.join(__dirname, '..', 'data', 'products.json');

const getProductsFromFile = (callback) => {
	fs.readFile(p, (err, data) => {
		if (err) {
			console.log(err);
			return callback([]);
		}
		callback(JSON.parse(data));
	});
};

module.exports = class Product {
	constructor(title) {
		this.title = title;
	}

	save() {
		getProductsFromFile((products) => {
			products.push(this);
			fs.writeFile(p, JSON.stringify(products), () => {});
		});
	}

	static fetchAll(callback) {
		getProductsFromFile(callback);
	}
};
