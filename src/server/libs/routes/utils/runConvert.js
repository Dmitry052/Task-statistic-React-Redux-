/* @flow */
const schemaToConfig = require('./schemaToConfig');

const logger = (value: string) => {
  console.info(value);
};
// create config
const run = new Promise(
  (resolve: (value?: any) => void, reject: (value?: any) => void) => {
    schemaToConfig('owner', 'development', resolve, reject);
  }
);

run
  .then(() => {
    logger('Create new config file for table');
  })
  .catch(() => {
    logger('Not write new config file');
  });
