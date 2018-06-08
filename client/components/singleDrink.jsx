import React, { Component } from 'react'
import { connect } from 'react-redux'

class SingleDrink extends Component {
  constructor() {
    super()
    this.state = {
      quantity: 1
    }
  }

  handleChange = event => {
    const quantity = this.state.quantity
    const drinkId = +this.props.match.params.id
    const drinkArr = this.props.drinks.filter(drink => {
      return drinkId === drink.id
    })
    const drink = drinkArr[0]
    console.log(event.target.name)
    if (event.target.name === 'add') {
      if (drink.inventory > quantity) {
        this.setState(prevState => ({
          quantity: prevState.quantity + 1
        }))
      }
    } else if (quantity > 1) {
      this.setState(prevState => ({
        quantity: prevState.quantity - 1
      }))
    }
  }

  handleSubmit() {
    return 'funck off'
  }
  render() {
    const drinkId = +this.props.match.params.id
    const drinkArr = this.props.drinks.filter(drink => {
      return drinkId === drink.id
    })
    const drink = drinkArr[0]
    // const { handleSubmit, handleChange } = this.props
    const { quantity } = this.state
    // const orderId = this.state.order.id
    const orderId = 1
    return (
      <div>
        {drink && (
          <form
            id="single-drink-form"
            onSubmit={this.handleSubmit({
              quantity,
              drinkId,
              orderId
            })}
          >
            <div id="single-drink-content">
              {drink.inventory ? <div /> : <span>Out of Stock</span>}
              <img src={drink.imageUrl} alt="" className="single-drink-img" />
              <div>
                <h2>{drink.name}</h2>
                <div>Price: ${(drink.price / 100) * quantity}</div>
                <div>Quantity: {quantity}</div>
                {drink.inventory !== quantity ? (
                  <div />
                ) : (
                  <span>Max Quantity</span>
                )}
              </div>
            </div>
            <div id="single-drink-btn-containter">
              <button type="button" onClick={this.handleChange} name="add">
                +
              </button>
              <button id="minus" type="button" onClick={this.handleChange}>
                -
              </button>
            </div>
            <button type="submit">Add to Cart</button>
          </form>
        )}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  drinks: state.drinks,
  user: state.user
  // order: state.order
})

const mapDispatchtoProps = dispatch => ({
  // handleSubmit: obj => dispatch(thunk(obj))
})

export default connect(
  mapStateToProps,
  mapDispatchtoProps
)(SingleDrink)