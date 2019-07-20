const express = require('express');
const router = express.Router();
const passport = require('passport');

const user = require('./routes/user');
const  CLIENT_HOME_PAGE = 'http://localhost:3000';

//user profile
router.get('/profile', user.profile);


//getSavedRecipes
router.get('/profile/savedRecipes', user.getSavedRecipes);

//GET /auth/login/facebook
router.get('/login/facebook', passport.authenticate('facebook', {scope: ["email"]}));

//GET /auth/facebook/return
router.get('/facebook/return', passport.authenticate('facebook', { successRedirect: CLIENT_HOME_PAGE, failureRedirect: '/' })
);

//GET /auth/login/facebook
router.get('/login/google', passport.authenticate('google', {scope: ["email"] }));

//GET /auth/facebook/return
router.get('/google/return', passport.authenticate('google', { successRedirect: CLIENT_HOME_PAGE, failureRedirect: '/' }),
);

//GET /auth/logout
router.get('/logout', user.logout);

//update
//saved recipe to a user account
router.put('/saved/add/:recipeId', user.saveRecipe);

//saved recipe to a user account
router.put('/saved/remove/:recipeId', user.removeRecipe);



module.exports = router;
