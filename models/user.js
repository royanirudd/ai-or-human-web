const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: String,
  email: String,
  githubId: String,
  googleId: String,
  highScore: { type: Number, default: 0 }
}, { collection: 'web_users' });

module.exports = mongoose.model('User', UserSchema);
