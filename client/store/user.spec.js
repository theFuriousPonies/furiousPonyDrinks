/* global describe beforeEach afterEach it */

import { expect } from 'chai'
import { me, logout, getUser, removeUser, default as reducer } from './user'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import configureMockStore from 'redux-mock-store'
import thunkMiddleware from 'redux-thunk'
import history from '../history'

const middlewares = [thunkMiddleware]
const mockStore = configureMockStore(middlewares)

describe('user reducer', () => {
  it('starts with an initial state of an empty user', () => {
    const newState = reducer(undefined, '@@INIT')
    expect(newState).to.deep.equal({})
  })

  // it('sets a user on GET_USER action', () => {
  //   const user = { email: 'g@g.com'}
  //   const newState = reducer(user, getUser())
  //   expect(newState).to.deep.equal(user)
  // })
})

describe('thunk creators', () => {
  let store
  let mockAxios

  const initialState = { user: {} }

  beforeEach(() => {
    mockAxios = new MockAdapter(axios)
    store = mockStore(initialState)
  })

  afterEach(() => {
    mockAxios.restore()
    store.clearActions()
  })

  describe('me', () => {
    it('eventually dispatches the GET USER action', () => {
      const fakeUser = { email: 'Cody' }
      mockAxios.onGet('/auth/me').replyOnce(200, fakeUser)
      return store.dispatch(me()).then(() => {
        const actions = store.getActions()
        expect(actions[0].type).to.be.equal('GET_USER')
        expect(actions[0].user).to.be.deep.equal(fakeUser)
      })
    })
  })

  describe('logout', () => {
    it('logout: eventually dispatches the REMOVE_USER action', () => {
      mockAxios.onPost('/auth/logout').replyOnce(204)
      return store.dispatch(logout()).then(() => {
        const actions = store.getActions()
        expect(actions[0].type).to.be.equal('REMOVE_USER')
        expect(history.location.pathname).to.be.equal('/')
      })
    })
  })
})
