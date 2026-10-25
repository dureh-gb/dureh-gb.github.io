---
title: Pumasi
---

# 품앗이 Pumasi

*Pumasi* means trading a hand of work: you help with my field today, I help with yours tomorrow.

Pumasi is the host helper. It runs on the computer you want to reach, in the desktop session of the account that is logged in at the screen. It gives a remote viewer that screen as a video stream, and takes pointer, keys and sound in return.

- **Over SSH only.** A viewer reaches Pumasi through the account's normal SSH login. Pumasi listens on a private socket in your home folder. It opens no network port and uses no cloud relay.
- **Visible on the host.** The person at the computer can see who is watching or controlling, and can stop it.
- **Works on its own.** Pumasi, [Pumasi Viewer](../viewer/index.md) and [Masil](../masil/index.md) work without [Dureh](../dureh/index.md). Dureh is one more viewer that can also install and manage Pumasi.

!!! note "Private beta"
    Pumasi is in private beta. Versions start with `0.`, and behaviour can still change between releases.

## Viewers

| Viewer | Runs on | Docs |
|---|---|---|
| Pumasi Viewer | Windows | [Pumasi Viewer](../viewer/index.md) |
| Masil | Windows (through Pumasi Viewer), Android | [Masil](../masil/index.md) |
| Dureh | Ubuntu, macOS | [Dureh](../dureh/index.md) |

## Status by operating system

Each operating system has its own Pumasi build with its own version.

| Host OS | Version | Package | Status |
|---|---|---|---|
| macOS 13 or later | 0.19.1 | `Pumasi-<version>.pkg` | Beta. Screen, input, sound, curtain, lock screen control, resolution changes. |
| Linux (Ubuntu, amd64) | 0.5.6 | `pumasi_<version>_amd64.deb` | Beta. Screen and input on X11 and on Wayland (through the desktop portal). |
| Windows | 0.2.0-beta.2 | none | Not yet available. An early prototype exists; it cannot share a screen yet. |

### What each build can do

| Feature | macOS | Linux |
|---|---|---|
| Screen stream (H.264) | yes | yes |
| Pointer and keys | yes | yes |
| Typed text (pasting a string) | yes | not yet available |
| Sound from the host | yes | not yet available |
| Privacy curtain | yes | not yet available |
| Lock screen control | yes | not yet available |
| Resolution changes from the viewer | yes | not yet available |
| Hardware video encoding | yes (VideoToolbox) | yes, when a supported encoder is present; otherwise software (x264) |

## Next steps

- [Getting started](getting-started.md): install Pumasi and make the first connection.
- [Use cases](use-cases.md): what people use it for.
- [Protocol](protocol.md): how a session works.
- [Command line](cli.md): the `pumasi` commands.
- [Troubleshooting](troubleshooting.md): common problems.
- [Security and privacy](security.md): permissions, the curtain, and what is never logged.
