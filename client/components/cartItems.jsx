import React from 'react'
import CartQuantity from './cartQuantity.jsx'

const CartItems = ({ drinks, total, handleChange, handleDelete, handleSubmit, show }) => {
  const optionsArr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
  const number = drinks.reduce((acc, pV) => acc + pV.quantity, 0)
  const totalAfterTax = Number(Math.round(total * 1.08875 + 'e2') + 'e-2')
  return (
  <div className="cartBox">
    <h3>You have {number} items in your cart</h3>
    <div className="cartHeader">
      <div>Name</div>
      <div>Price</div>
      <div>Quantity</div>
    </div>
    <hr />
    {drinks.map(drink => {
      return (
      <div key={drink.id}>
      <div key={drink.id} className="cart">
        <h4>{drink.name}</h4>
        <h4>${drink.price / 100}</h4>
        <div className="cartQuantity">
        <h4>
          <CartQuantity drink={drink} optionsArr={optionsArr} handleChange={handleChange} show={show} />
        </h4>
        <button type="button" value={drink.id} onClick={handleDelete}>Remove</button>
        </div>
      </div>
      <hr/>
      </div>
    )})}
    <div className="cartTotal">
    <h5>Subtotal: ${total}</h5>
    <h5>Tax: 8.875%</h5>
    <h4>Total: ${totalAfterTax}</h4>
    <button type="button" onClick={() => handleSubmit(event, drinks, totalAfterTax)}>Checkout</button>
    </div>
  </div>
)}

export default CartItems

