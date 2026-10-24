# Pumasi Viewer

Pumasi Viewer is a small native program for Windows. It shows the screen of one of your own computers (a *node*) and lets you control it with your keyboard and mouse. The node runs [Pumasi](../pumasi/index.md), the screen helper for macOS and Linux.

Pumasi Viewer does not need Dureh. It connects to the node over SSH, with the keys and host checks you already use. It opens no ports and uses no cloud relay.

<!-- screenshot: the home window with two saved nodes, and a node window behind it -->

## What it does

- Shows a node's screen as an H.264 video stream, decoded on your graphics card.
- Sends your keyboard and mouse to the node, including the Windows key (Command on a Mac), Alt+Tab and IME keys.
- Keeps a profile per node: host, account, login key, the node's SSH host key and the installed Pumasi build. Passwords and private keys are never stored.
- Refuses to connect when the node's SSH host key or its Pumasi build differs from the saved profile.
- Handles several displays on the node: one at a time, all at once, cycling, or spread over your own monitors.
- Shows and requests Pumasi's screen and control permissions on the node. The permission itself is always granted at the node, never from the viewer.

## Supported systems

| Side | Supported |
| --- | --- |
| Viewer (your PC) | Windows 10 or later. A graphics driver with hardware H.264 decoding (Direct3D 11) is required. |
| Node (the computer you look at) | macOS or a Linux desktop with Pumasi installed. See [Pumasi](../pumasi/index.md). |
| Viewer for Linux | Not yet available. |
| Viewer for macOS | Not yet available. |

## Status

Pumasi Viewer is in **beta** (version 0.1.0). It is also bundled with [Masil for Windows](../masil/index.md), which uses it to open Pumasi nodes. Both copies share the same saved nodes.

Known limits in this version:

- Windows only. The command line works elsewhere, but the window does not.
- Some features were tested only against macOS nodes. Linux nodes work through the same protocol, but with fewer live checks so far.
- No automatic update. Install a new version over the old one.

## Where to go next

- [Getting started](getting-started.md): install, add a node, connect.
- [Use cases](use-cases.md): what people do with it.
- [Reference](reference.md): menus, settings, shortcuts, files.
- [Troubleshooting](troubleshooting.md): when something does not work.
