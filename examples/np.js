var five = require("johnny-five");
var pixel = require("../lib/pixel.js");


var opts = {};
opts.port = process.argv[2] || "";

var board = new five.Board(opts);
var strip = null;

console.log("Starting");

board.on("ready", function() {

    console.log("Board ready, lets add light");

    strip = new pixel.Strip({
        data: 6,
        length: 17,
        board: this
    });

    var pos = 0;

    var blinker = setInterval(function() {
        strip.pixel(pos).color("#000");

        if (++pos >= strip.stripLength()) pos = 0;
        strip.pixel(pos).color("lime");
        //console.log(strip.pixel(pos).color());
    }, 1000/30);

    /**strip.color("teal");

    var p = strip.pixel(3);
    p.color("#FF0000");

    console.log(p.color());**/

});
