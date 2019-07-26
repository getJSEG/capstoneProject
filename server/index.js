require('dotenv').config();

const morgan = require('morgan');
const express = require('express');
const passport = require('passport');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const FacebookStrategy = require('passport-facebook').Strategy;
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const userRoute = require('./src/userRoute.js');
const recipeRoute = require('./src/recipesRoute.js');
const MongoStore = require('connect-mongo')(session);
const User = require('./src/models/users').User;
const path = require('path')
const cors = require('cors');
const app = express();

app.use(express.static(path.join(__dirname, 'client/build')));

function callbackUrl(provider) {
  if (app.get("env") === "production") {
    return `https://best-food-recipes.herokuapp.com/${provider}/return`;
  } else if (app.get("env") === "development") {
    return `http://localhost:5000/${provider}/return`
  }
}


//create or find user
function generateOrFindUser(accessToken, refreshToken, profile, done) {
  if (profile.emails) {
    User.findOneAndUpdate(
      { email: profile.emails[0].value },
      {
        name: profile.displayName || profile.username,
        email: profile.emails[0].value,
        photo: profile.photos[0].value
      },
      { upsert: true, new: true },
      done
    );
  } else {
    const emailError = new Error("Your email privacy settings prevent you from logging in.");
    done(emailError, null);
  }
}

//set up cors to allows to accept request from the client
app.use(
  cors({
    origin: "http://localhost:3000",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true
  })
);

//configure google strategy
passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRETE,
    callbackURL: callbackUrl('google')
  }, generateOrFindUser)
);

//configure Facebook Strategy
passport.use(new FacebookStrategy({
  clientID: process.env.FACEBOOK_CLIENT_ID,
  clientSecret: process.env.FACEBOOK_CLIENT_SECRETE,
  callbackURL: callbackUrl('facebook'),
  profileFields: ['id', 'displayName', 'photos', 'email']
}, generateOrFindUser ));

passport.serializeUser( (user, done) => { done(null, user._id); });

passport.deserializeUser( (userId, done) => { User.findById(userId, done); });

app.set('port', process.env.PORT || 5000);

//get data as json text
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(bodyParser.text());

//Conntecting to mongoose database
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost:27017/recipe-test", { useNewUrlParser: true });

var db = mongoose.connection;
//session config for passport and mongoDB
const sessionOptions = {
	secret: "secrete data",
	resave: true,
	saveUninitialized: true,
  store: new MongoStore({ mongooseConnection: db 	})
};

app.use(session(sessionOptions));

//Initialize Passport.js
app.use(passport.initialize());
//retore session
app.use(passport.session());

//main routes
app.use('/', userRoute);
app.use('/recipes', recipeRoute);

// production mode
if(process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'client/build')));
  app.get('*', (req, res) => {    res.sendfile(path.join(__dirname = 'client/build/index.html'));  })
}
// build mode
app.get('*', (req, res) => {  res.sendFile(path.join(__dirname+'/client/public/index.html')); })

//error rout for my app
app.get('/error', (req, res) => {
  res.json({message: "this is the error route"});
});

//404 route for my app this will render the page
app.use((req, res) => {
  res.status(404).json({
    message:"this route could not be found Sorry!!!"
  });
});

//send message error to the renderer
app.use( (err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    message: err.message,
    error: err
  });
});

const server = app.listen(app.get('port'), () => {
  console.log(`express server is listenting on port ${server.address().port} `);
});

module.exports = app;
