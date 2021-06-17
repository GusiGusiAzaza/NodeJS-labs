require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const expressHandlebars = require('express-handlebars');
const AuthRouter = require('./routes/authRouter');
const MainRouter = require('./routes/mainRouter');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ limit: '10mb' }));

const hbs = expressHandlebars.create({
    defaultLayout: 'main',
    extname: 'hbs'
});

app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');
app.set('views', 'views');

app.use(MainRouter);
app.use(AuthRouter);

app.listen(3122, () => {
    console.log('listening on http://localhost:3122/');
});
