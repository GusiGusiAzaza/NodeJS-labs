const Sequelize = require('sequelize');

const sequelize = new Sequelize('NodeJs1414', 'gusigusi', 'qwerty1337', {
    dialect: 'mssql',
    dialectOptions: {
        connectionString: 'Driver={SQL Server Native Client 11.0};Server=localhost\\GUSIGUSI;'
    },
    port: 1433,
    pool: {
        max: 5,
        min: 0,
        idle: 10000
    },
    logging: false
});
module.exports = { sequelize: sequelize, Sequelize: Sequelize };
