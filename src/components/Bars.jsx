import React from 'react'

import { Scrollbars } from 'react-custom-scrollbars'

class Bars extends React.Component {
  render() {
    return (
      <Scrollbars style={{ width: 500, height: 300 }}>
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