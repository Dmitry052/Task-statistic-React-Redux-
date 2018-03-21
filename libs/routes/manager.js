const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
  if (req.session.user.role === 'adviser') {
    res.redirect('/adviser');
  } else if (req.session.user.role === 'owner') {
    res.redirect('/owner');
  } else {
    res.render('index', {
      title: 'ICO'
    });
  }
});

router.get('/data/stat', (req, res) => {
  console.log('request api for manager statistic');
  res.send('ok');
});

module.exports = router;
