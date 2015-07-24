'use strict';

var VirtualSerialPort = require('udp-serial').SerialPort;
var firmata = require('firmata');
var five = require("johnny-five");
var readline = require("readline");

var firmata = require('firmata');
 
//create the udp serialport and specify the host and port to connect to
var sp = new VirtualSerialPort({
  host: '192.168.4.1',
  type: 'udp4',
  port: 1025
});

var keypress = require('keypress');

var RSTOPVAL = 93;
var LSTOPVAL = 90;


keypress(process.stdin);

//use the serial port to send a command to a remote firmata(arduino) device
var io = new firmata.Board(sp);
io.once('ready', function(){
    console.log('IO Ready');
    io.isReady = true;

    var board = new five.Board({io: io, repl: true});

    board.on('ready', function(){
        console.log('five ready');
        console.log("Control the bot with the arrow keys, and SPACE to stop.");

        var left_wheel  = new five.Servo({ pin:  9, type: 'continuous' });
        var right_wheel = new five.Servo({ pin: 10, type: 'continuous'  });

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
                left_wheel.cw();
                right_wheel.ccw();
            } else if ( key.name == 'down' ) {
                console.log('Backward');
                left_wheel.ccw();
                right_wheel.cw();      
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
                left_wheel.to(LSTOPVAL);
                right_wheel.to(RSTOPVAL);
            }
        });
    });
});

