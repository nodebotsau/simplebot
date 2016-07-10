# Physical layout and design considerations for an obstacle avoiding robot

This document explains some of the design considerations you might want to
think about when building your robot.

## Electronics

The core electronics are as discussed for the basic SimpleBot build. You should
have a robot you can control with a keyboard to drive around.

### Additional components

* 1x Ultrasonic range finder

The diagram below shows the electronics schematic for a basic set up.

// PUT IN DIAGRAM

Note that the echo and trigger pins on the sensor are wired to the same pin
as the arduino can use both.

## Physical modifications

As you see the range finder looks like a pair of eyes and it does "see" like
a bat. As such you want to mount these on the front of your robot so they are
unobstructed. Cable ties work very well for this.

## Examples

In the `examples/simplebot-avoidance.js` file you can see a basic example that
will allow you to drive around until you get within 10cm of an obstacle and
then the SimpleBot will stop.
