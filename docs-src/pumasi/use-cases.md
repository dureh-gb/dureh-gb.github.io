---
title: Use cases
---

# Use cases

Pumasi is for your **own** computers: you have an account on the host and can log in to it over SSH.

## Reach a computer in another room

Your Mac or Linux desktop is in another room or at the office. From a Windows PC, open it in [Pumasi Viewer](../viewer/index.md) and work on its screen with your own mouse and keyboard. The connection uses your existing SSH keys. Nothing new is opened on the network.

## Check on a computer from your phone

With [Masil](../masil/index.md) for Android you can look at a host's screen while you are away from it: see whether a long job finished, or answer a dialog that is waiting.

## Work on a Mac without showing the screen to the room

On a Mac, turn on the **privacy curtain** from the viewer. The Mac's own screen goes black, and its keyboard and mouse are blocked, while you keep working on it remotely. Someone at the Mac can take it back at any time with Touch ID or by locking it. See [Security and privacy](security.md#the-privacy-curtain-macos).

## Unlock a locked Mac remotely

If you allow it at the Mac, a viewer can type on the Mac's lock screen, for example to unlock it. This is off by default, turns itself off after a time you choose, and by default works only with the curtain up. See [Lock screen control](security.md#lock-screen-control-macos).

## Hear the host

On a Mac, the viewer can turn on the host's sound. You can mute the Mac's own speakers while its sound goes to the viewer. Sound from a Linux host is not yet available.

## Match the screen to your viewer

On a Mac, if you allow **resolution changes** at the Mac, a viewer can switch a display to another of its own resolutions while connected. The Mac puts the original resolution back when the viewer disconnects. The person at the Mac can restore it at once from the menu bar.

## Let an AI agent see or use a Mac

AI agents hired in [Dureh](../dureh/index.md) can watch a Mac or use its mouse and keyboard, but only when you turn on **Allow AI to see the screen** or **Allow AI to control** at the Mac. Both are off by default. Pumasi Viewer and Masil are never treated as agents.

## Several accounts on one Linux computer

Each account that should be reachable runs `pumasi enable` once. Each account then gets its own Pumasi while it is logged in at the screen.
