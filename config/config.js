module.exports = {
  devlocal: {
    name: 'partner-cabinet',
    server: {
      log: {
        dir: './logs/'
      },
      port: 3000,
      api: {
        url: 'http://localhost:8082'
      }
    }
  },
  prod: {
    name: 'partner-cabinet',
    server: {
      log: {
        dir: './logs/'
      },
      port: 3000,
      api: {
        url: 'http://ico-api-app:80'
      }
    }
  }
};
