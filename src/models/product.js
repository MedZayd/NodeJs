const fs = require('fs');
const path = require('path');
const p = path.join(__dirname, '..', 'data', 'products.json');
const { v1: uuidv1 } = require('uuid');
const helpers = require('../utils/helpers');

module.exports = class Product {
	constructor(id, title, description, image, price) {
		this.id = id;
		this.title = title;
		this.description = description;
		this.image = image;
		this.price = price;
	}

	save() {
		helpers.getProductsFromFile((products) => {
			if (this.id) {
				const existingProductIndex = products.findIndex(
					(p) => p.id === this.id
				);
				const udpatedProducts = [...products];
				udpatedProducts[existingProductIndex] = this;
				fs.writeFile(p, JSON.stringify(udpatedProducts), () => {});
			} else {
				this.id = uuidv1().toString();
				products.push(this);
				fs.writeFile(p, JSON.stringify(products), () => {});
			}
		});
	}

	delete() {}

	static fetchAll(callback) {
		helpers.getProductsFromFile(callback);
	}

	static fetchById(id, callback) {
		helpers.getProductsFromFile((products) => {
			const product = products.find((p) => p.id === id);
			callback(product);
		});
	}

	static deleteById(id, callback) {
		console.log({ id });
		helpers.getProductsFromFile((products) => {
			const existingProductIndex = products.findIndex((p) => p.id === id);
			console.log({ existingProductIndex });
			if (existingProductIndex === -1) {
				return callback(false);
			}
			const updatedProducts = products.filter(
				(product) => product.id !== id
			);
			console.log({ updatedProducts });
			fs.writeFile(p, JSON.stringify(updatedProducts), () => {});
			callback(true);
		});
	}
};
