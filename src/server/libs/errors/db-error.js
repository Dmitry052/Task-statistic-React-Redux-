const { CustomError } = require('./custom-error');

class DBError extends CustomError {
  constructor(err) {
    super(err);
    this.message = err.message || 'DB_ERROR';
    this.status = this.status || 500;
    this.source = 'DB';
  }
}

module.exports.DBError = DBError;
