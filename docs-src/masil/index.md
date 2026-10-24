# Masil

Masil (마실, "dropping in on the neighbours") lets you reach your own computers while you are away from them.
There are two apps with the same name.

## Masil for Android

Masil for Android runs on your phone and connects to your computers over SSH. It gives you three things:

- **Terminal**: an SSH shell with a special-key row, copy and paste, and an on-screen or hardware keyboard.
- **Screen**: the Pumasi viewer. It shows and controls the desktop of a computer that runs [Pumasi](../pumasi/index.md),
  with touch, pinch zoom, a virtual mouse and keyboard input.
- **Files**: SFTP download and upload, one file at a time, between the computer and the phone.

Masil logs in only with a key it makes on the phone (the *device key*). It never stores a password. It asks for one
only during the optional one-time key setup, and sends it only to that computer's SSH server for that one login.
On a Mac whose owner has allowed lock screen control, you can also type the Mac's lock-screen password in the Screen
tab; those keystrokes go to the Mac's lock screen like any other typing and are never logged or stored. Every
computer's host key, and the Pumasi build on it, is pinned after you confirm it; a computer whose key or build
changed is refused until you decide what to do.

| | |
|---|---|
| App name | **Masil (beta)** |
| Current version | 0.1.0-beta.14 (2026-10-24) |
| Status | Beta. Each beta installs over the previous one; your nodes, pins and key are kept. |
| Android | Android 7.0 or newer. Android 17 asks for local network permission. |
| Works with | Any computer with an SSH server. The Screen tab also needs Pumasi on that computer (Linux or Mac). |

Your data stays on the phone: the node list, the pinned keys and the device key live in the app's private folder.
Nothing is uploaded anywhere.

## Masil for Windows

Masil for Windows is a compact launcher for remote desktops on a Windows 11 PC. It shows cards for:

- Windows Remote Desktop (RDP) profiles, opened with the built-in Remote Desktop client.
- Moonlight hosts that are already paired in Moonlight.
- Pumasi nodes, opened with the bundled [Pumasi Viewer](../viewer/index.md).
- VNC computers, opened with RealVNC Viewer, optionally through an SSH tunnel.

| | |
|---|---|
| Current version | 0.1.2 (2026-10-19) |
| Status | In development |
| Windows | Windows 11 |

The Windows app ships with a copy of Pumasi Viewer; the viewer's own documentation applies to that part.

## Where to go next

- [Getting started](getting-started.md): install the app, add the first computer, open a terminal and a screen.
- [Use cases](use-cases.md): what people do with Masil.
- [Reference](reference.md): every screen, button and setting.
- [Troubleshooting](troubleshooting.md): connection messages, keyboard problems, sessions in the background.
