import React from 'react'

import styles from './TurntableDraw.module.styl'
import { TurnGifts } from '../DrawData'

class TurntableDraw extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      rotateDeg: 'rotate(0deg)',
      rotating: false,
    }
    // 一圈的总长度，礼物总数量
    this.stepCount = TurnGifts.length
    this.maxDeg = 360
    this.tempDeg = 0
    this.activeIndex = 1
    // 最终要停下的位置：接口返回(>=1&&<=stepCount)
    this.endStopIndex = 5
    // 转速   分别为最后0,1,2,3,4,5圈的转速
    this.speed = [336, 168, 84, 42, 42, 32]
    // 开启转盘的定时器
    this.timer = null
  }

  drawHandle = () => {
    this.setState({ rotating: true }, this.startTurn)
  }

  startTurn() {
    // 总共需要转的圈数
    let leftRound = this.speed.length - 1
    this.moveRotate({ isContinue: true, leftRound })
  }

  moveRotate = params => {
    let { isContinue, leftRound } = params
    this.tempDeg += 22.5
    if (isContinue) {
      // 旋转45度index+1
      if (this.tempDeg % 45 === 0) {
        this.activeIndex += 1
      }
      // 如果到超过奖品个数，重置为1
      if (this.tempDeg >= this.maxDeg) {
        console.log(`转了${leftRound}圈`)
        leftRound -= 1
        this.tempDeg = 0
        this.activeIndex = 1
      }
      // 如果已经到最后一圈了  且  已经到了指定要中奖的位置了  就不需要继续了
      if (leftRound === 0 && this.activeIndex === this.endStopIndex) {
        isContinue = false
      }
      this.setState({ rotateDeg: `rotate(${this.tempDeg}deg)` })
      const nextParams = {
        isContinue,
        leftRound
      }
      this.timer = setTimeout(() => {
        this.moveRotate(nextParams)
      }, this.speed[leftRound])
    } else {
      clearTimeout(this.timer)
      this.timer = null
      console.log(this.activeIndex, this.endStopIndex, 'end--')
      console.log(TurnGifts[this.activeIndex - 1])
    }
  }

  render() {
    const { rotateDeg } = this.state
    return (
      <div className={styles.turnWrap}>
        <div className={styles.containerBox} style={{ transform: rotateDeg }}>
          {
            TurnGifts.map((item) => (
              <div
                className={styles.rotateItem}
                key={item.id}
                data-index={item.id}
                style={{ transform: item.rotate }}>
                <div>{item.name}</div>
                <img src={item.icon} alt="" />
              </div>
            ))
          }
        </div>
        {/* 按钮 */}
        <div className={styles.turnBtn} onClick={this.drawHandle} />
      </div>
    )
  }
}

export default TurntableDraw