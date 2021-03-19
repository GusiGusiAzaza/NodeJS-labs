const sql = require('mssql/msnodesqlv8');

let connectionPool;
const config = {
  driver: 'msnodesqlv8',
  connectionString: 'Driver={SQL Server Native Client 11.0};Server={GUSIGUSI};Database={NodeJs14};Trusted_Connection={yes};',
};

class DB {
  constructor() {
    connectionPool = new sql.ConnectionPool(config).connect().then((pool) => {
      console.log('Connected to MSSQL');
      pool.request().query('use NodeJs14; SET LANGUAGE ENGLISH;');
      return pool;
    })
      .catch((err) => console.log('Connection Failed: ', err));
  }

  query = async (sqlQuery) => connectionPool.then((pool) => {
      const req = pool.request();
      return req.query(sqlQuery);
    })
      .then((res) => res.recordset);

  GetField = async (tab, field) => {
    return connectionPool.then((pool) => {
      const req = pool.request();
      const command = `SELECT TOP(1) * FROM ${tab} WHERE ${tab} = '${field}'`;
      return req.query(command);
    })
      .then((res) => {
        return res.recordset;
      });
  }

  InsertField = async (tableName, fields) => {
    return connectionPool.then((pool) => {
      const request = pool.request();
      let command = `INSERT INTO ${tableName} values (`;
      Object.keys(fields).forEach((field) => {
        const fieldType = Number.isInteger(fields[field]) ? sql.Int : sql.NVarChar;
        request.input(field, fieldType, fields[field]);
        command += `@${field},`;
      });
      command = command.replace(/.$/, ')');
      return request.query(command);
    });
  }

  UpdateField = async (tab, fields) => {
    return connectionPool.then((pool) => {
      const idField = tab;
      if (!fields[idField]) throw `There are no Id value has been provided. Example: ${tab}`;

      const req = pool.request();
      let command = `UPDATE ${tab} SET `;
      Object.keys(fields).forEach((field) => {
        const fieldType = Number.isInteger(fields[field]) ? sql.Int : sql.NVarChar;
        req.input(field, fieldType, fields[field]);
        if (!field.endsWith('ID')) {
          command += `${field} = @${field},`;
        }
      });
      command = command.slice(0, -1);
      command += ` WHERE ${idField} = @${idField}`;
      return req.query(command);
    });
  }

  DeleteField = async (tableName, id) => {
    return connectionPool.then((pool) => {
      if (!id) throw `There is no Id value has been provided. ${tableName}: ${id}`;
      return pool.request().query(`DELETE FROM ${tableName} WHERE ${tableName} = '${id}'`);
    });
  }
}

module.exports = DB;
