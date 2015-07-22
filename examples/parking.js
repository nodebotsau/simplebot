// Demos use of the ping sensor attached to the piezo as both a sensor
// with an actuator
//
var five = require("johnny-five"),
        board = new five.Board();

board.on("ready", function() {

    //Create new Ping and show distance on change
    var ping = new five.Proximity({
        pin: 7,
        freq: 200,
        controller: "HCSR04"
    });

    var piezo = new five.Piezo(11); // leostick piezo

    var intervalID = 0;

    ping.on("change", function( err, value ) {

        console.log('Object is ' + this.cm + ' cm away');
        // now we do a callback on the interval of the centimetres thus
        // shorter centimetres means less interval before calling the tone command
        clearInterval(intervalID);
        if (this.cm > 4) {  // this is arbitrary to stop the conflicts with tone.
            intervalID = setInterval(function() {
                piezo.tone("e", "1");
            }, Math.floor(this.cm));
        }
    });
});  
