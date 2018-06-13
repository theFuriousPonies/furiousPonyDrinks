import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { logout } from '../store/user'

const Navbar = ({ handleClick, isLoggedIn, user }) => (
  <div>
    <nav className="nav-extended">
      <div className="nav-wrapper">
        {/* The navbar will show these links before you log in */}
        <a href="/" className="brand-logo"><img className="responsive-img" src="/img/404unicorn.png" style={{ width: '50px', height: '50px', marginLeft: '12px', marginTop: '14px' }} /><b style={{ fontFamily: 'Comic Sans MS', fontSize: '35px', verticalAlign: '18%', marginLeft: '12px' }}>Furious Pony Drinks</b></a>
        <ul id="nav-mobile" className="right hide-on-med-and-down">
          {isLoggedIn ? (
            <>
              <li><a href="/home">Welcome back, {user.name}!</a></li>
              <li><a href="/" onClick={handleClick}>Logout</a></li>
            </>
          ) : (
              <>
                <li><a href="/login">Login</a></li>
                <li><a href="/signup">Sign Up</a></li>
              </>
            )}
          <li><a href="/cart"><i className="small material-icons">shopping_cart</i></a></li>
        </ul>
      </div>
      <div className="nav-content">
        <ul className="tabs tabs-transparent">
          <li className="tab"><a href="/brands">Brands</a></li>
          <li className="tab"><a href="/categories">Categories</a></li>
          <li className="tab"><a href="/drinks">Drinks</a></li>
          {user.isAdmin ? <li className="tab"><a href="/users">Users</a></li> : <div/>}
        </ul>
        <form>
          <div className="input-field">
            <input id="search" type="search" required />
            <label className="label-icon" for="search"><i className="material-icons">search</i></label>
            <i className="material-icons">close</i>
          </div>
        </form>
      </div>
    </nav>
  </div>
)

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.user.id,
    user: state.user
  }
}

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout())
    }
  }
}

export default connect(
  mapState,
  mapDispatch
)(Navbar)

/**
 * PROP TYPES
 */
Navbar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
