import React from 'react'

const styles = {
  position: 'absolute',
  lineHeight: '22px',
  transition: 'all 450ms cubic-bezier(0.23, 1, 0.32, 1) 0ms',
  zIndex: 1,
  cursor: 'text',
  transform: 'scale(0.75) translate(0px, -28px)',
  transformOrigin: 'left top 0px',
  pointerEvents: 'none',
  color: 'rgba(0, 0, 0, 0.298039)',
  userSelect: 'none',
  top: '16px',
  left: '0px',
  marginTop: '10px'
}

const Label = ({ labelFor, text }) => (
  <label htmlFor={labelFor} style={styles}>{text}</label>
)


export default Label
