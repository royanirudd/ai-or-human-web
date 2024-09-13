require('dotenv').config();
const express = require('express');
const session = require('express-session');
const passport = require('passport');
const mongoose = require('mongoose');
const path = require('path');

const app = express();

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Error connecting to MongoDB:', err));

// View engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

// Import routes
const indexRouter = require('./routes/index');
const authRouter = require('./routes/auth');
const gameRouter = require('./routes/game');

// Use routes with error checking
if (typeof indexRouter === 'function') {
  app.use('/', indexRouter);
} else {
  console.error('indexRouter is not a function:', indexRouter);
}

if (typeof authRouter === 'function') {
  app.use('/auth', authRouter);
} else {
  console.error('authRouter is not a function:', authRouter);
}

if (typeof gameRouter === 'function') {
  app.use('/game', gameRouter);
} else {
  console.error('gameRouter is not a function:', gameRouter);
}

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
