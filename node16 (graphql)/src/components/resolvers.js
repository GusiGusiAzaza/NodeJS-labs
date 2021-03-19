const mutateRecord = async (object, id, fields, context) => context.GetField(object, id)
  .then(async (records) => {
    let targetRecord;
    if (records.length > 0) {
      targetRecord = await context.UpdateField(object, fields)
        .then(() => context.GetField(object, id));
    } else {
      targetRecord = await context.InsertField(object, fields)
        .then(() => context.GetField(object, id));
    }
    return targetRecord[0];
  });

const deleteRecord = async (object, id, context) => {
  const targetRecord = await context.GetField(object, id);
  if (targetRecord[0]) {
    await context.DeleteField(object, id);
    return true;
  }
  return false;
};

const resolver = {
  getFaculties: async (args, context) => {
    let query = 'SELECT * FROM faculty ';
    if (args.faculty) {
      query += `WHERE faculty = '${args.faculty}'`;
    }
    return (await context.query(query)).map(async (record) => ({
      faculty: record.faculty,
      faculty_name: record.faculty_name,
      pulpits: (await context.query(`SELECT * FROM pulpit WHERE faculty = '${record.faculty}'`))
        .map((pulpit) => ({
          pulpit: pulpit.pulpit,
          pulpit_name: pulpit.pulpit_name,
          faculty: pulpit.faculty,
        })),
    }));
  },
  getPulpits: async (args, context) => {
    let query = `SELECT * FROM pulpit p 
                        JOIN faculty f ON f.faculty = p.faculty `;
    if (args.pulpit) {
      query += `WHERE p.pulpit = '${args.pulpit}'`;
    }
    return (await context.query(query)).map((record) => ({
      pulpit: record.pulpit,
      pulpit_name: record.pulpit_name,
      faculty: {
        faculty: record.faculty[0],
        faculty_name: record.faculty_name,
      },
    }));
  },
  getSubjects: async (args, context) => {
    const { subject, faculty } = args;
    let query = `SELECT * FROM subject s 
                        JOIN pulpit p ON s.pulpit = p.pulpit
                        JOIN faculty f ON p.faculty = f.faculty `;
    if (faculty) {
      query += `WHERE p.faculty = '${faculty}' `;
      if (subject) {
        query += `AND s.subject = '${subject}'`;
      }
    } else if (subject) {
      query += `WHERE s.subject = '${subject}'`;
    }
    return (await context.query(query)).map((record) => ({
      subject: record.subject,
      subject_name: record.subject_name,
      pulpit: {
        pulpit: record.pulpit[0],
        pulpit_name: record.pulpit_name,
        faculty: {
          faculty: record.faculty[0],
          faculty_name: record.faculty_name,
        },
      },
    }));
  },
  getTeachers: async (args, context) => {
    const { teacher, faculty } = args;
    let query = `SELECT * FROM teacher t 
                        JOIN pulpit p ON t.pulpit = p.pulpit
                        JOIN faculty f ON p.faculty = f.faculty `;
    if (faculty) {
      query += `WHERE p.faculty = '${faculty}' `;
      if (teacher) {
        query += `AND t.teacher = '${teacher}'`;
      }
    } else if (teacher) {
      query += `WHERE t.teacher = '${teacher}'`;
    }
    return (await context.query(query)).map((record) => ({
      teacher: record.teacher,
      teacher_name: record.teacher_name,
      pulpit: {
        pulpit: record.pulpit[0],
        pulpit_name: record.pulpit_name,
        faculty: {
          faculty: record.faculty[0],
          faculty_name: record.faculty_name,
        },
      },
    }));
  },

  setFaculty: (args, context) => {
    const fields = { faculty: args.faculty.faculty, faculty_name: args.faculty.faculty_name };
    return mutateRecord('faculty', fields.faculty, fields, context);
  },
  setPulpit: async (args, context) => {
    const fields = { pulpit: args.pulpit.pulpit, pulpit_name: args.pulpit.pulpit_name, faculty: args.pulpit.faculty };
    return mutateRecord('pulpit', fields.pulpit, fields, context);
  },
  setSubject: async (args, context) => {
    const fields = { subject: args.subject.subject, subject_name: args.subject.subject_name, pulpit: args.subject.pulpit };
    return mutateRecord('subject', fields.subject, fields, context);
  },
  setTeacher: async (args, context) => {
    const fields = { teacher: args.teacher.teacher, teacher_name: args.teacher.teacher_name, pulpit: args.teacher.pulpit };
    return mutateRecord('teacher', fields.teacher, fields, context);
  },

  delFaculty: (args, context) => deleteRecord('faculty', args.faculty, context),
  delPulpit: (args, context) => deleteRecord('pulpit', args.pulpit, context),
  delSubject: (args, context) => deleteRecord('subject', args.subject, context),
  delTeacher: (args, context) => deleteRecord('teacher', args.teacher, context),
};

module.exports = resolver;
