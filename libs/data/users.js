const users = require('./users.json');

const checkUser = {
  data: (login, pass) => {
    if (
      login !== undefined &&
      users[login] !== undefined &&
      pass === users[login].pass
    ) {
      return {
        auth: true,
        id: users[login].id,
        email: users[login].adviser_email,
        edit: users[login].edit,
        role: users[login].role
      };
    }
    return { status: false };
  }
};

module.exports = checkUser;
