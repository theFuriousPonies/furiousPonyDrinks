import React from 'react'
import {
  CardElement,
  injectStripe
} from 'react-stripe-elements'
import axios from 'axios'

class SplitForm extends React.Component {
  handleSubmit = async ev => {
    ev.preventDefault()
    const newToken = await this.props.stripe.createToken({
      type: 'card'
    })
    console.log('Received Stripe token:', newToken.token.id)
    const newCharge = await axios.post('/api/stripe', {
      token: newToken.token.id
    })
    if (newCharge) {
      this.props.history.push('./acceptedPayment')
    }
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <CardElement style={{ base: { fontSize: '18px' } }} />
        <button type="submit">Submit Payment HOLLA!!!</button>
      </form>
    )
  }
}
export default injectStripe(SplitForm)

