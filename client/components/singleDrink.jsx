import React, { Component } from 'react'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'

import { changeOneItem } from '../store/item'

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

  handleSubmit = event => {
    event.preventDefault()
    const item = {
      quantity: this.state.quantity,
      orderId: this.props.order.id,
      drinkId: +this.props.match.params.id
    }
    this.props.addToCart(item)
  }
  render() {
    const drinkId = +this.props.match.params.id
    const drinkArr = this.props.drinks.filter(drink => {
      return drinkId === drink.id
    })
    const drink = drinkArr[0]
    const { quantity } = this.state

    return (
      <div>
        {drink && (
          <div>
            <form
              id="single-drink-form"
              onSubmit={this.handleSubmit}
            >
              <div id="single-drink-content">
                {drink.inventory ? <div /> : <span>Out of Stock</span>}
                <img src={drink.imageUrl} content="" id="single-drink-img" />
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
            {this.props.user.isAdmin && (
              <NavLink to={`/drinks/${drinkId}/edit`}>
                <button type="button">Edit Drink</button>
              </NavLink>
            )}
          </div>
        )}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  drinks: state.drinks,
  order: state.order,
  user: state.user
})

const mapDispatchtoProps = dispatch => ({
  addToCart: item => dispatch(changeOneItem(item))
})

export default connect(
  mapStateToProps,
  mapDispatchtoProps
)(SingleDrink)
