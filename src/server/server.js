/* @flow */
// replace for best performance
import type { NextFunction } from 'express';

const ENVIROMENT = process.env.NODE_ENV ? process.env.NODE_ENV : '';

const express = require('express');
const fs = require('fs');
const path = require('path');
const session = require('express-session');
const RedisStore = require('connect-redis')(session);
const serveStatic = require('serve-static');
const bodyParser = require('body-parser');

const bunyan = require('bunyan');
const debugFatal = require('debug')('FATAL');
const ssrRender = require('./bundle.ssr.js').default;
const { reqInitialData } = require('./bundle.ssr.js');

const config = require('./../../configTemp/config.js')[ENVIROMENT];

const SSR = process.env.SSR_ENV ? process.env.SSR_ENV : config.server.ssr;
const APP_PORT = process.env.APP_PORT
  ? process.env.APP_PORT
  : config.server.port;
const API_URL = process.env.API_URL
  ? process.env.API_URL
  : config.server.api.url;
const SENTRYDSN = process.env.SENTRY_DSN
  ? process.env.SENTRY_DSN
  : config.sentry;
const PAYFORM_URL = process.env.PAYFORM_URL
  ? process.env.PAYFORM_URL
  : config.server.ssr_options.payform_url;
const WILDCARD_HOSTNAME = process.env.WILDCARD_HOSTNAME || '';

const loggerOptions: Object = {
  name: config.name,
  streams: [
    {
      level: 'info',
      stream: process.env.NODE_ENV === 'test' ? null : process.stdout,
      path: `${config.server.log.dir}${String(process.env.NODE_ENV)}-${
        config.name
      }-info.log`,
      period: '1d'
    },
    {
      level: 'error',
      stream: process.env.NODE_ENV === 'test' ? null : process.stdout,
      path: `${config.server.log.dir}${String(process.env.NODE_ENV)}-${
        config.name
      }-error.log`,
      period: '1d'
    }
  ]
};
// loger config
const logger = bunyan.createLogger(loggerOptions);

if (WILDCARD_HOSTNAME === '') {
  logger.info({ body: '* Error -> WILDCARD_HOSTNAME is Empty' });
  process.exit(1);
}

let REDIS_CONF;

if (ENVIROMENT === 'production') {
  REDIS_CONF = {
    host: process.env.REDIS_HOST ? process.env.REDIS_HOST : config.redis.host,
    port: process.env.REDIS_PORT ? process.env.REDIS_PORT : config.redis.port
  };
}

// Write Raven params
fs.writeFileSync(
  path.resolve(__dirname, './../../public/js/Raven.js'),
  `Raven.config('${SENTRYDSN}').install()`,
  (err: any): any => {
    if (err) return console.log(err);
    return null;
  }
);

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
app.locals.ssr = SSR;
app.locals.payform_url = PAYFORM_URL;

// Serve static files
app.use(
  serveStatic(path.join(__dirname, './../../public'), {
    etag: false,
    maxAge: '24h'
  })
);

app.use((req: $Request, res: $Response, next: NextFunction) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );

  next();
});

// Session config
if (ENVIROMENT === 'development') {
  app.use(
    session({
      name: 'moto_sid',
      secret: '!2wRtgggsserhn',
      resave: false,
      saveUninitialized: false,
      cookie: {
        httpOnly: false,
        maxAge: null,
        domain: `.${WILDCARD_HOSTNAME}`
      }
    })
  );
} else {
  // for propduction
  app.use(
    session({
      name: 'moto_sid',
      store: new RedisStore(REDIS_CONF),
      secret: '!2wRtgggsserhn',
      resave: false,
      cookie: {
        httpOnly: false,
        maxAge: null,
        domain: `.${WILDCARD_HOSTNAME}`
      }
    })
  );
}

// Authentication middleware
app.use(
  (req: $Request, res: $Response, next: NextFunction): any => {
    const loginUrl = '/auth/login';

    if (req.url !== loginUrl && (!req.session || !req.session.user)) {
      return res.redirect(loginUrl);
    }
    return next();
  }
);

// Index page
app.get('/', (req: $Request, res: $Response) => {
  const user = req.session.user.login.toLowerCase();
  const { role } = req.session.user;

  if (req.session.user.route) {
    if (!SSR) {
      res.redirect(`/${req.session.user.route}`);
    } else {
      Promise.all(reqInitialData(API_URL, APP_PORT, user, role, req.query))
        .then(() => {
          const resultRender = ssrRender(
            req.session.user.login,
            PAYFORM_URL,
            req.query,
            role
          );
          res.send(resultRender);
        })
        .catch(() => {
          console.info('* Error initial data for ssr');
          const resultRender = ssrRender(
            req.session.user.login,
            PAYFORM_URL,
            req.query,
            role
          );
          res.send(resultRender);
        });
    }
  } else {
    res.render('index', {
      title: 'ICO'
    });
  }
});

// Routes
app.use('/auth/', require('./libs/routes/auth'));
app.use('/data/', require('./libs/routes/data'));
app.use('/statistic/', require('./libs/routes/statistic'));
app.use('/user/', require('./libs/routes/create.user'));

// Fix 404 for favicon.ico in Chrome
app.get('/favicon.ico', (req: $Request, res: $Response) => {
  res.sendStatus(204);
});

// 404 error handler
app.use((req: $Request, res: $Response, next: NextFunction) => {
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
app.use((err: any, req: $Request, res: $Response, next: NextFunction) => {
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

module.exports = app;
