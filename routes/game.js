const express = require('express');
const router = express.Router();

// Middleware to check if user is authenticated
function isAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/');
}

// Game route (protected)
router.get('/', isAuthenticated, (req, res) => {
  res.render('game', { title: 'AI or Human Game' });
});

module.exports = router;
