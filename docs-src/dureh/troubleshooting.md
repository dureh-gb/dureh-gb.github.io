---
title: Troubleshooting
---

# Troubleshooting

Problems seen in real use of Dureh 0.2.0-beta.x, with what to do. For Pumasi on the node itself see [Pumasi › Troubleshooting](../pumasi/troubleshooting.md).

## Install and start

**apt says the download "couldn't be accessed by user _apt".**
The `.deb` sits in a folder that other users cannot enter, usually your home folder. The install itself may still succeed; check with `dpkg-query -s dureh`. To avoid the warning, copy the file to a folder apt can read (for example a new folder under `/tmp`) and install from there. Do not change your home folder's permissions and do not turn off apt's sandbox.

**macOS refuses to open the app.**
The app is ad-hoc signed and not notarized. On macOS 15 and later, Control-click → **Open** no longer works: open the app once, then go to *System Settings › Privacy & Security* and click **Open Anyway** next to the message about the app, and confirm.

**After an update: "A saved item could not be read and was kept unchanged" or "The automatic backup before this version could not be written".**
Open **Settings › Data**. The **Notices** row names the store and where it was kept (`<store>.corrupt-<time>`). Nothing was deleted. If the automatic backup failed, make one with **Back up…** before you go on.

**After a downgrade, Dureh opened a new, empty workspace.**
A newer build wrote data this build does not read; it is kept read-only, not deleted. Go back to the newer version, or restore an older backup from **Settings › Data › Restore…**.

**Restore says "This backup was made by a newer version of Dureh".**
Restore it with that version. Dureh never applies a newer backup to an older build.

**"The file chooser (zenity) is not available."**
Back up, Restore and the key chooser use zenity. Install it: `sudo apt install zenity`.

## Nodes and login

**Add node fails with "connection refused" or a timeout.**
SSH is not on, or not reachable. Dureh explains and retries but never changes the node. Turn SSH on at the node:

- macOS: **System Settings › General › Sharing › Remote Login**.
- Ubuntu and Debian: `sudo apt install openssh-server`.
- Outside your home network, use a VPN or tailnet rather than a router port forward.

**"HOST KEY CHANGED" popup with Pinned and Offered now.**
The node offers a key that is not the one you pinned. Dureh refuses to log in and pauses reconnect. If you reinstalled the node, check the new fingerprint with the node's administrator (or on the node itself), then **Log in…** and pin it. If you did not change anything, do not log in: **Turn off reconnect** and find out what changed.

**"Reconnect paused · saved passwords are no longer used; log in".**
Since 0.2.0-beta.3 Dureh never saves a password. A reconnect record from an older build that used one is paused. Log in with a key file or an agent identity and turn **Reconnect on start** on again.

**"Reconnect paused · login failed".**
Three authentication failures in a row pause reconnect for that node. Fix the key or agent, then click the retry icon in Properties › Machine › Connection or in Settings › Connections.

**The login ended after about 30 minutes.**
That is the session limit. Turn **Reconnect on start** on for the node (agent identity or key file without passphrase); then the session is kept alive while the network holds and restored after a drop.

**"Choose a regular private key file owned by your account with private permissions."**
The chosen file is not a private key, is owned by someone else, is a link, or is readable by others. Fix the file's ownership and mode yourself (`chmod 600`); Dureh never changes permissions. A public key (`.pub`) cannot authenticate.

**"This login method or MFA is unsupported."**
The node asks for a second factor or an interactive method Dureh does not handle. Dureh does not bypass authentication. Use a key with an agent identity, or adjust the node's SSH settings.

**"Reconnect on start" is greyed out.**
It is offered only for an agent identity or a key file without a passphrase. A password is typed for one login and never saved, so it cannot reconnect.

**A merged machine card shows the state of only one path.**
Known: a machine with several access paths shows the first path's state on the card. The Properties › Machine › Accounts section shows every path.

**The Outliner scrolls by itself after an eye toggle or closing a tab.**
Known on Ubuntu's WebKitGTK web view; harmless. Scroll back.

## Screens (Pumasi)

**The Pumasi card says "Waiting for permission".**
Mac: allow **Pumasi** under **System Settings › Privacy & Security › Screen & System Audio Recording**, then **Check again**. For control also allow it under **Accessibility**; until then the screen works view only.

**After a Pumasi update the Mac asks for Screen Recording and Accessibility again.**
An ad-hoc signed Pumasi is new to macOS at every update. Allow it again. A Pumasi signed with a developer identity keeps the permissions across updates.

**"Pumasi is installed but not running."**
Pumasi runs only while the account is logged in at the node's own screen (a graphical session). Log in there, or on Linux click **Start**. Over SSH alone it does not run.

**Linux: "Pumasi runs, but not inside a Wayland or X11 session."**
The service started without a desktop session. Log in on the node's screen, then **Check again**.

**Linux: "No H.264 encoder on the node."**
Install the package the card shows (GStreamer plugins); **Type in a terminal** puts the line into a terminal on the node, you run it. Then **Check again**.

**Linux: "Waiting for approval on the node."**
Click **Request approval**. On the node, the **Remote Desktop** dialog appears: turn on **Allow Remote Interaction**, keep **Remember This Selection**, choose the monitors and click **Share**. If you cancel it, the earlier approval is kept. The request works only while nothing is streamed: close the node's screen tab first.

**Linux: the screen is view only.**
**Allow Remote Interaction** was off in the dialog. Request approval again and turn it on.

**Linux: the Install popup names the Downloads folder, but the file is elsewhere.**
Dureh looks in its own resources, then your Downloads folder, then `/var/tmp/dureh-packages`, and accepts the `.deb` only when its SHA-256 matches. The popup's text names only Downloads. Put the file in one of those places.

**"Pumasi on this node changed since it was recorded."**
The binary differs from the recorded build, usually after an update on the node. If you made that change, **Record again…**. The card says whether the file is the build this Dureh carries; record another build only if you trust it.

**"Dureh's older per-user Pumasi copy is on this node."**
Pumasi for Linux moved to a `.deb`. **Uninstall…** the old copy, then **Install…**.

**Properties says "Pumasi: Not set up" right after Add node.**
Known: the Properties panel reads the status only after the node details card was opened once. Open the details (double-click the card).

**The picture looks upscaled or soft when the screen opens.**
Known: the stream size is sometimes measured before the tab's layout settles. Resize the window or pick **Match window** again in ⚙ › Capture; a fix is planned.

**The screen opens, but the Mac shows a lock screen and nothing I type arrives.**
The Mac is locked and lock screen control is off there (it is off by default). Turn it on at the Mac in Pumasi's menu, or unlock the Mac at the keyboard. If the note says the curtain is needed, click **Turn on curtain**; it comes up at the unlock. A limited-typing note means the locked Mac's rate limit; wait the seconds shown.

**"Another account is using the screen of <node>".**
Fast user switching put this account in the background. Input is ignored until this account is back at the Mac's screen. Nothing in Dureh can switch accounts.

**No sound, "Update Pumasi to hear this computer".**
Sound needs Mac Pumasi 0.10.0 or Pumasi for Linux 0.6.0 and newer.

**Host resolution is greyed out.**
The row states why: View only (needs control), an older Pumasi, a spread window, an unrecorded helper, or a Linux node (not available yet). On the Mac, **Allow resolution changes from Dureh** in the Pumasi menu must be on.

## Agents

**"Agent access is off" in the hire wizard.**
Click **Turn on**. The server runs on this computer only (`127.0.0.1`).

**"Log in to this machine first" / "Choose an installed CLI".**
The Where step needs a logged-in account; the What step needs a CLI that was found. **Install** types the install command into a terminal for you to run; **Rescan** looks again.

**"Install tmux on this machine first" / "Chat needs tmux".**
Agents run in tmux sessions so they survive Dureh closing. Install tmux on the node. Without it, only Terminal mode is offered and the agent stops when its terminal closes (**Settings › Labs › Run agents without tmux**).

**"Not allowed: a Private workspace takes local agents only".**
Claude Code and Codex are cloud agents. Choose a Standard or Open workspace, or a local agent (Ollama).

**"Not allowed: this CLI version is not one Dureh checked".**
Dureh writes a policy file for a CLI version it has checked (Claude Code 2.1.x). Codex hires are refused until a checked Codex version is added. Install a checked version, or wait for a Dureh update.

**"The review expired. Review again."**
A review is valid for two minutes. Go back and forward to Review and click Hire again.

**"<agent> · route missing (node port in use)".**
After a reconnect, the agent's reverse forward could not be restored because its port on the node is taken. Click **Fix** and approve the new route.

**The agent's harness shows "tampered"; it will not start.**
Its policy file changed since Dureh wrote it. In Properties › Access › CLI home click **Restore Dureh's settings**.

**A toast says "<agent> was closed while it waited for you in the terminal" right after a Terminal-mode hire.**
Known and harmless: the agent starts and runs normally.

**Chat shows "Not connected".**
The agent's node is not logged in, or the relay on the node is not running. Log in to the node; the chat reconnects and replays what you missed.

## Other

**Open in VS Code is not shown.**
No VS Code or VSCodium with the Remote-SSH extension was found in its usual places. See **Settings › Editor**.

**A page will not open in Dureh's separate browser profile.**
The separate profile works with Chromium-family browsers and Firefox. **Settings › Browser** lists browsers that were found but not used, with the reason.

**Collecting information for a report.**
**Settings › Data › Copy diagnostics** copies the version, counts, Labs flags and recent log lines, with hosts, accounts, paths and keys removed. The full app log is `~/.local/share/dev.dureh.desktop/logs/dureh.log`.
