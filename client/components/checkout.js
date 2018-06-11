import React from 'react'
import { Elements } from 'react-stripe-elements'
import SplitForm from './stripe/splitForm'

const Checkout = (props) => {
  return (
    <div className="Checkout">
      <h1>Enter Your Credit Card Info</h1>
      <Elements>
        <SplitForm {...props} />
      </Elements>
    </div>
  )
}

export default Checkout
