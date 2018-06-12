import React, { Component } from 'react'
import { connect } from 'react-redux'
import DrinkProfile from './drinkProfile.jsx'
import FilterByCategory from './filterCategories.jsx'
import { NavLink } from 'react-router-dom'

class Drinks extends Component {
  constructor() {
    super()
    this.state = {
      filters: []
    }
  }
  handleChange = event => {
    const value = event.target.value
    if (!this.state.filters.includes(value)) {
      this.setState(prevState => ({
        filters: [...prevState.filters, value]
      }))
    } else {
      this.setState(prevState => {
        const index = prevState.filters.indexOf(value)
        prevState.filters.splice(index, 1)
        return {
          filters: prevState.filters
        }
      })
    }
  }

  checkFiltersInCategories(drink) {
    // This is for experimentation
    if (!this.state.filters.length) {
      return true
    }
    for (let i = 0; i < drink.categories.length; i++) {
      for (let j = 0; j < this.state.filters.length; j++) {
        if (+this.state.filters[j] === drink.categories[i].id) {
          return true
        }
      }
    }
    return false
  }

  render() {
    const drinks = this.props.drinks
    const isAdmin = this.props.user.isAdmin
    return (
      <div id="color-gradient">
        <div id="drinks-container">
          <FilterByCategory handleChange={this.handleChange} />
          <div id="drinks">
            <h1>ALL THE DRINKS</h1>
            {isAdmin && (
              <NavLink to="/drinks/add">
                <button type="button" id="add-drink-btn">
                  Create Drink
                </button>
              </NavLink>
            )}
            <div className="drink-profile-container">
              {drinks.map(drink => {
                if (this.checkFiltersInCategories(drink)) {
                  return <DrinkProfile key={drink.id} drink={drink} />
                }
              })}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  drinks: state.drinks,
  user: state.user
})

export default connect(
  mapStateToProps,
  null
)(Drinks)
