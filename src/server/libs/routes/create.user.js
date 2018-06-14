// @flow
import type { Router } from 'express';

const express = require('express');
const fs = require('fs');
const path = require('path');
const passwordHash = require('password-hash');
const users = require('./../../../../configTemp/users');

const router: Router = express.Router();

// New user page
router.get('/new', (req: $Request, res: $Response) => {
  res.render('index', {
    title: 'Add user'
  });
});

router.post('/new', (req: $Request, res: $Response) => {
  const { login, pass, role, route } = req.body;
  const hashPass = passwordHash.generate(pass);

  if (!users[login]) {
    let newData = 'module.exports = {';

    Object.keys(users).forEach((item: string, i: number) => {
      newData = `
        ${newData}
        ${item}:{
            id:${i + 1},
            pass:'${users[item].pass}',
            role:'${users[item].role}',
            route:'${users[item].route}'
        },`;
    });
    newData = `${newData}
    ${login}:{
        id:${Object.keys(users).length + 1},
        pass:'${hashPass}',
        role:'${role}',
        route:'${route}',
    }`;
    newData = `${newData}};`;

    fs.writeFile(
      path.resolve(__dirname, './../../../../config_moto/users.js'),
      newData,
      (err: any): any => {
        if (err) return console.log(err);
        return null;
      }
    );
  } else {
    console.log(`* User: '${login}' -> already exists`);
  }

  res.redirect('/user/new');
});

module.exports = router;
