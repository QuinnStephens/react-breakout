import React, { useState, useEffect } from "react"
import * as d3 from "d3"
import "./App.css"

const WIDTH = 720
const HEIGHT = 480
const BALL_DIAMETER = 32

function App() {
  const [ballVelocity, setBallVelocity] = useState({ x: 0.5, y: 0.5 })
  const [ballPos, setBallPos] = useState({ left: 100, top: 100 })
  function update(delta) {
    let newBallVelocity = ballVelocity
    let left = ballPos.left + ballVelocity.x * delta
    let top = ballPos.top + ballVelocity.y * delta
    left = Math.min(WIDTH - BALL_DIAMETER, Math.max(0, left))
    top = Math.min(HEIGHT - BALL_DIAMETER, Math.max(0, top))
    if (left >= WIDTH - BALL_DIAMETER || left <= 0) {
      newBallVelocity.x = -ballVelocity.x
    }
    if (top >= HEIGHT - BALL_DIAMETER || top <= 0) {
      newBallVelocity.y = -ballVelocity.y
    }
    setBallPos({ left, top })
  }
  useEffect(() => {
    const t = d3.timer(update)
    return () => t.stop()
  })
  return (
    <div className="App">
      <Stage>
        <Ball style={{ left: ballPos.left, top: ballPos.top }} />
      </Stage>
    </div>
  )
}

function Stage({ children }) {
  return <div className="Stage">{children}</div>
}

function Ball({ style }) {
  return <div className="Ball" style={style}></div>
}

export default App
