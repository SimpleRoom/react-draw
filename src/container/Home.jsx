import React, { PureComponent } from 'react'
import Draw from '../components/Draw'
// form
import SignIn from './form/Array'
import Username from './form/AsyncValidation'
import Basic from './form/Basic'
import FieldLevelValidation from './form/CombinedValidations'
import SignUp from './form/CustomInputs'
// 
import CustomOwnInputs from './form/CustomOwnInputs'

// 手寫
import styled from 'styled-components'
import { ClearFix } from '../components/commonStyle'

const Main = styled.div`
  width:660px;
  margin:0 auto;
`;
const Container = styled.div`
  position:relative;
`;
// 切換tab
const TabBox = styled.div`
  position:relative;
  text-align:center;
  padding:20px 0;
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

const SectionForm = styled(ClearFix)`
  display:${props => props.showIndex === 3 ? 'block' : 'none'};
`;
// nav
const navList = [
  {
    id: 1,
    name: 'Draw'
  },
  {
    id: 2,
    name: 'Todo'
  },
  {
    id: 3,
    name: 'Form'
  }
]

class Home extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      activeIndex: 3,
      navList: navList,
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
  }

  render() {
    const { navList, activeIndex } = this.state
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
            <Draw />
          </SectionOne>
          <SectionTwo showIndex={activeIndex}>
            <p>AAAA</p>
          </SectionTwo>

          <SectionForm showIndex={activeIndex}>
            <SignIn />
            <hr/>
            <Username />
            <hr/>
            <Basic />
            <hr/>
            <FieldLevelValidation />
            <hr/>
            <SignUp />
            <hr/>
            <CustomOwnInputs />
          </SectionForm>
        </Container>
        <br/><br/><br/><br/><br/>
      </Main>
    )
  }
}

export default Home