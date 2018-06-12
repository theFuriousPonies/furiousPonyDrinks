import React from 'react'
import {
  CardElement,
  injectStripe
} from 'react-stripe-elements'
import { connect } from 'react-redux'
import axios from 'axios'

class SplitForm extends React.Component {
  handleSubmit = async ev => {
    ev.preventDefault()
    const newToken = await this.props.stripe.createToken({
      type: 'card'
    })
    const newCharge = await axios.post('/api/stripe', {
      token: newToken.token.id
    })
    if (newCharge) {
      //create order on the DB then push
      this.props.history.push('./acceptedPayment')
    }
  }

  render() {
    console.log("Holla this.props", this.props)
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
// const mapDispatchToProps = dispatch => ({
//   addToCart: item => dispatch(addOneItem(item)),
//   changeQuantity: item => dispatch(changeOneItem(item)),
//   deleteItem: item => dispatch(removeItem(item))
// })

export default injectStripe(connect(mapStateToProps)(SplitForm))

