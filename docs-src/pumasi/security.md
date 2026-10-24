---
title: Security and privacy
---

# Security and privacy

## How Pumasi is reached

- **SSH is the only way in.** A viewer must log in to the host account over SSH first. Pumasi adds no password, account or key of its own.
- **No network port.** Pumasi listens only on a private socket in the account's home folder (`~/.local/state/dureh/pumasi/`). The folder is readable by that account only, and the socket by that account only.
- **Same account only.** Pumasi asks the operating system who connected to the socket. A connection from any other account is closed before Pumasi reads anything.
- **No cloud relay.** The picture, sound and input travel only inside your SSH connection.
- **The viewer checks the host.** Pumasi Viewer pins the host's SSH host key and the SHA-256 of the Pumasi build it found, and refuses the host when either changes.

## Permissions each OS asks for

=== "macOS"

    Allow Pumasi in **System Settings › Privacy & Security**:

    | Permission | Why |
    |---|---|
    | **Screen & System Audio Recording** | The picture, and the sound when sound is on. |
    | **Accessibility** | Posting mouse and keyboard input from the viewer. |
    | **Input Monitoring** | The privacy curtain: blocking the Mac's own keyboard and mouse while the curtain is up. |

    You also need **Remote Login** on (**General › Sharing**). Pumasi only reads whether it is on; it does not change it.

    Pumasi never turns a setting on for you. The **Set up Pumasi…** window and the installer's last page only open the right System Settings pane. Pumasi never asks for, stores or shows a password. The only time a password passes through Pumasi is when you type it at a locked Mac from a viewer, and only if the person at the Mac allowed that (see [Lock screen control](#lock-screen-control-macos)).

=== "Linux"

    - **X11:** no permission dialog. Pumasi captures the screen and posts input through the X server of the logged-in account.
    - **Wayland:** the desktop portal (Remote Desktop and Screen Cast) shows a consent dialog on the host's screen. Pumasi asks only when you request it, never at the start of a stream. Pumasi keeps the portal's restore token in `~/.local/state/dureh/pumasi/portal-token`, readable only by the account. If the host refuses a later restore, Pumasi forgets the token.
    - **Nothing is enabled at install.** Each account turns Pumasi on with `pumasi enable`. Since 0.5.5, a systemd user preset also keeps it off for accounts that never ran `pumasi enable`.
    - `pumasi enable` and `pumasi disable` refuse to run as root.

=== "Windows"

    Not yet available.

## Switches at the host (macOS)

These switches are in the Pumasi menu bar. **No viewer can change them**; a viewer can only read them.

| Switch | Default | Effect |
|---|---|---|
| **Privacy mode** | off | Refuses everyone and ends every stream and control connection. |
| **Allow AI to see the screen** | off | AI agents hired in Dureh may take screenshots or watch. |
| **Allow AI to control** | off | AI agents hired in Dureh may move the mouse and type. |
| **Allow sound** | on | People watching may hear the Mac's sound when they turn it on. Never AI agents. |
| **Mute this computer while streaming** | off | Mutes the Mac's speakers while its sound goes to a viewer; restored afterwards. |
| **Allow resolution changes** | off | A viewer may switch a display to another of its resolutions while connected. |
| **Allow lock screen control** | off | See below. |

The menu also lists every connection as **Watching** or **Controlling**, each with its own **Stop**, plus **Stop all**.

## The privacy curtain (macOS)

The curtain lets you work on a Mac remotely without showing the screen to the room.

- **What it does.** The Mac's screens turn black with the text "This Mac is being used remotely". The Mac's own keyboard and mouse are blocked. The viewer still sees the real desktop: the curtain windows are left out of the capture.
- **Who can raise it.** Only a person in a viewer, on a display stream that can control the Mac. AI agents cannot. It needs **Input Monitoring**. It is refused when this account is not the one at the Mac's screen.
- **Taking the Mac back.** Anyone at the Mac can press a key or click. A panel offers:
    - **Take back and lock this Mac**: ends remote control and locks the screen. The macOS lock screen checks the password.
    - **Use Touch ID**: ends remote control without a lock (when the Mac has Touch ID).
    - **Cancel**: the curtain stays. Remote control waits while the panel is open.

    The same actions are in the menu bar. The panel has no password field. The macOS lock screen checks the password, not Pumasi.
- **After a take-back**, remote control pauses for 5 minutes, so the curtain cannot come straight back. The person at the Mac can end the pause with **Allow remote control again**.
- **The curtain ends** when the viewer lowers it, when its connection stalls or ends, or when the Mac locks.
- **Fails safe.** If an armed curtain cannot start when the Mac unlocks, Pumasi locks the Mac again rather than show the unlocked desktop. If the curtain loses its input block, it ends and the viewer is told. If Pumasi stops answering, the curtain goes away instead of trapping the person at the Mac.

On Linux the curtain is not yet available.

## Lock screen control (macOS)

Whether a viewer may click and type while the Mac is **locked** (lock screen or login window).

- **Off by default.** While it is off, every input line is dropped while the Mac is locked. The picture keeps streaming, and the viewer shows a note.
- **Changes only at the Mac**, in the menu bar. No viewer can turn it on.
- **Turns itself off.** When you turn it on, it stays on for a time you choose: 1 hour to 4 weeks, 8 hours by default. "Never" asks you to confirm once. An optional schedule (a date range or a weekly timetable) limits it further.
- **Indicator.** While it is on, the menu bar icon shows it: a lock badge (default), "LOCK" with the time left, or a tint. Viewers show a badge too.
- **Unlock only with the curtain** (on by default). While locked, input is posted only while the curtain is up, so nobody at the Mac sees the remote unlock or what follows. A viewer can arm the curtain while the Mac is locked: it comes up the moment the Mac unlocks.
- **Your password passes through as keystrokes.** While lock screen control is on, the keys you type in a viewer at the Mac's lock screen, including the password, travel over SSH and through Pumasi to the lock screen, like any other typing. Pumasi treats them as ordinary input: it never logs, stores or reuses them, and it has no password field or password store. This applies only to the macOS lock screen.
- **Typing is slowed down while locked** (on by default): 10 characters a second, at most 5 Returns a minute, then a 60-second wait; at most 30 clicks a minute. You can adjust these at the Mac. Guessing a password from a viewer takes very long.
- **Fails closed.** Unreadable or invalid settings turn lock screen control off. Turning off the curtain rule or the rate limit asks you to confirm once.
- **Not the console.** If another account is at the Mac's screen (fast user switching), input from a background account is always dropped, whatever these settings say.

Lock screen control does not reach the login window after a full logout, or FileVault's start-up screen.

On Linux, lock screen control is not yet available.

## What is never logged or stored

- **Input.** No key, character, typed text or pointer position reaches a log, a status reply, a notice or a file. Pumasi logs only that lines were dropped and how many, or how long to wait. On macOS, a test checks this on every build: it sends a marker through every input path and searches every output, including the system log, for it.
- **Screen content and names.** Logs carry display ids, sizes, encoders and reasons only.
- **Passwords.** Pumasi never asks for, stores or reuses a password, and it takes no part in SSH login. One exception, on macOS only: while [lock screen control](#lock-screen-control-macos) is on, a lock-screen password typed in a viewer passes through Pumasi as ordinary keystrokes. Like all input, it is never logged or stored.
- **Portal tokens (Linux).** The restore token is kept in a file readable only by the account, and never written to the journal.

Pumasi stores only its own settings and state, in `~/.local/state/dureh/pumasi/`. Its files there are readable only by the account.

## Uninstalling leaves

- **macOS:** the **Privacy & Security** entries and other accounts' LaunchAgents stay. Remove them in System Settings. Your settings folder stays if it holds settings.
- **Linux:** each account's `~/.local/state/dureh/pumasi/` folder stays.
