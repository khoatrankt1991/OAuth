const express = require('express');
const app = express();
const passport = require('passport');
var bodyParser = require('body-parser');

var FacebookTokenStrategy = require('passport-facebook-token');

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(passport.initialize());
// app.use(passport.session());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

passport.use(new FacebookTokenStrategy({
  clientID: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET
}, function(accessToken, refreshToken, profile, done) {
  console.log('accesstoken', accessToken);
  console.log('refreshToken', refreshToken);
  console.log('profile', profile);
  done(undefined, profile);
}
));
passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});

app.get('/', (req, res) => {
  res.send('OK')
});

app.post('/auth/facebook/token',
  passport.authenticate('facebook-token'),
  function (req, res) {
    // res.send(req.user ? 200 : 401 );
    res.status(req.user ? 200: 401 ).json(req.user);
  }
);

app.listen(3001, () => {
  console.log('app is listen on port 3001');
});
