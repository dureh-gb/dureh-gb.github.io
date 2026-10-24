# Troubleshooting

Most problems show as a short message in the viewer. Find the message below.

## Installing

**"Close Pumasi Viewer (its window and every node window), then try again."**
The installer and the uninstaller refuse to run while the viewer is open. Close the home window and every node window.

**"The installer payload is damaged. Download a fresh copy."** or **"The installer is incomplete"**
The downloaded file does not match its built-in checksum. Download it again from the download page.

**"Pumasi Viewer Setup is already open."**
A second copy of the installer is running. Use the one already open.

## Adding a node

**"The Windows OpenSSH agent is not reachable."**
The `ssh-agent` service (*OpenSSH Authentication Agent*) is not running. Start it in Windows Services, then add your key with `ssh-add`. The viewer lists only keys the agent holds.

**"Choose the login key: a key in the Windows OpenSSH agent, or a key file."**
Pick a key before the login step. A key file must be an RSA private key without a passphrase. ed25519 keys and keys with a passphrase go through the agent.

**"Check the host key first."**
The steps run in order: host key, then login. Tick *This is the node's SSH host key* before *Log in and check Pumasi*.

**The host key fingerprint does not match my `known_hosts` line.**
The viewer negotiates the node's ECDSA host key. Compare with `ssh-keygen -lf /etc/ssh/ssh_host_ecdsa_key.pub` on the node, not with the ed25519 line.

**"Pumasi's hash changed"**
Pumasi on the node changed between *Log in and check Pumasi* and *Save*. Run the login step again, compare the new hash, and save.

**"A node named … is saved already. Replace its connection details (its view settings stay)?"**
A profile with that name exists. *Yes* replaces host, account, key and pins and keeps the view settings. *No* keeps the old profile.

**"Pumasi is not installed on this node"**
The account's home on the node holds no Pumasi. On a Mac, run the Pumasi installer. On Linux, install the `.deb` and run `pumasi enable`. See [Pumasi › Getting started](../pumasi/getting-started.md).

**"This node is neither a Mac nor a Linux desktop with Pumasi."**
The viewer supports macOS and Linux desktop nodes only.

**"Pumasi's files on this node are not private to the account; not using them."**
The permissions of Pumasi's files on the node allow other accounts to change them. Fix the file permissions on the node, or reinstall Pumasi there.

## Connecting

**"Could not reach the node (connection or SSH handshake failed)."**
The host, port or network is wrong, or SSH is not running on the node. Try `ssh account@host` from PowerShell first.

**"The node's SSH host key changed. pinned: … now: … Not connecting."**
The node presents a different host key than the one you confirmed. This happens after the node was reinstalled, or when another machine answers for that address. If you expected the change, remove the node and add it again. If not, do not connect until you know why.

**"Pumasi on the node is not the pinned build. pinned: … now: … Not connecting. If you updated Pumasi, add the node again."**
Pumasi on the node is a different build than the one you confirmed. After a Pumasi update, add the node again and confirm the new hash. On Linux the pin is the hash of the copy systemd runs; after a `.deb` upgrade the profile must be pinned again.

**"Login refused: the key was not accepted (or the agent does not hold it)."**
The node did not accept the key. Check that the public key is in the account's `authorized_keys` on the node, and that the agent still holds the key (`ssh-add -l`).

**"Pumasi is not running on the Mac (it runs while the account is signed in to its desktop). Sign in at the Mac, then Check again."**
Pumasi runs only inside a signed-in desktop session. Sign in at the node, then try again. The same applies to Linux nodes.

**"Pumasi is installed (the .deb) but not turned on for this account. At the node, as this account, run: pumasi enable"**
On Linux, Pumasi has to be enabled per account. Run `pumasi enable` as that account on the node, sign in to the desktop, then *Check again*. The viewer never starts services on the node.

**"H.264 decoder: …"** or **"Media Foundation"** in an error box
Your graphics driver has no hardware H.264 decoder with Direct3D 11 support, or the Windows Media Foundation components are missing. The viewer refuses a decoder without Direct3D 11 support. Update the graphics driver.

## Permissions

**The connection ends with "Pumasi on <node> is not allowed to capture the screen yet."**
Screen permission is missing on the node. Open the home window, select the node, click **Permissions…** and **Request screen permission**. On a Mac, allow Pumasi under *System Settings › Privacy & Security › Screen & System Audio Recording*, then **Check again**. On Linux, answer the Remote Desktop dialog on the node with *Share*.

**The window says "view only (control is not allowed on the node: Permissions… in Pumasi Viewer)".**
Control permission is missing. On a Mac: **Request control**, then allow Pumasi under *Privacy & Security › Accessibility*, then **Check again**. On Linux: the Remote Desktop dialog's *Allow Remote Interaction* was off. Request screen permission again and turn it on in the dialog.

**"Waiting for an answer on the node"**
The dialog or prompt is open on the node's screen. Someone at the node has to answer it.

**"Declined on the node"**
The person at the node said no. Ask again with **Request screen permission**; on Linux the dialog opens again.

**"No dialog was shown while a screen of this node is open. Close the viewer's window for this node, then request again."**
On Linux, the Remote Desktop dialog does not open while a stream is running. Disconnect first.

**"Pumasi did not report the screen permission; install the newer Pumasi package on the node"** or **"This Pumasi is too old to report control"**
Pumasi on the node is older than the viewer expects. Install the newer Pumasi package on the node (Mac: `.pkg`, Linux: `.deb`), then add the node again so the new build is pinned. See [Pumasi](../pumasi/index.md).

**Check again on a Mac takes a few seconds.**
That is normal. Pumasi restarts on the Mac so that it sees a newly granted permission, and the viewer waits for the new process.

## During a session

**"Reconnecting…"**
On a Mac node, a display change or a capture stall ended the stream. The viewer reopens it by itself, up to three times with short pauses. If the picture does not come back, a **Reconnect** button appears. Streams ended by a permission or by the person at the node are not reopened automatically.

**"<display> is no longer connected; showing the main display."**
The display you were watching was unplugged or turned off on the node. The viewer switches to the main display (Single, Cycle) or drops it from Span.

**"Pumasi ended the stream: ScreenBusy"**
The node's screen is busy with another capture. The viewer retries once by itself. If the message stays, close other viewers or Dureh windows for that node and try again.

**The picture is blurry.**
Check the ⚙ menu: **Integer (sharp pixels)** on and **Capture: Match window** give the sharpest result. **Window: Stretch** always blends. A small window over a large display is scaled down; **Size window to the picture** (++ctrl+alt+shift+r++) matches the window to the stream.

**Keys reach Windows instead of the node.**
Input goes to the node only while a viewer window is in front and *View only* is off. Click the node window, and check the bar for *View only (on)*. The shortcuts ++ctrl+alt+shift++ plus ++g++, ++v++, ++f++, ++b++, ++r++ always stay local.

**Cycle does nothing.**
Cycle runs only with *View only* on. The bar says *Cycle runs only with View only on* while control is on.

**A spread window closed by itself.**
Its monitor was disconnected or moved. A spread window closes when its monitor disappears. ++ctrl+alt+shift+b++ brings everything back to one window.

**The Mac is locked and nothing I type arrives.**
The Mac's *Allow lock screen control* switch is off, which is the default. It can only be turned on at the Mac. If the note says to turn on the curtain, click **Turn on curtain**. If it says typing is limited, wait the shown time.

## Profiles

**"(unreadable profile)" in the home window**
The JSON file in `%APPDATA%\Pumasi Viewer\nodes` does not parse or has an invalid field. The home window shows the reason. Fix the file, or remove it and add the node again. See [Reference › Profile file](reference.md#profile-file).

**"no profile folder (APPDATA is not set)"**
The `APPDATA` environment variable is missing in the session that started the viewer. Start it from the Start menu.

## Still stuck

- The viewer writes no log. Run `pumasi-viewer connect <name>` from PowerShell to see its messages on the console.
- For problems on the node side, see [Pumasi › Troubleshooting](../pumasi/troubleshooting.md).
