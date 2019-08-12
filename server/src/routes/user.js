const User = require('../models/users').User;
const Recipe = require('../models/recipes').Recipe;

function logout(req, res, next){
  req.logout();
  res.redirect(process.env.CLIENT_HOME_PAGE);
}

function profile(req, res, next) {
  if(req.user) {

    User.findById(req.user._id)
    .populate('savedRecipes')
    .exec( (err, user) => {
        if(err) return next(err);

        res.status(200).json({
          authenticated: true,
          profile:{
            photo: user.photo,
            id: user._id,
            email: user.email,
            savedRecipes: user.savedRecipes
        }
      });
    });
  } else {
    res.status(403).json({
      message: 'You are not authorized to view this page.'
    })
  }
}

function getSavedRecipes(req, res, next) {
  const pageNumber =  parseInt(req.query.page);
  const nPerPage = parseInt(req.query.limit);

  if(nPerPage < 50 && pageNumber !== null && nPerPage !== null && req.user){
    User.findById(req.user._id, "savedRecipes")
    .populate('savedRecipes')
    .skip((pageNumber-1)*nPerPage)
    .limit(nPerPage)
    .exec( (error, recipes) => {
      if(error) return next(error);
      if(!(recipes === undefined || recipes.length == 0)){
        res.status(200).json({ recipes: recipes  });
      }else{
        res.status(204).json({ recipes: recipes });
      }
    });
  }

}

//saves recipes to the user profile
function saveRecipe(req, res, next) {
  if(req.user){
    const recipeId = req.params.recipeId;
    const user = req.session.passport.user;

    User.findById( user )
    .exec( (err, user) => {
      user.savedRecipes.push(recipeId);
      user.save( (err, re) => { res.json({ status: 204 }); });
    });

  }else{
    res.status(403).json({
      message: 'You are not authorized to view this page.'
    })
  }
}

//Removes recipes from user profile
function removeRecipe(req, res, next) {
  if(req.user){
    const user = req.session.passport.user;
    const recipeId = req.params.recipeId;

    User.findById(user)
    .exec( (err, user) => {
      user.savedRecipes.remove(recipeId)
      user.save( (err, re) => {
        res.json({ status: 204 });
      });
    });
  }else{
    res.status(403).json({
      message: 'You are not authorized to view this page.'
    })
  }
}


module.exports = {
    logout: logout,
    profile: profile,
    saveRecipe: saveRecipe,
    removeRecipe: removeRecipe,
    getSavedRecipes: getSavedRecipes
};
