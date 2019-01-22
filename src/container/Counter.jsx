import React from 'react'
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

const render = ({ value, onIncrement, onDecrement }) => (
  <div className="count">
    <p>{value}</p>
    <p>
      <button onClick={onIncrement}>+</button>
      <button onClick={onDecrement}>-</button>
    </p>
  </div>
)

store.subscribe(render)
render()