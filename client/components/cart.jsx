import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import CartItems from './cartItems.jsx'
import { addOneItem, changeOneItem, removeItem } from '../store/item'

class Cart extends Component {
  constructor(props) {
    super(props)
    this.state = {
      more: false,
      total: 0,
      cart: []
    }
  }

  // componentDidMount () {
  //   const guestCart = this.getGuestCart()
  //   this.setState({ guestCart })
  // }

  getGuestCart = () => {
    const keys = Object.keys(localStorage).filter(key => key.startsWith('drinkId'))
    return keys.map(key => JSON.parse(localStorage.getItem(key)))
  }

  createCart = items => {
    const drinksTable = this.props.drinksTable
    return items.map(item => {
      const updatedItem = drinksTable[item.drinkId];
      updatedItem.quantity = item.quantity
      return updatedItem
    })
  }

  mergeCart = guestItems => {
    const orderId = this.props.order.id
    guestItems.forEach(item => {
      item.orderId = orderId
      this.props.addToCart(item)
      })
    localStorage.clear()
  }

  total = items => {
    return items.reduce((acc, pV) => acc + (pV.price * pV.quantity), 0) / 100
  }

  handleChange = (event, drinkId, eventQuantity = null) => {
    event.preventDefault()
    const quantity = eventQuantity ? +eventQuantity : +event.target.value
    if (event.target.value === 'more') {
      this.setState({ more: drinkId })
    } else {
      this.setState({ more: false })
      if (this.props.isLoggedIn) {
        const item = {
          drinkId,
          quantity,
          orderId: this.props.order.id
        }
        this.props.changeQuantity(item)
      } else {
        const item = {
          drinkId,
          quantity
        }
        if (!quantity) localStorage.removeItem(`drinkId${drinkId}`)
        else localStorage.setItem(`drinkId${drinkId}`, JSON.stringify(item))
        // const guestCart = this.getGuestCart()
        // this.setState({ guestCart })
      }
    }
  }

  handleDelete = event => {
    if (this.props.isLoggedIn) {
      this.props.deleteItem({
        drinkId: +event.target.value,
        orderId: this.props.order.id
      })
    } else {
      localStorage.removeItem(`drinkId${event.target.value}`)
      const guestCart = this.getGuestCart()
      this.setState({ cart: guestCart })
    }
  }

  handleSubmit = (event, cart, total) => {
    event.preventDefault()
    this.setState({ total, cart })

  }

  render () {
    if (!this.props.drinksTable['1']) return null

    if (this.state.total) return (<Redirect to={
      {
        pathname: '/reviewCart',
        state: { referrer: this.state }
      }
    } />)

    const guestCart = this.getGuestCart()
    if (this.props.isLoggedIn) this.mergeCart(guestCart)
    const drinksArr = this.props.isLoggedIn ? this.props.items : guestCart
    const drinks = drinksArr.length ? this.createCart(drinksArr) : drinksArr
    const total = this.total(drinks)
    return (
      <div>
        {drinks.length ? (
          <CartItems drinks={drinks} total={total} handleChange={this.handleChange} handleDelete={this.handleDelete} handleSubmit={this.handleSubmit} show={this.state.more} />
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
  changeQuantity: item => dispatch(changeOneItem(item)),
  deleteItem: item => dispatch(removeItem(item))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Cart)
