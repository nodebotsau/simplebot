var five = require("johnny-five");

var board;

console.info("Setting up robot. Attempting J5 connect to Arduino")

board = new five.Board({port: process.argv[2]});

board.on("ready", function(err) {

    if (err){
        console.log(err);
        return;
    }

    console.info("Board connected. Robot set up");
    console.info("Run the sensors back and forth over the line to get a sense");
    console.info("of what values you're seeing");
	var ir = new five.IR.Reflect.Array({
	  emitter: 13,
	  pins: ["A0", "A1"], // any number of pins
	  freq: 100
	});

	ir.on('data', function() {
    	console.log( "Raw Values: ", this.raw );
  	});

});


