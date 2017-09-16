//
// Use this to test your board
// If it blinks you are good to go. 
//
// $ node blink.js
//

var five = require("johnny-five");
var board = new five.Board({port: process.argv[2]});

board.on("ready", function() {
  var led = new five.Led(13);
  led.blink(500);
});


// Credit http://johnny-five.io
