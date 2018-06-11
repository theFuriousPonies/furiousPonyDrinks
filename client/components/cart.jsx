import React, { Component } from 'react'
import { connect } from 'react-redux'
import CartItems from './cartItems.jsx'

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

  total = items => {
    return items.reduce((acc, pV) => acc + (pV.price * pV.quantity), 0) / 100
  }

  render () {
    const guestCart = this.getGuestCart()
    let drinksArr = this.props.isLoggedIn ? this.props.items : guestCart
    const drinks = this.createCart(drinksArr)
    const total = this.total(drinks)
    // merge cart
    // if (isLoggedIn && guestCart.length)
    return (
      <div>
        {drinks.length ? (
          <CartItems drinks={drinks} total={total} />
        ) : (
          <h3>Your cart is empty!</h3>
        )}
      </div>
    )
  }
}

const mapStateToProps = ({ drinks, order, user, items }) => ({
  order,
  drinks,
  user,
  items,
  isLoggedIn: !!user.id
})

// const mapDispatchToProps = dispatch => ({
//   getGuestCart
// })

export default connect(
  mapStateToProps,
  // mapDispatchToProps
)(Cart)
