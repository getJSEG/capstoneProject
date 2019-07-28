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
