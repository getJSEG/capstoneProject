import React, { Component } from 'react';
import { NavLink }  from 'react-router-dom';
import PropTypes from "prop-types";

import logo from '../../../assets/recipes-logo.png';

class Header extends Component {

  static propTypes = {
      authenticated: PropTypes.bool.isRequired
  };

  // Set authenticated state to false in the HomePage component
  handleLogoutClick = () => {
    window.open("http://localhost:5000/logout", "_self");
    this.props.handleAuthentication();
  };

  render() {
    const { authenticated } = this.props;
    return(
      <div className='nav-container'>
        <div className='nav-inner-container clearfix'>

          <div className='nav-logo-wrapper'>
            <NavLink id="logo" to='/home'> <img src={logo} alt='logo'/> </NavLink>
          </div>

          <div className='nav-links-container'>
            <div className='main-nav'>
              <ul className='nav'>
                <li className='nav-item'>
                  <NavLink className='nav-links'  to='/home'> Home </NavLink>
                </li>
                <li className='nav-item'>
                  <NavLink className='nav-links' to='/search/'> Search </NavLink>
                </li>
                {
                  this.props.authenticated ? <li className='nav-item'>
                    <NavLink className='nav-links' to='/saved-recipes'> Saved </NavLink>
                  </li> : null
                }
              </ul>
            </div>

            <div className='user-info clearfix'>
              <div className='avatar-wrapper'>

                { authenticated
                  ? <img className="user-img" alt='avatar' src={ this.props.userAvatar } />
                  : null
                }

                { authenticated
                  ? <button className='nav-links logoutBtn'  onClick={this.handleLogoutClick}> Logout </button>
                  : <NavLink className='nav-links' to='/login'> Login </NavLink>
                }
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  };
}


export default Header;
