import React, { Component } from 'react';
import { NavLink }  from 'react-router-dom';
// import PropTypes from "prop-types";

class Footer extends Component {

  // static propTypes = {
  //     authenticated: PropTypes.bool.isRequired
  // };
  //
  // // Logout using Twitter passport api
  // // Set authenticated state to false in the HomePage component
  // handleLogoutClick = () => {
  //   window.open("http://localhost:5000/logout", "_self");
  //   this.props.handleAuthentication();
  // };

  render() {
    // const { authenticated } = this.props;
    return(
      <div className='nav-container footer-container'>
            <div className='footer-wrapper'>
              <ul className='nav footer-nav'>
                <li className='nav-item'>
                  <NavLink className='nav-links' to='/home'> Home </NavLink>
                </li>
                <li className='nav-item'>
                  <NavLink className='nav-links' to='/search/'> Search </NavLink>
                </li>
              </ul>
            </div>
      </div>
    )
  };
}


export default Footer;
