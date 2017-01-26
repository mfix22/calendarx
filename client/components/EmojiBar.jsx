import React from 'react'

const style = {
  marginRight: '10px',
  cursor: 'pointer',
  display: 'inline-block',
  height: '32px',
  verticalAlign: 'top'
}

const EmojiBar = () => (
  <div style={{ textAlign: 'left', verticalAlign: 'middle' }}>
    <i className="material-icons" style={style}>🗓</i>
    <i className="material-icons" style={style}>☕</i>
    <i className="material-icons" style={style}>📞</i>
  </div>
)

export default EmojiBar
