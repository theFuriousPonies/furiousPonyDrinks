import React, { Component } from 'react'
import { connect } from 'react-redux'
import CartItems from './cartItems.jsx'

class Cart extends Component {
  getGuestCart = () => {
    const cart = []
    Object.keys(localStorage).forEach(key => {
      cart.push(JSON.parse(localStorage.getItem(key)))
    })
    return cart
  }

  createCart = (items) => {
    const drinksTable = this.props.drinksTable
    return items.map(item => {
      const updatedItem = drinksTable[item.drinkId];
      updatedItem.quantity = item.quantity
      return updatedItem
    })
  }

  render () {
    localStorage.clear()
    const testItem = {
      id: 1,
      name: 'Regular Coke',
      item: {
        quantity: 10
      }
    }
  const testItem2 = {
      id: 2,
      name: 'Diet Coke',
      item: {
        quantity: 3
      }
    }
  localStorage.setItem('1', JSON.stringify(testItem))
  localStorage.setItem('2', JSON.stringify(testItem2))
    const guestCart = this.getGuestCart()
    let drinks = this.props.isLoggedIn ? this.props.order.drinks : guestCart
    const drinksArr = this.createCart(this.props.items)
    console.log(drinksArr)
    // merge cart
    // if (isLoggedIn && guestCart.length)
    return (
      <div>
        {drinks.length ? (
          <CartItems drinks={drinks} />
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
