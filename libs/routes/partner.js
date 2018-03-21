const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
  if (req.session.user.role === 'owner') {
    res.redirect('/owner');
  } else if (req.session.user.role === 'manager') {
    res.redirect('/manager');
  } else {
    res.render('index', {
      title: 'ICO'
    });
  }
});

module.exports = router;
