import React from 'react'
import { connect } from 'react-redux'
import CartItems from './cartItems.jsx'

const Cart = props => {
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
  const guestCart = props.getGuestCart()
  let drinks = props.isLoggedIn ? props.order.drinks : guestCart
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

const getGuestCart = () => {
  const cart = []
  Object.keys(localStorage).forEach(key => {
    cart.push(JSON.parse(localStorage.getItem(key)))
  })
  return cart
}

const mapStateToProps = ({ order, user }) => ({
  order,
  user,
  isLoggedIn: !!user.id
})

const mapDispatchToProps = dispatch => ({
  getGuestCart
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Cart)
