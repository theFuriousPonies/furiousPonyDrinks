import axios from 'axios'
import history from '../history'

// ACTION TYPES

const GOT_ITEMS = 'GOT_ITEMS'
const ONE_ITEM = 'ONE_ITEM'
const REMOVED_ITEM = 'REMOVE_ITEM'

// INITIAL STATE

const initialState = []

// ACTION CREATORS

const gotItems = allItems => ({ type: GOT_ITEMS, allItems })

const oneItem = item => ({ type: ONE_ITEM, item })

const removedItem = item => ({ type: REMOVED_ITEM, item })

// THUNK CREATORS

export const getItems = id => async dispatch => {
  try {
    const { data } = await axios.get(`/api/items/${id}`)
    dispatch(gotItems(data))
  } catch (err) {
    console.error(err)
  }
}

export const changeOneItem = item => async dispatch => {
  try {
    const { data } = await axios.post(`/api/items`, item)
    if (data) dispatch(oneItem(data))
    else dispatch(removedItem(item))
  } catch (err) {
    console.error(err)
  }
}

// ITEMS REDUCER

const items = (state = initialState, action) => {
  switch (action.type) {
    case GOT_ITEMS:
      return action.allItems
    case ONE_ITEM:
      return [action.item, ...state]
    case REMOVED_ITEM:
      return [...state].filter(
        item =>
          item.drinkId !== action.item.drinkId &&
          item.orderId !== action.item.orderId
      )
    default:
      return state
  }
}

export default items
