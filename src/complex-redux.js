import { combineReducers, createStore } from 'redux'

function visibilityFilter(state = 'SHOW_ALL', action) {
  console.log('visibilityFilter reducer');
  switch (action.type) {
    case 'SET_VISIBILITY_FILTER':
      return action.filter
    default:
      return state
  }
}

function todos(state = [], action) {
  console.log('todos reducer');
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

let reducer = combineReducers({ visibilityFilter, todos })
let store = createStore(reducer)

console.log(`init state: ${JSON.stringify(store.getState())}`); // {"visibilityFilter":"SHOW_ALL","todos":[]}

// 所有的reducer都会执行一遍
store.dispatch({type: 'ADD_TODO', text: 'Lock Door'});
store.dispatch({type: 'ADD_TODO', text: 'Finish homework'});

// {"visibilityFilter":"SHOW_ALL","todos":[{"text":"Lock Door","completed":false},{"text":"Finish homework","completed":false}]}
console.log(`add todo state: ${JSON.stringify(store.getState())}`);

store.dispatch({type: 'COMPLETE_TODO', index: 0});

// {"visibilityFilter":"SHOW_ALL","todos":[{"text":"Lock Door","completed":true},{"text":"Finish homework","completed":false}]}
console.log(`add todo state: ${JSON.stringify(store.getState())}`);

// 不会报错
store.dispatch({type: 'ACTION_NO_DEFINE'});

store.dispatch({type: 'SET_VISIBILITY_FILTER', filter: 'RZ_FILTER'});

// {"visibilityFilter":"RZ_FILTER","todos":[{"text":"Lock Door","completed":true},{"text":"Finish homework","completed":false}]}
console.log(`add todo state: ${JSON.stringify(store.getState())}`);