import React, { PureComponent } from "react"
import styled from 'styled-components'

// common
const ClearFix = styled.div`
    &:before,&:after{
        display:table;
        content:'';
        clear:both;
    }
`;
const DrawWrap = styled(ClearFix)`
    width:1000px;
    margin:0 auto;
`;


class Draw extends PureComponent {
    constructor(props) {
        super(props )
    }
    componentDidMount() {
        console.log(`mouted`)
    }
    render() {
        return (
            <div className="draw-box">
                <DrawWrap>
                    抽奖
                </DrawWrap>
            </div>
        )
    }
}

export default Draw