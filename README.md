# SimpleBot

![SimpleBot](docs/img/simplebot_basic.jpg)

## Overview

This is one of the most simple robots you can make. Features are:

* quick to put together (about an hour)
* very hackable (it can be built with cardboard, corflute or laser cut acrylic 
or wood so very easily modifiable)
* can move pretty fast (at full tilt it will go about half a metre a second - 
faster if you have more juice for the servos!)
* very extendable (much of the magic happens in code and sensors can be easily added)
* Cheap (costs less than AUD$100 which is very cheap for your first robot)

This bot is an adaptation of the excellent [SumoBot Jr](https://github.com/makenai/sumobot-jr/) 
made by [Paweł Szymczykowski](http://twitter.com/makenai) but doesn't require 
laser cutting wood or plastic to make. However you can laser cut it if you want 
something a bit more long lasting.

## Capabilities

This is a tethered robot, meaning it stays connected to your computer via a USB 
cable. This means you can get your computer to do all the hard work to provide 
interface control (say a web page or an app) or processing (computer vision 
if you attached a webcam for example!).

This is the very first prototype, put together in about 30 minutes one evening.

![SimpleBot](docs/img/simplebot-proto.jpg)

As this is such a simple robot, once you've got it working you can then extend
it to make it much more capable including becoming wireless. This one has been 
extended with a wifi module to untether it from your computer..

![SimpleBot MkII](docs/img/simplebot-wifi.jpg)

Once you understand how things work you can reuse all of the components to 
make a bigger, badder, faster robot and switch the cardboard for more durable 
elements such as laser cut wood or plastic if you desire. 
We've even [supplied the SVG and DXF files to do exactly that](/physical).

Add a raspberry pi and you get a SimplePiBot which can be made fully autonomous.

![SimplePiBot](docs/img/simplepibots.jpg)

## Materials needed

The following are the various components you need to get hold of to make your SimpleBot:

|  # | Component                  | Notes                                                                                   |
|:--:|----------------------------|-----------------------------------------------------------------------------------------|
|  1 | Arduino                    | We use Nanos because they are small and inexpensive (and light) but any arduino will do |
| 10 | M-M Jumper wires           | The more the better but 10 will be enough to build with                                 |
|  2 | Continuous rotation Servos | Make sure the servo can turn 360˙                                                       |
|  1 | 4xAA square battery pack   | Square ones are better as they are more compact                                         |
| 4  | AA Batteries               | Go rechargeable and help the environment                                                |
| 1  | Mini breadboard            | Smaller is better                                                                       |
| 10 | Cable ties                 | 3-4mm wide and about 100-200mm long is a good size to work with. The more the better    |
| 1  | Ultrasonic range finder    | We use the HC-SR04 because it's cheap and easily obtained but any should work           |

Other things you might want to add to your bot:

* Laser pointer to make an annoying cat toy.
* Stickers to bling out your bot.
* Spikes to take out others; Ben Hur or Mad Max style.
* USB WebCam if you want to give your bot some vision.
* USB cable extender if you want some range.
* Bluetooth or wireless modules to remove the usb.

# SETUP

To setup your SimpleBot we're assuming you have [Arduino](http://arduino.cc) and 
[NodeJS](http://nodejs.org) installed already. Go check out the [johnny five
intro](http://johnny-five.io/platform-support/) for a good getting started guide.

## Install drivers

If you're using an arduino provided to you at a NodeBots event, you will probably
need to install a driver to make it work. They are in the [drivers folder](/drivers)
in the repo and there's a [windows version](/drivers/CH341SER.EXE) and a 
[mac version](/drivers/ch341ser_mac.zip). Just download and follow the installation
prompts.

## Flashing the arduino

Load up the `firmware/build/simplebot_firmata` [sketch](/firmware/build/simplebot_firmata/).

Compile and upload it to your arduino.

## Build the SimpleBot

Each SimpleBot is a little different because it's yours but the general principles
are the same. You have two servos, each of which drive a wheel - this is called
[differential drive](https://en.wikipedia.org/wiki/Differential_wheeled_robot) -
and the combination of these working together will drive the robot forward, backwards
and turn on the spot each way.

Use cable-ties (zip ties) to join everything to the chassis.

If you want to see a video explaining this in more detail there's a version
on [you tube](https://www.youtube.com/watch?v=KoACCjtkHIg).

### Wiring up the SimpleBot

The wiring diagrams are provided here:

Schematic:

![SimpleBot schematic](examples/wiring/basic_wiring_schematic.png)

Breadboard:

![SimpleBot Breadboard diagram](examples/wiring/basic_wiring_bb.png)

# Examples

## A simple drive example

In the `examples` folder you can see an example called `simplebot.js`. This is
a very simple control example which uses the arrow and space keys on the keyboard
to drive the SimpleBot around. 

Simply run:

```shell
node examples/simplebot.js SERIAL_DEVICE
```

Where `SERIAL_DEVICE` is the path to the serial port (eg `/dev/tty/USB0`).

You should now be able to drive your robot around happily. Go get a few friends
to build one too and you can have Sumo Battles.

![A simplebot battle royale at NodeBots Day](docs/img/simplebot_battle.jpg)

### Tuning your servos

If your servos don't entirely stop then tune the stop value in the code by
setting a LSTOP and RSTOP value that is a little either side of 90 (this is 
because CR servos are a hack and may need some tuning).

## Driving over Bluetooth

You can use bluetooth to drive the simplebot. 

Get a bluetooth module and configure it. This is a mandatory step before you can
do it properly..

There are two options:

### Option 1 - use arduino sketch

Per [this wiki entry in J5](https://github.com/rwaldron/johnny-five/wiki/JY-MCU-Bluetooth-Serial-Port-Module-Notes) 

### Option 2 - use a serial terminal.

Simply connect using a serial terminal. The default will be no line endings,
and probably 9600 BAUD. You can use minicom, screen or the arduino serial monitor
for this easily.

You should be able to type (without hitting enter or anything)

```
AT
```

And get an `Ok` response. If you do, carry on, if not, systematically go through
each baud level until you get the right one.

Now execute the following commands:

```
AT+PINxxxx
```

Where `xxxx` is a 4 digit number - hint try not to use 0000 or 1234 or you might
find people driving your robot in a battle.

```
AT+NAMEyyyyyyy
```

Where `yyyyyyy` is an up to 20 character string (no spaces) for a name. Hint - try
something you'll know not just "Robot".

```
AT+BAUD7
```

This will update the baudrate to 57600 which means you don't need to change
your arduino sketch.

### Wiring for BT.

Connect the BT Module TX pin to the Arduino RX pin and the BT Module RX pin to 
the Arduino TX pin and you should be ready to go. Note that if you need to
flash the arduino or anything you need to unplug the BT module.

### Connecting

Once you've got your bluetooth set up, pair it with your computer so it appears 
as a serial device.

Simply go:

    node examples/simplebot.js /dev/tty.SERIALPORT

Changing the device path to whatever yours is. You should now be able to drive 
using wireless over bluetooth just the same as using a USB cable.

## Driving using wifi

You can use a simple serial wifi module to make your SimpleBot work over 
wireless (increased range, no BT headaches). Check 
out [this gist for more details](https://gist.github.com/ajfisher/5fe60fe7d8c49b3223f0).

## Game controller

If you happen to have a playstation controller then you can use the 
sb-controller.js example to drive your simplebot using a console controller 
which is pretty cool.

# LICENSE NOTES

This SimpleBot repo is licensed using the MIT license for all components.

Firmata implementations are modifications of 
[https://github.com/firmata/arduino/](Firmata for Arduino) by 
[https://github.com/soundanalogous](Jeff Hoefs @soundanalagous) and others and 
is used according to the GPL.

Firmata modifications include merged components of 
the [https://github.com/jgautier/arduino-1/tree/pulseIn](pulseIn code) as 
created by [https://github.com/jgautier](Julian Gautier @jgautier).

