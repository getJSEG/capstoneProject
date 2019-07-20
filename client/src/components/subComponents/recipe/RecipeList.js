import React, { Component } from 'react';

import RecipeItem from './RecipeItem';
import Loading from '../../other/Loading';
import { userprofile } from '../../../request';
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";
import NoContentFound from '../../other/NoContentFound';

export default class RecipeList extends Component {

  constructor(props) {
    super(props);
    this.state = {
        savedRecipes: [],
        isSaved: false,
        loading: true,
        fetchingMoreData: true
    }
    this.recipeMessage = this.recipeMessage.bind(this);
  }

  static propTypes = { authenticated: PropTypes.bool.isRequired };

  //fetach saved recipes of the user when the user is logged in
  fetchUserRecipes = () => {
    if(this.props.authenticated){
      userprofile().then( response => {
        if(response.status === 200){
          this.setState({
            savedRecipes: response.data.profile.savedRecipes,
            loading:false
          });
        }
      });
    }else{
      this.setState({ loading:false });
    }
  }

  componentDidUpdate(prevProps) {
    if(this.props.authenticated && this.state.loading === true){ this.fetchUserRecipes(); }
  }

  // check witch page it in and then it fetches the correct data
  fetchData = () =>{
    switch(this.props.component) {
      case 'home': this.props.fetchData();
        break;
      case 'search' : this.props.search();
        break;
      case 'savedRecipes': this.props.savedRecipes();
        break;
        default: return null;
    }
  }

  //handle errors messages
  recipeMessage = (displayMessage, message) => {
    this.props.handleMessage(displayMessage, message);
  }

  render(){
    return(
      <div className='results-container'>
        <div className='title-wrapper'>
          <h2 className="title"> { this.props.title } Recipes </h2>
          <span className='filler'/>
          {this.props.recipes <= 0 && this.state.loading === false ? <NoContentFound/> : null }

          <InfiniteScroll
            dataLength= { this.props.recipes.length }
            next={ this.fetchData }
            hasMore={ this.props.fetchingMoreData }
            loader={<Loading />}
          >
            {
              this.props.recipes.map( ( recipe, index ) => {

                 return <RecipeItem
                    img={ recipe.image }
                    label={ recipe.label }
                    description= { recipe.description}
                    prepTime={recipe.prepTime}
                    servings={recipe.servings}
                    key={ recipe._id }
                    _id={ recipe._id }
                    savedRecipes={ this.state.savedRecipes }
                    fetchUserRecipes={ this.fetchUserRecipes  }
                    authentication={ this.props.authenticated }
                    message={this.recipeMessage}
                    component={ this.props.component}
                    />
            })
          }

          </InfiniteScroll>

        </div>
      </div>
    );
  };

}
