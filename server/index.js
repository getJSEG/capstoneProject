require('dotenv').config()

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

app.set('port', process.env.PORT || 5000);

//get data as json text
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(bodyParser.text());

mongoose.set("useNewUrlParser", true);
mongoose.set("useFindAndModify", false);
mongoose.set("useCreateIndex", true);

//Conntecting to mongoose database
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost:27017/recipe-test");

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


// build mode
app.get("*", (req, res) => { res.sendFile(path.join(__dirname + "/client/build/index.html")); });

//404 route for my app this will render the page
app.use((req, res) => { res.status(404).json({ message:"Route Could Not Be Found" }); });

//send message error to the renderer
app.use( (err, req, res, next) => {
  res.status(err.status || 500).json({
    message: err.message,
    error: {}
  });
});

const server = app.listen(app.get('port'), () => {
  console.log(`express server is listenting on port ${server.address().port} `);
});

module.exports = app;
