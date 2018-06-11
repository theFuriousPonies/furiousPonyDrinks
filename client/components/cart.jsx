import React, { Component } from 'react'
import { connect } from 'react-redux'
import CartItems from './cartItems.jsx'

class Cart extends Component {
  getGuestCart = () => {
    return Object.keys(localStorage).slice(1)
    .map(key => JSON.parse(localStorage.getItem(key)))
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
  //   localStorage.clear()
  //   const testItem = {
  //     drinkId: 1,
  //     name: 'Regular Coke',
  //     quantity: 10
  //   }
  // const testItem2 = {
  //     drinkId: 2,
  //     name: 'Diet Coke',
  //     quantity: 3
  //   }
  // localStorage.setItem('1', JSON.stringify(testItem))
  // localStorage.setItem('2', JSON.stringify(testItem2))
    const guestCart = this.getGuestCart()
    let drinksArr = this.props.isLoggedIn ? this.props.items : guestCart
    const drinks = this.createCart(drinksArr)
    console.log(drinksArr)
    console.log(drinks)
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
