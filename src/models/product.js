const fs = require('fs');
const path = require('path');
const p = path.join(__dirname, '..', 'data', 'products.json');
const { v1: uuidv1 } = require('uuid');

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
	constructor(title, description, image, price) {
		this.title = title;
		this.description = description;
		this.image = image;
		this.price = price;
	}

	save() {
		this.id = uuidv1().toString();
		getProductsFromFile((products) => {
			products.push(this);
			fs.writeFile(p, JSON.stringify(products), () => {});
		});
	}

	static fetchAll(callback) {
		getProductsFromFile(callback);
	}

	static fetchById(id, callback) {
		getProductsFromFile((products) => {
			const product = products.find((p) => p.id === id);
			callback(product);
		});
	}
};
