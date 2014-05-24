// =======================
// Derived from the work done by @makenai on the
// SumoBot Jr
// =======================

var five = require("johnny-five");
var keypress = require('keypress');

var STOPVAL = 90;

keypress(process.stdin);

var board = new five.Board();

board.on("ready", function() {

  console.log("Welcome to SimpleBot!")
  console.log("Control the bot with the arrow keys, and SPACE to stop.")

  var left_wheel  = new five.Servo({ pin:  9, type: 'continuous' }).to(STOPVAL);
  var right_wheel = new five.Servo({ pin: 10, type: 'continuous'  }).to(STOPVAL);

  process.stdin.resume(); 
  process.stdin.setEncoding('utf8'); 
  process.stdin.setRawMode(true); 

  process.stdin.on('keypress', function (ch, key) {
    
    if ( !key ) return;

    if ( key.name == 'q' ) {

      console.log('Quitting');
      process.exit();

    } else if ( key.name == 'up' ) {

      console.log('Forward');
      left_wheel.ccw();
      right_wheel.cw();

    } else if ( key.name == 'down' ) {

      console.log('Backward');
      left_wheel.cw();
      right_wheel.ccw();      

    } else if ( key.name == 'left' ) {

      console.log('Left');
      left_wheel.ccw();
      right_wheel.ccw();      


    } else if ( key.name == 'right' ) {

      console.log('Right');
      left_wheel.cw();
      right_wheel.cw();

    } else if ( key.name == 'space' ) {

      console.log('Stopping');
      left_wheel.to(STOPVAL);
      right_wheel.to(STOPVAL);

    }
  });
});
