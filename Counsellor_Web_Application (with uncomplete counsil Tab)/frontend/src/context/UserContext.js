import { createContext, useReducer } from 'react'

export const UserContext = createContext()

export const UserReducer = (state, action) => {
  switch (action.type) {
    case 'SET_USERS':
        return {users: action.payload} 
    default:
      return state
  }
}

export const UserContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(UserReducer, { 
    users: null
  })

    // console.log('UserContext State: ', state);
  
  return (
    <UserContext.Provider value={{ ...state, dispatch }}>
      { children }
    </UserContext.Provider>
  )
}