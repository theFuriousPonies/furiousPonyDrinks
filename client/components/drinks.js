import React from 'react'
import { connect } from 'react-redux'
import DrinkProfile from './drinkProfile.jsx'

const Drinks = props => {
  const drinks = props.drinks
  return (
    <div>
      <h1>ALL THE DRINKS</h1>
      {drinks.map(drink => {
        return <DrinkProfile key={drink.id} drink={drink} />
      })}
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
