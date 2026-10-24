---
title: Dwitgan
---

# 뒷간 Dwitgan

A private space. While your agents work on a computer nobody is sitting at, Dwitgan keeps its screen locked.

*Dwitgan* (뒷간) is the old village outhouse: the one place that is always private.

## What it does

With Windows auto-logon, a PC boots straight to an unlocked desktop. Dwitgan is a small per-user tray app that locks that desktop. Apps and agents in the session keep running behind the lock; only the person at the keyboard is kept out.

Dwitgan has one switch, **Active**:

- **Active:** it locks the session now, and locks it again after a quiet spell with no keyboard or mouse input (5 minutes by default).
- **Inactive:** it does nothing.

Dwitgan is active from the moment it starts. It starts shortly after you sign in, so an auto-logged-in desktop is locked within seconds. There are no schedules: the computer should simply be locked whenever nobody is at it.

You change the state by hand, from the tray menu or with `dwitgan on` / `dwitgan off`. **Off** lasts until you turn it on again or until the next sign-in, so a restart always comes back locked. **Pause** keeps it off until a time you choose, for example until tomorrow, when you need the computer yourself. A pause survives a restart.

A tray icon shows the state; it changes while Dwitgan is active. The menu has **Active**, **Lock now**, **Pause until tomorrow**, **Resume**, and **Open config**.

## What it never does

- It never reads, stores or handles a password.
- It never listens on the network, and never blocks or interferes with remote access.
- It needs no admin rights and installs no service or driver. It starts at sign-in through one Task Scheduler task that runs only for your account, with your own limited rights. Installing version 0.3 removes the older autostart entry that version 0.2 used. Uninstalling removes the task.
- It hides nothing: while it runs, its tray icon is visible.

## Limits

- It cannot stop an unlock by the owner's own password, PIN or Windows Hello. It only closes the window of physical access that auto-logon opens.
- Locking is not logging off. Apps in the session keep running and stay reachable over remote access.
- Windows only for now. macOS and Linux may follow later.

## Status

**Planned** on the project page. A first version exists as a closed beta for personal use. There is no public release yet.

## Where it fits

Dwitgan is for a work computer that signs itself in so that agents and remote tools can use it. [Dureh](../dureh/index.md) and [Pumasi](../pumasi/index.md) reach that computer over SSH; Dwitgan keeps the desktop in front of it locked while nobody is there.

- Runs on: Windows.

[Project page](https://dureh-gb.github.io/dwitgan.html) · [All modules](../index.md)
