const Product = require('../models/product');

exports.getProducts = (req, res) => {
	req.user
		.getProducts()
		.then((products) => {
			res.render('admin/products', {
				products,
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
	req.user
		.createProduct({
			title,
			price,
			image,
			description,
		})
		.then(() => {
			res.redirect('/admin/products');
		})
		.catch((err) => console.log(err));
};

exports.getEditProduct = (req, res) => {
	const {
		params: { productId },
		user,
	} = req;
	user.getProducts({ where: { id: productId } })
		//	Product.findByPk(productId)
		.then((products) => {
			if (!products.length === 0) {
				return res.redirect('/404');
			}
			res.render('admin/edit-product', {
				product: products[0],
				pageTitle: 'Edit Product',
				path: '/admin/edit-product',
				edit: true,
			});
		});
};

exports.postEditProduct = (req, res) => {
	const { id, title, description, image, price } = req.body;
	Product.update(
		{ title, description, image, price },
		{
			where: {
				id,
			},
		}
	)
		.then((response) => {
			res.redirect('/admin/products');
		})
		.catch((err) => console.log(err));
};

exports.deleteProduct = (req, res) => {
	const {
		params: { productId },
	} = req;
	Product.destroy({
		where: {
			id: productId,
		},
	})
		.then((response) => {
			res.redirect('/admin/products');
		})
		.catch((err) => console.log(err));
};
