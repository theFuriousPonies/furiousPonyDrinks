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
