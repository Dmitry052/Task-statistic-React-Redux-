// @flow
import type { Router } from 'express';

const express = require('express');
const users = require('../data/users');

const router: Router = express.Router();

// Login page
router.get('/login', (req: $Request, res: $Response) => {
  if (!req.session.user) {
    res.render('index', {
      title: 'Authentication'
    });
  } else {
    res.redirect(`/${req.session.user.role}`);
  }
});

// Check user
router.post('/login', (req: $Request, res: $Response) => {
  const { ssr } = res.app.locals;
  /* eslint-disable camelcase */
  const { payform_url } = res.app.locals;

  let status: Object = {};
  if (req.body) {
    const { login, pass } = req.body;
    status = users.data(login, pass);
  }

  if (status.auth) {
    if (req.session) {
      req.session.user = {
        login: req.body.login,
        route: status.route,
        role: status.role
      };

      res.send({
        auth: status.auth,
        user: status.user,
        role: status.role,
        static: ssr,
        payform_url
      });
    }
  } else {
    res.send(false);
  }
});

// Logout
router.get('/logout', (req: $Request, res: $Response) => {
  req.session.destroy();
  res.redirect('/');
});

module.exports = router;
