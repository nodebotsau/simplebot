// sets up a simple controller using a keyboard interface to drive
// the simplebot. Assumes two servos passed in as a left and right wheel
//
var keypress = require('keypress');

var Controller = function(opts) {

    // assume opts is a left and right wheel object.
    if (opts == undefined) {
        throw "No opts provided";
    }

    // get the servos
    this.left = opts.left || null;
    this.right = opts.right || null;

    // set the stop values if needed
    this.LSTOPVAL = opts.lstop || 90;
    this.RSTOPVAL = opts.rstop || 90;

    if (this.left == null || this.right == null) {
        throw "Both servos must be supplied"
    }

    keypress(process.stdin);

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
            this.left.cw();
            this.right.ccw();
        } else if ( key.name == 'down' ) {
            console.log('Backward');
            this.left.ccw();
            this.right.cw();      
        } else if ( key.name == 'left' ) {
            console.log('Left');
            this.left.ccw();
            this.right.ccw();      
        } else if ( key.name == 'right' ) {
            console.log('Right');
            this.left.cw();
            this.right.cw();
        } else if ( key.name == 'space' ) {
            console.log('Stopping');
            this.left.to(this.LSTOPVAL);
            this.right.to(this.RSTOPVAL);
        }
    }.bind(this) );

};

module.exports = Controller;

