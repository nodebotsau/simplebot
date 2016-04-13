"use strict"
// Simplebot program that backs off when something is detected in front of the
// robot and waits until it's safe, then returns to original position 

const PORT = 'COM3'
const SENSOR_PIN = 7
const LEFT_PIN = 9
const RIGHT_PIN = 8
const LEFT_DEADBAND = [88, 88]
const RIGHT_DEADBAND = [92, 92]
const MIN_DISTANCE = 10
const SAFE_DISTANCE = 15
const WAIT = 1000
const INTERVAL = 10

const five = require("johnny-five")
const board = new five.Board({port: PORT})

board.on("ready", function() {
  const left = new five.Servo({pin: LEFT_PIN, type: 'continuous', invert: true, deadband: LEFT_DEADBAND})
  const right = new five.Servo({pin: RIGHT_PIN, type: 'continuous', deadband: RIGHT_DEADBAND})
  const proximity = new five.Proximity({
    controller: "HCSR04",
    pin: SENSOR_PIN
  })
  
  let backoff = 0
  let backingOff = false
  let waiting = 0
  let safe = true
  
  setInterval(() => {
    if (backingOff) {
      left.cw()
      right.cw()
      backoff = backoff + INTERVAL
      waiting = 0
    } else if (waiting < WAIT && safe) {
      waiting = waiting + INTERVAL
      left.stop()
      right.stop()
    } else if (backoff > 0 && safe) {
      left.ccw()
      right.ccw()
      backoff = backoff - INTERVAL
    } else {
      left.stop()
      right.stop()
    }
    // console.log(backoff, waiting, backingOff, safe)
  }, INTERVAL)
  
  proximity.on("change", function() {
    backingOff = (this.cm < MIN_DISTANCE)
    safe = (this.cm > SAFE_DISTANCE)
  });
  
  this.repl.inject({
    left: left, right: right, proximity: proximity
  })
})