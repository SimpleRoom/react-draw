import React from 'react'

import { Scrollbars } from 'react-custom-scrollbars'
import styles  from './Bar.module.scss'

import ScrollDraw from './scrollDraw/ScrollDraw'

class Bars extends React.Component {
  render() {
    return (
      <Scrollbars style={{ width: 500, height: 300 }} className={styles.barWrap}>
        <p>Some great content...</p>
        <p>Some great content...</p>
        <p>Some great content...</p>
        <p>Some great content...</p>
        <p>Some great content...</p>
        <p>Some great content...</p>
        <p>Some great content...</p>
        <p>Some great content...</p>
        <p>Some great content...</p>
        <p>Some great content...</p>
        <p>Some great content...</p>
        <p>Some great content...</p>
        <p>Some great content...</p>
        <p>Some great content...</p>
        <p>Some great content...</p>
        <ScrollDraw />
      </Scrollbars>
    );
  }
}

export default Bars