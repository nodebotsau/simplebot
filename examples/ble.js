const BleIO = require("ble-io");
const five = require("johnny-five");

var Controller = require("../lib/kb_controller.js");

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

    console.log("Control the bot with the arrow keys, and SPACE to stop.");

    const led = five.Led(32);
    var controller = new Controller({
        left: new five.Servo.Continuous(25),
        right: new five.Servo.Continuous(33),
        lstop: 90, // use these to set the stop value of the servo
        rstop: 90,
    });
    led.on();
});

board.on("error", function(err) {
    console.log(err.message);
    process.exit();
});

