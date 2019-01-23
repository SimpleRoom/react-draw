import React from 'react';
import ReactDOM from 'react-dom';

const couter = (state = 0, action) => {
  switch (action.type) {
    case 'INCREMENT':
      return state + 1
    case "DECREMENT":
      return state - 1
    default:
      return state
  }
}
// import {createStore} from 'redux'
const createStore = (reducer) => {
  let state
  let listeners = []

  const getState = () => state

  const dispatch = (action) => {
    state = reducer(state, action)
    listeners.forEach(listener => listener())
  }

  const subscribe = (listener) => {
    listeners.push(listener)
    return () => {
      listeners = listeners.filter(item => item !== listener)
    }
  }

  dispatch({})
  return { getState, dispatch, subscribe }
}

const store = createStore(couter)

const Counter = ({ value, onIncrement, onDecrement }) => (
  <div className="count">
    <div className="value">{value}</div>
    <div className="btn-list">
      <button onClick={onIncrement}>+</button>
      <button onClick={onDecrement}>-</button>
    </div>
  </div>
)

const render = ()=>{
  ReactDOM.render(<Counter 
    value={store.getState()}
    onIncrement={()=> store.dispatch({ type:'INCREMENT' })}
    onDecrement={()=> store.dispatch({ type:'DECREMENT' })} />, document.getElementById('root'));
}
store.subscribe(render)
render()