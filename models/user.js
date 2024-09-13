const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  googleId: String,
  githubId: String,
  score: { type: Number, default: 0 },
  gamesPlayed: { type: Number, default: 0 }
});

module.exports = mongoose.model('User', userSchema);
