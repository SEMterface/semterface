SEMterface
==========

This is the home for a web based interface for the Jeol JXA-6400 SEM in SRTC 169.  Currently in prototyping stages.

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
