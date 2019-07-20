const express = require('express');
const router = express.Router();
const passport = require('passport');

const recipes = require('./routes/recipes');

//get all Recipes
router.get('/',  recipes.getRecipes);
//get detaild recipes
router.get('/recipe/:recipeId', recipes.getRecipe);
//get recipes from a query
router.get('/search/', recipes.searchQuery);

/************* POST Request ***************/
router.post('/create', recipes.createRecipe);

/************* PUT Request***************/
//updating recipes route
router.put('/:recipeId', recipes.updateRecipe);

/************* DELETE Request***************/
//Deleting recipes route
router.delete('/:recipesId', recipes.deleteRecipe);

module.exports = router;
