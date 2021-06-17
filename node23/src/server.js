const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');
const path = require('path');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const initializePassport = require('./passport-config/passport-config');

const users = [];
const appDir = path.dirname(require.main.filename);

const app = express();
app.use(session({
    secret: 'SESSION_SECRET',
    resave: true,
    saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());

initializePassport(passport,
    (item) => users.push(item));
app.use(passport.initialize());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.get('/login', (req, res) => {
    res.sendFile(path.join(appDir, './static/index.html'));
});

app.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/login');
});

app.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

app.get('/auth/google/callback', passport.authenticate('google', { failureRedirect: '/login' }),
    (req, res) => {
        res.redirect('/resource');
    });

app.get('/resource', (req, res) => {
    console.log(req.user);
    if (req.user) res.send('resource');
    else res.status(401).send('error');
});
app.listen(3000);

console.log('http://localhost:3000/login');
