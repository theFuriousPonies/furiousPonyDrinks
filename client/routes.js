import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter, Route, Switch } from 'react-router-dom'
import PropTypes from 'prop-types'
import {
  Login,
  // Signup,
  // UserHome,
  Brands,
  Brand,
  Home,
  Drinks,
  Categories
} from './components'
// import { me } from './store'

import { getBrands } from './store/brand'
import { getDrinks } from './store/drinks'
import { getCategories } from './store/categories'

/**
 * COMPONENT
 */
class Routes extends Component {
  componentDidMount() {
    this.props.loadInitialData()
  }

  render() {
    return (
      <Switch>
        <Route exact path="/brands" component={Brands} />
        <Route path="/brands/:id" component={Brand} />
        <Route exact path="/drinks" component={Drinks} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/categories" component={Categories} />
        <Route exact path="/" component={Home} />
      </Switch>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = ({ user, brands, categories, drinks }) => ({
  user,
  brands,
  categories,
  drinks
})

const mapDispatch = dispatch => {
  return {
    loadInitialData() {
      // dispatch(me())
      dispatch(getBrands())
      dispatch(getCategories())
      dispatch(getDrinks())
    }
  }
}

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(
  connect(
    mapState,
    mapDispatch
  )(Routes)
)

Routes.propTypes = {
  loadInitialData: PropTypes.func.isRequired
  // isLoggedIn: PropTypes.bool.isRequired
}
