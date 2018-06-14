// @flow
const passwordHash = require('password-hash');
const users = require('./../../../../configTemp/users.js');

const checkUser = {
  data: (login: string, pass: string): Object => {
    if (
      login !== undefined &&
      users[login] !== undefined &&
      // pass === users[login].pass
      passwordHash.verify(pass, users[login].pass)
    ) {
      return {
        auth: true,
        id: users[login].id,
        email: users[login].adviser_email,
        edit: users[login].edit,
        user: login,
        role: users[login].role,
        route: users[login].route
      };
    }
    return { status: false };
  }
};

module.exports = checkUser;
