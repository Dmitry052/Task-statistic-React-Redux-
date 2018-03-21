const express = require('express');
// const axios = require('axios');
const users = require('../data/users');

const router = express.Router();

// Login page
router.get('/login', (req, res) => {
  res.render('index', {
    title: 'Authentication'
  });
});

// Check user
router.post('/login', (req, res) => {
  // const apiUrl = res.app.locals.api;
  const status = users.data(req.body.login, req.body.pass);

  if (status.auth) {
    req.session.user = {
      login: req.body.login,
      // pass: req.body.pass,
      role: status.role
    };
    const user = { adviser_id: null };
    switch (status.role) {
      case 'adviser':
        user.adviser_id = status.id;
        return res.send({
          auth: status.auth,
          role: status.role,
          adviser: user
        });
      case 'owner':
        return res.send({ auth: status.auth, role: status.role });
      case 'manager':
        return res.send({ auth: status.auth, role: status.role });
      default:
        return null;
    }

    // axios
    //   .get(`${apiUrl}/land/stat/adviser-list/`)
    //   .then(response => {
    //     /* eslint-disable function-paren-newline */
    //     // const adviser = response.data.data.filter(
    //     //   item => item.adviser_email === status.email
    //     // );
    //     // const adviser = [{ adviser_id: 1 }];

    //     res.send({ auth: status.auth, role: status.role, adviser: adviser[0] });
    //   })
    //   .catch(err => {
    //     res.send(err);
    //   });
    // res.send({ auth: status.auth, role: status.role, adviser: adviser[0] });
  } else {
    res.send(false);
  }
});

// Logout
router.get('/logout', (req, res) => {
  req.session.destroy();
  res.redirect('/');
});

module.exports = router;
