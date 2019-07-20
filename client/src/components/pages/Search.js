import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import Header from '../subComponents/nav/Header';
import Footer from '../subComponents/nav/Footer';
import RecipeList from '../subComponents/recipe/RecipeList';
import SearchForm from '../subComponents/forms/SearchForm';
import Message from '../other/Message';
import { searchRecipes, getRecipes } from '../../request';
import queryString from 'query-string';


class Search extends Component {

  constructor(props) {
    super(props);
    this.state = {
      recipes: [],
      query: '',
      title: 'discover',
      message:'',
      displayMessage: false,
      component: 'search',
      pageNumber: 1,
      nPerPage: 5,
      fetchingMoreData: true
    }
  }

  //send request tot he back end to search for recipes from the query tags
  search = () => {
    const tag = queryString.parse(this.props.location.search);
    const { pageNumber, nPerPage} = this.state;

    this.setState({ pageNumber: this.state.pageNumber + 1});

      if(tag.tags == null){
        getRecipes(pageNumber, nPerPage).then( response => {
          let recipes = response.data.recipes;

          response.status === 200 ?
          this.setState({ recipes: this.state.recipes.concat(recipes) }) :
          this.setState({ fetchingMoreData: false })
        });
      }else{
        searchRecipes(tag.tags, pageNumber, nPerPage).then( response => {
          let recipes = response.data.recipes;

          response.status === 200 ?
          this.setState({ recipes: this.state.recipes.concat(recipes) }) :
          this.setState({ fetchingMoreData: false })
        });
      }
  }

  componentDidMount() {
    this.onRouteChanged();
    this.search();
  }

//this handles error messages when saving recipes
  handleMessage = (displayMessage, message) => {
    this.setState({
      message: message,
      displayMessage: displayMessage
    });
  }

  //this unmounts the message component
  componentWillUnmount() { this.setState({ displayMessage: false }); }

  //chack if the route has changes
  componentDidUpdate(prevProps){
    if (this.props.location !== prevProps.location) { this.onRouteChanged(); }
  }
  //update the state when the route has changed
  onRouteChanged() {
    const tag = queryString.parse(this.props.location.search);
    this.setState({  query: tag.tags,
                     recipes:[],
                     pageNumber: 1,
                     title: tag.tags});
  }

  render() {
    return(
      <React.Fragment>
      { this.state.displayMessage
        ? <Message  message={this.state.message} />
        : null
      }
      <Header authenticated= { this.props.authenticated }
            userAvatar={ this.props.userAvatar }
            handleAuthentication= { this.props.handleAuthentication }/>
        <div className='search-form-container'>
           <SearchForm query= { this.state.query } history= {this.props.history }  search={ this.search } pathname={ this.props.location.pathname } />
        </div>
          <RecipeList title= {this.state.title }
                      handleMessage={this.handleMessage }
                      searchQuery= { this.state.query }
                      authenticated={this.props.authenticated }
                      component = {this.state.component }
                      recipes = { this.state.recipes }
                      search = { this.search }
                      fetchingMoreData = { this.state.fetchingMoreData }
                      />
          <Footer />
      </React.Fragment>
    );
  }
}

export default withRouter(Search);
