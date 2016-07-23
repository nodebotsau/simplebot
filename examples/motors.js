var five = require("johnny-five");

var board, motor_l, motor_r;
var servo_l, servo_r;
var led;

var speed = 0;
var min_speed = 230;
var max_speed = 255;
var cur_speed_setting = 0.9


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
	var ir = new five.IR.Reflect.Array({
	  emitter: 13,
	  pins: ["A0", "A1"], // any number of pins
	  freq: 1000
	});

	ir.on('data', function() {
    	console.log( "Raw Values: ", this.raw );
  	});

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

    servo_l = new five.Servo(3);
    servo_r = new five.Servo(4);

    led = new five.Led(11);

	console.info("Robot running issue commands to it.");
	console.info("LRUD arrows. Space stop. H help");

});

stdin.on('keypress', function(chunk, key) {
	// process the keypresses

	if (key && key.name == 'c') {
		console.log("Exiting");
        motor_l.stop();
        motor_r.stop();
		process.exit();
	}

	speed = (cur_speed_setting * (max_speed - min_speed)) + min_speed;
    console.log(speed);

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
			case "1":
				cur_speed_setting = 0.1;
				break;
			case "2":
				cur_speed_setting = 0.2;
				break;
			case "3":
				cur_speed_setting = 0.3;
				break;
			case "4":
				cur_speed_setting = 0.4;
				break;
			case "5":
				cur_speed_setting = 0.5;
				break;
			case "6":
				cur_speed_setting = 0.6;
				break;
			case "7":
				cur_speed_setting = 0.7;
				break;
			case "8":
				cur_speed_setting = 0.8;
				break;
			case "9":
				cur_speed_setting = 0.9;
				break;
            case "0":
                cur_speed_setting = 1.0;
                break;
            case "s":
                servo_l.to(30);
                servo_r.to(30);
                console.log("Sweep the servos");
                break;
            case "k":
                servo_l.stop();
                servo_r.stop();
                break;
            case "l":
                console.log("LED ON");
                led.on();
                break;
            case "o":
                console.log("LED OFF");
                led.off();
                break;
		}
    }

});

