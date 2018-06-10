import React from 'react'
import { Elements } from 'react-stripe-elements'
import CheckoutForm from './checkoutForm'

class Checkout extends React.Component {
  render() {
    return (
      <Elements>
        <CheckoutForm />
      </Elements>
    )
  }
}

export default Checkout
