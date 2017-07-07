const five = require("johnny-five");
const keypress = require("keypress");

var board, motor_l, motor_r;
var led;

var speed_setting = 255;

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

    led = new five.Led(11);

    console.info("Robot running issue commands to it.");
    console.info("LRUD arrows. Space stop. Q to quit");

});

process.stdin.on('keypress', function(chunk, key) {
    // process the keypresses

    if (key) {
        switch (key.name) {
            case "left":
                motor_r.reverse(speed_setting);
                motor_l.forward(speed_setting);
                break;
            case "right":
                motor_r.forward(speed_setting);
                motor_l.reverse(speed_setting);
                break;
            case "up":
                motor_l.reverse(speed_setting);
                motor_r.reverse(speed_setting);
                break;
            case "down":
                motor_r.forward(speed_setting);
                motor_l.forward(speed_setting);
                break;
            case "space":
                motor_r.stop();
                motor_l.stop();
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
                motor_r.stop();
                motor_l.stop();
                process.exit();
        }
    }

});

