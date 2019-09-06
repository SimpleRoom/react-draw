import React from 'react'

import { Scrollbars } from 'react-custom-scrollbars'
import styles  from './Bar.module.scss'

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
      </Scrollbars>
    );
  }
}

export default Bars