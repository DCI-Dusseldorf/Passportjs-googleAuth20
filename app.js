const express = require('express');
const authRoutes = require('./Routes/auth-routes');
const profileRoutes = require('./Routes/profile-routes');
const passportSetup = require('./config/passport-setup');
require('./db');
const cookieSession = require('cookie-session');
const keys = require('./config/keys');
const passport = require('passport');
const app = express();

//set up view engine
app.set('view engine', 'ejs');

app.use(
  cookieSession({
    maxAge: 24 * 60 * 60 * 1000,
    keys: [keys.session.cookieKey],
  })
);
//initialize passport
app.use(passport.initialize());
app.use(passport.session());

//set up routes
app.use('/auth', authRoutes);
app.use('/profile', profileRoutes);

// create home route
app.get('/', (req, res) => {
  res.render('home', { user: req.user });
});

app.listen(4000, () => {
  console.log('app now listening requests on port 4000');
});
