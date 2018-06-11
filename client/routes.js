import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter, Route, Switch } from 'react-router-dom'
import PropTypes from 'prop-types'
import {
  Login,
  Signup,
  // UserHome,
  Brands,
  SingleBrand,
  SingleDrink,
  Home,
  Drinks,
  Categories,
  Cart,
  EditBrand,
  Checkout,
  EditDrink,
  Users,
  SingleUser,
  EditUser
} from './components'
import { me } from './store/user'

import { getBrands } from './store/brand'
import { getDrinks } from './store/drinks'
import { getCategories } from './store/categories'
import { getUsers } from './store/users'

/**
 * COMPONENT
 */
class Routes extends Component {
  componentDidMount() {
    this.props.loadInitialData()
  }

  drinksTable = () => {
    return this.props.drinks.reduce((acc, pV) => {
      const drinkId = pV.id
      const price = pV.price
      const name = pV.name
      const inventory = pV.inventory
      acc[drinkId] = { price, name, drinkId, inventory }
      return acc
    }, {})
  }

  render() {
    if (!this.props.drinks.length) {
      return null
    } else {
      const drinksTable = this.drinksTable()
      return (
        <Switch>
          <Route exact path="/brands" component={Brands} />
          <Route exact path="/brands/:id" component={SingleBrand} />
          {this.props.user.isAdmin && (
          <Route path="/brands/:id/edit" component={EditBrand} />
          )}
          <Route exact path="/drinks" component={Drinks} />
          <Route exact path="/drinks/:id" component={SingleDrink} />
         {this.props.user.isAdmin && (
          <Route path="/drinks/:id/edit" component={EditDrink} />

        )}
        <Route exact path="/login" component={Login} />
        <Route exact path="/signup" component={Signup} />
        <Route exact path="/categories" component={Categories} />
           <Route
            exact
            path="/cart"
            render={routeProps => (
              <Cart {...routeProps} drinksTable={drinksTable} />
            )}
          />
        <Route exact path="/checkout" component={Checkout} />
        {this.props.user.isAdmin && (
          <Route exact path="/users" component={Users} />
        )}
        {this.props.user.isAdmin && (
          <Route exact path="/users/:id" component={SingleUser} />
        )}
        {this.props.user.isAdmin && (
          <Route exact path="/users/:id/edit" component={EditUser} />
        )}
        <Route exact path="/" component={Home} />
        {/* Admin restricted access to pages below */}
        {/* {this.props.user.isAdmin && (
          <>
            <Route path="/users" component={Users} />
            <Route path="/drinks/:id/edit" component={EditDrink} />
            <Route path="/brands/:id/edit" component={EditBrand} />
          </>
        )} */}
        </Switch>
      )
    }
  }
}

/**
 * CONTAINER
 */
const mapState = ({ users, user, brands, categories, drinks, order }) => ({
  user,
  brands,
  categories,
  drinks,
  order,
  users
})

const mapDispatch = dispatch => {
  return {
    loadInitialData() {
      dispatch(me())
      dispatch(getBrands())
      dispatch(getCategories())
      dispatch(getDrinks())
      dispatch(getUsers())
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
}
