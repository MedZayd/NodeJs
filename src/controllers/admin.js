const Product = require('../models/product');
const Cart = require('../models/cart');

exports.getProducts = (_, res) => {
	Product.fetchAll()
		.then(([rows]) => {
			res.render('admin/products', {
				products: rows,
				pageTitle: 'Admin products',
				path: '/admin/products',
			});
		})
		.catch((err) => console.log(err));
};

exports.getAddProduct = (_, res) => {
	res.render('admin/edit-product', {
		pageTitle: 'Add Product',
		path: '/admin/add-product',
		edit: false,
	});
};

exports.postAddProduct = (req, res) => {
	const { title, description, image, price } = req.body;
	const product = new Product(null, title, description, image, price);
	product.save().then(([{ insertId }]) => {
		console.log(insertId);
		res.redirect('/admin/products');
	});
};

exports.getEditProduct = (req, res) => {
	const {
		params: { productId },
	} = req;

	Product.fetchById(productId).then(([rows]) => {
		if (rows.length === 0) {
			return res.redirect('/404');
		}
		res.render('admin/edit-product', {
			product: rows[0],
			pageTitle: 'Edit Product',
			path: '/admin/edit-product',
			edit: true,
		});
	});
};

exports.postEditProduct = (req, res) => {
	const { id, title, description, image, price } = req.body;
	const updatedProduct = new Product(id, title, description, image, price);
	updatedProduct.save().then(() => res.redirect('/admin/products'));
};

exports.deleteProduct = (req, res) => {
	const {
		params: { productId },
	} = req;
	Product.fetchById(productId, (product) => {
		Cart.deleteProduct(product, () => {
			Product.deleteById(productId, (deleted) => {
				if (!deleted) {
					return res.redirect('/404');
				}
				res.redirect('/admin/products');
			});
		});
	});
};
