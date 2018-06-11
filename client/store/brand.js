import axios from 'axios'
import history from '../history'

// ACTION TYPES

const GOT_BRANDS = 'GOT_BRANDS'
const REMOVE_BRAND = 'REMOVE_BRAND'
const UPDATE_BRAND = 'UPDATE_BRAND'
const NEW_BRAND = 'NEW_BRAND'
const FAIL_BRAND = 'FAIL_BRAND'

// Initial state

const initialState = []

// Action creators

const gotBrands = brands => ({ type: GOT_BRANDS, brands })

const gotNewBrand = brand => ({ type: NEW_BRAND, brand })

const updatedBrand = brand => ({ type: UPDATE_BRAND, brand })

const removedBrand = id => ({ type: REMOVE_BRAND, id })

const failBrand = err => ({ type: FAIL_BRAND, err })

// Thunk creators

export const getBrands = () => async dispatch => {
  try {
    const brands = await axios.get('/api/brands').then(res => res.data)
    dispatch(gotBrands(brands))
  } catch (err) {
    console.error(err)
    dispatch(failBrand(err))
  }
}

export const updateBrand = brand => async dispatch => {
  try {
    const { data } = await axios.put(`/api/brands/${brand.id}`, brand)
    await dispatch(updatedBrand(data))
    history.push(`/brands/${brand.id}`)
  } catch (err) {
    console.error(err)
    dispatch(failBrand(err))
  }
}

export const newBrand = brand => async dispatch => {
  try {
    const nBrand = await axios.post('/api/brands', brand).then(res => res.data)
    await dispatch(gotNewBrand(nBrand))
    history.push('/brands')
  } catch (err) {
    console.error(err)
    dispatch(failBrand(err))
  }
}

export const removeBrand = id => async dispatch => {
  try {
    await axios.delete(`/api/brands/${id}`)
    await dispatch(removedBrand(id))
    history.push('/brands')
  } catch (err) {
    console.error(err)
    dispatch(failBrand(err))
  }
}

// Brand reducer

const brands = (state = initialState, action) => {
  switch (action.type) {
    case GOT_BRANDS:
      return action.brands
    case NEW_BRAND:
      return [...state, action.brand]
    case UPDATE_BRAND: {
      const filtered = state.filter(theBrand => theBrand.id !== action.brand.id)
      return [...filtered, action.brand]
    }
    case REMOVE_BRAND:
      return [...state].filter(theBrand => theBrand.id !== action.id)
    case failBrand:
      return action.err
    default:
      return state
  }
}

export default brands
