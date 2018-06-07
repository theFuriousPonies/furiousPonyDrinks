import axios from 'axios'
import history from '../history'

import { getUserOrder, getNewOrder } from './order'

/**
 * ACTION TYPES
 */
const GET_USER = 'GET_USER'
const REMOVE_USER = 'REMOVE_USER'

/**
 * INITIAL STATE
 */
const defaultUser = {}

/**
 * ACTION CREATORS
 */
export const getUser = user => ({ type: GET_USER, user })
export const removeUser = () => ({ type: REMOVE_USER })

/**
 * THUNK CREATORS
 */
// export const me = () => dispatch =>
//   axios
//     .get('/auth/me')
//     .then(res => dispatch(getUser(res.data || defaultUser)))
//     .catch(err => console.log(err))

export const me = () => async dispatch => {
  try {
    const { data } = await axios.get('/auth/me')
    if (data.id) {
      dispatch(getUser(data))
      console.log(data.orders)
      if (data.orders && !data.orders[0].status) {
        const orderId = data.orders[0].id
        dispatch(getUserOrder(orderId))
      }
      dispatch(getNewOrder(data.id))
    } else {
      dispatch(getUser(defaultUser))
    }
  } catch (err) {
    console.error(err)
  }
}

export const auth = (name, email, password, method) => dispatch =>
  axios
    .post(`/auth/${method}`, { name, email, password })
    .then(
      res => {
        dispatch(getUser(res.data))
        history.push('/')
      },
      authError => {
        // rare example: a good use case for parallel (non-catch) error handler
        dispatch(getUser({ error: authError }))
      }
    )
    .catch(dispatchOrHistoryErr => console.error(dispatchOrHistoryErr))

export const logout = () => dispatch =>
  axios
    .post('/auth/logout')
    .then(_ => {
      dispatch(removeUser())
      history.push('/')
    })
    .catch(err => console.log(err))

/**
 * REDUCER
 */
export default function(state = defaultUser, action) {
  switch (action.type) {
    case GET_USER:
      return action.user
    case REMOVE_USER:
      return defaultUser
    default:
      return state
  }
}
