const express = require('express');
const bodyParser = require('body-parser');
const adminData = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const path = require('path');
const rootDir = require('./util/path');
const expressHbs = require('express-handlebars');

const app = express();

app.engine('.hbs', expressHbs({ extname: '.hbs' }));
app.set('view engine', '.hbs');
app.set('views', 'views');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(rootDir, 'public')));

app.use('/admin', adminData.routes);
app.use(shopRoutes);

app.use((req, res) => {
	res.status(404).render('404', { pageTitle: '404' });
});

app.listen(3000);
