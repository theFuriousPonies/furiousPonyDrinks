import axios from 'axios'
import history from '../history'

// ACTION TYPE

const GOT_USERS = 'GOT_USERS'
const REMOVED_USER_ADMIN = 'REMOVED_USER_ADMIN'
const UPDATED_USER = 'UPDATED_USER'
const CREATED_USER = 'CREATED_USER'
const FAIL_USER = 'FAIL_USER'

// INITIAL STATE

const initialState = []

// ACTION CREATORS

const gotUsers = users => ({ type: GOT_USERS, users })

const createdUser = user => ({ type: CREATED_USER, user })

const updatedUser = user => ({ type: UPDATED_USER, user })

const removedUser = id => ({ type: REMOVED_USER_ADMIN, id })

const failUser = err => ({ type: FAIL_USER, err })

// THUNK CREATORS

export const getUsers = () => async dispatch => {
  try {
    const { data } = await axios.get('/api/users')
    dispatch(gotUsers(data))
  } catch (error) {
    console.error(error)
    dispatch(failUser(error))
  }
}

export const updateUser = user => async dispatch => {
  try {
    const { data } = await axios.put(`/api/users/${user.id}`, user)
    await dispatch(updatedUser(data))
    history.push(`/users`)
  } catch (error) {
    console.log(error)
    dispatch(failUser(error))
  }
}

export const createUser = user => async dispatch => {
  try {
    const { data } = await axios.post('/api/users', user)
    dispatch(createdUser(data))
  } catch (error) {
    console.log(error)
    dispatch(failUser(error))
  }
}

export const removeUser = id => async dispatch => {
  try {
    await axios.delete(`/api/users/${id}`)
    dispatch(removedUser(id))
    history.push('/users')
  } catch (error) {
    console.log(error)
    dispatch(failUser(error))
  }
}

// USERS REDUCER

const users = (state = initialState, action) => {
  switch (action.type) {
    case GOT_USERS:
      return action.users
    case CREATED_USER:
      return [...state, action.user]
    case UPDATED_USER: {
      const filtered = state.filter(user => user.id !== action.user.id)
      return [...filtered, action.user]
    }
    case REMOVED_USER_ADMIN:
      return [...state].filter(user => user.id !== action.id)
    case FAIL_USER:
      return action.err
    default:
      return state
  }
}

export default users
