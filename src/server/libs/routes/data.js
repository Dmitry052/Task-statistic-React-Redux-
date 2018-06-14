// @flow
import type { $Request, $Response, Router } from 'express';

const express = require('express');
const axios = require('axios');

const router: Router = express.Router();

router.get('/adviser-list', (req: $Request, res: $Response) => {
  const apiUrl = res.app.locals.api;

  axios
    .get(`${String(apiUrl)}/land/stat/adviser-list/`)
    .then(response => {
      res.send({ status: 'OK', data: response.data });
    })
    .catch(err => {
      res.send(err);
    });
});

router.get('/', (req: $Request, res: $Response) => {
  const apiUrl = res.app.locals.api;
  const { query }: { query: Object } = req;

  axios
    .get(`${String(apiUrl)}${String(query.url)}`, {
      params: JSON.parse(query.queryParams)
    })
    .then(response => {
      res.json({ status: 'OK', data: response.data });
    })
    .catch(err => {
      if (err.response) {
        res.json({ error: err.response.data });
      } else {
        res.json({ error: `Error connect ${String(query.url)} ` });
      }
    });
});

module.exports = router;
