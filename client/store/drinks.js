import axios from 'axios'
import history from '../history'

// ACTION TYPES

const GOT_DRINKS = 'GOT_DRINKS'
const REMOVE_DRINK = 'REMOVE_DRINK'
const UPDATE_DRINK = 'UPDATE_DRINK'
const NEW_DRINK = 'NEW_DRINK'
const FAIL_DRINK = 'FAIL_DRINK'

// INITIAL STATE

const initialState = []

// ACTION CREATORS

const gotDrinks = drinks => ({ type: GOT_DRINKS, drinks })

const gotNewDrink = drink => ({ type: NEW_DRINK, drink })

const updatedDrink = drink => ({ type: UPDATE_DRINK, drink })

const removedDrink = id => ({ type: REMOVE_DRINK, id })

const failDrink = err => ({ type: FAIL_DRINK, err })

// THUNK CREATORS

export const getDrinks = () => async dispatch => {
  try {
    const { data } = await axios.get('/api/drinks')
    dispatch(gotDrinks(data))
  } catch {
    console.error(err)
    dispatch(failDrink(err))
  }
}

export const updateDrink = drink => async dispatch => {
  try {
    const { data } = await axios.put(`/api/drinks/${drink.id}`, drink)
    await dispatch(updatedDrink(data))
    history.push(`/drinks/${drink.id}`)
  } catch (err) {
    console.error(err)
    dispatch(failDrink(err))
  }
}

export const getNewDrink = drink => async dispatch => {
  try {
    const { data } = await axios.post('/api/drinks', drink)
    dispatch(gotNewDrink(data))
  } catch (error) {
    console.error(error)
    dispatch(failDrink(error))
  }
}

export const removeDrink = id => async dispatch => {
  try {
    await axios.delete(`/api/drinks/${id}`)
    dispatch(removedDrink(id))
  } catch (error) {
    console.error(error)
    dispatch(failDrink(error))
  }
}

// DRINK REDUCER

const drinks = (state = initialState, action) => {
  switch (action.type) {
    case GOT_DRINKS:
      return action.drinks
    case NEW_DRINK:
      return [...state, action.drink]
    case UPDATE_DRINK:
      const filtered = state.filter(drink => drink.id !== action.drink.id)
      return [...filtered, action.drink]
    case REMOVE_DRINK:
      return [...state].filter(drink => drink.id !== action.id)
    case failDrink:
      return action.err
    default:
      return state
  }
}

export default drinks
