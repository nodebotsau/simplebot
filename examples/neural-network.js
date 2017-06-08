var five = require("johnny-five");
var botbrain = require("botbrain");

var opts = {};
opts.port = process.argv[2] || "";

var board = new five.Board(opts);

board.on("ready", function() {

    var network = new botbrain.NeuralNetwork(100);

    // INPUTS

    //var input1 = new five.Proximity({ pin: 10, freq: 200, controller: "HCSR04" });
    //var input2 = new five.Sensor({ pin: "A1", freq: 200 });
    var input3 = new five.Sensor({ pin: "A6", freq: 200 });

    //input1.on("change", () => network.input(input1.value, 0));
    //input2.on("change", () => network.input(input2.value, 1));
    input3.on("data", () => console.log('input3.data', input3.value) || network.input(input3.value));

    // OUTPUTS

    var motor_l = new five.Motor({ pins: { pwm: 6, dir: 7, }, invertPWM: true, });
    var motor_r = new five.Motor({ pins: { pwm: 9, dir: 8, }, invertPWM: true, });

    // Reactions to data can be arbitrary.
    // It doesnt matter what gets mapped to what since
    // the robot will learn to coordinate itself
    // using positive and negative feedback.

    var output1 = network.output(2); // 2-bit output (0-3)
    var output2 = network.output(2); // 2-bit output (0-3)

    output1.on("data", move.bind(motor_l));
    output2.on("data", move.bind(motor_r));

    function move(data) {
    	switch(data) {
    		case 1: // Forward
    			return this.forward();
    		case 2: // Backward
 				return this.reverse();
 			case 3: // Or Stop
 				return this.stop();
    	}
    }

    // DISPLAY VIA LOCAHOST

    var display = botbrain.Toolkit.visualise(network);

    console.log("Network ready for display. Please open http://localhost:" + display.port);

    // WAIT A BIT, THEN ADD LOGGING VIA CONSOLE
    setTimeout(() =>
    	network.on("fire", function(node) {
	    	console.log("Node" + node.id + " is firing.");
	    })
	, 3000);

	// SAVE REGULARLY
	setInterval(() =>
		require("fs").writeFile("./neural-network.json", network.export())
	, 10000);

});

board.on("error", function(err) {
    console.log(err.message);
    process.exit();
});

//**************
// With acknowledgement to the awesome work done by @makenai on SumoBot Jr
// code that started the idea of this originally
// ******/
