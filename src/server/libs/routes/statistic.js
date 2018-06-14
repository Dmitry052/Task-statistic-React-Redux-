/* @flow */
// import type { $Request, $Response, Router } from 'express';
// import * as express from 'express';

const axios = require('axios');
const express = require('express');

const router = express.Router();

function createParams(query: Object): string {
  let newQuery = '';
  // const newId = query.id[0];
  const editQuery = query;
  // editQuery.id = newId;
  Object.keys(editQuery).forEach((item: string, i: number) => {
    if (i === 0) {
      newQuery = `?${item}=${editQuery[item]}`;
    } else {
      newQuery = `${newQuery}&${item}=${editQuery[item]}`;
    }
  });

  return newQuery;
}

router.get('/', (req: $Request, res: $Response) => {
  res.render('index', {
    title: 'ICO'
  });
});

router.get('*', (req: $Request, res: $Response) => {
  const apiUrl: mixed = res.app.locals.api;
  const user = req.session.user.login.toLowerCase();
  const { role } = req.session.user;
  const { query }: { query: Object } = req;

  if (query.queryParams) {
    const queryParams = query.queryParams
      ? JSON.parse(`${query.queryParams}`)
      : query;

    if (role !== 'super') {
      queryParams.user = user;
    }

    console.info(
      'Api',
      `${String(apiUrl)}${query.url}`,
      'Request data ->>',
      queryParams,
      typeof queryParams
    );

    axios({
      method: 'post',
      url: `${String(apiUrl)}${query.url}`,
      data: queryParams
    })
      .then((response: Object) => {
        res.json({ status: 'OK', data: response.data });
      })
      .catch((err: Object) => {
        if (err.response) {
          console.log('Response data error->>', err.response.data);
          res.json({ status: 'ERROR', error: err.response.data, data: [] });
        } else {
          res.json({
            status: 'ERROR',
            error: `Error connect ${query.url} `,
            data: []
          });
        }
      });
  } else {
    if (res.app.locals.ssr) {
      res.redirect(`/${createParams(req.query)}`);
    }
    res.render('index', {
      title: 'ICO'
    });
  }
});

module.exports = router;
