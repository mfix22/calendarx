import { ADD_USER, RECEIVE_EVENT } from '../actions'

const users = (state = [], action) => {
  switch (action.type) {
    case RECEIVE_EVENT:
      if (action.users) return action.users
      return state
    case ADD_USER: {
      if (!action.user) return state
      return [...state, action.user]
    }
    default:
      return state
  }
}

export default users
