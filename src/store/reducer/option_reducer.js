const defaultState = 'SHOW_ALL'


const optionReducer = (state = defaultState, action) => {
  switch (action.type) {
    case 'SET_FILTER':
      return action.flag
    default:
      return state
  }
}

export default optionReducer