import { createStore, combineReducers, applyMiddleware } from 'redux'
import createLogger from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import user from './user'
import brands from './brand'
import categories from './categories'
import drinks from './drinks'
import order from './order'
import items from './item'
import users from './users'
import drinksTable from './drinksTable'

const reducer = combineReducers({
  user,
  order,
  brands,
  categories,
  drinks,
  items,
  users,
  drinksTable
})

const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({ collapsed: true }))
)
const store = createStore(reducer, middleware)

export default store
