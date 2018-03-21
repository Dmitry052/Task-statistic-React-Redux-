const express = require('express');
const axios = require('axios');

const router = express.Router();

router.get('/daily', (req, res) => {
  const apiUrl = res.app.locals.api;

  axios
    .get(`${apiUrl}/land/stat/daily/`, {
      params: req.query
    })
    .then(response => {
      res.send({ status: 'OK', data: response.data });
    })
    .catch(err => {
      res.send(err);
    });
});

router.get('/campaign-stat', (req, res) => {
  const apiUrl = res.app.locals.api;

  axios
    .get(`${apiUrl}/land/stat/campaign-stat/`, {
      params: req.query
    })
    .then(response => {
      res.send({ status: 'OK', data: response.data });
    })
    .catch(err => {
      res.send(err);
    });
});

router.get('/campaignGeo', (req, res) => {
  const apiUrl = res.app.locals.api;

  axios
    .get(`${apiUrl}/land/stat/campaign-geo/`, {
      params: req.query
    })
    .then(response => {
      res.send({ status: 'OK', data: response.data });
    })
    .catch(err => {
      res.send(err);
    });
});

router.get('/adviser-list', (req, res) => {
  const apiUrl = res.app.locals.api;

  axios
    .get(`${apiUrl}/land/stat/adviser-list/`)
    .then(response => {
      res.send({ status: 'OK', data: response.data });
    })
    .catch(err => {
      res.send(err);
    });
});

router.get('/campaign-list', (req, res) => {
  const apiUrl = res.app.locals.api;

  axios
    .get(`${apiUrl}/land/stat/campaign-list`, {
      params: req.query
    })
    .then(response => {
      res.send({ status: 'OK', data: response.data });
    })
    .catch(err => {
      res.send(err);
    });
});

module.exports = router;
