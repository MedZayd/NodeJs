const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('node-complete', 'root', 'toor', {
	host: 'localhost',
	dialect: 'mysql',
});

module.exports = sequelize;
