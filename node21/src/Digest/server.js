const express = require('express');
const passport = require('passport');
const session = require('express-session');
const users = require('../users.json');
const initializePassport = require('./passport-config');

const sessionKey = 'topsecret';

initializePassport(
  passport,
  (name) => users.find((user) => user.name === name),
  (id) => users.find((user) => user.id === id),
);

const app = express();

app.use(session({
  secret: sessionKey,
  resave: false,
  saveUninitialized: false,
}));

app.use(passport.initialize());
app.use(passport.session());

app.get('/login', (req, res, next) => {
  if (req.headers.authorization && req.session.logout) {
    req.session.logout = false;
    req.logout();
    delete req.headers.authorization;
  }
  next();
});

app.get('/login', passport.authenticate('digest', { session: true }), (req, res) => {
  res.send(`Hello, ${req.user}`);
});

app.get('/resource', (req, res) => {
  if (req.isAuthenticated()) {
    res.send('resource');
  } else {
    res.redirect('/login');
  }
});

app.get('/logout', (req, res) => {
  req.session.logout = true;
  res.redirect('/login');
});

app.get('*', (req, res) => {
  req.statusCode = 404;
  req.statusMessage = 'Not Found';
  res.send(`${req.statusCode}: ${req.statusMessage}`);
});

app.listen(4021);

console.log('http://localhost:4021/login');
