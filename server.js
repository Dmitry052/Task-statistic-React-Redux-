/* eslint-disable no-unused-vars */

// replace for best performance
const ENVIROMENT = process.env.NODE_ENV;

const express = require('express');

const path = require('path');
const session = require('express-session');
const RedisStore = require('connect-redis')(session);
const serveStatic = require('serve-static');
const bodyParser = require('body-parser');

const bunyan = require('bunyan');
const debugFatal = require('debug')('FATAL');

const config = require('./config/config.js')[ENVIROMENT];

const APP_PORT = config.server.port;
const API_URL = config.server.api.url;

const logger = bunyan.createLogger({
  name: config.name,
  streams: [
    {
      level: 'info',
      stream: process.env.NODE_ENV === 'test' ? null : process.stdout,
      path: `${config.server.log.dir}${process.env.NODE_ENV}-${
        config.name
      }-info.log`,
      period: '1d'
    },
    {
      level: 'error',
      stream: process.env.NODE_ENV === 'test' ? null : process.stdout,
      path: `${config.server.log.dir}${process.env.NODE_ENV}-${
        config.name
      }-error.log`,
      period: '1d'
    }
  ]
});

const app = express();

app.use(bodyParser.raw());
app.use(bodyParser.text());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Views & templates engine
app.set('views', path.join(__dirname, './libs/views'));
app.set('view engine', 'pug');

// App locals
app.locals.environment = ENVIROMENT;
app.locals.upload = config.server.upload;
app.locals.api = API_URL;

// Serve static files
app.use(
  serveStatic(path.join(__dirname, 'public'), {
    etag: false,
    maxAge: '24h'
  })
);

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );

  next();
});

// Session middleware for local test
/* eslint-disable function-paren-newline */
// app.use(
//   session({
//     secret: '!2wRtgggsserhn',
//     resave: false,
//     saveUninitialized: false,
//     cookie: {
//       httpOnly: false,
//       maxAge: null
//     }
//   })
// );
// for propduction
const optionsRedis = {
  host: 'redis',
  port: '6379'
};

app.use(
  session({
    store: new RedisStore(optionsRedis),
    secret: '!2wRtgggsserhn',
    resave: false
  })
);

// Authentication middleware
app.use((req, res, next) => {
  const loginUrl = '/auth/login';
  if (req.url !== loginUrl && (!req.session || !req.session.user)) {
    return res.redirect(loginUrl);
  }
  return next();
});

// Index page
app.get('/', (req, res) => {
  if (req.session.user.role) {
    res.redirect(`/${req.session.user.role}`);
  } else {
    res.render('index', {
      title: 'ICO'
    });
  }
});

// Routes
app.use('/auth/', require('./libs/routes/auth'));
app.use('/data/', require('./libs/routes/data'));
app.use('/adviser/', require('./libs/routes/partner'));
app.use('/owner/', require('./libs/routes/owner'));
app.use('/manager/', require('./libs/routes/manager'));

// Fix 404 for favicon.ico in Chrome
app.get('/favicon.ico', (req, res) => {
  res.sendStatus(204);
});

// 404 error handler
app.use((req, res, next) => {
  logger.error({ url: req.url, method: req.method, code: 404 });
  res.status(404);
  res.render('404', {
    url: req.url,
    error: 404,
    title: '404',
    message: 'Page not found'
  });
});

// 500 error handler
app.use((err, req, res, next) => {
  logger.error({
    url: req.url,
    headers: err.headers,
    method: req.method ? req.method : err.method,
    body: req.body,
    details: err.details,
    code: err.code,
    message: err.message
  });
  if (err.message === 'DB_ERROR' && err.details.code === 'ECONNREFUSED') {
    debugFatal(err);
  }
  if (ENVIROMENT !== 'production') {
    res.status(err.code).json({
      status: 'ERROR',
      data: {
        code: err.code,
        message: err.message,
        details: err.details
      }
    });
  } else {
    res.render('error', {
      title: 'Whoops!',
      message: 'Something went wrong'
    });
  }
});

app.listen(APP_PORT, () => {
  logger.info(`[${ENVIROMENT}] ${config.name} listening on port ${APP_PORT}\n`);
});

module.export = app;
