var five = require("johnny-five");

var board, motor_l, motor_r;
var calibrating = true;

var speed = 0;
var min_speed = 230;
var max_speed = 255;
var cur_speed_setting = 0.9

console.info("Setting up robot. Attempting J5 connect to Arduino")

board = new five.Board({port: process.argv[2]});

board.on("ready", function() {

    motor_r = new five.Motor({
        pins: {
            pwm: 9,
            dir: 8,
        },
        invertPWM: true,
    });

    motor_l = new five.Motor({
        pins: {
            pwm: 6,
            dir: 7,
        },
        invertPWM: true,
    });

	var ir = new five.IR.Reflect.Array({
	  emitter: 13,
	  pins: ["A0", "A1"], // any number of pins
	  freq: 100
	});

    console.info("Board connected. Robot set up");
    console.info("Calibrate the sensors by running them back and forth");

    ir.calibrateUntil(function() {
        return !calibrating;
    });

    setTimeout(function() {
        calibrating = false;
        console.log("Sensors calibrated, go for it");
    }, 3000);

    ir.on('line', function() {
        if (!calibrating) {
            console.log( "Line val: ", this.line);

            if (this.line < 100) {
                motor_r.stop();
            } else if (this.line > 900) {
                motor_l.stop();
            } else {
                motor_l.forward();
                motor_r.forward();
            }
        }
    });

	console.info("Robot running by default it will be stopped if it's off line");
});


