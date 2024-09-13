const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.render('home', { user: req.user });
});

router.get('/game', (req, res) => {
  if (!req.user) {
    return res.redirect('/');
  }
  res.render('game', { user: req.user });
});

router.get('/leaderboard', (req, res) => {
  // TODO: Fetch top players from the database
  res.render('leaderboard', { user: req.user });
});

module.exports = router;
