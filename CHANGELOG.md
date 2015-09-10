# SimpleBot project changelog

## 0.5

* Removed some old cruft floating around
* Fixed dependencies to now build from node-pixel source rather than a lock copy
* Updated avoidance example to use Proximity class
* Fixed documentation to be up to date, link to build video and point to the 
current serial bridge implementation for WiFi.
* Fixed `simplebot.js` code to be in line with the circuit diagram
* Broke out controller to be more reusable and updated examples with it.

## 0.4

* Updated all packages to latest versions
* changed build packages to use new grunt build process to make them
* Updated firmata to use new proximity firmata in line with J5
* updated examples to use new `Proximity class`
* Updated pixel for SBS to use new `node-pixel` version.
* Added firmware for ESP8266 transparent bridge
* Added example for network simplebot 
* Added `network_simplebot_firmata`

## 0.3.2

* Removed some old cruft and old physical files no longer needed.
* Updated SimpleBot chassis with some mods to make simpler and no 3d printed part required.

## 0.3.1

* Added changelog, typos, fixed old NPM url.

## 0.3.0

* New variation added for Simple Pi Bot - RPi based SimpleBot, including new designed chassis.
* Significant repo restructure to accomodate SimpleBot Shield and ino build chain
* Brought in attribution and licenses for everything being used properly
* Migrated build tools to use ino for firmware rather than Arduino
* Updated firmata to latest stable version, 2.4 and ported @jgautier's pulseIn
modifications to it as well as wrapped previous work from RGBLED to use NeoPixels
* Merged example from @holodigm for collision avoidance (https://github.com/nodebotsau/simplebot/pull/12)
* Cleaned out any leostick cruft
* Updated libraries to latest stables.

### Contributor acknowledgments:

* [Alec Clews](https://github.com/alecthegeek) - Rasbian install scripts for RPi (https://github.com/alecthegeek/CCHS_Raspian_for_IoT)
* [Andy Gelme](https://github.com/geekscape) - Continued testing, design advice, 
* [Angus Gratton](https://github.com/projectgus) - SimpleBot Shield design and bumper design mods
* [Kym McInerney](https://github.com/holodigm) - collision avoidance example
* [Rick Waldron](https://github.com/rwaldron) - Pixel API suggestions and deep firmata architecture discussion

## 0.2.0

Can't remember before this time.
