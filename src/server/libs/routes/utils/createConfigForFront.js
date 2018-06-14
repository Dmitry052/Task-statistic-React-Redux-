//  @flow
const ENVIROMENT = process.env.NODE_ENV;
const fs = require('fs');
const path = require('path');

const config = require('./../../../../../configTemp/config')[ENVIROMENT];

const SSR = process.env.SSR_ENV ? process.env.SSR_ENV : config.server.ssr;

fs.writeFileSync(
  path.resolve(__dirname, './../../../../../src/config.json'),
  `{"ssr":${SSR}}`,
  (err: any): any => {
    if (err) return console.log(err);
    return null;
  }
);
