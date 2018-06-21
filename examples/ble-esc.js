const BleIO = require("ble-io");
const five = require("johnny-five");
const keypress = require("keypress");

let esc;
let cur_pos = 90;
const MAX = 130;
const MIN = 75;
const STOP = 90;

// set up the input
//keypress(process.stdin);

process.stdin.resume();
process.stdin.setEncoding('utf8');
process.stdin.setRawMode(true);

console.info("Setting up robot. Attempting J5 connect to Arduino")

const board = new five.Board({
  io: new BleIO()
});

/**board.on("ready", function() {
  const led = new five.Led(32);
  led.blink(500);
	const servo = new five.Servo(33);

   servo.sweep([45, 135]);

  //servo.to(20);
});**/

board.on("ready", function() {

  console.log("Control the bot with the arrow keys, and SPACE to stop.")

  esc = new five.Servo(25);
  esc.to(STOP);
  cur_pos = STOP;
  const led = five.Led(32);
  led.on();
});

board.on("error", function(err) {
    console.log(err.message);
    process.exit();
});

process.stdin.on('keypress', function(chunk, key) {
  // process the keypresses

  if (key) {
    switch (key.name) {
      case "left":
        // motor_r.reverse(speed_setting);
        break;
      case "right":
        // motor_r.forward(speed_setting);
        break;
      case "up":
        console.log("Go faster");
        cur_pos = (cur_pos >= MAX) ? MAX : cur_pos + 1;
        break;
      case "down":
        // motor_r.forward(speed_setting);
        console.log("Go slower");
        cur_pos = (cur_pos <= MIN) ? MIN : cur_pos - 1;
        break;
      case "space":
        console.log("stopping");
        esc.to(STOP);
        cur_pos = STOP;
        break;
      case "l":
        console.log("LED ON");
        led.on();
        break;
      case "o":
        console.log("LED OFF");
        led.off();
        break;
      case "q":
        console.log("Exiting");
        esc.stop();
        process.exit();
    }

  }
  console.log("Cur: " + cur_pos);
  esc.to(cur_pos);

});
