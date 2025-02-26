
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('crm', 'root', 'achu7696', {
    host: 'localhost',
    dialect: 'mysql'
});

module.exports = sequelize;
