const mongoose = require('mongoose');

const facultySchema = new mongoose.Schema({
  faculty: String,
  faculty_name: String,
});

facultySchema.statics.toResponse = ({
  id,
  faculty,
  faculty_name,
}) => ({
  id, faculty, faculty_name,
});

const Faculty = mongoose.model('Faculty', facultySchema);

module.exports = Faculty;
