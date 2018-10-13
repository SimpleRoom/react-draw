import React, { PureComponent } from "react"
import styled from 'styled-components'

import { getGift } from './DrawData'

// common
const ClearFix = styled.div`
    &:before,&:after{
        display:table;
        content:'';
        clear:both;
    }
`;
const DrawWrap = styled(ClearFix)`
    width:640px;
    margin:0 auto;
`;
const GiftItem = styled.div`
    width:48px;
    height:48px;
    background-image:url(${props => props.iconSrc});
`;


class Draw extends PureComponent {
    constructor(props) {
        super(props)
        this.state = {
            giftList: getGift(),
            startIndex: 0,
        }
        console.log(this.state)
    }
    componentDidMount() {
        console.log(`mouted`)
    }
    render() {
        const { giftList } = this.state
        return (
            <div className="draw-box">
                <DrawWrap>
                    抽奖
                    {
                        giftList.map((gift, index) =>
                            <GiftItem iconSrc={gift.icon} key={index}>{gift.name}</GiftItem>
                        )
                    }
                </DrawWrap>
            </div>
        )
    }
}

export default Draw