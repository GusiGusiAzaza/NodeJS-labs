const AuditoriumType = require('../AuditoriumType/auditoriumType-model');
const Auditorium = require('../Auditorium/auditorium-model');
const Faculty = require('../Faculty/faculty-model');
const Pulpit = require('../Pulpit/pulpit-model');
const Subject = require('../Subject/subject-model');
const Teacher = require('../Teacher/teacher-model');

Faculty.findAll({
  include: [{
    model: Pulpit,
    as: 'pulpit_faculty',
    where: { FACULTY: 'IT' },
    required: true,
  }],
}).then((users) => {
  console.log(JSON.stringify(users, null, 4));
});

const findOne = async (table, id) => table.findByPk(id).then((user) => {
  if (!user) return null;
  return user;
}).catch((err) => {
  console.log(err);
  return { error: err };
});

const findAll = async (table) => table.findAll({ raw: true })
  .then((users) => users)
  .catch((err) => {
    console.log(err);
    return { error: err };
  });

const insertOne = async (table, obj) => table.create(obj)
  .then((res) => res.dataValues)
  .catch((err) => {
    console.log(`ERROR: ${err.original.message}`);
    return { error: err.original.message };
  });

const update = async (table, obj, condition) => table.update(obj, {
  where: condition,
}).then((res) => {
  if (JSON.stringify(res) === '[0]') return { error: 'Record not found' };
  return obj;
}).catch((err) => {
  console.log(`ERROR: ${err}`);
  return { error: err };
});

const remove = async (table, id, condition) => table.destroy({
  where: condition,
}).then((res) => {
  if (JSON.stringify(res) === '[0]') return { error: 'Record not found' };
  return { deletedRecord: id };
}).catch((err) => {
  console.log(`ERROR: ${err}`);
  return { error: err };
});

const checkFields = (tableName, fields) => {
  console.log('body:', fields);
  if (!fields[tableName] || fields[tableName] === '') throw 'Check entered table id value';
  Object.keys(fields).forEach((field) => {
    if (!fields[field] || fields[field] === '') throw 'Check entered table values. No empty fields allowed';
    fields[field] = fields[field].trim();
  });
};

class DB {
  async Get(tableName) {
    switch (tableName) {
      case 'FACULTY': return findAll(Faculty);
      case 'PULPIT': return findAll(Pulpit);
      case 'SUBJECT': return findAll(Subject);
      case 'AUDITORIUM_TYPE': return findAll(AuditoriumType);
      case 'AUDITORIUM': return findAll(Auditorium);
      default: return { errorCode: 404, errorMsg: 'GET: table not found' };
    }
  }

  async GetOne(tableName, id) {
    switch (tableName) {
      case 'FACULTY': return findOne(Faculty, id);
      case 'PULPIT': return findOne(Pulpit, id);
      case 'SUBJECT': return findOne(Subject, id);
      case 'AUDITORIUM_TYPE': return findOne(AuditoriumType, id);
      case 'AUDITORIUM': return findOne(Auditorium, id);
      default: return { errorCode: 404, errorMsg: 'POST: table not found' };
    }
  }

  async Insert(tableName, fields) {
    checkFields(tableName, fields);
    switch (tableName) {
      case 'FACULTY': return insertOne(Faculty, fields);
      case 'PULPIT': return insertOne(Pulpit, fields);
      case 'SUBJECT': return insertOne(Subject, fields);
      case 'AUDITORIUM_TYPE': return insertOne(AuditoriumType, fields);
      case 'AUDITORIUM': return insertOne(Auditorium, fields);
      default: return { errorCode: 404, errorMsg: 'POST: table not found' };
    }
  }

  async Update(tableName, fields) {
    checkFields(tableName, fields);
    const condition = {};
    condition[`${tableName}`] = Object.values(fields)[0];
    switch (tableName) {
      case 'FACULTY': return update(Faculty, fields, condition);
      case 'PULPIT': return update(Pulpit, fields, condition);
      case 'SUBJECT': return update(Subject, fields, condition);
      case 'AUDITORIUM_TYPE': return update(AuditoriumType, fields, condition);
      case 'AUDITORIUM': return update(Auditorium, fields, condition);
      default: return { errorCode: 404, errorMsg: 'UPDATE: table not found' };
    }
  }

  async Delete(tableName, id) {
    if (!id && id === '') throw 'Delete: Check entered table id value';
    const condition = {};
    condition[`${tableName}`] = id;
    console.log(condition);
    switch (tableName) {
      case 'FACULTY': return remove(Faculty, id, condition);
      case 'PULPIT': return remove(Pulpit, id, condition);
      case 'SUBJECT': return remove(Subject, id, condition);
      case 'AUDITORIUM_TYPE': return remove(AuditoriumType, id, condition);
      case 'AUDITORIUM': return remove(Auditorium, id, condition);
      default: return { errorCode: 404, errorMsg: 'DELETE: table not found' };
    }
  }
}

module.exports = DB;
