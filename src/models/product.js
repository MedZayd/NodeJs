const db = require('../utils/database');

module.exports = class Product {
	constructor(id, title, description, image, price) {
		this.id = id;
		this.title = title;
		this.description = description;
		this.image = image;
		this.price = price;
	}

	save() {
		if (this.id) {
			return db.execute(
				'UPDATE products SET title=?, price=?, description=?, image=? WHERE id=?',
				[this.title, this.price, this.description, this.image, this.id]
			);
		}
		return db.execute(
			'INSERT INTO products (title, price, description, image) VALUES (?, ?, ?, ?)',
			[this.title, this.price, this.description, this.image]
		);
	}

	static fetchAll() {
		return db.execute('SELECT * FROM products');
	}

	static fetchById(id) {
		return db.execute('SELECT * FROM products WHERE id = ?', [id]);
	}

	static deleteById(id) {
		return db.execute('DELETE FROM products WHERE id = ?', [id]);
	}
};
