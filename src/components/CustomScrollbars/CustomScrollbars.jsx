import React from 'react'
import { Scrollbars } from 'react-custom-scrollbars'
import styles  from './CustomScrollbars.module.scss'

class CustomScrollbars extends React.Component {
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

export default CustomScrollbars