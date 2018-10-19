import React, { PureComponent } from "react"
import styled, { keyframes } from 'styled-components'
import Alert from "./Alert"
import { getGift } from './DrawData'

// common
const bgBorderColor = "#0066FF"
const bgColor = "#CCEEFF"
const grayColor = "#999999"
const activeColor = "#FFA488"
const btnBg = "#33CCFF"
const btnClickBg = "#FFA488"
const minZindex = 30

const zoomInDown = keyframes`
    from {
        opacity: 0;
        transform: scale3d(.1, .1, .1) translate3d(0, -1000px, 0);
        animation-timing-function: cubic-bezier(0.550, 0.055, 0.675, 0.190);
    }
    60% {
        opacity: 1;
        transform: scale3d(.475, .475, .475) translate3d(0, 60px, 0);
        animation-timing-function: cubic-bezier(0.175, 0.885, 0.320, 1);
    }
`;

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
    width:604px;
    height:512px;
    padding:24px;
    margin:0 auto;
    border-radius:5px;
    border:5px solid ${bgBorderColor};
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
    background-color:${props => props.active ? "#146c8a" : "#ffffff"};

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
    box-shadow:1px 1px 20px 16px ${props => props.isClicking ? "#cc6140" : "#29b6e4"} inset;
    border-radius:5px;
    cursor:pointer;
    padding:0;
    font-size:45px;
    /* color:${props => props.isClicking ? grayColor : activeColor}; */
`;
// got dialog
const DrawGiftDialog = styled(ClearFix)`
    position:absolute;
    width:100%;
    height:100%;
    left:0;
    top:0;
    display:${props => props.show ? "block" : "none"};
    background:rgba(0,0,0,.5);
    z-index:${minZindex + 15};
    cursor:pointer;
`;

const GotGift = styled.div`
    width:362px;
    height:270px;
    margin:0 auto;
    margin-top:116px;
    background-color: #FFC93C;
    border-radius: 5px;
    box-shadow: 1px 1px 20px 16px #FFA60D inset;
    padding-top:60px;
    animation: ${zoomInDown} 1.4s;
    position:relative;
    
    .got-img{
        display:block;
        width:60px;
        height:60px;
        margin:0 auto;
        background-image:url(${props => props.giftSrc});
        background-color:#ffffff;
        background-size:100% 100%;
        border-radius: 12px;
    }
    .got-name,.got-count{
        text-align:center;
    }
    .got-name{
        margin-top:10px;
    }
`;

const CloseDialogBtn = styled.button`
    outline:none;
    border:0;
    display:block;
    position: absolute;
    width: 60px;
    height: 60px;
    background-image: url('/images/close.svg');
    background-size: auto 100%;
    background-color:transparent;
    cursor:pointer;

    left:50%;
    transform:translateX(-50%);
    top:-60px;
`;

function GetDrawBtn({ isClicking, onClick }) {
    return <DrawBtn isClicking={isClicking} onClick={onClick}>{isClicking ? "抽奖中..." : "开始"}</DrawBtn>
}

// mock endStopIndex
function getRandomNum(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

class Draw extends PureComponent {
    constructor(props) {
        super(props)
        this.state = {
            giftList: getGift(),
            // 一圈的总长度，礼物总数量
            stepCount: getGift().length,
            // 剩余抽奖次数，接口返回
            myCount: 5,
            // 转动激活位置默认：1，动态，可设置(>=1&&<=stepCount)
            activeIndex: 1,
            // 最终要停下的位置：接口返回(>=1&&<=stepCount)
            endStopIndex: 14,
            // 抽奖是否正在进行中
            isDrawing: false,
            // 转速   分别为最后0,1,2,3,4,5圈的转速
            speed: [336, 168, 84, 42, 42, 42],
            // 抽獎結果的禮物名字
            showDialog: false,
            gotGift: null,
            // 消息提示框
            message:null,
            messageType: null,
        };
        // 开启转盘的定时器
        this.timer = null;
        this.messageList = {
            success: "恭喜您中奖了",
            warning: "抱歉抽奖进行中，稍后再试",
            error: "抽奖次数不足",
        }
        console.log()
    }
    componentDidMount(){
        console.log(`mounted`)
    }
    componentWillUnmount() {
        if (this.timer) {
            clearTimeout(this.timer)
        }
    }
    alertMessage(messageType) {
        let message = this.messageList[messageType];
        this.setState({
            messageType,
            message,
        });
        // 停留3秒自动清除-----能否把该控制移到子组件？？
        // this.timer = setTimeout(() => {
        //     this.setState({
        //         messageType: null,
        //         message: null,
        //     });
        // }, 3000)
    }
    startDraw = e => {
        // 抽奖进行中禁止点击，抽奖次数<=0禁止点击
        let { isDrawing, myCount } = this.state;
        if (isDrawing) {
            this.alertMessage("warning");
        } else {
            if (myCount <= 0) {
                this.alertMessage("error");
            } else {
                // 假装发了一个ajax请求：sucsess,catch,error
                setTimeout(() => {
                    let result = {
                        ret_code: "0", //success
                        endStopIndex: getRandomNum(1, 18),
                    }
                    // 是否正抽可能还需要接口来限制：如是否绑定手机号、、
                    if (result.ret_code === "0") {
                        let { endStopIndex } = result;
                        let myCount = this.state.myCount - 1;
                        // 开启转盘,開啟限制再次點擊抽獎
                        this.setState({ isDrawing: true, endStopIndex, myCount }, this.startRun);
                        console.log(`最終要停在:${this.state.endStopIndex}`)
                    } else if (result.ret_code === "error") { }
                }, 300)
            }
        }
    }
    startRun() {
        // 总共需要转的圈数
        let leftRound = this.state.speed.length - 1;
        this.addOneStep({ isContinue: true, leftRound })
    }
    /*
    * 每次增加一步，满一圈，总圈数-1同时速度变慢，直到最后一圈停在指定位置
    * 直到知道结果，慢慢变慢速度，停在结果那;
    * 转盘停到结果值时，重置初始值（{isDrawing:false}）；
    * 
    * Function addOneStep
    * 奖品位置移动一步
    * @isContinue   {Booleans}  是否应该继续这个定时器
    * @leftRound        {Number}    剩余几圈  3代表一个无限大的值，因为还不知道结果
    */
    addOneStep = (params) => {
        let { activeIndex, stepCount, speed } = this.state;
        let { isContinue, leftRound } = params;
        activeIndex += 1;
        if (isContinue) {
            // 如果到超过奖品个数，重置为1
            if (activeIndex > stepCount) {
                console.log(`转了${leftRound}圈`);
                leftRound -= 1;
                activeIndex = 1;
            }
            // 如果已经到最后一圈了  且  已经到了指定要中奖的位置了  就不需要继续了
            if (leftRound === 0 && activeIndex === this.state.endStopIndex) {
                console.log(`現在停在:${this.state.endStopIndex}`);
                isContinue = false;
            }
            this.setState({ activeIndex });
            const nextParams = {
                isContinue,
                leftRound,
            };
            this.timer = setTimeout(() => {
                this.addOneStep(nextParams)
            }, speed[leftRound]);
        } else {
            clearTimeout(this.timer);
            this.timer = null;
            let gotGift = this.state.giftList[this.state.endStopIndex - 1];
            this.setState({
                isDrawing: false,
                gotGift,
                showDialog: true,
            });
            this.alertMessage("success")
        }
    }
    hideGotDialog = () => {
        this.setState({ showDialog: false })
    }
    render() {
        // readonly
        const { giftList,
            activeIndex,
            isDrawing,
            showDialog,
            gotGift,
            myCount,
            message,
            messageType } = this.state;
        const getIsActive = (item) => (
            item.id === activeIndex ? 1 : 0
        )
        return (
            <div className="draw-box">
                {/* tipsBox */}
                {
                    message ? <Alert message={message} type={messageType}></Alert> : null
                }

                {/* main */}
                <DrawWrap>
                    <GrawTitle>抽奖次数：{myCount}</GrawTitle>
                    <DrawBg>
                        <DrawGiftDialog show={showDialog} >
                            {
                                showDialog ? <GotGift giftSrc={gotGift.icon}>
                                    <CloseDialogBtn onClick={this.hideGotDialog}></CloseDialogBtn>
                                    <div className="got-img"></div>
                                    <p className="got-name">{gotGift.name}</p>
                                    {
                                        gotGift.count ? <p className="got-count">{gotGift.count}个</p> : null
                                    }
                                </GotGift> : null
                            }
                        </DrawGiftDialog>
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