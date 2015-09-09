var five = require("johnny-five");
var Controller = require("../lib/kb_controller.js");

var opts = {};
opts.port = process.argv[2] || "";

var board = new five.Board(opts);

board.on("ready", function() {

    console.log("Control the bot with the arrow keys, and SPACE to stop.")

    var controller = new Controller({
        left: new five.Servo.Continuous(9),
        right: new five.Servo.Continuous(8),
        lstop: 90, // use these to set the stop value of the servo
        rstop: 90,
    });
});

board.on("error", function(err) {
    console.log(err.message);
    process.exit();
});

//**************
// With acknowledgement to the awesome work done by @makenai on SumoBot Jr
// code that started the idea of this originally
// ******/
