# Items for NodeBots Bangalore workshop.

## Serial Driver Board

The USB - Serial board you have needs a custom driver. Download this 
from this site:

https://www.silabs.com/products/mcu/Pages/USBtoUARTBridgeVCPDrivers.aspx

If you're on mac install and then do this to install the driver:

```
sudo kextutil /Library/Extensions/SiLabsUSBDriver.kext
```

Make sure it's loaded

```
kextstat | grep SI
```

It should now be a device you can work with.

## Configure Bluetooth

Look at the main README file first then do this:

Use the serial board and wire:

```
BT      Serial
VCC --> VCC
GND --> GND
TX  --> RX
RX  --> TX
Wake -> VCC
```

If you have wired correctly the red light should blink SLOWLY not fast. You'll 
see the difference.

Now connect using Arduino serial monitor and use BAUD 38400 and with
Both NL & CR selected

At this point you can configure like normal

Have a look at this:

https://alselectro.wordpress.com/2014/10/18/bluetooth-module-hc-05how-to-pair-2-modulesat-command-walkthrough/



