# Reference

## Windows

Pumasi Viewer has three kinds of windows.

| Window | What it is |
| --- | --- |
| Home window | Opens when you start Pumasi Viewer without arguments. Lists the saved nodes with name, host, account and Pumasi version. Buttons: **Connect**, **Add node…**, **Permissions…**, **Remove…**. |
| Node window | One per connection, started by Connect. Shows one display, or every display in Span. Its title is *<node> — Pumasi Viewer · <width>×<height> · <fps> fps*, with *· view only* when control is off. |
| Spread window | One per paired monitor after *Spread to my monitors…*. Borderless, shows one display. Title: *<node> — Pumasi Viewer · display <n>*. |

The window follows the Windows taskbar theme (light or dark).

## Screen bar

The screen bar is hidden by default. A small handle sits at the top centre of a node window and grows when the pointer comes near. Click the handle, or press ++ctrl+alt+shift+g++, to open the bar. ++esc++ or a click outside closes it. Clicks and keys on the bar stay local; they never reach the node.

<!-- screenshot: the open screen bar over a node window: display map, Single Span Cycle, View only, Curtain, Settings, Full screen, Disconnect -->

Items, left to right (some appear only with several displays):

| Item | What it does |
| --- | --- |
| Display map | A small map of the node's displays in their arrangement. Click one to show it. Keys ++1++ to ++9++ in the bar do the same. |
| Single / Span / Cycle | The view mode. Only with several displays. |
| ‹ › | Previous and next display. Not in Span. |
| View only | Stops sending input. Everything held down is released. |
| Curtain | Blacks out the Mac's own screen. Only with Pumasi 0.8 or later and control on. |
| ⚙ Settings | The settings menu, see below. |
| Full screen | Borderless on the window's monitor. Remembered in the profile. |
| Disconnect | Ends the session and closes the window. |

A spread window's bar has View only, Curtain, Settings, **Close this window**, **Bring back** (close all spread windows) and Disconnect. While spread, the main window's bar has only Bring back and Disconnect.

## Settings menu (⚙)

Changes apply at once and are saved in the node's profile.

### Window

How large the picture is in the window.

| Item | Effect |
| --- | --- |
| Window: Fit | As large as fits, keeping the aspect ratio, up and down. Default. |
| Window: Fit, no upscale | Like Fit, but a smaller picture stays at its size, centred. |
| Window: Stretch | Fills the whole window; aspect ratio ignored. |
| Window: 1:1 | One stream pixel per screen pixel, centred; cropped when larger. |
| Integer (sharp pixels) | On by default. A Fit that is within a hair of a whole factor snaps to it. A factor of 2 or more is drawn nearest-neighbour, so pixels stay sharp. Off: smooth scaling. |
| Size window to the picture | Resizes the window to the stream's size. Also ++ctrl+alt+shift+r++. Main window only. |
| Keep the picture's ratio when resizing | The window keeps the picture's aspect ratio while you drag its edge. Main window only. |

### Capture

What resolution the node sends.

| Item | Effect |
| --- | --- |
| Capture: Match window | Default. The node sends a stream made for the window. With Fit and Integer on, that is the window divided by the smallest whole factor that keeps the stream within the display's native pixels. The node never upscales. The stream is refitted 0.6 s after a resize. |
| Capture: Points | The display's "looks like" size (what macOS calls points). |
| Capture: Native pixels | The display's native pixels. |

### Quality and frame rate

| Item | Effect |
| --- | --- |
| Quality: 8 / 20 / 40 Mbit/s | The H.264 bit rate. Default 20 Mbit/s. |
| 30 / 60 frames/s | The frame rate the node is asked for. Default 60. |

With several streams open (Span, Spread) each stream gets its share of the total.

### Pointer and picture

| Item | Effect |
| --- | --- |
| Show the node's pointer | On by default. Draws the node's pointer in the stream. |
| Refresh picture | Asks the node for a new key frame. |

### Displays (main window, several displays)

| Item | Effect |
| --- | --- |
| *n*: <display name> on | Tick to include a display; untick to never capture it. Off displays are left out of Span and Cycle. |
| Cycle every *n* s | The Cycle interval, from 5 to 60 seconds. Default 10. Cycle pauses while the bar is open or the pointer moved. |
| Spread to my monitors… | Pairs the node's displays, left to right, with your monitors, left to right, up to four pairs. Shows the pairing and asks before opening the windows. |

## Title-bar menu

Right-click the title bar (or press ++alt+space++) of a node window for the same items without the bar: Screen bar, the Window items, Integer, Size window to the picture, Keep the picture's ratio, View only, Full screen, Refresh picture, Bring back and Disconnect.

## Keyboard shortcuts

These shortcuts belong to the viewer and are never sent to the node.

| Shortcut | Action |
| --- | --- |
| ++ctrl+alt+shift+g++ | Open or close the screen bar |
| ++ctrl+alt+shift+v++ | View only on or off |
| ++ctrl+alt+shift+f++ | Full screen on or off |
| ++ctrl+alt+shift+b++ | Bring back: close every spread window |
| ++ctrl+alt+shift+r++ | Size window to the picture |
| ++esc++ | Close the open screen bar |
| ++1++ to ++9++ | With the bar open: show that display |

Every other key goes to the node while a viewer window is in front and control is on. That includes the Windows key (sent as Command to a Mac), Alt+Tab and the keys of an input method. Keys are sent by their physical position, so the node's own layout applies. Everything held down is released when the window loses focus, when View only is switched on and when the window closes.

Mouse buttons, movement and the wheel go to the node too. One wheel step scrolls 100 px.

## Lock screen and curtain notices

These appear at the bottom of a node window when a Mac node reports them:

| Text | Meaning |
| --- | --- |
| *Lock screen control on at <node> · until <time>* | The Mac allows typing on its lock screen through the viewer. The end time is shown in your local time. |
| *<node> is locked; lock screen control is off there* | The Mac is locked and the switch is off. Input is not sent. The switch can only be turned on at the Mac. |
| *<node> is locked; turn on the curtain to unlock it from here* | The Mac requires the curtain first. The note has a **Turn on curtain** button. |
| *Curtain armed: it turns on when <node> is unlocked* | The curtain was requested while the Mac is locked and turns on after unlock. |
| *Typing on the lock screen of <node> is limited; try again in <n> s* | The Mac is rate-limiting lock-screen input. Nothing is retried for you. |

Notes can be dismissed. A dismissed note comes back when its reason changes.

## Command line

`pumasi-viewer.exe` without arguments opens the home window. With a command it prints JSON on standard output and messages on standard error. Masil's Add dialog uses these commands.

| Command | What it does |
| --- | --- |
| `pumasi-viewer ssh-hosts` | Lists the host aliases of `~/.ssh/config` with host, port, account and key file. |
| `pumasi-viewer host-key <host> --account A [--port N]` | Reads the node's SSH host key without logging in. |
| `pumasi-viewer agent-keys` | Lists the public keys the Windows OpenSSH agent holds. |
| `pumasi-viewer add <name> --host H --account A [--port N] (--agent SHA256:… \| --key-file PATH) --host-key SHA256:…` | Logs in with the pinned host key, reads Pumasi and prints its hash, then exits with code 3. Nothing is saved yet. |
| `pumasi-viewer add <name> … --accept-helper <sha256hex>` | Saves the profile if Pumasi's hash is still the one given. |
| `pumasi-viewer add <name> --ssh-host ALIAS --host-key SHA256:… […]` | Takes host, port, account and key file from the `~/.ssh/config` alias. Explicit options win. |
| `pumasi-viewer list` | Lists the saved profiles, including unreadable ones with their error. |
| `pumasi-viewer remove <name>` | Deletes that profile file. |
| `pumasi-viewer connect <name\|profile.json>` | Opens the node window. `--source synthetic` shows Pumasi's three test displays instead of the real screen. |
| `pumasi-viewer permission <name\|profile.json> [--request screen\|control \| --recheck]` | Reads or requests the screen and control permissions on the node. |

Exit codes: 0 success, 1 error (the message is on standard error), 3 from `add` without `--accept-helper`.

## Files

| Path | Content |
| --- | --- |
| `%LOCALAPPDATA%\Programs\Pumasi Viewer\` | The program: `pumasi-viewer.exe`, `LICENSE.txt`, `THIRD-PARTY-NOTICES.md`, `Uninstall.exe`, `installed-files.txt`. |
| `%APPDATA%\Pumasi Viewer\nodes\<name>.json` | One profile per saved node. Kept when you uninstall. Shared with Masil for Windows. |
| Start menu › Pumasi Viewer | The shortcut. An optional desktop shortcut is created by the installer. |

No log files are written.

### Profile file

A profile is a small JSON file. It holds no password and no private key.

```json
{
  "name": "studio-mac",
  "host": "studio-mac.local",
  "port": 22,
  "account": "me",
  "hostKey": "SHA256:…",
  "helperSha256": "…64 hex characters…",
  "helperVersion": "0.9",
  "key": { "agent": "SHA256:…" },
  "view": {
    "scale": "fit",
    "integer": true,
    "capture": "window",
    "fps": 60,
    "kbps": 20000,
    "display": null,
    "cursor": true,
    "viewOnly": false,
    "fullScreen": false,
    "mode": "single",
    "off": [],
    "cycleSeconds": 10,
    "keepRatio": false
  }
}
```

| Field | Values |
| --- | --- |
| `hostKey` | The node's SSH host key fingerprint, `SHA256:` and 43 characters. |
| `helperSha256` | SHA-256 of the installed Pumasi build, 64 lowercase hex characters. |
| `key` | `{"agent": "SHA256:…"}` for a key in the Windows OpenSSH agent, or `{"file": "C:\\…\\id_rsa"}` for a key file (absolute path). |
| `view.scale` | `fit`, `fit-down`, `stretch`, `1:1`. An old value `integer` is read as `fit` with `integer` on. |
| `view.capture` | `window`, `points`, `pixels`. |
| `view.fps` | 1 to 60. |
| `view.kbps` | 500 to 100000. |
| `view.display` | A Pumasi display id, or `null` for the main display. |
| `view.mode` | `single`, `span`, `cycle`. |
| `view.off` | Display ids never captured, up to 8. |
| `view.cycleSeconds` | 5 to 60. |

A profile the viewer cannot read is listed as *(unreadable profile)* in the home window, with the reason.
