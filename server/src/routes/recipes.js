const Recipe = require('../models/recipes').Recipe;
const User = require('../models/users').User;

//GET
//shows all of the recipes images, description, name, and ID
function getRecipes(req, res, next) {
  const pageNumber =  parseInt(req.query.page);
  const nPerPage = parseInt(req.query.limit);

  if(nPerPage < 50 && pageNumber !== null && nPerPage !== null){
    Recipe.find()
    .sort({dateCreated: 1})
    .skip((pageNumber-1)*nPerPage)
    .limit(nPerPage)
    .exec( (error, recipes) => {
      if(error) return next(error)
      if(!(recipes === undefined || recipes.length == 0)){
        res.status(200).json({
          recipes: recipes
        });
      }else{
        res.status(204).json({
          recipes: recipes
        });
      }
    });

  }else{
    var cantHandleRequest = new Error("cant handle your request");
    return next(cantHandleRequest);
  }
}

//find and return search from the qwuery string for recipes
function searchQuery(req, res, next) {
  const label = req.query.tags
  const pageNumber =  parseInt(req.query.page);
  const nPerPage = parseInt(req.query.limit);

  if(nPerPage < 50 && pageNumber !== null && nPerPage !== null){
    Recipe.find({ tags: { "$regex": label, "$options": label }  })
    .sort({dateCreated: 1})
    .skip((pageNumber-1)*nPerPage)
    .limit(nPerPage)
    .exec((error, recipes) =>{
      if(error) return next(error)
      console.log(label + " : " + pageNumber)
      if(!(recipes === undefined || recipes.length == 0)){
        res.status(200).json({ recipes: recipes
        });
      }else{
        console.log(label)
        res.status(204).json({ recipes: recipes });
      }
    });
  }else{
    var cantHandleRequest = new Error("cant handle your request");
    return next(cantHandleRequest);
  }

}

//gets a single recipe  with all of its details
function getRecipe(req, res, next) {
  Recipe.findById(req.params.recipeId, (error, recipe) => {
    if(error) return next(error)
    res.json(recipe);
  });
}


//POST
//Creates a new recipe and adds it to the DB
function createRecipe(req, res, next) {
  if(req.user) {
    const newRecipe = new Recipe(req.body);
    newRecipe.author = req.user;

    newRecipe.save( error => {
      if(error) return  next(error);
      res.json({
        message: `Succefully Saved`,
        status: 201
      });
    });
  }else{
    var cantCreateRecipe = new Error("you must be log in to create a recipe");
    return next(cantCreateRecipe);
  }
}

//PUT
//this updates the recipes
function updateRecipe(req, res, next) {
  if(req.user){
    Recipe.findById(req.params.recipeId)
    .then( (recipe) => {
      if(req.user._id.toString() === recipe.author.toString()){
        Recipe.findByIdAndUpdate(req.params.recipeId, { $set: req.body }, (error, recipe) => {
            if(!error){
              res.json({
                status: 204
              });
            }else{
              return next(error);
            }
        });
      }else{
        var dontHaveAccess = new Error("you dont have access to make this change");
        return next(dontHaveAccess);
      }
    }).catch( (error) => {
      var dontHaveAccess = new Error("We could not find this recipe");
      return next(dontHaveAccess);
    })
  }else{
    var dontHaveAccess = new Error("you must be signed in to make this change");
    return next(dontHaveAccess);
  }
}

//DELETE
//only the person who created the recipe can delele their own recipe/item
//if we cant find the recipe then return an error
//return an error when if the user is not logged in
function deleteRecipe(req, res, next) {

  if(req.user){
    Recipe.findById(req.params.recipesId)
    .then( (recipe) => {
      if(req.user._id.toString() === recipe.author.toString()){
        Recipe.findByIdAndRemove(req.params.recipesId, (error, recipe) => {
            if(!error){
              res.json({
                message: `the item has been remove`,
                status: 200
              });
            }else{
              return next(error);
            }
        });
      }else{
        var dontHaveAccess = new Error("you dont have access to make this change");
        return next(dontHaveAccess);
      }
    }).catch( (error) => {
      var dontHaveAccess = new Error("We could not find this recipe");
      return next(dontHaveAccess);
    })
  }else{
    var dontHaveAccess = new Error("you must be signed in to make this change");
    return next(dontHaveAccess);
  }
}

module.exports = {
  getRecipes: getRecipes,
  createRecipe: createRecipe,
  updateRecipe: updateRecipe,
  deleteRecipe: deleteRecipe,
  getRecipe: getRecipe,
  searchQuery: searchQuery
}
