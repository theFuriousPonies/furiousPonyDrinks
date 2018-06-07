import React, { Component } from 'react'
import { connect } from 'react-redux'

class SingleDrink extends Component {
  constructor() {
    super()
    this.state = {
      quantity: 0,
      price: 0
    }
  }
  render() {
    const id = +this.props.match.params.id
    console.log('id', id)
    console.log('state.drinks', this.props.drinks)
    const drinkArr = this.props.drinks.filter(drink => {
      return id === drink.id
    })
    const drink = drinkArr[0]
    console.log(drink)
    return (
      <div>
        {drink && (
          <div>
            <h2>{drink.name}</h2>
            <img src={drink.imageUrl} alt="" />
            <div>Price: ${drink.price / 100}</div>
          </div>
        )}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  drinks: state.drinks
})

export default connect(
  mapStateToProps,
  null
)(SingleDrink)
