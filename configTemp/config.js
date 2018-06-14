module.exports = {
  development: {
    name: 'partner-cabinet',
    sentry: 'http://127.0.0.1',
    test: { url: 'http://localhost:3000' },
    server: {
      ssr: false,
      ssr_options: {
        payform_url: 'http://localhost:10101',
        localFormat: 'en-EN'
      },
      log: {
        dir: './logs/'
      },
      port: 3000,
      api: {
        url: 'http://192.168.250.254:6081'
      }
    }
  },
  stage: {
    name: 'partner-cabinet',
    redis: {
      host: 'redis',
      port: '6379'
    },
    sentry: 'http://127.0.0.1',
    server: {
      ssr: false,
      log: {
        dir: './logs/'
      },
      port: 3000,
      api: {
        url: 'http://stat-api:6081'
      }
    }
  },
  production: {
    name: 'partner-cabinet',
    sentry: 'http://127.0.0.1',
    test: { url: 'http://localhost:3000' },
    payform: {
      url: 'http://localhost:3000'
    },
    redis: {
      host: 'redis',
      port: '6379'
    },
    server: {
      ssr: false,
      ssr_options: {
        payform_url: 'http://localhost:10101',
        localFormat: 'en-EN'
      },
      log: {
        dir: './logs/'
      },
      port: 3000,
      api: {
        url: 'http://stat-api:6081'
      }
    }
  }
};
