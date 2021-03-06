/**
 * `components/index.js` exists simply as a 'central export' for our components.
 * This way, we can import all of our components from the same place, rather than
 * having to figure out which file they belong to!
 */
export { default as Navbar } from './navbar'
export { default as UserHome } from './user-home'
export { default as Brands } from './brands'
export { default as SingleBrand } from './singleBrand'
export { default as Home } from './home'
export { default as Drinks } from './drinks'
export { default as Categories } from './categories'
export { Login, Signup } from './auth-form'
export { default as SingleDrink } from './singleDrink.jsx'
export { default as Cart } from './cart.jsx'
export { default as Checkout } from './checkout.js'
export { default as EditBrand } from './editBrand.jsx'
export { default as EditDrink } from './editDrink.jsx'
export { default as Users } from './users.jsx'
export { default as SingleUser } from './singleUser.jsx'
export { default as EditUser } from './editUser.jsx'
export { default as AcceptedPayment } from './stripe/acceptedPayment'
export { default as AddDrink } from './addDrink.jsx'
export { default as AddBrand } from './addBrand.jsx'
export { default as ReviewCheckout } from './reviewCheckout'
