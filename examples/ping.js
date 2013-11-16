var five = require("johnny-five"),
        board = new five.Board();

board.on("ready", function() {

    //Create new Ping and show distance on change
    var ping = new five.Ping(7);

    ping.on("change", function( err, value ) {

        console.log('Object is ' + this.cm + ' cm away');
        console.log('Object is ' + this.inches + ' inches away');
    });
});  
