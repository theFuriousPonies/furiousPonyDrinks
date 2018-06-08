import React from 'react'

const Bubbles = () => {
  return (
    <svg className="bubble-containter">
      <g className="bubble-thing">
        <g className="bubble-box" id="bubble-delayed-big">
          <g className="bubble" id="wobble-delayed">
            <circle className="bubble1" cx="500" cy="-100" r="25" />
          </g>
        </g>
        <g className="bubble-box">
          <g className="bubble" id="wobble-delayed-fast">
            <circle className="bubble2" cx="300" cy="-100" r="15" />
          </g>
        </g>
        <g className="bubble-box" id="bubble-small-delayed">
          <g className="bubble" id="wobble-fast">
            <circle className="bubble3" cx="200" cy="-100" r="10" />
          </g>
        </g>
        <g className="bubble-box" id="bubble-small-delay">
          <g className="bubble">
            <circle className="bubble4" cx="700" cy="-100" r="7" />
          </g>
        </g>
      </g>
    </svg>
  )
}

export default Bubbles
