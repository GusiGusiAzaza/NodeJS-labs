const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

const initializePassport = (passport, pushData) => {
    const config = {
        clientID: '952979813277-2hm948gi0eo27ikfav93i8hfbkrttdq1.apps.googleusercontent.com',
        clientSecret: 'cRLwPRDU3bpGXeaKjH82_GZr',
        callbackURL: 'http://localhost:3000/auth/google/callback'
    };

    const verifyCallback = (
        accessToken,
        refreshToken,
        profile,
        done
    ) => {
        const data = { profile: profile, refreshToken: refreshToken };
        pushData(data);
        return done(null, data);
    };
    passport.use(new GoogleStrategy(config, verifyCallback));
    passport.serializeUser((user, done) => done(null, user));
    passport.deserializeUser((user, done) => done(null, user));
};
module.exports = initializePassport;
