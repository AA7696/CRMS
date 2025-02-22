
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('crm', 'root', 'Ninteen95@', {
    host: 'localhost',
    dialect: 'mysql'
});

module.exports = sequelize;
