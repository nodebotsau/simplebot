var five = require("johnny-five");

var opts = {};                                                                                                                                    
opts.port = process.argv[2] || "";

var board = new five.Board(opts);

board.on("ready", function() {

    //Create new Ping and show distance on change
    var ping = new five.Proximity({
        pin: 8,
        controller: "HCSR04",
        freq: 200,
    });

    ping.on("change", function( err, value ) {

        console.log('Object is ' + this.cm + ' cm away');
        console.log('Object is ' + this.inches + ' inches away');
    });
});  
