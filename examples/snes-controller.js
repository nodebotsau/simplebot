// =======================
// Build off the basic simplebot base but now with a USB SNES gamepad controller
//
// http://www.ebay.com.au/itm/Retro-SNES-USB-Wired-Classic-Controller-GamePad-for-Windows-PC-Color-/261348030489
//
// Note dependency: npm install node-gamepad
//
// Note also: you may need to update the 'vendorID' and 'productID' below to match your controller.
// You should find your device listed under Windows > 'Control Panel' > 'Device Manager' > 'Human Interface Devices'
// Refer to the screenshot attached 'snes-controller.png' for more details.
// =======================

const five = require("johnny-five");
const Gamepad = require("node-gamepad");
const gamepad = new Gamepad('snes/retrolink', { vendorID: 0x0810, productID: 0xE501 });
const buttons = ['up', 'down', 'left', 'right', 'x', 'y', 'a', 'b', 'l', 'r'];
const port = process.argv[2] || "";

let controller = {};

gamepad.connect();

buttons.forEach(btn => gamepad.on(btn + ':press', () => handle(btn, 'press')));
buttons.forEach(btn => gamepad.on(btn + ':release', () => handle(btn, 'release')));

function handle(button, action) {
    console.log(`${button}:${action}`);
    switch(action) {
        case 'press':
            return controller[button] && controller[button]();
        case 'release':
            return controller.stop && controller.stop();
    }
}

let board = new five.Board({ port });

board.on("ready", () => {

    let motor_r = new five.Motor({
        pins: { pwm: 9, dir: 8 },
        invertPWM: true,
    });

    let motor_l = new five.Motor({
        pins: { pwm: 6, dir: 7 },
        invertPWM: true,
    });

    let piezo = new five.Piezo(10);

    controller.up = () => {
        motor_l.forward(250);
        motor_r.forward(250);
    };
    controller.down = () => {
        motor_l.reverse(250);
        motor_r.reverse(250);
    };
    controller.left = () => {
        motor_l.forward(250);
    };
    controller.right = () => {
        motor_r.forward(250);
    };
    controller.l = () => {
        motor_l.forward(250);
        motor_r.reverse(250);
    };
    controller.r = () => {
        motor_l.reverse(250);
        motor_r.forward(250);
    };
    controller.b = () => {
        piezo.play({
            // Old Macdonald
            song: "- C4 - C4 - C4 - G3 - A3 - A3 - G3 G3 - E4 - E4 - D4 - D4 - C4 C4 - - - -",
            beats: 1/4,
            tempo: 100
        });
    };
    controller.a = () => {
        piezo.play({
            // Yankee doodle
            song: "- C4 C4 D4 E4 C4 E4 D4 - G3 C4 C4 D4 E4 C4 - B3 -",
            beats: 1/2,
            tempo: 200
        });
    };
    controller.y = () => {
        piezo.play({
            // http://johnny-five.io/api/piezo/
            song: "C D F D A - A A A A G G G G - - C D F D G - G G G G F F F F - -",
            beats: 1 / 4,
            tempo: 100
        });
    };
    controller.stop = () => {
        motor_l.stop();
        motor_r.stop();
        piezo.off();
    };

});
