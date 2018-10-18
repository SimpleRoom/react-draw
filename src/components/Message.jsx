import React, { PureComponent } from "react"
import styled, { keyframes } from 'styled-components'
// common
const maxZindex = 999
const zoomInDown = keyframes`
    from {
        opacity: 0;
        transform: scale3d(.1, .1, .1) translate3d(-50%, -1000px, 0);
        animation-timing-function: cubic-bezier(0.550, 0.055, 0.675, 0.190);
    }
    60% {
        opacity: 1;
        transform: scale3d(.475, .475, .475) translate3d(-50%, 60px, 0);
        animation-timing-function: cubic-bezier(0.175, 0.885, 0.320, 1);
    }
`;

const MessageMain = styled.div`
    padding:15px 35px 15px 20px;
    border:1px solid transparent;
    border-radius:4px;
    margin:0 auto;
    color:${props => props.fontColor};
    background-color:${props => props.bgColor};
    border-color:${props => props.borderColor};
    display:${props => props.isShow ? "block" : "none"};
    animation: ${zoomInDown} 1.4s;

    position:absolute;
    left:50%;
    transform:translate3d(-50%,0,0);
    top:0;
    z-index:${maxZindex};
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

const TypeList = {
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
class Message extends PureComponent {
    constructor(props) {
        super(props)
        this.state = {}
        // type:success,warning,error
    }
    render() {
        const { isShow, message, type } = this.props
        const getMessageType = (type) => {
            if (type) {
                return TypeList[type]
            }
        }

        return (
            <div className="message-box">
                <MessageMain isShow={isShow}
                    bgColor={getMessageType(type).bgColor}
                    borderColor={getMessageType(type).borderColor}
                    fontColor={getMessageType(type).fontColor}
                >{message}
                    <CloseButton>×</CloseButton>
                </MessageMain>
            </div>
        );
    }
}

export default Message;