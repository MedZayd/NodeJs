const express = require('express');
const bodyParser = require('body-parser');
const adminRoutes = require('./src/routes/admin');
const shopRoutes = require('./src/routes/shop');
const path = require('path');
const errorControllers = require('./src/controllers/error');
const db = require('./src/utils/database');

const app = express();

app.set('view engine', 'pug');
app.set('views', 'src/views');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorControllers.get404);

app.listen(3000);
