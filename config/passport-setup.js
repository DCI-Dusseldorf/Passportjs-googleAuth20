const passport = require('passport');
const Googlestrategy = require('passport-google-oauth20');
const keys = require('./keys');
const User = require('../model/User');

passport.serializeUser((user, done) => {
  console.log(user);
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id).then((user) => {
    done(null, user);
  });
});

passport.use(
  new Googlestrategy(
    {
      //options for the google strategy
      //register in console.developers.google.com with the google account and
      callbackURL: '/auth/google/redirect',
      clientID: keys.google.clientID,
      clientSecret: keys.google.clientSecret,
    },
    (accessToken, refeshToken, profile, done) => {
      // passort callback function
      // console.log('passport callback function fired');
      // console.log(profile);
      //check if user already existes in database
      User.findOne({ googleId: profile.id }).then((currentUser) => {
        if (currentUser) {
          //already have the user
          console.log('user is ', currentUser);
          done(null, currentUser); // passes the user info to serialization function at add into cookies
        } else {
          //if not creates the user in DB
          new User({
            username: profile.displayName,
            googleId: profile.id,
          })
            .save()
            .then((newUser) => {
              console.log('newUser created:' + newUser);
              done(null, newUser);
            });
        }
      });
    }
  )
);
