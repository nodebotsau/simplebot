# Using the SimpleBot Shield

If you have a SimpleBot shield you will need an arduino to go with it.

Key features of the shield are:

* Servo headers broken out for Left and Right wheels on pins 9 & 10
* Additional headers broken out for pins 2,3,5,6 using servo pin out style (sig, 5v, gnd)
* 4xWS2812b RGB LEDs (NeoPixels) on the corners of the board attached to pin 6
* Ultrasonic sensor broken out attached to pin 8
* Breakouts for Analog pins 1-5 using screw terminals
* I2C breakout for optional IMU9 module 

## Populating the board

Here are the [build instructions for the board](http://www.openhardwareconf.org/wiki/SimpleBot_Shield_Assembly).

More [detailed instructions](http://www.openhardwareconf.org/wiki/Surface_Mount_Assembly_for_SimpleBot_Shield) on soldering the WS2812 LEDs is available here.

## Preparing custom firmata

To use this shield in total you will need a custom version of firmata that
comprises all the additional libraries you need to make it work. This ships
as part of this repo in the firmware directory. You will need to use ino tool to
compile and upload this to the board so [follow the getting started directions](http://inotool.org/#installation) for
ino tool before attempting the next component.

To install firmata (and install all node dependencies also) follow the directions below.

```
cd ~
git clone https://github.com/nodebotsau/simplebot
cd simplebot
npm install
cd firmware/ino/SBSFirmata
ino clean && ino build -m uno
```

You should see the output of the build sequence and get a positive response from ino 
as below:

```
Searching for Board description file (boards.txt) ... /home/pi/arduino-1.0.5/hardware/arduino/boards.txt
Searching for Arduino lib version file (version.txt) ... /home/pi/arduino-1.0.5/lib/version.txt
Detecting Arduino software version ...  1.0.5 (1.0.5)
Searching for Arduino core library ... /home/pi/arduino-1.0.5/hardware/arduino/cores/arduino
Searching for Arduino variants directory ... /home/pi/arduino-1.0.5/hardware/arduino/variants
Searching for Arduino standard libraries ... /home/pi/arduino-1.0.5/libraries
Searching for make ... /usr/bin/make
Searching for avr-gcc ... /usr/bin/avr-gcc
Searching for avr-g++ ... /usr/bin/avr-g++
Searching for avr-ar ... /usr/bin/avr-ar
Searching for avr-objcopy ... /usr/bin/avr-objcopy
src/SBSFirmata.ino
Searching for Arduino lib version file (version.txt) ... /home/pi/arduino-1.0.5/lib/version.txt
Detecting Arduino software version ...  1.0.5 (1.0.5)
Scanning dependencies of src
Scanning dependencies of Servo
Scanning dependencies of neopixel
Scanning dependencies of ws2812
Scanning dependencies of Wire
Scanning dependencies of arduino
src/Firmata.cpp
src/SBSFirmata.cpp
Servo/Servo.cpp
Linking libServo.a
ws2812/ws2812.cpp
Linking libws2812.a
Wire/utility/twi.c
Wire/Wire.cpp
Linking libWire.a
neopixel/Adafruit_NeoPixel.cpp
Linking libneopixel.a
arduino/wiring_pulse.c
arduino/wiring_analog.c
arduino/WInterrupts.c
arduino/wiring_shift.c
arduino/avr-libc/malloc.c
arduino/avr-libc/realloc.c
arduino/wiring_digital.c
arduino/wiring.c
arduino/WString.cpp
arduino/new.cpp
arduino/Print.cpp
arduino/main.cpp
arduino/Stream.cpp
arduino/CDC.cpp
arduino/HID.cpp
arduino/USBCore.cpp
arduino/WMath.cpp
arduino/Tone.cpp
arduino/HardwareSerial.cpp
arduino/IPAddress.cpp
Linking libarduino.a
Linking firmware.elf
Converting to firmware.hex
```

Assuming no errors go ahead and upload using one of the options below.

If just a standard Arduino then:

    ino upload -m uno

If you're using a PiLeven then:

    ino upload -m uno -p /dev/ttyS99

You will get something similar to the following output:

```
Searching for stty ... /bin/stty
Searching for avrdude ... /home/pi/arduino-1.0.5/hardware/tools/avrdude
Searching for avrdude.conf ... /home/pi/arduino-1.0.5/hardware/tools/avrdude.conf
Guessing serial port ... /dev/ttyACM0

avrdude: AVR device initialized and ready to accept instructions

Reading | ################################################## | 100% 0.00s

avrdude: Device signature = 0x1e950f
avrdude: reading input file ".build/uno-620a679d/firmware.hex"
avrdude: writing flash (17628 bytes):

Writing | ################################################## | 100% 3.16s

avrdude: 17628 bytes of flash written
avrdude: verifying flash memory against .build/uno-620a679d/firmware.hex:
avrdude: load data flash data from input file .build/uno-620a679d/firmware.hex:
avrdude: input file .build/uno-620a679d/firmware.hex contains 17628 bytes
avrdude: reading on-chip flash data:

Reading | ################################################## | 100% 2.47s

avrdude: verifying ...
avrdude: 17628 bytes of flash verified

avrdude: safemode: Fuses OK

avrdude done.  Thank you.
```

If there's no errors then you now have the relevant firmata on your arduino for the
SimpleBot Shield.

## Using the examples

AS part of the repos, three examples are provided that are designed to work 
specifically to the shield. These are located in the same folder as this
README and are described below

All examples should be called from the root of the repo after having executed:

```
npm install
```

In order to install the node dependencies.

### simplebot.js 

This is a simple driving example taking input from the keyboard to drive your
SimpleBot around. The arrow keys drive it forward, backwards and turn it
left and right. Space will stop it.

To run, use the command below, substituting /dev/ttyS99 for the port of your
arduino for your environment.

```
nodejs examples/SimpleBotShield/simplebot.js /dev/ttyS99
```

### ping.js

This example shows how the ping sensor works and reports back the range in
cm and inches to an obstacle. 

To run, use the command below, substituting /dev/ttyACM0 for the port of your
arduino for your environment.

```
nodejs examples/SimpleBotShield/ping.js /dev/ttyACM0
```

Output will look like this (use Ctrl+C to quit):

```
1420024159594 Connected /dev/ttyACM0 
1420024159599 Repl Initialized 
>> Object is 15.259 cm away
Object is 5.98 inches away
Object is 33.431 cm away
Object is 13.1 inches away
```

### np.js

This example shows how the neopixels can be lit and will move a single pixel
clockwise around the board moving through different colours.

To run, use the command below, substituting /dev/ttyACM0 for the port of your
arduino in your environment.

```
nodejs examples/SimpleBotShield/np.js /dev/ttyACM0
```

If you review the code you can see a single pixel is being updated and cycling
through various color names. Pixel can take a few options as illustrated below:

```
// strip.color() applies to the whole set of LEDs
// strip.show() is required once you have made your color manipulations in order
// to latch the LED strip and make them work.

strip.color("#ff0000"); // set whole strip red

// You can use HTML CSS color names and RGB values will be created
strip.color("teal"); // sets strip to a blue-green color.

// You can also use RGB values if you desire as shown below
strip.color("rgb(0, 255, 0)"); // sets strip to green.

// individual pixels can be addressed as well.
var p = strip.pixel(1); // get second LED

// and colors work just the same way on individual pixels too.
p.color("#0000FF"); // set second pixel blue.

// calling color() by itself will return an object with the current color
p.color(); // returns {r:0, g:0, b:255, hexcode:"#0000ff", color:"blue"}
```

## Going further

There are plenty of things you can do with a simplebot shield for example:

* Use the pixels to give you blinkers when you turn
* Back up when you get too close to an obstacle.
* direct the LEDs and use it to signal another SimpleBot
* Make a bot that dances and lights up when you get a tweet.
