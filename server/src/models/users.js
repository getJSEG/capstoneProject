'use strict';
let mongoose = require('mongoose');

let UserSchema = new mongoose.Schema({
  email: { type: String, required: true, trim:true, unique:true},
  name:{ type:String, require: true, trim: true},
  photo:{ type:String, require: true},
  savedRecipes:[ { type: mongoose.Schema.Types.ObjectId, ref:'Recipe' } ]
});

let User = mongoose.model('User', UserSchema);

module.exports.User = User;
