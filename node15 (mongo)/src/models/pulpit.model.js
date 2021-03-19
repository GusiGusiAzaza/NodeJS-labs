const mongoose = require('mongoose');

const pulpitSchema = new mongoose.Schema({
  pulpit: String,
  pulpit_name: String,
  faculty: String,
});

pulpitSchema.statics.toResponse = ({
  id,
  pulpit,
  pulpit_name,
  faculty,
}) => ({
  id, pulpit, pulpit_name, faculty,
});

const Pulpit = mongoose.model('Pulpit', pulpitSchema);

module.exports = Pulpit;
