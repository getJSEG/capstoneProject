import React, { Component } from 'react';
import { NavLink }  from 'react-router-dom';


import {saveRecipe, removeRecipe} from '../../../request';

export default class RecipeItem extends Component {

  state = {
    isSaved: false,
    button: 'save'
  }

  componentDidMount () {
    this.updateRecipe();
  }

  componentWillReceiveProps(newProps){
    this.updateRecipe();
  }


  //this loops trough the savedRecipes and sets the is saved to true
  updateRecipe = () => {
    if(this.props.component === 'savedRecipes'){
      this.props.savedRecipes.map(( recipe, index ) => {
        this.setState( { isSaved: true, button: "Remove" });
        return index;
      });
    }else{
      this.props.savedRecipes.map(( recipe, index ) => {
        if(this.props._id === recipe._id){ this.setState( { isSaved: true, button: "Remove" })  }
        return index;
      });
    }
  }

  //saved the recipe to the user profile
  handleSavedRecipes = (isSaved, btnMessage) => {
    saveRecipe(this.props._id).then(response => {
      this.setState( {
        isSaved: isSaved,
        button: btnMessage
      })
    });
  }

  //removes the recipes fromt he user profile
  handleRemoveRecipes = (isSaved, btnMessage) => {
    removeRecipe(this.props._id).then(response => {
      this.setState( {
        isSaved: isSaved,
        button: btnMessage
      })
    });
  }

  componentDidUpdate() {

    // while (this.props.savedRecipes.length < 0){
    //   console.log('this.props.SavedRecipes.length');
    // }
  }

  //button that handles the saves and removal of the saved recipes
  saveButton = (event) => {
    event.preventDefault();
    if(this.props.authentication){
      if(this.state.isSaved === false) {
        this.handleSavedRecipes(true, 'remove');
      }else{
        this.handleRemoveRecipes(false, 'save');
      }
    }else{
      this.props.message(true, 'You must be logged in');
      this.timerHandle = setTimeout(() => {
        this.props.message(false, '');
      }, 3000);
    }
  }


  render() {
    return(
      <div className='list-container clearfix'>
      <NavLink className='list-Items' to={`/recipe/${ this.props._id }`}>
        <div className='img-container'>
          <div className="img-wrapper">
            <img className="recipe-img" alt='recipe' src={ this.props.img }/>
          </div>
        </div>
      </NavLink>
        <div className="recipe-information-container">
          <h3 className='recipe-title'> { this.props.label } </h3>
          <p> {this.props.description}</p>
          <ul className="details">
            <li>Time: {this.props.prepTime} Min </li>
            <li>servings: {this.props.servings} </li>
          </ul>
          <button className="save-recipe" onClick={ this.saveButton } >
            <span className="glyphicon glyphicon-bookmark"> { this.state.button } </span>
          </button>
        </div>
      </div>
    );

  }
}
