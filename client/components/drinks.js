import React from 'react'
import { connect } from 'react-redux'
import drinkProfile from './drinkProfile.jsx'

const Drinks = props => {
  const drinks = props.drinks
  return (
    <div>
      <h1>ALL THE DRINKS</h1>
      {drinks.map(drink => {
        return <drinkProfile key={drink.id} drink={drink} />
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
