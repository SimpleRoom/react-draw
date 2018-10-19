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

/**
 *  alert animation list
 *  default shake
 *
 * */
const shake = keyframes`
    from, to {
        transform: translate3d(0, 0, 0);
    }
    10%, 30%, 50%, 70%, 90% {
        transform: translate3d(-10px, 0, 0);
    }
    20%, 40%, 60%, 80% {
        transform: translate3d(10px, 0, 0);
    }
`;
const animationList = {
    zoomInDown: keyframes`
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
    `,
    bounceIn: keyframes`
        from, 20%, 40%, 60%, 80%, to {
            animation-timing-function: cubic-bezier(0.215, 0.610, 0.355, 1.000);
        }
        0% {
            opacity: 0;
            transform: scale3d(.3, .3, .3);
        }
        20% {
            transform: scale3d(1.1, 1.1, 1.1);
        }
        40% {
            transform: scale3d(.9, .9, .9);
        }
        60% {
            opacity: 1;
            transform: scale3d(1.03, 1.03, 1.03);
        }
        80% {
            transform: scale3d(.97, .97, .97);
        }
        to {
            opacity: 1;
            transform: scale3d(1, 1, 1);
        }
    `,
    rubberBand: keyframes`
        from {
            transform: scale3d(1, 1, 1);
        }
        30% {
            transform: scale3d(1.25, 0.75, 1);
        }
        40% {
            transform: scale3d(0.75, 1.25, 1);
        }
        50% {
            transform: scale3d(1.15, 0.85, 1);
        }
        65% {
            transform: scale3d(.95, 1.05, 1);
        }
        75% {
            transform: scale3d(1.05, .95, 1);
        }
        to {
            transform: scale3d(1, 1, 1);
        }
    `,
    wobble: keyframes`
        from {
            transform: none;
        }
        15% {
            transform: translate3d(-25%, 0, 0) rotate3d(0, 0, 1, -5deg);
        }
        30% {
            transform: translate3d(20%, 0, 0) rotate3d(0, 0, 1, 3deg);
        }
        45% {
            transform: translate3d(-15%, 0, 0) rotate3d(0, 0, 1, -3deg);
        }
        60% {
            transform: translate3d(10%, 0, 0) rotate3d(0, 0, 1, 2deg);
        }
        75% {
            transform: translate3d(-5%, 0, 0) rotate3d(0, 0, 1, -1deg);
        }
        to {
            transform: none;
        }
    `,
}

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
    animation: ${props => props.animationType ? props.animationType : shake} 1.4s;

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
// message styles
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
        /**
         * @param{message}          String
         * @param{type}             [String]: success,warning,error...
         * @param{animationType}    [String]
         *
         **/
        this.state = {
            message: null,
            type: null,
            animationType: null,
            delayHideTime: 5000,
        }
        this.timerId = null
    }

    // listener props from Parent Component
    static getDerivedStateFromProps(nextProps, prevState) {
        // console.log(nextProps);
        if (nextProps.message !== prevState.message) {
            return {
                message: nextProps.message,
                type: nextProps.type,
                animationType: nextProps.animationType,
            }
        }
        return null;
    }

    // call auto
    componentDidMount() {
        this.autoDestoryAlert()
    }
    //
    componentWillUnmount() {
        if (this.timerId) {
            clearTimeout(this.timerId)
        }
    }

    //auto remove Alert
    autoDestoryAlert() {
        const {message, delayHideTime} = this.state;
        if (message) {
            this.timerId = setTimeout(() => {
                this.props.hideAlert()
            }, delayHideTime)
        }
    }

    //remove by hand
    destroyAlert = () => {
        this.props.hideAlert()
    }

    render() {
        const {message, type, animationType} = this.state;
        // message style
        const getMessageStyle = (currentType) => {
            if (currentType) {
                return MessageStyles[currentType]
            }
        };
        // alert join animation
        const getAnimation = (type) => {
            return animationList[type]
        }
        /**
         *  ...getMessageType(type)代替
         *  bgColor={getMessageType(type).bgColor}
         *  borderColor={getMessageType(type).borderColor}
         *  fontColor={getMessageType(type).fontColor}
         *
         */
        return (
            <div className="message-wrap">
                <MessageBox>
                    <MessageContent animationType={getAnimation(animationType)}
                                    isHasMessage={message} {...getMessageStyle(type)}>
                        {message}
                        <CloseButton onClick={this.destroyAlert}>×</CloseButton>
                    </MessageContent>
                </MessageBox>
            </div>
        );
    }
}

export default AlertBox;