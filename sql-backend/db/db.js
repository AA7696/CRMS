
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('crm', 'root', 'Neha@100', {
    host: 'localhost',
    dialect: 'mysql'
});

module.exports = sequelize;
