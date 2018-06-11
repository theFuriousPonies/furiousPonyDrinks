import React from 'react'
import CartQuantity from './cartQuantity.jsx'

const CartItems = ({ drinks, total, handleChange }) => {
  const optionsArr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
  return (
  <div className="cartBox">
    <h3>You have {drinks.length} items in your cart</h3>
    <div className="cartHeader">
      <div>Name</div>
      <div>Price</div>
      <div>Quantity</div>
    </div>
    <hr />
    {drinks.map(drink => (
      <div key={drink.id}>
      <div key={drink.id} className="cart">
        <h4>{drink.name}</h4>
        <h4>${drink.price / 100}</h4>
        <h4>{drink.quantity}
          <CartQuantity drink={drink} optionsArr={optionsArr} handleChange={handleChange} />
          </h4>
      </div>
      <hr/>
      </div>
    ))}
    <div className="cartTotal">
    <h4>Your total cost is ${total}</h4>
    </div>
  </div>
)}

export default CartItems

