const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const sassMiddleware = require('node-sass-middleware');

const env = require('../config/env');

mongoose.Promise = global.Promise;
mongoose.connect(env.MONGO_URI);

const index = require('./routes');

const app = express();

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
    debug: true,
    outputStyle: 'compressed',
    sourceMapEmbed: true,
    prefix: '/css'
  })
);

// Set up directory for static served files
app.use(express.static(path.join(__dirname, '../../public')));

// Set up index as router on root
app.use('/', index);

// Pass error to error handler for rendering 404.
app.use((req, res, next) => {
  let error = new Error('Not found');
  error.status = 404;
  next(error);
});

// Error handler
app.use((err, req, res, next) => {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // Render error page based on passed status
  res.status(err.status || 500);
  res.render('error404');
});

// Start server
app.listen(port, () => {
  console.log('Image search server is listening on port ' + port);
});
