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

    var pos1 = 2;
    var pos2 = 1;
    var pos3 = 0;

    var blinker = setInterval(function() {

        strip.color("#000"); // blanks it out

        if (++pos1 >= strip.stripLength()) pos1 = 0;
        strip.pixel(pos1).color("red");

        if (++pos2 >= strip.stripLength()) pos2 = 0;
        strip.pixel(pos2).color("green");

        if (++pos3 >= strip.stripLength()) pos3 = 0;
        strip.pixel(pos3).color("blue");

        strip.show();
    }, 1000/25);

/**    strip.color("teal");

    var p = strip.pixel(3);
    p.color("#FF0000");
    strip.show();**/


});
