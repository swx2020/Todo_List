const defaultState = [
]


const listReducer = (state = defaultState, action) => {
  switch (action.type) {
    case 'ADD_ITEM':
      return [
        ...state,
        {
          text: action.newItem, //列表项内容
          id: state.length, //列表项ID
          // 比如：一开始数组中没有元素: 那第一个id值就是0
          // 添加一个元素后，state 数组长度为1，那么下一次添加的元素的id 就是1
          del: false //列表项是否已划掉
        }
      ]
    case 'TOGGLE_ITEM':
      return state.map((item) => {
        return Object.assign({}, item, {
          del: action.changeID === item.id ? !item.del : item.del,
        });
      });
    default:
      return state
  }
}

export default listReducer