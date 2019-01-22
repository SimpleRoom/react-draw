import React, { PureComponent } from 'react'
// 手寫
// import { createStore } from 'redux';
import styled from 'styled-components'
import { ClearFix } from '../components/commonStyle'

const Main = styled.div`
  width:680px;
  margin:0 auto;
`;
const Container = styled.div`
  position:relative;
`;
// 切換tab
const TabBox = styled.div`
  position:relative;
  text-align:center;
`;
const NavButton = styled.button`
  display:inline-block;
  width:100px;
  height: 32px;
  -webkit-appearance:none;
  outline:none;
  border:0;
  background:transparent;
  color: ${props => props.active ? 'green' : '#000'};
  line-height:32px;
  font-weight:700;
  font-size:16px;
  cursor:pointer;
`;
// 切換顯示
const SectionOne = styled(ClearFix)`
  display:${props => props.showIndex === 1 ? 'block' : 'none'};
`;
const SectionTwo = styled(ClearFix)`
  display:${props => props.showIndex === 2 ? 'block' : 'none'};
`;
// nav
const navList = [
  {
    id: 1,
    name: 'AAA'
  },
  {
    id: 2,
    name: 'BBB'
  }
]

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

const RenderCount = () => (
  <div className="count">{store.getState()}</div>
)

const render = () => {
  document.body.innerText = store.getState()
}

store.subscribe(render)
document.addEventListener('click', () => {
  store.dispatch({ type: 'INCREMENT' })
})



class Home extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      activeIndex: 1,
      navList: navList,
      count: store.getState(),
    }
  }

  componentDidMount() {

  }

  showPage = e => {
    let targetBtn = e.target
    let index = parseInt(targetBtn.getAttribute("data-id"))
    let { activeIndex } = this.state
    if (index !== activeIndex) {
      this.setState({ activeIndex: index })
    }
    console.log(store)
  }

  incrementCount = () => {
    store.dispatch({ type: 'INCREMENT' })
    console.log(store, `INCREMENT`)
  }

  decrementCount = () => {
    store.dispatch({ type: 'DECREMENT' })
    console.log(store, `DECREMENT`)
  }

  render() {
    const { navList, activeIndex, count } = this.state
    const getActive = (current) => {
      return current.id === activeIndex ? true : false
    }
    return (
      <Main>
        <TabBox>
          {navList.map((item) =>
            <NavButton onClick={this.showPage} data-id={item.id} active={getActive(item)} key={item.id}>{item.name}</NavButton>
          )}
        </TabBox>
        <Container>
          <SectionOne showIndex={activeIndex}>
            <p>{count}</p>
            <RenderCount />
            <button onClick={this.incrementCount}>+</button>
            <button onClick={this.decrementCount}>-</button>
          </SectionOne>
          <SectionTwo showIndex={activeIndex}>
            bbb
          </SectionTwo>
        </Container>
      </Main>
    )
  }
}

export default Home