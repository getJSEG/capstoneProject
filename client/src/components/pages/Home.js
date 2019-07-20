import React, { Component } from 'react';

import Header from '../subComponents/nav/Header';
import Footer from '../subComponents/nav/Footer';
import RecipeList from '../subComponents/recipe/RecipeList';
import HomeSearchForm from '../subComponents/forms/HomeSearchForm';
import Message from '../other/Message';
import { getRecipes } from '../../request';

class Home extends Component {

  constructor(props) {
    super(props);
    this.state = {
      recipes: [],
      loading: true,
      title: 'discover',
      message:'',
      displayMessage: false,
      component: 'home',
      pageNumber: 1,
      nPerPage: 5,
      fetchingMoreData: true
    }
  }

  componentDidMount() { this.fetchData(); }

  handleMessage = (displayMessage, message) => {
    this.setState({
      message: message,
      displayMessage: displayMessage
    });
  }


  fetchData = () => {
    const {pageNumber, nPerPage} = this.state;

    this.setState({ pageNumber: this.state.pageNumber + 1})

    getRecipes(pageNumber, nPerPage).then( response => {
      let recipes = response.data.recipes;

      response.status === 200 ?
      this.setState({ recipes: this.state.recipes.concat(recipes) }) :
      this.setState({ fetchingMoreData: false })
    });
  }

  render() {
      return(
        <div>
         {
           this.state.displayMessage
           ? <Message  message={this.state.message}/>
           : null
         }

         <Header authenticated= { this.props.authenticated }
                userAvatar={ this.props.userAvatar }
                handleAuthentication= { this.props.handleAuthentication }/>

          <div className='view intro-2'>
            <div className='hero-img-overlay full-bg-img'>
              <div className='mask rgba-black-light flex-center'>
                <div className='container text-center white-text'>
                      <HomeSearchForm />

                </div>
              </div>
            </div>
          </div>

         <RecipeList title={ this.state.title}
                      loading={ this.state.loading }
                      authenticated={this.props.authenticated }
                      handleMessage={this.handleMessage }
                      component = {this.state.component}
                      recipes = { this.state.recipes }
                      fetchData = { this.fetchData }
                      fetchingMoreData = { this.state.fetchingMoreData }
                      />

          <Footer />
        </div>
      );
  }
}

export default Home;
