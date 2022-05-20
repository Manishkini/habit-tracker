const express = require('express');
const PORT = '9630';
const app = express();
const db = require('./config/mongoose');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const expressLayouts = require('express-ejs-layouts');

app.use(cookieParser());

app.use(expressLayouts);

// extract Style and script from sublayout to layout
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// static files
app.use(express.static('assets'));

// views
app.set('view engine', 'ejs');
app.set('views', './views');

// routes
app.use('/', require('./routes'));

app.listen(PORT, (err) => {
  if (err) console.error('something went wrong' + err);
  console.log('app is running on http://localhost:' + PORT);
});
