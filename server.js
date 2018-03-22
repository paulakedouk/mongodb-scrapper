var express = require('express');
var bodyParser = require('body-parser');
var logger = require('morgan');
var mongoose = require('mongoose');
var mongojs = require('mongojs');
var request = require('request');
var cheerio = require('cheerio');
var exphbs = require('express-handlebars');
var index = require('./routes/routes');
var db = require('./models');

// Initialize Express
var app = express();

var PORT = process.env.PORT || 3000;

// Configure middleware

// Setting up Morgan middleware
app.use(logger('dev'));

// Setting up body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json({ type: 'application/json' }));

// Use express.static to serve the public folder as a static directory
app.use(express.static('public'));

// set up handlebars..
app.engine(
  'hbs',
  exphbs({
    extname: '.hbs',
    defaultLayout: 'main'
  })
);
app.set('view engine', '.hbs');

mongoose.Promise = Promise;
var MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost/techCrunchNews';
mongoose.connect(MONGODB_URI);

require('./routes/routes.js')(app);

app.listen(PORT, function() {
  console.log('App running on port', PORT);
});
