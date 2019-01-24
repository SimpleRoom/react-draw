import React, { PureComponent } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import './index.css';
import {createStore} from 'redux'

// import Home from './container/Home'
import * as serviceWorker from './serviceWorker';

// ReactDOM.render(<Home />, document.getElementById('root'));

// 1---
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
// const createStore = (reducer) => {
//   let state
//   let listeners = []

//   const getState = () => state

//   const dispatch = (action) => {
//     state = reducer(state, action)
//     listeners.forEach(listener => listener())
//   }

//   const subscribe = (listener) => {
//     listeners.push(listener)
//     return () => {
//       listeners = listeners.filter(item => item !== listener)
//     }
//   }

//   dispatch({})
//   return { getState, dispatch, subscribe }
// }

// const store = createStore(couter)

// const Counter = ({ value, onIncrement, onDecrement }) => (
//   <div className="count">
//     <div className="value">{value}</div>
//     <div className="btn-list">
//       <button onClick={onIncrement}>+</button>
//       <button onClick={onDecrement}>-</button>
//     </div>
//   </div>
// )

class Provider extends PureComponent{
  getChildContext() {
    return {
      store: this.props.store
    }
  }

  render() {
    return this.props.children
  }

}
Provider.childContextTypes = {
  store: PropTypes.object
}

class Counter extends PureComponent{
  componentDidMount() {
    const { store } = this.props
    this.unSubscribe = store.subscribe(() => store.getState())
  }

  componentWillUnmount() {
    this.unSubscribe()
  }

  render() {
    const props = this.props
    const { store } = props
    let state = store.getState()
    return (
      <div className='main'>
        <div className="value">{state}</div>
        <div className="btn-list">
          <button onClick={()=> store.dispatch({ type:'INCREMENT' })}>+</button>
          <button onClick={()=> store.dispatch({ type:'DECREMENT' })}>-</button>
        </div>
      </div>
    )
  }
}

Counter.childContextTypes = {
  store: PropTypes.object
}



ReactDOM.render(
  <Provider store={createStore(couter)}>
    <Counter />
  </Provider>,
  document.getElementById('root')
)

// const render = ()=>{
//   ReactDOM.render(<Counter 
//     value={store.getState()}
//     onIncrement={()=> store.dispatch({ type:'INCREMENT' })}
//     onDecrement={()=> store.dispatch({ type:'DECREMENT' })} />, document.getElementById('root'));
// }
// store.subscribe(render)
// render()
// 1---

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
