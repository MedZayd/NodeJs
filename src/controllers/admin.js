const Product = require('../models/product');
const Cart = require('../models/cart');

exports.getAddPRoduct = (_, res) => {
	res.render('admin/edit-product', {
		pageTitle: 'Add Product',
		path: '/admin/add-product',
		edit: false,
	});
};

exports.postAddProduct = (req, res) => {
	const { title, description, image, price } = req.body;
	const product = new Product(null, title, description, image, price);
	product.save();
	res.redirect('/admin/products');
};

exports.getEditProduct = (req, res) => {
	const {
		params: { productId },
	} = req;
	Product.fetchById(productId, (product) => {
		if (!product) {
			return res.redirect('/404');
		}
		res.render('admin/edit-product', {
			pageTitle: 'Add Product',
			path: '/admin/edit-product',
			edit: true,
			product,
		});
	});
};

exports.postEditProduct = (req, res) => {
	const { id, title, description, image, price } = req.body;
	const updatedProduct = new Product(id, title, description, image, price);
	updatedProduct.save();
	res.redirect('/admin/products');
};

exports.getProducts = (_, res) => {
	Product.fetchAll((products) => {
		res.render('admin/products', {
			products,
			pageTitle: 'Admin products',
			path: '/admin/products',
		});
	});
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
