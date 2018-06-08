import React from 'react'
import { connect } from 'react-redux'

// const Cart = props => {
//   const drinks = props.order.drinks
//   localStorage.setItem('0', JSON.stringify({one: 'two'}))
//   localStorage.setItem('1', JSON.stringify({one: 'two'}))
//   console.log('localstorage', localStorage.length)
//   const test = props.getGuestCart();
//   console.log('all the storage', test)
//   return (
//     <div>
//       {drinks && (
//         <div>
//           {drinks.map(drink => {
//             return (
//               <div key={drink.id}>
//                 <h3>{drink.name}</h3>
//                 <h3>{drink.item.quantity}</h3>
//               </div>
//             )
//           })}
//         </div>
//       )}
//     </div>
//   )
// }

const Cart = props => {
  localStorage.clear()
  const testItem = {
    id: 1,
    name: 'Regular Coke',
    item: {
      quantity: 10
    }
  }
  const testItem2 = {
    id: 2,
    name: 'Diet Coke',
    item: {
      quantity: 3
    }
  }
  localStorage.setItem('1', JSON.stringify(testItem))
  localStorage.setItem('2', JSON.stringify(testItem2))
  const guestCart = props.getGuestCart();
  const drinks = props.order.drinks
  const isLoggedIn = props.isLoggedIn;
  // merge cart
  // if (isLoggedIn && guestCart.length)
  return (
    <div>
    {isLoggedIn ? (
      <>
      {drinks.length ? (
        <div>
        <h3>You have {drinks.length} items in your cart</h3>
        {drinks.map(drink => {
          return (
            <div key={drink.id}>
              <h4>{drink.name}</h4>
              <h4>{drink.item.quantity}</h4>
            </div>
          )
        })}
      </div>
      ) : (
        <div>
        <h3>Your cart is empty!</h3>
        </div>
      )}
      </>
    ) : (
      <>
      {guestCart.length ? (
        <div>
        <h3>You have {guestCart.length} items in your cart</h3>
        {guestCart.map(drink => {
          return (
            <div key={drink.id}>
              <h4>{drink.name}</h4>
              <h4>{drink.item.quantity}</h4>
            </div>
          )
        })}
      </div>
      ) : (
        <div>
        <h3>Your guest cart is empty!</h3>
        </div>
      )}
      </>
    )}
    </div>
  )
}

const getGuestCart = () => {
  const cart = [];
  Object.keys(localStorage).forEach(key => {
    cart.push(JSON.parse(localStorage.getItem(key)))
  })
  return cart;
}

const mapStateToProps = ({ order, user }) => ({
  order,
  user,
  isLoggedIn: !!user.id,
})

const mapDispatchToProps = dispatch => ({
  getGuestCart
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Cart)
