const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const sassMiddleware = require('node-sass-middleware');

const env = require('../../config/env');

mongoose.Promise = global.Promise;
mongoose.connect(env.MONGO_URI, { useNewUrlParser: true });

const index = require('./routes');

const app = express();

// Allow CORS requests
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

// Port setup
const port = process.env.PORT || 8080;

// Set up path for views and view engine
app.set('views', path.join(__dirname, '../client/views'));
app.set('view engine', 'pug');

// Compile Sass to CSS
app.use(
  sassMiddleware({
    src: path.join(__dirname, '../client/sass'),
    dest: path.join(__dirname, '../../public/css'),
    outputStyle: 'compressed',
    sourceMapEmbed: true,
    prefix: '/css'
  })
);

// Set up directory for static served files
app.use(express.static(path.join(__dirname, '../../public')));

// Set up index as router on root
app.use('/', index);

// Start server
app.listen(port, () => {
  console.log(`Image search server is listening on port ${port}`);
});
