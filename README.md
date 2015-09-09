# SimpleBot.

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
need to install a driver to make it work. They are in the [/drivers](drivers folder)
in the repo and there's a [/drivers/CH341SER.EXE](windows version) and a 
[/drivers/ch341ser_mac.zip](mac version). Just download and follow the installation
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

## Driving over Bluetooth

You can use bluetooth to drive the simplebot. Get a bluetooth module and 
configure it per [this wiki entry in J5](https://github.com/rwaldron/johnny-five/wiki/JY-MCU-Bluetooth-Serial-Port-Module-Notes). 
This is a mandatory.

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

