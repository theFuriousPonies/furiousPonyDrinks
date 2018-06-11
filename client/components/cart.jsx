import React, { Component } from 'react'
import { connect } from 'react-redux'
import CartItems from './cartItems.jsx'
import { addOneItem, changeOneItem } from '../store/item'

class Cart extends Component {
  getGuestCart = () => {
    return Object.keys(localStorage).slice(1)
    .map(key => JSON.parse(localStorage.getItem(key)))
  }

  createCart = items => {
    const drinksTable = this.props.drinksTable
    return items.map(item => {
      const updatedItem = drinksTable[item.drinkId];
      updatedItem.quantity = item.quantity
      return updatedItem
    })
  }

  mergeCart = async guestItems => {
    const orderId = this.props.order.id
    await guestItems.forEach(item => {
      item.orderId = orderId
      this.props.addToCart(item)
      })
    localStorage.clear()
  }

  total = items => {
    return items.reduce((acc, pV) => acc + (pV.price * pV.quantity), 0) / 100
  }

  handleChange = (event, drinkId) => {
    const item = {
      drinkId,
      quantity: event.target.value,
      orderId: this.props.order.id
    }
    this.props.changeQuantity(item)
  }

  render () {
    const guestCart = this.getGuestCart()
    if (this.props.isLoggedIn) this.mergeCart(guestCart)
    let drinksArr = this.props.isLoggedIn ? this.props.items : guestCart
    const drinks = this.createCart(drinksArr)
    const total = this.total(drinks)
    return (
      <div>
        {drinks.length ? (
          <CartItems drinks={drinks} total={total} handleChange={this.handleChange} />
        ) : (
          <h3>Your cart is empty!</h3>
        )}
      </div>
    )
  }
}

const mapStateToProps = ({ drinks, order, user, items, drinksTable }) => ({
  order,
  drinks,
  user,
  items,
  drinksTable,
  isLoggedIn: !!user.id
})

const mapDispatchToProps = dispatch => ({
  addToCart: item => dispatch(addOneItem(item)),
  changeQuantity: item => dispatch(changeOneItem(item))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Cart)
