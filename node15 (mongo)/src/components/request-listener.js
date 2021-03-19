const url = require('url');
const httpStatus = require('http-status');
const Faculty = require('../models/faculty.model');
const Pulpit = require('../models/pulpit.model');

const notFound = (res) => {
  res.statusCode = 404;
  res.end(httpStatus['404_MESSAGE']);
};

const sendJsonError = (res, code, msg) => {
  res.statusCode = code;
  res.end(JSON.stringify({ error: code, message: msg }));
};

const requestListener = async (req, res) => {
  const urn = decodeURI(url.parse(req.url).pathname);
  const pathname = decodeURI(`${urn.split('/')[1]}/${urn.split('/')[2]}`);
  const name = decodeURI(urn.split('/')[3]);
  let data;

  if (req.method === 'GET') { //                GET
    if (urn === '/api/faculties') { //            /api/faculties
      const faculties = await Faculty.find({});
      const result = faculties.map(Faculty.toResponse);
      res.end(JSON.stringify(result, null, 4));
    } else if (urn === '/api/pulpits') { //       /api/pulpits
      const pulpits = await Pulpit.find({});
      const result = pulpits.map(Pulpit.toResponse);
      res.end(JSON.stringify(result, null, 4));
    } else notFound(res);
  } else if (req.method === 'POST') { //        POST
    if (urn === '/api/faculties') { //            /api/faculties
      req.on('data', (chunk) => {
        data += chunk;
      });
      req.on('end', async () => {
        data = data.replace('undefined', '');
        const { faculty, faculty_name } = JSON.parse(data);
        if (await Faculty.findOne({ faculty })) sendJsonError(res, 405, 'POST: Faculty already exists');
        else {
          const newFaculty = {
            faculty,
            faculty_name,
          };
          Faculty.create(newFaculty);
          res.end(JSON.stringify(newFaculty));
        }
      });
    } else if (urn === '/api/pulpits') { //       /api/pulpits
      req.on('data', (chunk) => {
        data += chunk;
      });
      req.on('end', async () => {
        data = data.replace('undefined', '');
        const { pulpit, pulpit_name, faculty } = JSON.parse(data);
        if (await Pulpit.findOne({ pulpit })) sendJsonError(res, 405, 'POST: Pulpit already exists');
        else {
          const newPulpit = {
            pulpit,
            pulpit_name,
            faculty,
          };
          Pulpit.create(newPulpit);
          res.end(JSON.stringify(newPulpit));
        }
      });
    } else notFound(res);
  } else if (req.method === 'PUT') { //         PUT
    if (urn === '/api/faculties') { //            /api/faculties
      req.on('data', (chunk) => {
        data += chunk;
      });
      req.on('end', async () => {
        data = data.replace('undefined', '');
        const { faculty, faculty_name } = JSON.parse(data);
        if (await Faculty.findOne({ faculty })) {
          await Faculty.updateOne({ faculty }, { faculty, faculty_name });
          res.end(JSON.stringify({ faculty, faculty_name }));
        } else sendJsonError(res, 404, 'PUT: Faculty not found');
      });
    } else if (urn === '/api/pulpits') { //       /api/pulpits
      req.on('data', (chunk) => {
        data += chunk;
      });
      req.on('end', async () => {
        data = data.replace('undefined', '');
        const { pulpit, pulpit_name, faculty } = JSON.parse(data);
        if (await Pulpit.findOne({ pulpit })) {
          await Pulpit.updateOne({ pulpit }, { pulpit, pulpit_name, faculty });
          res.end(JSON.stringify({ pulpit, pulpit_name, faculty }));
        } else sendJsonError(res, 404, 'PUT: Pulpit not found');
      });
    } else notFound(res);
  } else if (req.method === 'DELETE') { //      DELETE
    if (pathname === 'api/faculties' && /^[a-zA-Zа-яА-Я0-9_.-]*$/.test(name)) {
      const del = await Faculty.findOne({ faculty: name });
      if (del) {
        await Faculty.deleteOne({ faculty: name });
        res.end(JSON.stringify(del, null, 4));
      } else sendJsonError(res, 404, 'DELETE: Faculty not found');
    } else if (pathname === 'api/pulpits' && /^[a-zA-Zа-яА-Я0-9_.-]*$/.test(name)) {
      const del = await Pulpit.findOne({ pulpit: name });
      if (del) {
        await Pulpit.deleteOne({ pulpit: name });
        res.end(JSON.stringify(del, null, 4));
      } else sendJsonError(res, 404, 'DELETE: Faculty not found');
    } else notFound(res);
  } else {
    res.statusCode = 405;
    res.end(httpStatus['405_MESSAGE']);
  }
};

module.exports = requestListener;
