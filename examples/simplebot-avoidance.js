// =======================
// Build off the basic simplebot for avoidance
//
// =======================
var five = require("johnny-five");

var simplebot = require('./simplebot');
var left_wheel  = new five.Servo({ pin:  9, type: 'continuous' }).to(simplebot.LSTOPVAL);
var right_wheel = new five.Servo({ pin: 10, type: 'continuous' }).to(simplebot.RSTOPVAL);

var opts = {};
var board = new five.Board(opts);

var range = 10 // distance in cms

board.on("ready", function() {

  // Create new Ping and use to avoid collisions.
  // Simple directional decisions can be created
  // to turn the bot autonomously

  var ping = new five.Ping(7);
  console.log('Initialising Range Finder');

  ping.on("change", function( err, value ) {

    if (this.cm < range) {
      console.log('WARNING: Collision avoidance activated at: ' + this.cm + ' cm');
      left_wheel.to(LSTOPVAL);
      right_wheel.to(RSTOPVAL);
    }

  });
});

board.on("error", function(err) {
    console.log(err.message);
    process.exit();
});
