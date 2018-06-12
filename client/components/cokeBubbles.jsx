import React from 'react'

const CokeBubbles = () => {
  return (
    <svg className="bubble-containter">
      <g className="bubble-thing">
        <g className="bubble-box" id="coke-bubble-up">
          <g className="bubble" id="coke-bubble-wobble">
            <circle className="bubble1" cx="0" cy="0" r="100" />
          </g>
        </g>
      </g>
    </svg>
  )
}

export default CokeBubbles
