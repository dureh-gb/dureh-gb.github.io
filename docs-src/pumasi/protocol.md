---
title: Protocol
---

# How a session works

This page explains, at a user level, what happens between a viewer and Pumasi. Every viewer (Pumasi Viewer, Masil and Dureh) speaks the same protocol, version `proto/v1`.

## The transport: SSH and a private socket

1. The viewer logs in to the host account over **SSH**, with your normal SSH keys. It checks the host key you confirmed earlier.
2. On the host, Pumasi waits on a **private socket** in that account's home folder: `~/.local/state/dureh/pumasi/pumasi.sock`. Only that account can open it.
3. Through the SSH login, the viewer connects to that socket.

Pumasi checks that whoever connects to the socket is the same account. It refuses everyone else. **Nothing listens on the network.** All traffic is inside the SSH connection, so it is encrypted by SSH.

```text
viewer ──SSH login──▶ host account ──▶ private socket ──▶ Pumasi
       ◀── screen, sound ───────────────────────────────────
       ─── pointer, keys, curtain ──────────────────────────▶
```

## Asking for something

Each connection starts with one short request. The main ones:

| Request | What it does |
|---|---|
| Status | Pumasi answers with its state: version, displays, which permissions are granted, and the host's switches. Then it closes. |
| Stream | Opens a live stream of one display. |
| Still | One screenshot. |
| Input | A connection that only carries pointer and keys. |
| Modes | Lists a Mac display's resolutions (macOS). |

No request can change a switch on the host. Privacy mode, the AI switches, sound, resolution changes and lock screen control change only at the host.

## The screen stream

- One connection per display. A viewer that shows two displays opens two streams.
- The picture is **H.264** video. Pumasi uses a hardware encoder when one is available.
- Limits per host session: at most 4 streams, at most two 4K screens' worth of pixels (2 × 3840 × 2160), and 150 Mbit/s in total.
- The viewer chooses the size, frame rate and bit rate. It can ask for a fresh key frame at any time, for example after a network hiccup.
- Pumasi sends statistics once a second, and answers pings so the viewer can measure the delay.

**Display changes.** If a display changes resolution, or the main display changes, the stream follows it and the viewer adjusts. If a display disappears, or the capture stops or stalls, the stream ends with a reason. The viewer then reopens it by itself: after 0.5 s, 1 s and 2 s, at most 3 tries. After that it shows the reason and a **Reconnect** button. The viewer never retries a privacy or permission refusal.

## Input

On a stream connection the viewer sends pointer moves, clicks, wheel, key presses and (macOS) typed text.

- Pointer positions are relative to the display, so they work at any stream size.
- Pumasi limits input to 250 lines a second.
- When the stream ends, for any reason, Pumasi releases every key and button it pressed. Nothing stays held down.
- On a Mac, input is ignored while the Mac is locked, unless you allowed [lock screen control](security.md#lock-screen-control-macos) at the Mac.

## Sound (macOS)

The viewer can turn the host's sound on or off during a stream. Sound is sent as AAC or as uncompressed PCM. It needs **Allow sound** on at the Mac (on by default). The Mac's speakers can be muted while the sound is sent. Sound from a Linux host is not yet available.

## The curtain (macOS)

The viewer can raise or lower the privacy curtain during a stream. See [Security and privacy](security.md#the-privacy-curtain-macos).

## Ending a session

The viewer sends a stop, reads what is left, then closes the SSH channel. If the viewer or the network goes away, Pumasi notices the closed connection, stops the stream and releases held keys and buttons.

On a Mac, the person at the computer can stop any connection at any time from the menu bar. On Linux, `pumasi disable` stops Pumasi for that account.
