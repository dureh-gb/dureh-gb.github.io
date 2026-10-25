# Use cases

## A quick command on the home computer

You are out and want to start a download, check a log or restart a service. Open **Nodes**, tap **Terminal** on the
computer's card, type the command. The phone logs in with its own key; there is no password to type.

The special-key row keeps Esc, Tab, Ctrl and the arrows one tap away, so `top`, editors and shell history work the
way they do at the desk. Hold the assistant button while typing `c` to send Ctrl+C.

## Looking at the desktop from the sofa

A Linux or Mac computer runs Pumasi. Tap **Screen** on its card and the desktop appears on the phone. Pinch to zoom
into a corner of the screen, pan with two fingers, tap what you need. For fine work switch the input mode to
**Virtual mouse** and move the pointer like a touchpad.

A Mac that is locked shows a lock badge in the Screen tab. Pumasi can draw a curtain over the Mac's own display while
you work from the phone; tap **Turn on curtain** in the note, or **Curtain** in the assistant menu.

## A phone as a thin client on a big screen

On Samsung DeX, or a phone connected to a monitor with a Bluetooth keyboard and mouse, Masil switches to its
large-screen layout: a side rail, a tab strip grouped by node and **Split view** with two sessions side by side.
A mouse passes straight through to the remote desktop, and the hardware keyboard reaches it after one tap on the
picture. **Full screen** hides everything but the session.

## Several computers, several sessions

Each terminal, screen or files session is its own tab. Open a terminal on two computers and a screen on a third;
switching tabs or screens never disconnects anything. On a phone, swipe up with three fingers to see every open
session.

## Getting a file off or onto a computer

Open **Files** on the node, go to the folder, tap the file and pick where to save it on the phone. **Upload** sends
a file from the phone into the folder you are looking at. Masil checks each transfer (size and SHA-256) and replaces
an existing file on the computer only after you confirm it.

## One launcher for every remote desktop on a Windows PC

On a Windows 11 PC, Masil for Windows shows your Remote Desktop profiles, Moonlight hosts, Pumasi nodes and VNC
computers as cards with a live "Online" state and small previews. Group them, drag them into order, and connect with
one click. A profile can list several addresses (home network, VPN, public); Masil connects to the one that answers.

## Reaching a computer whose VNC port is closed

With a VNC card's **Through SSH** option, Masil for Windows opens an SSH tunnel with your own keys and points
RealVNC Viewer at a local port. The computer's VNC port never has to be reachable from the network. This is how a
Mac's Screen Sharing (`localhost:5900`) is reached.
