import React from 'react'
import { Checkout } from './'

const reviewCheckout = props => {
  const { total, cart } = props.location.state.referrer
  return (
    <div>
      {cart.map(item => (
        <div key={item.id}>
          {item.name}
          {item.quantity}
        </div>
      ))}
      <Checkout total={total} />
    </div>
  )
}

export default reviewCheckout
