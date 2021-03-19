const sequelize = (Sequelize) => {
  const sql = new Sequelize('NodeJs1414', 'gusi', 'qwerty1337', {
    dialect: 'mssql',
    dialectOptions: {
      connectionString: 'Driver={SQL Server Native Client 11.0};Server=localhost\\GUSIGUSI;',
    },
    port: 1433,
    pool: {
      max: 5,
      min: 0,
      idle: 10000,
    },
    logging: false,
  });
  sql
    .authenticate()
    .then(() => {
      console.log('Connected successfully to mssql.');
    }, (error) => {
      console.log('Connection to mssql failed.', error);
    });
  return sql;
};

module.exports = sequelize;
