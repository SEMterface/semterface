## The story so far

So far, we are controlling the SEM using a man in the middle attack using an arduino.  From here, we use sockets.io, node.js, and webRTC to remotely view and control the microscope.

At this point we probably need to put the signaling server onto a web server of its own and delegate the control server to talk out of the network via webRTC's NAT busting magic, that or negotiate with OIT to get some ports forwarded.

### Quick links
- [Python](http://www.python.org/)
- [PyQt4](http://www.riverbankcomputing.co.uk/software/pyqt/download)
- [arduino](http://arduino.cc/en/main/software)
- [Arduino FTDI Drives for Older than Uno Arduino's](http://www.ftdichip.com/Drivers/VCP.htm)
- [Node](http://nodejs.org/)
    - [.NET Framework 2.0 SDK](http://www.microsoft.com/en-us/download/details.aspx?id=19988)
    - [Git](http://git-scm.com/)

## Prototypes
[Arduino_Node](http://brandontilley.com/2012/03/02/controlling-an-arduino-from-nodejs.html) Sending commands to the Arduino over the internet using a node.js server

## Deploy Procedure Notes

- Installed Chrome and Firefox
- Installed Git (Added to path via installer option)
- Installed Node.js 0.10.19 (adds node to path via installer option)
- Installed Arduino Software (v 1.0.5 windows installer, installs the driver neede for the uno.)
- Cloned this repo, and `npm install`ed inside of it.  Hang up on nodegyp, as we likely need .net and stuff installed per the serial module requirements.
- Installing visual studio express 2012 (This takes super duper long)
- Registered this copy to my MS account.  Emailed a copy of the activation key to Erik.
- Installing python 2.7.5, listed on the serial module readme.
- Appended `;C:\Python27\` to my *System* path.  I used Right click computer -> Advanced System settings (in side bar) -> Advanced Tab -> Enviroment Variables -> Modified `Path` in the System Variables List


## Notes
- http://anthonyterrien.com/knob/ knobs
