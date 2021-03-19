const ee = require('events');
const util = require('util');

let db_data = [
    {id: 1, name: 'Istomin I.O.', bday: '05-03-2001'},
    {id: 2, name: 'Romanitskiy V.A.', bday: '29-05-2000'},
    {id: 3, name: 'Harevich K.V.', bday: '29-06-2001'}
];

function DB() {
    this.get = () => {return db_data;}
    this.post = (r) => {db_data.push(r);}
    this.delete = (r) => {
        let index = db_data.findIndex(el => el.id == r);
        if (index > -1) db_data.splice(index, 1);
        else console.log('Index: ' + r + ' not found!');
    }
    this.put = (r) => {
        let index = db_data.findIndex(el => el.id == r.editId);
        if (index > -1) {
            if (r.id != '') db_data[index].id = r.id;

            if (r.name != '') db_data[index].name = r.name;

            if (r.bday != '') db_data[index].bday = r.bday;
        }
        else console.log(`Index ${r.editId} not found!`)
    }
    this.commit = () => console.log('Committed');
}

util.inherits(DB, ee.EventEmitter);
exports.DB = DB;