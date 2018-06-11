const GOT_TABLE = 'GOT_TABLE'

const initialState = {}

const gotTable = drinksTable => ({ type: GOT_TABLE, drinksTable })

export const getTable = drinksArr => dispatch => {
  const drinksTable = drinksArr.reduce((acc, pV) => {
    acc[pV.id] = { ...pV }
    return acc
  }, {})
  dispatch(gotTable(drinksTable))
}

const drinksTable = (state = initialState, action) => {
  switch (action.type) {
    case GOT_TABLE:
      return action.drinksTable
    default:
      return state
  }
}

export default drinksTable
