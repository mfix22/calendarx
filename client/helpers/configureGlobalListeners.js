// thunk action creator, needs redux-thunk
import { GLOBAL_KEY_PRESS, CHANGE_WINDOW, VIEW_PREV, VIEW_TODAY, VIEW_NEXT } from '../actions'

function listenToWindowEvent(name, mapEventToAction, filter = () => true) {
  return (dispatch) => {
    function handleEvent(e) {
      if (filter(e)) {
        dispatch(mapEventToAction(e))
      }
    }

    window.addEventListener(name, handleEvent)

    // note: returns a function to unsubscribe
    return () => window.removeEventListener(name, handleEvent)
  }
}

const keyMap = {
  w: {
    type: CHANGE_WINDOW,
    window: 'WEEK'
  },
  4: {
    type: CHANGE_WINDOW,
    window: '4_DAY'
  },
  d: {
    type: CHANGE_WINDOW,
    window: '4_DAY'
  },
  m: {
    type: CHANGE_WINDOW,
    window: 'MONTH'
  },
  j: {
    type: VIEW_PREV
  },
  k: {
    type: VIEW_TODAY
  },
  l: {
    type: VIEW_NEXT
  }
}

// turns DOM event into action,
// you can define many of those
const globalKeyPress = (e) => {
  return keyMap[e.key.toLowerCase()] ? keyMap[e.key.toLowerCase()] : {
    type: GLOBAL_KEY_PRESS,
    key: e.key.toLowerCase(),
    ctrl: e.ctrlKey,
    meta: e.metaKey,
    shift: e.shiftKey,
    alt: e.altKey
  }
}

const keyFilter = (e) => {
  if (e.target.nodeName.toLowerCase() === 'input') return false

  if (Object.keys(keyMap).some(key => key === e.key.toLowerCase())) return true
  if (e.ctrlKey) {
    // pass
  }
  if (e.shiftKey) {
    // pass
  }
  if (e.altKey) {
    // pass
  }
  if (e.metaKey) {
    // pass
  }
  return false
}

export const configureGlobalKeyPress = (store) => {
  if (store) {
    // subscribe to event
    const unlistenKeyPress = store.dispatch(listenToWindowEvent('keypress', globalKeyPress, keyFilter))
    // eventually unsubscribe
    return unlistenKeyPress
  }
  return () => {}
}

export default configureGlobalKeyPress
