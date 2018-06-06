import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { logout } from '../store'

const Navbar = ({ handleClick, isLoggedIn }) => (
  <div>
    <nav>
      <h1>THE FURIOUS PONIES DRINKS</h1>

      {isLoggedIn ? (
        <div>
          {/* The navbar will show these links after you log in */}
          <Link to="/home">Home</Link>
          <a href="#" onClick={handleClick}>
            Logout
          </a>
          <div>
            <Link to="/brands">Brands</Link>
            <Link to="/categories">Categories</Link>
          </div>
        </div>
      ) : (
        <div>
          <div id="navlink-containter">
            {/* The navbar will show these links before you log in */}
            <div id="catagories-containter">
              <Link to="/">
                <i className="small material-icons">home</i>
              </Link>
              <Link to="/brands">Brands</Link>
              <Link to="/categories">Categories</Link>
            </div>
            <form className="search">
              <input type="text" placeholder="Search" />
              <input type="submit" value="Go" />
              <i className="small material-icons">search</i>
            </form>
            <div id="login-containter">
              <Link to="/login">Login</Link>
              <Link to="/signup">Sign Up</Link>
              <Link to="/cart">
                <i className="small material-icons">shopping_cart</i>
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
    <hr />
  </div>
)

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.user.id
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
