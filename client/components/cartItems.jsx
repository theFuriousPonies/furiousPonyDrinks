import React from 'react'

const CartItems = ({ drinks, total }) => {
  return (
  <div>
    <h3>You have {drinks.length} items in your cart</h3>
    {drinks.map(drink => (
      <div key={drink.drinkId}>
        <h4>{drink.name}</h4>
        <h4>{drink.quantity}</h4>
      </div>
    ))}
    <h4>Your total cost is ${total}</h4>
  </div>
)}

export default CartItems

