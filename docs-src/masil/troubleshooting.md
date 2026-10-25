# Troubleshooting

Most problems are one of three things: the phone cannot reach the computer, the computer does not accept the phone's
key, or Android put the app in the background. The messages below are the ones Masil for Android shows.

## Connection messages

When reading the host key or logging in fails, Masil names the cause. Tap **Details** to see counts, timings and
algorithm names (never an address or key); **Copy** copies them.

| Message | What to check |
|---|---|
| *Masil needs permission to reach computers on your local network.* | Android 17 and newer. Tap **Continue** and allow it. If you denied it permanently: Settings › Apps › Masil › Permissions, allow local network, then tap **Try again**. |
| *Android can't look up .local names. Use the computer's IP address or its Tailscale name.* | Android apps cannot resolve mDNS names. Enter the IP address instead. |
| *Could not find that host name.* | Check the spelling, or use the IP address. A Tailscale name works only while Tailscale is on on the phone. |
| *That host name has no address this phone can use.* | Use the IP address. |
| *Looking up the host name took too long.* | Check the phone's network, or use the IP address. |
| *No answer from the computer within N s.* | Is the phone on the same network or on the VPN? Is the computer awake? Does its firewall allow SSH on that port? On Android 17 this can also be the missing local network permission. |
| *The computer refused the connection on port N.* | Is SSH turned on there (Remote Login on a Mac, OpenSSH Server on Linux or Windows)? Is the port right? |
| *This phone has no route to that address.* | The phone is on another network. Join the same Wi-Fi or turn the VPN on. |
| *The computer accepted the connection … but closed it before SSH started.* | The SSH server or a firewall is refusing this phone: an allow list, a connection limit or a blocked address. |
| *Something answered on port N, but it is not an SSH server.* | Wrong port. |
| *The computer and Masil could not agree on SSH algorithms.* | Every default OpenSSH 9.x or 10.x server works. Servers restricted to post-quantum-only key exchange or UMAC-only MACs do not. |
| *The SSH handshake finished, but the computer's host key could not be read.* | Try again; if it repeats, check the server's host keys. |

Logins you start (a terminal, screen or files tab, or the wizard's check) wait up to 15 seconds in total.

## The host key is refused

Masil fails closed when the key a computer offers differs from the pinned one, and shows both fingerprints. This
happens when the computer was reinstalled, its SSH keys were regenerated, or another machine answers at that
address. If you know why, open the node's **Edit** form and tap **Forget host key**; the next connection shows the
new key for you to confirm. Changing the address or port also forgets the pin.

## The Pumasi build is refused

The Screen tab pins the SHA-256 of the Pumasi build on the host. After Pumasi is updated on the computer the next
connection is refused. **Edit › Forget Pumasi build** clears the pin; the next screen connection shows the new build
to confirm.

## "Needs this device's key"

The node's key login has not passed. Tap **Finish setup** on the card and choose how the key gets onto the computer
(password once, or install it yourself with **Copy install command**). If the key was there before, someone may have
removed it, or the account's `authorized_keys` file may have been replaced.

The *Review the change* step lists when Masil refuses to add the key: a home folder writable by others or owned by
root, or `~/.ssh` or the file being a link, owned by another account or writable by others. Fix the permissions on
the computer, then try again.

If the existing line has options such as `restrict` or `command=`, Masil keeps the line as it is and shows the
options after the login; the key login must still pass with them.

## Password login does not work

The password field accepts three tries within 120 seconds. Keyboard-interactive prompts (for example a one-time
code) get 90 seconds per round. A password is only ever used for the single login that installs the key; if the
computer does not offer password or keyboard-interactive login, Masil says so and you must install the key yourself.

## Keyboard problems

**The on-screen keyboard does not appear.** By default it stays hidden while a hardware keyboard is connected
(Settings › *Show on-screen keyboard automatically* › *Off when a hardware keyboard is connected*). Tap the
**Keyboard** button at the right of the key row; it opens the keyboard in every mode. Set the option to **On** if you
want it to appear whenever the terminal is tapped.

**The keyboard keeps popping up.** Set the option to **Off**. The Keyboard button still opens it on demand.

**Back closes the keyboard, not the screen.** That is Android: the soft keyboard takes Back before the app sees it.
Press Back again.

**Ctrl or Alt does nothing.** They are sticky: tap Ctrl, then the key. Or hold the assistant button while typing a
letter to send it with Ctrl.

**Hardware keyboard in the Screen tab does not reach the computer.** Tap the picture once (or a panel button). On
DeX or a Bluetooth keyboard the keys reach the host after that tap, or right after connecting. Ctrl + wheel on a
mouse zooms the local picture, it is not sent.

**A space after a word deletes or moves the word.** Some soft keyboards send their text in a way the terminal
misreads. Turn on Settings › Terminal › **Keyboard text as one path (experimental)**. It is off by default.

**Pinch zoom does nothing in the terminal.** Page zoom is off. Change the text size in Settings › Terminal › Font
size, or from the assistant menu › Font size.

## Sessions in the background

While at least one session tab is open, Masil keeps running in the background, so switching to another app or
locking the phone does not end your sessions. A quiet notification, *Masil: N sessions open*, shows while it does.
Tap it to return to Masil, or tap **Disconnect** to end every session at once. On Android 13 and newer, Masil asks
once for permission to show notifications; if you say no, it still keeps the sessions open, but the notification
appears only in the system's list of running apps. The notification shows only the number of sessions, never a
node name or address.

Android can still close connections or the app itself, for example to save battery, after a network change, or when
you swipe Masil away from the recent apps list (that ends every session). What happens then:

- **Terminal**: if the connection was dropped while Masil was in the background, the tab reconnects by itself when
  you come back, with the same pins. This opens a **new shell** on the computer: the old shell's scrollback stays on
  the phone, but programs that ran in the old shell are not brought back. A shell that you ended yourself (`exit`,
  Ctrl-D, `logout`) or a tab you disconnected is not reopened. You can always tap **Reconnect** on the card or in the
  assistant menu; it also starts a new shell.
- **Screen**: coming back to the tab resumes the running stream when it is still there. If the stream was dropped
  in the background, the tab connects again by itself.
- **Files**: the tab checks the connection and logs in again (same pins) before each step. If Android closes the
  app during a transfer, the transfer stops. Transfers do not resume; start them again.

Switching between tabs or screens inside Masil does not disconnect anything.

## The Mac ignores my taps and keys

A note in the Screen tab tells you why: the Mac is locked and lock screen control is off there, typing on the lock
screen is rate-limited, the Mac is locked and needs the curtain to be unlocked from the phone, or another account is
using the Mac's screen. Lock screen control is changed only at the Mac (Pumasi menu bar). With status text turned
off in Settings the reason is a small light; tap it to read the line.

## The Screen tab says "VideoDecoder missing in this WebView"

The viewer decodes the stream with WebCodecs. Update **Android System WebView** (or Chrome) from the Play Store.

## Files: "Folders deeper than 8 levels are not opened" or "Outside the transfer limits"

Files keeps to its bounds: files up to 8 GiB, folders up to 128 entries and 8 levels deep, no links or special
files, and no credential folders such as `.ssh`. Move the file to a shallower folder on the computer.

## Removing or deleting the phone's key

- *Not removed: the change was not confirmed.* Nothing changed; review and confirm again.
- *Removed, not verified.* The line was taken out but the check afterwards did not finish. The node is marked
  *Needs this device's key*; a later login tells you whether the key still works.
- A node may be marked *may still have the line* after **Delete this phone's key…** when its removal was skipped or
  failed. Remove the line from that computer's `authorized_keys` by hand if needed.

## Masil for Windows

- **A card shows Offline although the computer is on.** Online means a TCP port answered. Check the address and port
  in the editor, the computer's firewall, and the VPN. Press F5 to check now.
- **Connect opens Remote Desktop but the login fails.** Masil only starts `mstsc`; passwords and login errors are
  handled by Windows. The editor shows the credential target (`TERMSRV/<address>`) and the saved user name; the
  password field is blank on purpose. A different address or port needs its own saved credential.
- **No Moonlight cards.** Moonlight must be installed and paired on this user account; Masil reads its host list.
- **A Pumasi node is refused.** Its host key or Pumasi build changed. See the Pumasi Viewer documentation for
  clearing a pin.
- **VNC through SSH does not open.** The tunnel uses the Windows OpenSSH client with your own keys and
  `known_hosts`, in batch mode: the host must already be known and the key must work without a password prompt.
- **SmartScreen warns about the installer.** The installer is not code-signed. Masil is a local, unsigned
  application.
