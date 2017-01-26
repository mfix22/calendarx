const error = (state = null, action) => {
  switch (action.type) {
    case 'ERROR':
      if (action.err) return action.err
      if (action.error) return action.error
      return state
    default:
      return state
  }
}

export default error
