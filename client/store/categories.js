import axios from 'axios'

// ACTION TYPES

const GOT_CATEGORIES = 'GOT_CATEGORIES'
const REMOVE_CATEGORY = 'REMOVE_CATEGORY'
const UPDATE_CATEGORY = 'UPDATE_CATEGORY'
const NEW_CATEGORY = 'NEW_CATEGORY'
const FAIL_CATEGORY = 'FAIL_CATEGORY'

// Initial state

const initialState = []

// Action creators

const gotCategories = categories => ({ type: GOT_CATEGORIES, categories })

const gotNewCategory = categorie => ({ type: NEW_CATEGORY, categorie })

const updatedCategory = categorie => ({ type: UPDATE_CATEGORY, categorie })

const removedCategory = id => ({ type: REMOVE_CATEGORY, id })

const failCategory = err => ({ type: FAIL_CATEGORY, err })

//Thunk

const getCategories = () => async dispatch => {
  try {
    const categories = await axios.get('/api/category').then(res => res.data)
    dispatch(gotCategories(categories))
  } catch (err) {
    console.error(err)
  }
}

const newCategory = category => async dispatch => {
  try {
    const nCategory = await axios
      .post('/api/category', category)
      .then(res => res.data)
    dispatch(gotNewCategory(nCategory))
  } catch (err) {
    console.error(err)
  }
}

const updateCategory = category => async dispatch => {
  try {
    const uCategory = await axios.update(
      `/api/category/${category.id}`,
      category
    )
    dispatch(updatedCategory(uCategory))
  } catch (err) {
    console.error(err)
  }
}

const removeCategory = id => async dispatch => {
  try {
    await axios.destroy(`/api/category/${id}`)
    dispatch(removedCategory(id))
  } catch (err) {
    console.error(err)
  }
}

const categories = (state = initialState, action) => {
  switch (action.type) {
    case GOT_CATEGORIES:
      return action.categories
    case NEW_CATEGORY:
      return [...state, action.categorie]
    case UPDATE_CATEGORY: {
      const index = state.findIndex(theCategory => theCategory.id === action.id)
      return [...state].splice(index, 1, action.category)
    }
    case REMOVE_CATEGORY:
      return [...state].filter(theCategory => theCategory.id !== action.id)
    default:
      return state
  }
}

export default categories
