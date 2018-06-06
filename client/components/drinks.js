import React from 'react'
import { connect } from 'react-redux'
import DrinkProfile from './drinkProfile.jsx'
import FilterByCategory from './filterCategories.jsx'

const Drinks = props => {
  const drinks = props.drinks
  return (
    <div>
      <FilterByCategory />
      <h1>ALL THE DRINKS</h1>
      <div className="drink-profile-container">
        {drinks.map(drink => {
          return <DrinkProfile key={drink.id} drink={drink} />
        })}
      </div>
    </div>
  )
}

const mapStateToProps = state => ({
  drinks: state.drinks
})

export default connect(
  mapStateToProps,
  null
)(Drinks)
