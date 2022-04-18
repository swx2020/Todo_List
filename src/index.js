import ReactDOM from "react-dom";
import App from './App.jsx'
// 引入store
import store from './store'

import {Provider} from 'react-redux'





ReactDOM.render(
  <Provider store={store}>
    <App></App>
  </Provider>,
  document.getElementById('root')
)