import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { logout } from '../store/user'

const Navbar = ({ handleClick, isLoggedIn, user }) => (
  <div>
    <nav>
      <h1>THE FURIOUS PONIES DRINKS</h1>
      <div>
        <div id="navlink-containter">
          {/* The navbar will show these links before you log in */}
          <div id="catagories-containter">
            <Link to="/">
              <i className="small material-icons">home</i>
            </Link>
            <Link to="/brands">Brands</Link>
            <Link to="/categories">Categories</Link>
            <Link to="/drinks">Drinks</Link>
            {user.isAdmin ? <Link to="/users">Users</Link> : <div />}
          </div>
          <form className="search">
            <i className="small material-icons">search</i>
            {/* <input type="submit" value="Go" /> */}
            <input type="text" placeholder="Search" />
          </form>
          <div id="login-containter">
            {isLoggedIn ? (
              <>
                Welcome, <Link to="/home">{user.name}</Link>
                <a href="/" onClick={handleClick}>
                  Logout
                </a>
              </>
            ) : (
              <>
                <Link to="/login">Login</Link>
                <Link to="/signup">Sign Up</Link>
              </>
            )}
            <Link to="/cart">
              <i className="small material-icons">shopping_cart</i>
            </Link>
          </div>
        </div>
      </div>
    </nav>
    <hr />
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
