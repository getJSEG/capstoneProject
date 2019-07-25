import React, { Component } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import './css/App.css';
import './css/style.css';

import NotFound from './components/other/NotFound';
import Home from './components/pages/Home';
import Login from './components/pages/Login';
import Search from './components/pages/Search';
import Recipe from './components/pages/Recipe';
import SavedRecipes from './components/pages/SavedRecipes';
import { userprofile } from './request';

class App extends Component{

  constructor(props) {
    super(props);
    this.state = {
      authenticated: false,
      userAvatar: '',
      error:'',
      message: '',
      displayMessage: false,
    }
  }

  componentDidMount() {
    userprofile().then( response => {
      if(response.status === 200){
        this.setState({
          authenticated: true,
          userAvatar: response.data.profile.photo
        });
      }
    })
  }

  handleAuthentication() {
     this.setState( { authenticated: false })
  }

render() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path='/'  render={ () => <Redirect to='/home' /> } />

        <Route exact path='/home' render={ () => <Home authenticated={ this.state.authenticated }
                                                       userAvatar={ this.state.userAvatar }
                                                       handleAuthentication= { this.handleAuthentication } />
                                                } />
        <Route exact path='/login' render={ () =>
                                                  this.state.authenticated
                                                  ? <Redirect to='/' />
                                                  : (<Login userAvatar={ this.state.userAvatar } />)
                                            } />

          <Route  path='/search/' render={ () => <Search  authenticated={ this.state.authenticated }
                                                          userAvatar={ this.state.userAvatar }
                                                          handleAuthentication= { this.handleAuthentication }/>  }/>

          <Route  path='/recipe/:id' render={ () => <Recipe authenticated={ this.state.authenticated }
                                                            userAvatar={ this.state.userAvatar }
                                                            handleAuthentication= { this.handleAuthentication }/>  }/>

          <Route  path='/saved-recipes' render={ () => <SavedRecipes authenticated={ this.state.authenticated }
                                                                     userAvatar={ this.state.userAvatar }
                                                                     handleAuthentication= { this.handleAuthentication }/>  }/>

         <Route  component={NotFound} />

      </Switch>
    </BrowserRouter>


  );
}

}

export default App;
