const sql = require('mssql/msnodesqlv8');

const config = {
  driver: 'msnodesqlv8',
  connectionString: 'Driver={SQL Server Native Client 11.0};Server={GUSIAZAZ};Database={NodeJs1414};Trusted_Connection={yes};',
};
let connectionPool;

class DB {
  constructor() {
    connectionPool = new sql.ConnectionPool(config).connect().then((pool) => {
      console.log('Connected to MSSQL');
      pool.request().query('use NodeJs1414; SET LANGUAGE ENGLISH;');
      return pool;
    }).catch((err) => console.log('Connection Failed: ', err));
  }

  Get(tab) {
    return connectionPool.then((pool) => pool.query(`SELECT * FROM ${tab}`));
  }

  GetOne(tab, id) {
    if (!id && id === '') throw 'GetOne: Check entered table id value';
    return connectionPool.then((pool) => pool.query(`SELECT * FROM ${tab} WHERE ${tab} = '${id}'`));
  }

  Insert(tab, fields) {
    return connectionPool.then((pool) => {
      console.log(`"${fields[tab]}"`);
      if (!fields[tab] && fields[tab] === '') throw 'Insert: Check entered table id value';
      const req = pool.request();
      let command = `INSERT INTO ${tab} values (`;
      Object.keys(fields).forEach((field) => {
        const fieldType = Number.isInteger(fields[field]) ? sql.Int : sql.NVarChar;
        req.input(field, fieldType, fields[field]);
        command += `@${field},`;
      });
      command = command.replace(/.$/, ')');
      return req.query(command);
    });
  }

  Update(tab, fields) {
    return connectionPool.then(async (pool) => {
      if (!fields[tab] && fields[tab] === '') throw 'Update: Check entered table id value';
      if (!Object.values(await this.GetOne(tab, Object.values(fields)[0]))[1].length) throw 'Update: Specified row not found';
      const req = pool.request();
      let command = `UPDATE ${tab} SET `;
      Object.keys(fields).forEach((field) => {
        const fieldType = Number.isInteger(fields[field]) ? sql.Int : sql.NVarChar;
        req.input(field, fieldType, fields[field]);
        if (!field.endsWith('Id')) command += `${field} = @${field},`;
      });
      command = command.slice(0, -1);
      command += ` WHERE ${tab} = @${tab}`;
      return req.query(command);
    });
  }

  Delete(tab, id) {
    return connectionPool.then((pool) => {
      if (!id && id === '') throw 'Delete: Check entered table id value';
      return pool.query(`DELETE FROM ${tab} WHERE ${tab} = '${id}'`);
    });
  }
}

module.exports = DB;
