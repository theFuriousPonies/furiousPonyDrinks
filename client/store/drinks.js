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

// ACTION CREATEORS

const gotDrinks = drinks => ({ type: GOT_DRINKS, drinks })

const gotNewDrink = drink => ({ type: NEW_DRINK, drink })

const updateDrink = drink => ({ type: UPDATE_DRINK, drink })

const removedDrink = drink => ({ type: REMOVE_DRINK, drink })

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
    const { data } = await axios.put(`/api/drinks/${drink.id}`, brand)
    dispatch(updateDrink(data))
  } catch (err) {
    console.error(err)
    dispatch(failDrink(err))
  }
}

export const getNewDrink = drink => async dispatch => {
  try {
    const { data } = await axios.post('/api/drinks', drink)
    dispatch(gotNewDrink(drink))
  } catch (error) {
    console.error(error)
    dispatch(failDrink(error))
  }
}

export const removeDrink = drink => async dispatch => {
  try {
    const { data } = await axios.delete(`/api/drinks/${drink.id}`)
    dispatch(removedDrink(drink))
  } catch (error) {
    console.error(error)
    dispatch(failDrink(error))
  }
}

// DRINK REDUCER

const drinks = (state, action) => {
  switch (action.type) {
    case GOT_DRINKS:
      return action.drinks
    case NEW_DRINK:
      return [...state, action.drunk]
    case UPDATE_DRINK:
      const index = state.findIndex(drink => drink.id === action.drink.id)
      return [...state].splice(index, 1, action.drink)
    case REMOVE_DRINK:
      return [...state].filter(drink => drink.id !== action.id)
    case failDrink:
      return action.err
    default:
      return state
  }
}

export default drinks
