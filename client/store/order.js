import axios from 'axios'
import history from '../history'
import Axios from 'axios'

// ACTION TYPES

// const GOT_ALL_ORDERS = 'GOT_ALL_ORDERS'
const GOT_USER_ORDER = 'GOT_USER_ORDER'
const REMOVED_ORDER = 'REMOVED_ORDER'
const NEW_ORDER = 'NEW_ ORDER'
const UPDATE_ORDER = 'UPDATE_ORDER'

// INITIAL STATE

const initialState = {}

// ACTION CREATORS

// const gotAllOrders = orders => ({ type: GOT_ALL_ORDERS, orders })

const gotUserOrder = order => ({ type: GOT_USER_ORDER, order })

const gotNewOrder = order => ({ type: NEW_ORDER, order })

const updatedOrder = order => ({ type: UPDATE_ORDER, order })

const removeOrder = id => ({ type: REMOVED_ORDER, id })

// THUNK CREATORS

// export const getOrders = () => async dispatch => {
//   try {
//     const { data } = await axios.get('/api/orders')
//     dispatch(gotAllOrders(data))
//   } catch (err) {
//     console.error(err)
//   }
// }

export const getUserOrder = id => async dispatch => {
  try {
    const { data } = await axios.get(`/api/orders/${id}`)
    dispatch(gotUserOrder(data))
  } catch (err) {
    console.error(err)
  }
}

export const getNewOrder = (userId, order = {}) => async dispatch => {
  try {
    const { data } = await axios.post(`/api/orders/${userId}`, order)
    dispatch(gotNewOrder(data))
  } catch (err) {
    console.error(err)
  }
}

export const updateOrder = order => async dispatch => {
  try {
    const { data } = await axios.put(`/api/orders/${order.id}`, order)
    dispatch(updatedOrder(data))
  } catch (err) {
    console.error(err)
  }
}

export const deleteOrder = id => async dispatch => {
  try {
    await axios.delete(`/api/orders/${id}`)
    dispatch(removeOrder(id))
  } catch (err) {
    console.error(err)
  }
}

// ORDER REDUCER

const order = (state = initialState, action) => {
  switch (action.type) {
    case GOT_USER_ORDER:
    case UPDATE_ORDER:
    case NEW_ORDER:
      return action.order
    case REMOVED_ORDER:
      return initialState
    default:
      return state
  }
}

export default order
