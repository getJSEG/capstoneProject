import React, { Component } from 'react';

import Header from '../subComponents/nav/Header';
import Footer from '../subComponents/nav/Footer';
import RecipeList from '../subComponents/recipe/RecipeList';
import PropTypes from "prop-types";

import { savedRecipes  } from '../../request';

class SavedRecipes extends Component {

  constructor(props) {
    super(props);
    this.state = {
        title: 'Saved',
        savedRecipes: [],
        empty: true,
        fetchingMoreData: true,
        component: "savedRecipes",
        pageNumber: 1,
        nPerPage: 5,
        calledOnce: false
    }
  }

  static propTypes = { authenticated: PropTypes.bool.isRequired };

  componentDidMount() {
      this.fetchUserRecipes();
  }

// fetches the saved recipes of the user and saves them to savd recipes Array
  fetchUserRecipes = () => {
    const { pageNumber, nPerPage} = this.state;

    if(this.props.authenticated){
      this.setState({ pageNumber: this.state.pageNumber + 1});

      savedRecipes(pageNumber, nPerPage).then( response => {
        if(response.status === 200){
          this.setState({
            savedRecipes: response.data.recipes.savedRecipes,
            empty: response.data.recipes.savedRecipes.length  <= 0,
            fetchingMoreData: false
          });
        }
      });

      this.setState({ calledOnce: true});
    }
  }

  componentDidUpdate() {
    if(this.state.calledOnce !== true ){ this.fetchUserRecipes(); }
  }

render() {
  return(
    <React.Fragment>
      <Header authenticated= { this.props.authenticated }
            userAvatar={ this.props.userAvatar }
            handleAuthentication= { this.props.handleAuthentication }/>

        <RecipeList title={this.state.title}
                    authenticated={ this.props.authenticated }
                    component = {this.state.component }
                    recipes={ this.state.savedRecipes }
                    savedRecipes = { this.fetchUserRecipes }
                    fetchingMoreData = { this.state.fetchingMoreData }
                    />

      {
        this.state.empty
        ? <div className="emptyMessage"> <h2> Your Havent Saved anything</h2> </div>
        : null
      }

      <Footer />
    </React.Fragment>
  );
}
}

export default SavedRecipes;
