import React, { createContext, useReducer } from 'react'
import Cookies from 'js-cookie'

const isAuthenticated = !!Cookies.get('token')
const initialState = {
  loggedIn: isAuthenticated,
  user: {},
  currentPlayer: {}
}

const store = createContext(initialState)
const { Provider } = store

function StateProvider({ children }) {
  const [state, dispatch] = useReducer((state, action) => {
    switch (action.type) {
      case 'LOG_IN':
        return {
          ...state,
          loggedIn: true,
          user: action.payload
        }
      case 'FIND_PLAYER':
        return {
          ...state,
          currentPlayer: action.payload
        }
      default:
        return state
    }
  }, initialState)

  return <Provider value={{ state, dispatch }}>{children}</Provider>
}

export { store, StateProvider }
