import React, { PureComponent } from 'react'
// 手寫
import styled from 'styled-components'
import { ClearFix } from '../components/commonStyle'

import TurntableDraw from '../components/TurntableDraw/TurntableDraw'
import GonggeDraw from '../components/GonggeDraw/GonggeDraw'
// import ScrollDraw from '../components/ScrollDraw/ScrollDraw'

const Main = styled.div`
  max-width: 660px;
  margin: 0 auto;
`
const Container = styled.div`
  position: relative;
`
// 切換tab
const TabBox = styled.div`
  position: relative;
  text-align: center;
  padding: 20px 0;
`
const NavButton = styled.button`
  display: inline-block;
  margin: 0 20px;
  height: 32px;
  -webkit-appearance: none;
  outline: none;
  border: 0;
  background: transparent;
  color: ${props => (props.active ? 'green' : '#000')};
  line-height: 32px;
  font-weight: 700;
  font-size: 16px;
  cursor: pointer;
`
// 切換顯示
const SectionOne = styled(ClearFix)`
  display: ${props => (props.showIndex === 1 ? 'block' : 'none')};
`
const SectionTwo = styled(ClearFix)`
  display: ${props => (props.showIndex === 2 ? 'block' : 'none')};
`

// const SectionForm = styled(ClearFix)`
//   display:${props => props.showIndex === 3 ? 'block' : 'none'};
// `;
// nav
const navList = [
  {
    id: 1,
    name: '转盘抽奖'
  },
  {
    id: 2,
    name: '宫格抽奖'
  }
]

class Home extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      activeIndex: 1,
      navList: navList
    }
  }

  componentDidMount() {}

  showPage = e => {
    let targetBtn = e.target
    let index = parseInt(targetBtn.getAttribute('data-id'))
    let { activeIndex } = this.state
    if (index !== activeIndex) {
      this.setState({ activeIndex: index })
    }
  }

  render() {
    const { navList, activeIndex } = this.state
    const getActive = current => {
      return current.id === activeIndex ? true : false
    }
    return (
      <Main>
        <TabBox>
          {navList.map(item => (
            <NavButton
              onClick={this.showPage}
              data-id={item.id}
              active={getActive(item)}
              key={item.id}
            >
              {item.name}
            </NavButton>
          ))}
        </TabBox>
        <Container>
          <SectionOne showIndex={activeIndex}>
            <TurntableDraw />
          </SectionOne>
          <SectionTwo showIndex={activeIndex}>
            <GonggeDraw />
          </SectionTwo>
        </Container>
      </Main>
    )
  }
}

export default Home
