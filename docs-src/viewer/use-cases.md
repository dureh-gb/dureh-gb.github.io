# Use cases

Pumasi Viewer does one thing: show and control a Pumasi node from a Windows PC. These are the ways it is used.

## Work on a Mac from your Windows desk

Keep your Mac in another room, or under the desk, and use it from the PC you sit at. The viewer runs full screen (++ctrl+alt+shift+f++), decodes the stream on the graphics card and sends keys and mouse directly. The Windows key acts as Command on the Mac, and Alt+Tab reaches the Mac instead of Windows.

Choose **Window: Fit** with **Integer (sharp pixels)** on, which is the default. When the window and the Mac's display line up by a whole factor, the picture is drawn pixel for pixel.

## A sharp picture on a high-resolution monitor

If your monitor has more pixels than the node's display, the default **Capture: Match window** asks the node for a stream that fits your window by a whole factor. A 4K window over a 2560×1600 display, for example, receives a 1612×1008 stream and draws it at 2×. Text stays crisp and the stream stays small.

For the node's native pixels, choose **Capture: Native pixels**. For the node's "looks like" size, choose **Capture: Points**.

## Several displays on the node

A node with two or three displays can be shown in three ways, all from the screen bar:

- **Single**: one display at a time. Pick it on the display map, press a number key ++1++ to ++9++ in the bar, or use ‹ ›.
- **Span**: every display that is on, laid out as they are arranged on the node. The pointer controls the display under it.
- **Cycle**: one display at a time, moving on every 5 to 60 seconds. Cycle runs only with *View only* on.

Displays you never want to see can be turned off in the ⚙ menu.

## Spread the node over your own monitors

With **Spread to my monitors…** in the ⚙ menu, each display of the node gets its own borderless window on one of your monitors, left to right, up to four pairs. The viewer shows the pairing first and asks you to confirm. Each window has its own bar with *View only*, *Close this window* and *Bring back*. ++ctrl+alt+shift+b++ closes them all and returns to one window.

## Watch without touching

Turn on **View only** (bar button or ++ctrl+alt+shift+v++). No key or click reaches the node. Everything held down is released when you switch it on. Use it to watch a build, a render or a long task on the node, or together with **Cycle** to keep an eye on several displays.

## Black out the Mac while you work on it

With Pumasi 0.8 or later on a Mac, the **Curtain** button in the bar turns the Mac's own screen black while you keep seeing it in the viewer. The bar says *Curtain: the Mac's screen is black (on)* while it is active.

## Unlock a locked Mac from the viewer

If the person at the Mac has turned on *Allow lock screen control* in Pumasi (it is off by default and can only be changed at the Mac), you can type the lock-screen password through the viewer. The viewer shows a badge *Lock screen control on at <node>* while this is allowed, with the end time if one is set. On newer Pumasi versions the Mac may require the curtain first; the viewer then shows *turn on the curtain to unlock it from here* with a **Turn on curtain** button.

The keystrokes are ordinary input lines. The viewer never logs, stores or reuses them. See [Pumasi › Security and privacy](../pumasi/security.md).

## A launcher for all your remote desktops

[Masil for Windows](../masil/index.md) ships its own copy of Pumasi Viewer and uses it for Pumasi nodes next to Remote Desktop, Moonlight and VNC hosts. The two copies share the same saved nodes, so a node added in one is visible in the other.

## Scripts and other tools

Everything the home window does is also a command of `pumasi-viewer.exe`, with JSON output. See [Reference › Command line](reference.md#command-line).
