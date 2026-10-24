# Reference

This page lists every screen, control and setting of Masil for Android, with a short section on Masil for Windows at
the end. Labels are given as they appear in the app.

## Screens

The app has three screens. On a phone they sit in a bar at the bottom; on a large screen (about 840 px and wider, or
600 px with a mouse, as on DeX) the bar becomes a side rail, node cards form a grid, and buttons show hover states.

| Screen | What it holds |
|---|---|
| **Nodes** | Your computers, as cards. Add, edit and remove nodes; open sessions. |
| **Sessions** | Every open terminal, screen and files session, as tabs. The badge shows how many are open. |
| **Settings** | Keyboard, terminal, special keys, combos, this device's key, about and licenses. |

### Android Back

Back closes whatever is on top: a dialog, the on-screen keyboard, the wizard's previous step, the session switcher,
the assistant menu, the viewer panel, terminal text selection, full screen, a Files folder (up to the start folder).
On Sessions it then returns to Nodes. On the bare Nodes screen it sends the app to the background. Back never quits
the app and never closes a session.

## Nodes

<!-- screenshot: Nodes screen with two node cards -->

Each card shows the node's name, `account@host` (with `:port` when the port is not 22), a row of state icons and a
row of actions.

### State icons

Long-press an icon to read its name.

| Icon group | States |
|---|---|
| Host key | *Host key pinned* (with the key type) · *Host key not confirmed yet* |
| Key login | *Key login ready* · *Needs this device's key* · *Key login not checked yet* |
| Pumasi | *Pumasi pinned* · *Pumasi not pinned yet* |
| Connection (only with open tabs) | *Connected* · *Connecting* · *Connection failed* · *Not connected* |

### Actions

| Button | What it does |
|---|---|
| **Terminal** | Opens a new terminal tab on this node. With terminal tabs already open, shows a picker: the open tabs, then *New*. |
| **Screen** | Opens, or returns to, this node's screen tab. One screen tab per node. |
| **Files** | Opens a new files tab. With files tabs open, shows the picker. |
| **Edit** | Opens the node form (below). |
| **Finish setup** | Shown instead of Edit while the node still *Needs this device's key*; resumes the Add node wizard. |
| (i) | Details: host key fingerprint, key login state, Pumasi path and hash, open sessions. |

With a mouse (DeX), a right click on a card opens a menu with the same actions and the details.

### Add node

**Add node** starts the wizard. Its steps, with the primary button of each:

| Step | What happens | Button |
|---|---|---|
| Host and account | Name (1–64 characters), Address, Port (1–65535, default 22), Account. | **Next** |
| Check the computer's identity | Reads the host key without logging in and shows its fingerprint and type. On Android 17 this step may first ask for local network permission (**Continue**, or **Open Settings** after a permanent denial). | **Trust and continue** / **Try again** |
| Allow this device | *This device's key is already installed* or *Log in once with the account's password*. Shows this device's key with **Copy public key** and **Copy install command** under *Advanced*. | **Next** |
| Review the change | Password path only. Host, file (`~/.ssh/authorized_keys`), the change (one line appended), when it is refused, and the exact line. | **Confirm** |
| Log in once with the password | Password path only. Opens Android's secure password field (or the host's own keyboard-interactive questions). Three tries, 120 s. | **Log in once** |
| Check the login | A login with the device key and the pinned host key. | **Finish** / **Try again** |
| Done | | **Done** / **Open terminal** |

**Back** goes to the previous step; **Cancel** or **×** leaves. Leaving with typed data before the host key was
trusted asks *Discard?*. After the host key was trusted the node is kept as *Needs this device's key*.

### Edit form

| Control | What it does |
|---|---|
| Name, Address, Port, Account, **Save**, **Cancel** | Changing the address or port forgets the host key pin and the Pumasi pin. |
| **Forget host key** | Forgets the pinned host key (and the Pumasi pin). The next connection shows the key again. |
| **Forget Pumasi build** | Forgets the pinned Pumasi build. The next screen connection shows the build found on the host. |
| **Remove this phone's key…** | Removes this device's line from the account's `authorized_keys` after a review. Masil warns when that would leave no other key and the host has no password login. Afterwards it checks that the key no longer logs in. |
| **Remove host** | Removes the node from the list. It offers *Also remove this phone's key* (off by default). Nothing on the host changes unless that is ticked. |

## Sessions

<!-- screenshot: Sessions screen on a phone with the header and tab count -->

Every terminal, screen and files session is a tab with its own connection. Up to 8 tabs of each kind can be open.
Switching tabs or screens never ends a session; only a tab's **×** does, and it asks first when that would end a
connected shell, a live stream or a running transfer.

| Layout | Controls |
|---|---|
| Phone | Header with the tab's name and status, **Full screen**, **Close this session** and **Show all sessions** (also: swipe up with three fingers). |
| Large screen / DeX | A tab strip grouped by node (one colour per node). A tab's context menu offers **Split right**; **Split view** shows two tabs side by side with a draggable divider; **Show one tab** ends it. |

**Full screen** hides the bar, strip and header. Leave it with the corner button, with Back, or from the menu.

### Terminal tab

While not connected a card shows the status with **Connect** (or **Reconnect**), **Connection info** and
**Settings**. While connected the terminal has the whole area.

The key row at the bottom:

| Part | Keys |
|---|---|
| Special keys (default row) | Esc, Tab, Ctrl, ↑, ↓, ←, →, `\|`, `~`, `/`, `-` |
| Always present | **Select text**, **Copy**, **Paste**, and the **Keyboard** toggle (*Show keyboard* / *Hide keyboard*) |

Ctrl and Alt are sticky: they apply to the next key or typed character. Keys are sent as a real terminal sends
them, never as text. Select, then long-press the text to choose it, then Copy.

The **assistant button** floats over the terminal (it keeps off the cursor's line). Drag it to move it; hold it for
a radial menu; double-tap it for the same menu as a list. While it is held, every letter you type is sent with Ctrl.

| Menu item | What it does |
|---|---|
| Keyboard | Show or hide the on-screen keyboard |
| Paste, Ctrl+C, Esc, Tab | Send that key |
| Arrow keys | A four-way pad |
| Special keys | Show or hide this tab's key row |
| Combos | Your combos from Settings (only when you have some) |
| Select text, Copy | Selection |
| Full screen | |
| Font size | Larger text / Smaller text (saved like the Settings value) |
| Connection info | Status, node, account, address, host key with type, key login, size; **Disconnect** or **Reconnect** |
| Reconnect | Added while the terminal is not connected |

When the assistant button is off (Settings), a small handle at the top opens the same menu.

### Screen tab

The first connection shows the Pumasi build found on the host (path, SHA-256) and asks you to **Trust and pin** it.
On a Mac the build is the `Pumasi.app` bundle in `/Applications` or `~/Applications`.

The control panel is one compact row at the top. It is pinned while not streaming and collapses to a handle
(**Show controls**) once the picture is live; it hides again 5 seconds after use. By touch, a swipe down that starts
at the top edge of the picture opens it and a swipe up on the panel closes it; a plain tap at the top edge still
reaches the host (for example a Mac menu bar).

| Control | What it does |
|---|---|
| Displays | One button per display when the host has more than one |
| Input mode | Toggles **Touch screen** / **Virtual mouse** |
| Show keyboard | The on-screen keyboard; typed characters go to the host |
| Special keys | A row with Ctrl, Alt, Shift and Super (each applies to the next key) |
| Reset zoom | Back to 1× |
| Connection info | Pumasi version, build, SHA-256, display, stream and decode numbers; tap the status line for the stats |
| Menu | The assistant menu, for when the button is off |
| Full screen, Disconnect, Hide controls | |

Gestures:

| Gesture | Touch screen | Virtual mouse |
|---|---|---|
| Tap | Click where you tap | Click at the pointer |
| Drag | Left-button drag from the start point | Moves the pointer; tap-then-drag or long press holds the left button |
| Long press (500 ms) | Right click | Held left button |
| Two-finger tap | | Right click |
| Two-finger drag | Pan | Scroll wheel |
| Pinch | Zoom 1×–4× | Zoom 1×–4× |
| Two-finger double tap | Reset zoom | Reset zoom |

A third finger cancels the current gesture. Nothing is sent until a one-finger touch is clearly a tap, a drag or a
long press, so a pinch never clicks. The input mode is remembered.

A mouse (DeX) passes straight through: buttons, hover, wheel; Ctrl + wheel zooms the picture locally. A hardware
keyboard reaches the host after a tap on the picture, a panel tap, or right after connecting.

The assistant menu adds **Right-click mode (next tap)**, **Switch to Virtual mouse** / **Switch to Touch screen**,
and on a Mac with Pumasi 0.8 or newer **Curtain**. Holding the assistant and tapping twice is also a right click.

Mac lock screen: a lock badge and a note appear when the Mac is locked or its input is blocked, with **Dismiss**
and, when the stream can ask for it, **Turn on curtain**. While locked input is blocked Masil draws a local pointer.
A note also tells you when another account is using the Mac's screen; input from the phone is ignored until your
account is back at the screen. With Settings › Display › **Status text in Screen** off, these become small status
lights instead of text; tap a light for its line. A light for held-back input always stays.

### Files tab

| Control | What it does |
|---|---|
| **Up**, **Refresh** | Folder navigation |
| **Upload** | Pick a file on the phone and send it into the current folder |
| Tap a file | Download it to a place you pick on the phone |
| **Cancel** | Stops the running transfer; a cancelled download deletes the picked file on the phone |
| (i) | What the tab is connected to; **Reconnect** |

Limits: files up to 8 GiB, folders up to 128 entries and 8 levels deep; links, special files and credential files
(such as `.ssh`) are refused. Each transfer is checked by size and SHA-256. An existing file on the host is replaced
only after you confirm it, and only if it has not changed in the meantime. One transfer runs at a time across all
Files tabs, and the app must stay in the foreground until it ends.

## Settings

<!-- screenshot: Settings screen, top half -->

Settings are grouped in five cards (two columns on DeX and other wide windows).

| Card | Setting | Values |
|---|---|---|
| Connection | **This device's key**: **Generate key**, **Copy public key**, **Copy install command**, **Delete this phone's key…** | See below |
| Display | **Assistant button** | On (default) / off. When off, the menu opens from the handle at the top. |
| Display | **Status text in Screen** | On (default) / off. Off: lock, curtain and connection show as small status lights; tap one for its line. |
| Input | **Show on-screen keyboard automatically** | **On**, **Off**, **Off when a hardware keyboard is connected** (default). The Keyboard button opens it in every mode. |
| Terminal | **Font size** | 10–24 px, default 12 |
| Terminal | **Show special-key row** | On (default) / off. Keyboard, Select, Copy and Paste stay. |
| Terminal | **Keyboard text as one path (experimental)** | Off (default). Try it if a space after a word deletes or moves the word: the field keeps what the keyboard typed and only the change is sent. |
| Terminal | **Special keys** | The row: add from the catalog, reorder with ↑/↓, remove, **Reset to default** |
| Terminal | **Your combos** | **New combo**: Ctrl, Alt and/or Shift plus one key (a letter, digit, or a named key), with a label of up to 16 characters. Up to 32 combos. A new combo goes to the end of the row. |
| About | Version, **Open-source licenses** | |

**Special keys catalog:** Esc, Tab, Ctrl (sticky), Alt (sticky), Arrow Left/Up/Right/Down, Home, End, Page Up,
Page Down, F1–F12, `|`, `~`, `/`, `-`, Ctrl+C, Ctrl+D, Ctrl+Z, Ctrl+L. The row holds up to 64 keys.

**Shift in a combo** works with letters, Tab, the arrows, Home, End, PgUp, PgDn and F-keys.

### This device's key

The phone's SSH key is an ed25519 key made on the device. Its secret part is wrapped by a hardware-backed Android
Keystore key and never leaves the phone; it cannot be exported. The public line and its fingerprint are shown here.

- **Copy public key** copies the `authorized_keys` line.
- **Copy install command** copies one shell line that appends that line to `~/.ssh/authorized_keys` once; run it
  in a shell of the account on the host.
- **Delete this phone's key…** first offers to remove the key from every node that trusts it (with the same review
  as a node's own *Remove this phone's key…*; you may skip a node), then deletes the key and marks every node as
  *Needs this device's key*. Pins are kept. The next Add node or Finish setup makes a new key.

A key is never replaced silently; **Generate key** appears only when the phone has none.

## Where data lives

Everything is in the app's private folder on the phone: `hosts.json` (nodes and pins; no secrets), `settings.json`,
and the wrapped device key. Debug builds of the app use a separate package with their own data and key.

## Masil for Windows

| Area | Facts |
|---|---|
| Cards | RDP profiles, Moonlight hosts (read from Moonlight's own settings, using its pairing), Pumasi nodes (from Pumasi Viewer's profiles), VNC. Cards or list, drag ordering, groups, type and group filters, sorting. |
| Previews | Small pictures of recognised RDP and Moonlight stream windows, refreshed every 8 s. Can be turned off for compact cards. Minimised windows are not captured. |
| Online | A configured TCP endpoint answered (checked every 20 s, Moonlight hosts every 10 s). It does not mean the login would succeed. **Refresh** or F5 checks now. |
| RDP profiles | Host and port (default 3389). **Other addresses**: one `address:port` per line for home, VPN or public endpoints. Connect reuses an address that was Online in the last 18 s, or checks again; the primary address wins when several answer. Passwords go to Windows Credential Manager under `TERMSRV/<address>`; the editor never shows them. |
| Pumasi nodes | **+ › Pumasi node…**: confirm the SSH host key, log in, confirm the Pumasi build's SHA-256. Login with a key file, a Host from `~/.ssh/config`, or the Windows OpenSSH agent. The viewer refuses a node whose key or build changed. |
| VNC | Opens RealVNC Viewer. **Through SSH** runs the Windows OpenSSH client with your own keys and `known_hosts` and forwards a free local port to the node's VNC port only while the viewer runs. The VNC password is typed into RealVNC Viewer, not stored by Masil. |
| Requirements | Windows 11. Moonlight must be installed and paired for Moonlight cards; RealVNC Viewer for VNC cards. |
| Data | Program: `%LOCALAPPDATA%\Programs\Masil`. Cards, groups, order, settings, previews: `%LOCALAPPDATA%\Masil`. Pumasi node profiles: `%APPDATA%\Pumasi Viewer\nodes`. Updates and uninstall keep the data. |
