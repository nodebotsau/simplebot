// =======================
// Build off the basic simplebot for avoidance
//
// =======================
var five = require("johnny-five");
var Controller = require("../lib/kb_controller.js");

var opts = {};
var board = new five.Board(opts);

var range = 10 // distance in cms

board.on("ready", function() {

    var left_wheel = new five.Servo.Continuous(9);
    var right_wheel = new five.Servo.Continuous(8);

    var controller = new Controller({
        left: left_wheel,
        right: right_wheel,
        lstop: 90, // use these to set the stop value of the servo
        rstop: 90,
    });

    // Create new Ping and use to avoid collisions.

    console.log('Initialising Range Finder');
    var ping = new five.Proximity({
        pin: 7,
        freq: 200,
        controller: "HCSR04"
    });

    ping.on("change", function( err, value ) {

        if (this.cm < range) {
            console.log('WARNING: Collision avoidance activated at: ' + this.cm + ' cm');
            left_wheel.to(controller.LSTOPVAL);
            right_wheel.to(controller.RSTOPVAL);
        }

    });
});

board.on("error", function(err) {
    console.log(err.message);
    process.exit();
});
