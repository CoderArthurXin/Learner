import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import './index.css';



/**
 * 这是一个 reducer，形式为 (state, action) => state 的纯函数。
 * 描述了 action 如何把 state 转变成下一个 state。
 *
 * state 的形式取决于你，可以是基本类型、数组、对象、
 * 甚至是 Immutable.js 生成的数据结构。惟一的要点是
 * 当 state 变化时需要返回全新的对象，而不是修改传入的参数。
 *
 * 下面例子使用 `switch` 语句和字符串来做判断，但你可以写帮助类(helper)
 * 根据不同的约定（如方法映射）来判断，只要适用你的项目即可。
 */
function counter(state = [], action) {
  console.log(`state: ${state}`);
  console.log(`action: ${JSON.stringify(action)}`);
  switch (action.type) {
    case 'ADD_TODO':
      return [
        ...state,
        {
          text: action.text,
          completed: false
        }
      ]
    case 'COMPLETE_TODO':
      return state.map((todo, index) => {
        if (index === action.index) {
          return Object.assign({}, todo, {
            completed: true
          })
        }
        return todo
      })
    default:
      return state
  }
}

// 创建 Redux store 来存放应用的状态。
// API 是 { subscribe, dispatch, getState }。
let store = createStore(counter);

// 可以手动订阅更新，也可以事件绑定到视图层。
store.subscribe(() =>
  console.log(store.getState())
);

// 改变内部 state 惟一方法是 dispatch 一个 action。
// action 可以被序列化，用日记记录和储存下来，后期还可以以回放的方式执行
store.dispatch({ type: 'ADD_TODO', text: 'IoT', number: 'First' });
store.dispatch({ type: 'ADD_TODO', text: 'Camera', number: 'First' });
store.dispatch({ type: 'ADD_TODO', text: 'Mixer', number: 'First' });

store.dispatch({ type: 'COMPLETE_TODO', index: 1, number: 'Second', ext: 'rz' });


console.log(store.getState())

function Hello(props) {
  return (
    <div>Hello, {props.msg}</div>
  )
}

ReactDOM.render(
  <Hello msg="react" />,
  document.getElementById('root')
);
