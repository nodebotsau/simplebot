var net = require('net');
var five = require("johnny-five");
var readline = require("readline");

var firmata = require('firmata');
 
var options = {
    host: '192.168.4.1',  //whatever host
    port: 23  //some port
};

var keypress = require('keypress');

var RSTOPVAL = 93;
var LSTOPVAL = 90;

var opts = {};
opts.port = process.argv[2] || "";

keypress(process.stdin);

var client = net.connect(options, function() { //'connect' listener
  console.log('connected to server!');
  
  var socketClient = this;
    socketClient.setNoDelay(true);
 
  //we can use the socketClient instead of a serial port as our transport
  var io = new firmata.Board(socketClient);
 
  io.once('ready', function(){
    console.log('io ready');
    io.isReady = true;
 
    var board = new five.Board({io: io, repl: true});
 
    board.on('ready', function(){
        console.log('five ready');


        console.log("Control the bot with the arrow keys, and SPACE to stop.")

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
 
});

