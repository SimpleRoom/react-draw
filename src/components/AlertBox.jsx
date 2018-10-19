import React, {PureComponent} from "react"
import styled, {keyframes} from 'styled-components'
// common
const ClearFix = styled.div`
    &:before,&:after{
        display:table;
        content:'';
        clear:both;
    }
`;
const maxZindex = 9999;
const DefaultBg = "#d9edf7";
const DefaultBorderColor = "#bce8f1";
const DefaultFontColor = "#31708f";

//animation
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
// MessageBox
const MessageBox = styled(ClearFix)`
    text-align:center;
    position:fixed;
    width:100%;
    z-index:${maxZindex};
`;
const MessageContent = styled.div`
    padding:15px 35px 15px 20px;
    border:1px solid transparent;
    border-radius:4px;
    margin:0 auto;
    color:${props => props.fontColor ? props.fontColor : DefaultFontColor};
    background-color:${props => props.bgColor ? props.bgColor : DefaultBg};
    border-color:${props => props.borderColor ? props.borderColor : DefaultBorderColor};
    display:${props => props.isHasMessage ? "block" : "none"};
    animation: ${zoomInDown} 1.4s;

    display:inline-block;
`;

const CloseButton = styled.button`
    position:relative;
    float:right;
    top:-2px;
    right:-28px;
    color:inherit;
    -webkit-appearance:none;
    outline:none;
    border:0;
    background:transparent;
    font-weight:700;
    opacity:.2;
    text-shadow:0 1px 0 #fff;
    line-height:1;
    cursor:pointer;
    font-size:21px;

    &:hover{
        color: #000;
        opacity:.5;
    }
`;
//from messageType
const MessageStyles = {
    default: {
        bgColor: "#d9edf7",
        borderColor: "#bce8f1",
        fontColor: "#31708f",
    },
    success: {
        bgColor: "#dff0d8",
        borderColor: "#d6e9c6",
        fontColor: "#3c763d",
    },
    warning: {
        bgColor: "#fcf8e3",
        borderColor: "#faebcc",
        fontColor: "#8a6d3b",
    },
    error: {
        bgColor: "#f2dede",
        borderColor: "#ebccd1",
        fontColor: "#a94442",
    },
}

class AlertBox extends PureComponent {
    constructor(props) {
        super(props)
        this.state = {
            message: null,
            type: null,
            delayHideTime: 5000,
        }
        // type:success,warning,error...
        this.timerId = null
    }

    // 自动监听父组件传递的props自动更新当前状态，动画方便:ex <Transition>
    static getDerivedStateFromProps(nextProps, prevState) {
        // console.log(nextProps);
        if (nextProps.message !== prevState.message) {
            return {
                message: nextProps.message,
                type: nextProps.type,
            }
        }
        return null;
    }

    // message存在才挂载
    componentDidMount() {
        this.autoDestoryAlert()
    }

    componentWillUnmount() {
        if (this.timerId) {
            clearTimeout(this.timerId)
        }
    }

    //自动消失
    autoDestoryAlert() {
        const {message, delayHideTime} = this.state;
        if (message) {
            this.timerId = setTimeout(() => {
                this.props.hideAlert()
            }, delayHideTime)
        }
    }

    //手动消失
    destroyAlert = () => {
        this.props.hideAlert()
    }

    render() {
        const {message, type} = this.state;
        const getMessageStyle = (currentType) => {
            if (currentType) {
                return MessageStyles[currentType]
            }
        };
        /**
         *  ...getMessageType(type)代替
         *  bgColor={getMessageType(type).bgColor}
         *  borderColor={getMessageType(type).borderColor}
         *  fontColor={getMessageType(type).fontColor}
         */

        return (
            <div className="message-wrap">
                <MessageBox>
                    <MessageContent isHasMessage={message} {...getMessageStyle(type)}>
                        {message}
                        <CloseButton onClick={this.destroyAlert}>×</CloseButton>
                    </MessageContent>
                </MessageBox>
            </div>
        );
    }
}

export default AlertBox;