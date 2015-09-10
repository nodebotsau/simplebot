'use strict';

var Controller = require("../lib/kb_controller.js");
var firmata = require('firmata');
var five = require("johnny-five");
var readline = require("readline");
var VirtualSerialPort = require('udp-serial').SerialPort;
 
//create the udp serialport and specify the host and port to connect to
var sp = new VirtualSerialPort({
  host: '192.168.4.1',
  type: 'udp4',
  port: 1025
});

//use the serial port to send a command to a remote firmata(arduino) device
var io = new firmata.Board(sp);
io.once('ready', function(){
    console.log('IO Ready');
    io.isReady = true;

    var board = new five.Board({io: io, repl: true});

    board.on('ready', function(){
        console.log('five ready');

        var controller = new Controller({
            left: new five.Servo.Continuous(9),
            right: new five.Servo.Continuous(8),
            lstop: 90, // use these to set the stop value of the servo
            rstop: 90,
        });
    });
});

