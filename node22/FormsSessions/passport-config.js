const LocalStrategy = require('passport-local').Strategy;

const initializePassport = (passport, getUserByUsername) => {
    const authenticateUser = (username, password, done) => {
        const user = getUserByUsername(username);
        if (user == null) return done(null, false, { message: 'This user does not exists' });
        if (user.password !== password) {
            return done(null, false, { message: 'Incorrect password' });
        }
        return done(null, user);
    };
    passport.use(new LocalStrategy(authenticateUser));
    passport.serializeUser((user, done) => done(null, user));
    passport.deserializeUser((user, done) => done(null, user));
};
module.exports = initializePassport;
