'use strict';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//recepies schema
const RecipesSchema = new Schema({
  label: { type: String, required: true },
  image:  { type: String, required: true } ,
  description: { type: String, required: true },
  ingredients: [ {type: String, required: true } ],
  directions: [ { type: String, required: true } ],
  prepTime:{ type: Number, required: true, min:[ 1, 'Please Enter serving above 1' ]},
  servings:{ type: Number, required: true, min:[ 1, 'Please Enter serving above 1' ]},
  tags:[{ type:String, required: true}],
  source: { type: String } ,
  author: { type: Schema.Types.ObjectId, ref:'User', required: true },
  dateCreated: { type: Date, default: Date.now }
});

const Recipe = mongoose.model('Recipe', RecipesSchema);


module.exports.Recipe = Recipe;
