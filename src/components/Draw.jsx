import React, { PureComponent } from "react"
import styled from 'styled-components'

import { getGift } from './DrawData'

// common
const bgBorderColor = "#0066FF"
const bgColor = "#CCEEFF"
const grayColor = "#999999"
const activeColor = "#FFA488"
const btnBg = "#33CCFF"
const btnClickBg = "#FFA488"
const ClearFix = styled.div`
    &:before,&:after{
        display:table;
        content:'';
        clear:both;
    }
`;
const GrawTitle = styled.div`
    font-size:18px;
    color:${activeColor};
    text-align:center;
    font-weight:700;
    line-height:80px;
`;
const DrawWrap = styled.div`
    width:640px;
    margin:0 auto;
`;
const DrawBg = styled(ClearFix)`
    position:relative;
    width:596px;
    height:504px;
    padding:24px;
    margin:0 auto;
    border-radius:5px;
    border:1px solid ${bgBorderColor};
    background-color:${bgColor};
`;
const GiftBox = styled(ClearFix)`
    width:546px;
    height:454px;
    position:relative;
`;
const GiftItem = styled.div`
    width:86px;
    height:86px;
    position:absolute;
    left:${props => props.left};
    top:${props => props.top};
    z-index:10;
    display:inline-block;
    box-sizing:border-box;
    padding-top:10px;
    border-radius:5px;
    border:2px solid;
    border-color:${props => props.active ? activeColor : grayColor};

    .gift-name{
        text-align:center;
        font-size:14px;
        color:${props => props.active ? activeColor : grayColor};
    }
`;

const GiftImg = styled.div`
    width:48px;
    height:48px;
    margin:0 auto;
    background-image:url(${props => props.iconSrc});
`;

const DrawBtn = styled.button`
    outline:none;
    border:0;
    width:362px;
    height:270px;
    position:absolute;
    left:92px;
    top:92px;
    z-index:10;
    background-color:${props => props.isClicking ? btnClickBg : btnBg};
    border-radius:5px;
    cursor:pointer;
    padding:0;
    font-size:45px;
    /* color:${props => props.isClicking ? grayColor : activeColor}; */
`;

function GetDrawBtn({ isClicking, onClick }) {
    return <DrawBtn isClicking={isClicking} onClick={onClick}>{isClicking ? "抽奖中..." : "开始"}</DrawBtn>
}
class Draw extends PureComponent {
    constructor(props) {
        super(props)
        this.state = {
            giftList: getGift(),
            // 一圈的总长度，礼物总数量
            stepCount: getGift().length,
            // 剩余抽奖次数
            myCount: 5,
            // 转动开始位置默认：0，动态，可设置(>=0&&<stepCount)
            startIndex: 0,
            // 转动激活位置默认：0，动态，可设置(>=0&&<stepCount)
            activeIndex: 0,
            // 最终要停下的位置：接口返回(>=0&&<stepCount)
            endStopIndex: 14,
            // 抽奖是否正在进行中
            isDrawing: false,
            // 转速:fastSpeed,middleSpeed,slowSpeed
            fastSpeed: 100,
            middleSpeed: 300,
            slowSpeed: 700,
            // 已经，快速，中速，慢速 转的圈数 
            ringNum: 0,
            fastRingNum: 5,
            middleRingNum: 5,
            slowRingNum: 2,
            // 是否要启动中、慢
            isNeedMiddle: false,
            isNeedSlow: false,
        }
        console.log(this.state)
    }
    componentDidMount() {
        console.log(`mouted`)
    }
    startDraw = e => {
        // 抽奖进行中禁止点击，抽奖次数<=0禁止点击
        let { isDrawing, myCount, fastSpeed } = this.state
        if (isDrawing) {
            console.log(`抽奖进行中，请稍后再试`)
        } else {
            if (myCount <= 0) {
                console.log(`抽奖次数不足!`)
            } else {
                // 正常抽奖，设置抽奖进行中状态
                this.setState({ isDrawing: true })
                const fastTimer = setInterval(() => {
                    this.fastRotateMove(fastTimer)
                }, fastSpeed)
            }
        }
    }
    fastRotateMove(timerId) {
        let { stepCount, startIndex, ringNum, fastRingNum, middleSpeed } = this.state
        // 可操作
        startIndex++
        // 重置激活位置
        this.setState({ activeIndex: startIndex })
        // 回到起点，转动圈数+1，完成快速圈数，启动中速或者慢速
        if (startIndex > (stepCount - 1)) {
            ringNum = ringNum + 1
            this.setState({ ringNum: ringNum })
            if (ringNum > fastRingNum) {
                clearInterval(timerId)
                // 启动
                this.setState({ isNeedMiddle: true, ringNum: 0 })
            }
            // 
            console.log(`转动了-${ringNum}-圈`)
        }
        // 重置起点位置为上次位置
        startIndex = startIndex % stepCount
        this.setState({ startIndex: startIndex })
        // 开启慢速
        if (this.state.isNeedMiddle) {
            // 已经转的圈数
            console.log(`开始中速`)
            const middleTimer = setInterval(() => {
                this.middleRotateMove(middleTimer)
            }, middleSpeed)
        }
    }
    middleRotateMove(timerId) {
        let { stepCount, startIndex, ringNum, middleRingNum, endStopIndex, myCount } = this.state
        startIndex++
        // 重置激活位置
        this.setState({ activeIndex: startIndex })
        // 
        if (startIndex > (stepCount - 1)) {
            ringNum = ringNum + 1
            this.setState({ ringNum: ringNum })
            if (ringNum > middleRingNum) {
                // 
                console.log(`至少转了${ringNum}`)
            }
        }
        // 至少转了，且位置与接口相同停止，回复所有默认值
        if (ringNum === middleRingNum && startIndex === endStopIndex) {
            clearInterval(timerId)
            // 当前剩余抽奖次数，接口返回
            let currentCount = myCount - 1
            this.setState({ isDrawing: false, myCount: currentCount })
            console.log(this.state, '转接结束')
        }
        // 重置起点位置为上次位置
        startIndex = startIndex % stepCount
        console.log(startIndex)
        this.setState({ startIndex: startIndex })
    }
    render() {
        // readonly
        const { giftList, activeIndex, isDrawing, myCount } = this.state
        const getIsActive = (item) => (
            item.id === activeIndex ? 1 : 0
        )
        return (
            <div className="draw-box">
                <DrawWrap>
                    <GrawTitle>抽奖次数：{myCount}</GrawTitle>
                    <DrawBg>
                        <GiftBox>
                            {
                                giftList.map((gift, index) =>
                                    <GiftItem active={getIsActive(gift)}
                                        iconSrc={gift.icon}
                                        left={gift.left}
                                        top={gift.top}
                                        key={index}>
                                        <GiftImg iconSrc={gift.icon}></GiftImg>
                                        <div className="gift-name">{gift.name}X{gift.count}</div>
                                    </GiftItem>
                                )
                            }
                            <GetDrawBtn isClicking={isDrawing} onClick={this.startDraw} />
                        </GiftBox>
                    </DrawBg>
                </DrawWrap>
            </div>
        )
    }
}

export default Draw