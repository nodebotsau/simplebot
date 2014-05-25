// =======================
// Build off the basic simplebot base but now with a dualshock controller
// interface
//
// Note dependency: npm install dualshock-controller
// =======================

var five = require("johnny-five");
var dualshock = require("dualshock-controller");

var STOPVAL = 90;
var RSTOPVAL = 88;
var LSTOPVAL = 89;

var port = process.argv[2] || "";

var opts = {};

if (port != "") {
    opts.port = port;
}

var controller = dualshock({
    config: "dualshock3",
    analogStickSmoothing: true,
});


var board = new five.Board(opts);
//var board = new five.Board({port: "/dev/tty.FireFly-AF8A-SPP" });

board.on("ready", function() {

    console.log("Welcome to SimpleBot with PS3 Controller!")
    console.log("Control the bot with the left analog stick for throttle and reverse");
    console.log("Right analog stick goes left and right");
    console.log("Start button to quit");

    var led = new five.Led(5);
    var left_wheel  = new five.Servo({ pin:  9, type: 'continuous' }).to(LSTOPVAL);
    var right_wheel = new five.Servo({ pin: 10, type: 'continuous'  }).to(RSTOPVAL);

    var accel = 0; // neutral
    var turn = 0; // neutral

    controller.on("start:release", function(data) {
        // set quit.
        left_wheel.to(LSTOPVAL);
        right_wheel.to(RSTOPVAL);
        console.log("Qutting");
        process.exit();
    });

    controller.on("left:move", function(data) {
        // this is the throttle with 0 being full forward
        // 255 being full backwards and about 127 being much in the middle.
        if (data.y < 96) {
            accel = 1;
        } else if (data.y < 160) {
            accel = 0;
        } else {
            accel = -1;
        }
    });

    controller.on("right:move", function(data) {
        // this is the turn with 0 being full left turn and 255 full right.

        if (data.x < 96) {
            turn = -1;
        } else if (data.x < 160) {
            turn = 0;
        } else {
            turn = 1;
        }
    });


    // main loop that controls the vehicle.
    setInterval(function() {

        if (accel == 0 ) { 
            left_wheel.to(LSTOPVAL);
            right_wheel.to(RSTOPVAL);
            return;
        }
        
        if (accel > 0) {
            // we're driving forward.
            if (turn < 0) {
                // turn left driving forward;
                left_wheel.cw();
                right_wheel.cw();
            } else if (turn > 0) {
                // turn right driving forward
                left_wheel.ccw();
                right_wheel.ccw();
            } else {
                // drive forward
                left_wheel.ccw();
                right_wheel.cw();
            }
        } else {

            if (turn < 0) {
                // turn left driving backward;
                left_wheel.ccw();
                right_wheel.ccw();
            } else if (turn > 0) {
                // turn right driving backward
                left_wheel.cw();
                right_wheel.cw();
            } else {
                // drive backwards
                left_wheel.cw();
                right_wheel.ccw();
            }
        }

    }, 50);


    var key = {"name": "yada"};

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
        left_wheel.cw();
        right_wheel.cw();      

    } else if ( key.name == 'right' ) {

        console.log('Right');
        left_wheel.ccw();
        right_wheel.ccw();

    } else if ( key.name == 'space' ) {

        console.log('Stopping');
        left_wheel.to(LSTOPVAL);
        right_wheel.to(RSTOPVAL);

    } else if (key.name == "o") {
        console.log("on");
        led.on();
    } else if (key.name == "f") {
        console.log("off");
        led.off();
    } else if (key.name == "s") {
        console.log("blink");
        led.strobe(2000);
    }
});

board.on("error", function(err) {
    console.log(err.message);
    process.exit();
});

