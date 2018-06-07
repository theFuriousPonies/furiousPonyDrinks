import React, { Component } from 'react'
import { connect } from 'react-redux'

class SingleDrink extends Component {
  constructor() {
    super()
    this.state = {
      quantity: 1
    }
  }

  handleChange = () => {
    return 'kirk'
  }

  render() {
    const drinkId = +this.props.match.params.id
    const drinkArr = this.props.drinks.filter(drink => {
      return drinkId === drink.id
    })
    const drink = drinkArr[0]
    const { handleSubmit, handleChange } = this.props
    const { quantity } = this.state
    const orderId = this.state.order.id
    return (
      <div>
        {drink && (
          <form
            onSubmit={handleSubmit({
              quantity,
              drinkId,
              orderId
            })}
          >
            <div>
              <h2>{drink.name}</h2>
              <img src={drink.imageUrl} alt="" />
              <div>Price: ${(drink.price / 100) * quantity}</div>
            </div>
            <button type="button" onChange={handleChange}>
              +
            </button>
            <button type="button" onChange={handleChange}>
              -
            </button>
            <button type="submit">Add to Cart</button>
          </form>
        )}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  drinks: state.drinks,
  user: state.user,
  order: state.order
})

const mapDispatchtoProps = dispatch => ({
  handleSubmit: obj => dispatch(thunk(obj))
})

export default connect(
  mapStateToProps,
  mapDispatchtoProps
)(SingleDrink)
