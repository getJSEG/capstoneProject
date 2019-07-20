import React, { Component }  from 'react';

import Header from '../subComponents/nav/Header';
import LoginForm from '../subComponents/forms/LoginForm';
import Footer from '../subComponents/nav/Footer';

class Login extends Component  {
  render() {
    return(
      <div className="login-wrapper">
      <Header userAvatar={ this.props.userAvatar } />
        <LoginForm />
        <Footer />
      </div>
    );
  }
}


export default Login;
