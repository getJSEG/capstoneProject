import React, { Component } from 'react';
import logo from '../../../assets/recipes-logo.png' ;

class LoginForm extends Component {

  render(){
    return(
      <div className="wraper-login">

          <div className="logo">
            <img src={logo} alt ='logo'/>
          </div>

  				<div className="login-container">
  					<a href="https://best-food-recipes.herokuapp.com/login/facebook" className="facebook">
  						<i className="fa fa-facebook"></i>
              <span> Facebook </span>
  					</a>

            <span> Or </span>

  					<a href="https://best-food-recipes.herokuapp.com/login/google" className="google">
  						<i className="fa fa-google"></i>
              <span> Google </span>
  					</a>
  				</div>

  			</div>
    )
  }
}

export default LoginForm;
