import axios from 'axios'
import history from '../history'
import { updateDrink } from './drinks'

// ACTION TYPES

const GOT_ITEMS = 'GOT_ITEMS'
const ONE_ITEM = 'ONE_ITEM'
const REMOVED_ITEM = 'REMOVE_ITEM'
const NEW_ORDER = 'NEW_ ORDER'

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
    if (data.quantity) dispatch(oneItem(data))
    else dispatch(removedItem(item))
  } catch (err) {
    console.error(err)
  }
}

export const addOneItem = item => async dispatch => {
  try {
    const { data } = await axios.post(`/api/items/${item.drinkId}`, item)
    dispatch(oneItem(data))
    // dispatch(updateDrink(inventory))
  } catch (err) {
    console.error(err)
  }
}

export const removeItem = item => async dispatch => {
  try {
    await axios.delete(`/api/items/`, { data: item })
    dispatch(removedItem(item))
  } catch (err) {
    console.error(err)
  }
}

// ITEMS REDUCER

const items = (state = initialState, action) => {
  switch (action.type) {
    case GOT_ITEMS:
      return action.allItems
    case ONE_ITEM: {
      const index = state.findIndex(
        item => item.drinkId === action.item.drinkId
      )
      const itemsArr = [...state]
      if (index >= 0) itemsArr.splice(index, 1, action.item)
      else itemsArr.push(action.item)
      return itemsArr
    }
    case NEW_ORDER:
      return initialState
    case REMOVED_ITEM:
      return [...state].filter(item => item.drinkId !== action.item.drinkId)
    default:
      return state
  }
}

export default items
