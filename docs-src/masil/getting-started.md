# Getting started

This page takes you from the APK to a working terminal and screen on your phone. Masil for Windows has its own
short section at the end.

## What you need

- An Android phone (Android 7.0 or newer).
- A computer with an SSH server turned on (Remote Login on a Mac, OpenSSH Server on Linux or Windows).
- The account name on that computer, and its password for the one-time key setup. If you prefer, you can install
  the phone's key yourself instead of typing a password (see *Advanced* below).
- For the **Screen** tab: [Pumasi](../pumasi/index.md) installed on that computer (Linux or Mac).

The phone must be able to reach the computer: the same Wi-Fi network, or a VPN such as Tailscale.

## 1. Install the APK

1. Download the Masil APK from the download page.
2. Open the file on the phone. Android asks you to allow installs from this source the first time.
3. Install. The app appears as **Masil (beta)**.

A newer beta installs over the older one. Your nodes, pins, settings and device key are kept.

The app has no account and no sign-in. On first start the **Nodes** screen is empty.

<!-- screenshot: empty Nodes screen with the "Add node" button -->

## 2. Add the first node

A *node* is one computer and one account on it. Tap **Add node**. The wizard has five short steps (seven when a
password is used):

### Host and account

Enter a **Name** (for example "Desk PC"), the **Address** (a host name or IP address), the **Port** (22 unless your
SSH server uses another) and the **Account** on the computer. Tap **Next**.

On Android 17 the wizard may first explain that Masil needs permission to reach computers on your local network.
Tap **Continue** and allow it in the Android dialog.

### Check the computer's identity

Masil connects without logging in and shows the computer's **host key** fingerprint. This is the computer's own key,
not yours. Compare it with what the computer reports (for example `ssh-keygen -lf /etc/ssh/ssh_host_ed25519_key.pub`
on Linux), then tap **Trust and continue**. The key is pinned: every later connection must show the same key.

### Allow this device

Masil needs its device key on the computer. Choose one:

- **This device's key is already installed**: the account's `~/.ssh/authorized_keys` already has it.
- **Log in once with the account's password**: Masil adds the key for you.

If the phone has no device key yet, Masil creates one here. It stays on the phone.

**Advanced: add the key yourself.** Open the *Advanced* section, tap **Copy install command**, paste that one line
into a shell of the account on the computer, then choose "already installed".

### Review the change and log in once (password path only)

The **Review the change** step shows exactly what will happen: one line appended to `~/.ssh/authorized_keys`,
nothing removed. Tap **Confirm**.

On the next step tap **Log in once**. Android's secure password field opens. Masil uses the password for that single
login, appends the reviewed line, closes that login and then logs in again with the device key. The password is
not saved and not sent anywhere else.

### Check the login

Masil logs in with the device key and the pinned host key. When it passes, tap **Finish**, then **Done** or
**Open terminal**.

<!-- screenshot: node card with the host-key, key-login and Pumasi icons -->

If you leave the wizard after the host key was trusted but before the login passed, the node stays in the list
with a **Finish setup** button that resumes where you left off.

## 3. First terminal

On the node card tap the **Terminal** icon. A tab opens on the **Sessions** screen and connects.

- The row above the keyboard holds special keys: Esc, Tab, Ctrl, the arrows, `|`, `~`, `/`, `-`. **Ctrl** applies
  to the next key you type.
- The **Keyboard** button at the right shows or hides the on-screen keyboard.
- **Select**, **Copy** and **Paste** are always on the row.
- The round *assistant* button floats over the terminal. Hold it for a radial menu, or double-tap it for the same
  menu as a list. Hold it while typing a letter to send it with Ctrl.

Android **Back** leaves the terminal on the screen; it never closes a session. Close a tab with its **×**.

<!-- screenshot: terminal tab with the special-key row and the assistant button -->

## 4. First screen

On the node card tap the **Screen** icon. On the first connection Masil looks for Pumasi on the computer, shows the
path and SHA-256 of the build it found, and asks you to **Trust and pin** it. From then on a different build is
refused until you forget the pin.

When the picture is live the control panel collapses to a small handle at the top. Tap the handle, or swipe down
from the top edge of the picture, to show it: displays, input mode, keyboard, special keys, zoom reset, connection
info, full screen, disconnect. Swipe up on the panel to hide it again.

- **Touch screen** mode (default): tap to click where you tap, drag to drag, long-press for a right click.
- **Virtual mouse** mode: the screen is a touchpad; one finger moves a pointer, a tap clicks at the pointer.
- Pinch to zoom, two fingers to pan. A two-finger double tap resets the zoom.
- The assistant button gives the same menu as in the terminal, plus **Switch to Virtual mouse** / **Touch screen**,
  **Right-click mode (next tap)** and **Curtain** on a Mac.

<!-- screenshot: Screen tab with the top panel open -->

## 5. Files

On the node card tap the **Files** icon. The tab connects and lists the account's start folder. Use **Up** and tap
folders to move around, tap a file to download it to a place you choose on the phone, and **Upload** to send a file
from the phone into the current folder. One transfer runs at a time, and the app must stay in the foreground until
it ends.

## Masil for Windows

1. Download `Masil-Setup.exe` from the download page and run it. It installs for the current user only, adds a
   Start menu entry and an uninstall entry, and offers a desktop shortcut. The installer is not code-signed, so
   Windows may show a SmartScreen warning.
2. Start Masil. The **+** button adds a card: an RDP profile, a Pumasi node or a VNC computer. Moonlight hosts
   appear by themselves when Moonlight is installed and paired.
3. **+ › Pumasi node…** adds a Pumasi node in two confirmed steps: the SSH host key (read before any login) and,
   after logging in, the Pumasi build's SHA-256. Login uses a key file, a Host from `~/.ssh/config`, or the Windows
   OpenSSH agent. No password or private key is stored.

Program files go to `%LOCALAPPDATA%\Programs\Masil`; your cards, groups, order, settings and card previews go to
`%LOCALAPPDATA%\Masil`. RDP passwords are kept by Windows Credential Manager, never in the app's files. Updates and
uninstall keep this data.
