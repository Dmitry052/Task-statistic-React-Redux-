class CustomError extends Error {
  constructor(err) {
    super(err.message);
    this.headers = err.headers;
    this.message = err.message;
    this.status = err.status;
    this.details = err.details;
    this.body = err.body;
    this.method = err.request.method;
    this.source = err.source;
    this.uri = err.request.uri;
    this.code = err.code || 500;
    this.stack = err.stack;
  }
}

module.exports.CustomError = CustomError;
