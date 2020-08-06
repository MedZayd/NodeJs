const express = require('express');
const bodyParser = require('body-parser');
const adminRoutes = require('./src/routes/admin');
const shopRoutes = require('./src/routes/shop');
const path = require('path');
const errorControllers = require('./src/controllers/error');
const sequelize = require('./src/utils/database');
const Product = require('./src/models/product');
const User = require('./src/models/user');
const Cart = require('./src/models/cart');
const CartItem = require('./src/models/cartItem');
const Order = require('./src/models/order');
const OrderItem = require('./src/models/orderItems');

const app = express();

app.set('view engine', 'pug');
app.set('views', 'src/views');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, _, next) => {
	User.findByPk(1)
		.then((user) => {
			req.user = user;
			next();
		})
		.catch((err) => console.log(err));
});

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorControllers.get404);

Product.belongsTo(User, { constraints: true, onDelete: 'CASCADE' });
User.hasMany(Product);

Cart.belongsTo(User);
User.hasOne(Cart);

Cart.belongsToMany(Product, { through: CartItem });
Product.belongsToMany(Cart, { through: CartItem });

Order.belongsTo(User);
User.hasMany(Order);

Order.belongsToMany(Product, { through: OrderItem });

sequelize
	// .sync({ force: true })
	.sync()
	.then(() => {
		return User.findByPk(1);
	})
	.then((user) => {
		if (!user) {
			return User.create({ name: 'Zayd', email: 'med@gmail.com' });
		}
		return user;
	})
	.then((user) => {
		return user.createCart();
	})
	.then(() => app.listen(3000))
	.catch((err) => {
		console.log(err);
	});
