// 合并reducer
import listReducer from './list_reducer.js'
import optionReducer from './option_reducer.js'

// 导入合并的函数
import { combineReducers } from 'redux'

const reducer = combineReducers({
  listReducer,
  optionReducer
})

export default reducer 