import unionWith from 'lodash/unionWith'
import { RECEIVE_EVENTS } from '../actions'

const events = (state = [], action) => {
  switch (action.type) {
    case RECEIVE_EVENTS: {
      if (!action.events) return state
      return unionWith(state, action.events, (first, second) => first.id === second.id)
    }
    default:
      return state
  }
}

export default events
