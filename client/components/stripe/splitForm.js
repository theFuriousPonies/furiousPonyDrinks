import React from 'react'
import { CardElement, injectStripe } from 'react-stripe-elements'
import { connect } from 'react-redux'
import { updateOrder, getNewOrder } from '../../store/order'
import { changeOneItem } from '../../store/item'
import { updateDrink } from '../../store/drinks'
import { withRouter } from 'react-router-dom'
import axios from 'axios'

class SplitForm extends React.Component {
  userCheckOut = () => {
    const order = {
      id: this.props.order.id,
      status: true,
      total: this.props.total
    }
    this.props.completeUserOrder(order)
    const updatedItems = this.props.items.map(item => {
      return {
        id: item.drinkId,
        inventory:
          this.props.drinksTable[item.drinkId].inventory - item.quantity
      }
    })
    updatedItems.map(item => {
      return this.props.updateInventory(item)
    })
    this.props.createOrder(this.props.user.id)
    this.props.history.push('./acceptedPayment')
  }

  guestCheckOut = async () => {
    const { data } = await axios.post('/api/orders', {
      status: true,
      total: this.props.total
    })
    const items = this.props.cart.map(item => {
      return this.props.addItemGuestOrder({
        orderId: data.id,
        drinkId: item.id,
        quantity: item.quantity
      })
    })
    const updatedItems = this.props.cart.map(item => ({
      id: item.id,
      inventory: this.props.drinksTable[item.id].inventory - item.quantity
    }))
    updatedItems.map(item => {
      return this.props.updateInventory(item)
    })
    localStorage.clear()
    this.props.history.push('./acceptedPayment')
  }

  handleSubmit = async ev => {
    ev.preventDefault()
    const newToken = await this.props.stripe.createToken({
      type: 'card'
    })
    const newCharge = await axios.post('/api/stripe', {
      token: newToken.token.id,
      total: Math.floor(this.props.total * 100)
    })
    if (newCharge) {
      if (this.props.isLoggedIn) this.userCheckOut()
      else this.guestCheckOut()
    }
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <CardElement />
        <button type="submit">Submit Payment HOLLA!!!</button>
      </form>
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
  completeUserOrder: order => dispatch(updateOrder(order)),
  updateInventory: drink => dispatch(updateDrink(drink)),
  createOrder: id => dispatch(getNewOrder(id)),
  addItemGuestOrder: item => dispatch(changeOneItem(item))
})

export default injectStripe(
  withRouter(
    connect(
      mapStateToProps,
      mapDispatchToProps
    )(SplitForm)
  )
)
