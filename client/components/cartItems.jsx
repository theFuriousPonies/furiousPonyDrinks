import React from 'react'

const CartItems = ({ drinks }) => {
  return (
  <div>
    <h3>You have {drinks.length} items in your cart</h3>
    {drinks.map(drink => (
      <div key={drink.id}>
        <h4>{drink.name}</h4>
        <h4>{drink.item.quantity}</h4>
      </div>
    ))}
  </div>
)}

export default CartItems
