const { BasicStrategy } = require('passport-http');

const initializePassport = (passport, getUserByName, getUserById) => {
  const authenticateUser = (name, password, done) => {
    const user = getUserByName(name);
    if (user == null) {
      return done(null, false, { message: 'This user is not exist' });
    }
    if (password === user.password) {
      return done(false, user);
    }
    return done(null, false, { message: 'Password Incorrect' });
  };
  passport.use(new BasicStrategy(authenticateUser));
  passport.serializeUser((user, done) => done(null, user.id));
  passport.deserializeUser((id, done) => done(null, getUserById(id)));
};

module.exports = initializePassport;
