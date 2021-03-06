import React, { Component } from 'react'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'

import { addOneItem } from '../store/item'
import { removeDrink } from '../store/drinks'

class SingleDrink extends Component {
  constructor() {
    super()
    this.state = {
      quantity: 1,
      added: false
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

  handleDelete = () => {
    this.props.removeDrink(+this.props.match.params.id)
  }

  handleSubmit = event => {
    event.preventDefault()
    const drinkId = this.props.match.params.id
    if (this.props.isLoggedIn) {
      const item = {
        quantity: this.state.quantity,
        orderId: this.props.order.id,
        drinkId: +drinkId
      }
      // const drinkUpdate = {
      //   id: +drinkId,
      //   inventory: drinkInventory - this.state.quantity
      // }
      this.props.addToCart(item)
    } else {
      const prevItem = JSON.parse(localStorage.getItem(`drinkId${drinkId}`))
      const item = {
        quantity: this.state.quantity,
        drinkId
      }
      if (prevItem) item.quantity += prevItem.quantity
      localStorage.setItem(`drinkId${drinkId}`, JSON.stringify(item))
    }
    this.setState({ added: true, quantity: 1 })
  }

  redirect = location => {
    if (typeof location === 'string') this.props.history.push(`/${location}`)
    else this.props.history.goBack()
    this.setState({ added: false })
  }

  render() {
    const drinkId = this.props.match.params.id
    const drink = this.props.drinks.filter(drink => {
      return +drinkId === drink.id
    })[0]
    const { quantity } = this.state
    return (
      <div>
        {drink && (
          <div>
            <form id="single-drink-form" onSubmit={this.handleSubmit}>
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
              <div className="cartQuantity">
              <button type="submit">Add to Cart</button>
              {this.state.added ? (
                <div>
                <span>Added!</span>
                <button type="button" onClick={() => this.redirect('cart')}>Go to Cart</button>
                <button type="button" onClick={this.redirect}>Continue Shopping</button>
                </div>
              ) : ''}
              </div>
            </form>
            {this.props.user.isAdmin && (
              <>
                <NavLink to={`/drinks/${drinkId}/edit`}>
                  <button type="button">Edit Drink</button>
                </NavLink>
                <button type="button" onClick={this.handleDelete}>
                  Delete Me!
                </button>
              </>
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
  user: state.user,
  drinksTable: state.drinksTable,
  isLoggedIn: !!state.user.id
})

const mapDispatchtoProps = dispatch => ({
  addToCart: (item, inventory) => dispatch(addOneItem(item, inventory)),
  removeDrink: id => dispatch(removeDrink(id))
})

export default connect(
  mapStateToProps,
  mapDispatchtoProps
)(SingleDrink)
