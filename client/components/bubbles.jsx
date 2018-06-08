import React from 'react'

const Bubbles = () => {
  return (
    <svg className="bubble-containter">
      <g className="bubble">
        <circle className="bubble1" cx="500" cy="-120" r="25" />
        <circle className="bubble2" cx="300" cy="-200" r="15" />
        <circle className="bubble2" cx="200" cy="-400" r="10" />
        <circle className="bubble2" cx="700" cy="-250" r="7" />
      </g>
    </svg>
  )
}

export default Bubbles
