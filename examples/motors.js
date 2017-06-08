const five = require("johnny-five");
const keypress = require("keypress");

let board, motor_l, motor_r;

const speed = 255;

// set up the input
keypress(process.stdin);

process.stdin.resume();
process.stdin.setEncoding('utf8');
process.stdin.setRawMode(true);

console.info("Setting up robot. Attempting J5 connect to Arduino")

board = new five.Board({port: process.argv[2]});

board.on("ready", function(err) {

    if (err){
        console.log(err);
        return;
    }

    console.info("Board connected. Robot set up");

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

	console.info("Robot running issue commands to it.");
	console.info("LRUD arrows. Space stop. C to quit");

});

process.stdin.on('keypress', function(chunk, key) {
	// process the keypresses

	if (key && key.name == 'c') {
		console.log("Exiting");
        motor_l.stop();
        motor_r.stop();
		process.exit();
	}

	if (key) {
		switch (key.name) {
			case "left":
				motor_r.reverse(speed);
                motor_l.forward(speed);
				break;
			case "right":
				motor_r.forward(speed);
                motor_l.reverse(speed);
				break;
			case "up":
				motor_l.reverse(speed);
                motor_r.reverse(speed);
				break;
			case "down":
				motor_r.forward(speed);
                motor_l.forward(speed);
				break;
			case "space":
				motor_r.stop();
                motor_l.stop();
				break;
		}
    }

});

