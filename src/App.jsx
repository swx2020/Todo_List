import React, { Component } from 'react'
import './App.css'
import { connect } from 'react-redux'

class App extends Component {
  inputRef = React.createRef();
  render() {
    // const list = [1, 2, 3];
    let { list, option } = this.props;
    console.log(list);
    // 通过switch中的 字段 来选取对应的数组
    // 但是在这里写switch（如App1.jsx中那样）会导致无法渲染页面。为什么？？？？
    if (option === "SHOW_ACTIVE") {
      list = list.filter((item) => !item.del);
      console.log(list);
    } else if (option === "SHOW_CROSSED") {
      list = list.filter((item) => item.del);
    }
    //绑定键盘enter事件
    document.body.addEventListener("keydown", (e) => {
      if (e.keyCode === 13) {
        this.props.addHandler(this.inputRef.current);
        // console.log(this.props);
      }
    });
    return (
      <div className="todo-list_wrapper">
        <h2 className="title" style={{ color: "rgb(255, 170, 40)" }}>
          TODO TABLE
        </h2>
        <header className="add-item_wrapper">
          <input type="text" className="addInput" ref={this.inputRef} />
          {/* 拿到的ref是一个对象！！！！
            对象中的current才是input节点 */}
          <button
            className="addBtn"
            onClick={() => this.props.addHandler(this.inputRef.current)}
          >
            AddItem
          </button>
        </header>
        {/* 事项列表 */}
        <ul className="option">
          <li onClick={() => this.props.showAllHandler()}>
            <span
              style={{
                color: option === "SHOW_ALL" ? "rgb(64, 186, 255)" : "black",
              }}
            >
              ALL PLAN
            </span>
          </li>
          <li onClick={() => this.props.showActiveHandler()}>
            <span
              style={{
                color: option === "SHOW_ACTIVE" ? "rgb(64, 186, 255)" : "black",
              }}
            >
              ACTIVE
            </span>
          </li>
          <li onClick={() => this.props.showCrossedHandler()}>
            <span
              style={{
                color:
                  option === "SHOW_CROSSED" ? "rgb(64, 186, 255)" : "black",
              }}
            >
              COMPLETED
            </span>
          </li>
        </ul>
        <ul className="list">
          {list.map((item, index) => {
            return (
              <li key={index}>
                <span className="number">{item.id + 1}.</span>
                <span
                  style={{ textDecoration: item.del ? "line-through" : "none" }}
                  onClick={() => this.props.toggleHandler(item)}
                >
                  {item.text}
                </span>
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  console.log(state);
  // { listReducer: Array(0), optionReducer: 'SHOW_ALL' }
  return {
    list: state.listReducer,
    option: state.optionReducer,
    //解构赋值获取两个【子state】
    //list是一个数组，内部数组元素是对象表示每一个列表项
    //option是一个字符串，表示当先选择的选项
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    addHandler(inp) {
      // 添加待办事项
      console.log(inp.value);
      if (!inp.value) {
        return;
      }
      const action = { type: "ADD_ITEM", newItem: inp.value };
      dispatch(action);
      // 提交后，清空输入框
      inp.value = "";
      inp.focus(); //重置输入焦点
    },
    toggleHandler(item) {
      // 文字是否划线
      const action = { type: "TOGGLE_ITEM", changeID: item.id};
      dispatch(action)
    },
    showAllHandler() {
      const action = { type: "SET_FILTER", flag: "SHOW_ALL" };
      dispatch(action);
    },
    showActiveHandler() {
      const action = { type: "SET_FILTER", flag: "SHOW_ACTIVE" };
      dispatch(action);
    },
    showCrossedHandler() {
      const action = { type: "SET_FILTER", flag: "SHOW_CROSSED" };
      dispatch(action);
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App)