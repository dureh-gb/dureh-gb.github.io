---
title: Dureh
---

# 두레 Dureh

*Dureh* was the village work group that farmed together. Here your computers, services and agents are the group.

Dureh is a personal control desk for your own computers. You register each computer as a **node**, review and pin its SSH host key, and then work on it from one window: terminal, files, port forwards, the remote screen through [Pumasi](../pumasi/index.md), and local AI agents. It is local-first: Dureh keeps your data on your machines and never collects it.

!!! note "Closed beta"
    Dureh is version **0.2.0-beta.6**, a closed beta for personal use. Builds are not yet on a public download page. Behaviour can still change between releases, and the application's own license is not set yet.

## Who it is for

- Someone with a few computers of their own: a desktop, a laptop, a Mac, a small server, a GPU box.
- Someone who already reaches them over SSH and wants one window instead of many.
- Someone who runs coding agents (Claude Code, Codex, Ollama) on those machines and wants each agent in its own folder, with limits they chose.

## What it does today

- **Nodes.** Add a computer, review its SSH host key and pin it. A changed key is refused, never accepted silently.
- **Login.** An ssh-agent identity, a key file, or a password. A password is typed for that login only and is never saved.
- **Terminal and Files.** Terminal tabs and split panes, and SFTP file transfer with pause and resume.
- **Port forwards.** Reviewed local TCP forwards that end when the session ends.
- **Screen.** View and control a node through Pumasi (H.264/HEVC, sound, several displays, curtain).
- **Agents.** Hire local agents onto nodes through a step-by-step wizard, each in a workspace with a tier, and talk to several of them from one screen.

## Supported operating systems

The table is for the Dureh app itself (the controller). The computers you reach (the nodes) need only an SSH server; for the screen they also need Pumasi.

| OS | Status | How it ships |
|---|---|---|
| Ubuntu 24.04 (amd64) | Beta | `.deb` package |
| macOS (Apple silicon) | Beta | app bundle, ad-hoc signed, not notarized |
| Windows | In progress | not yet available |

Nodes can be Linux or macOS. A Mac node gives login, terminal, Files, tmux sessions, hired agents and the Pumasi screen; services and persistent tunnels are Linux-only.

## The family

| Part | What it is |
|---|---|
| **Dureh** | The desktop app documented here |
| [**Pumasi**](../pumasi/index.md) | The screen helper on each node (macOS, Linux; Windows in progress) |
| [**Pumasi Viewer**](../viewer/index.md) | A standalone viewer for Pumasi (Windows) |
| [**Masil**](../masil/index.md) | The phone app: Pumasi Viewer, SSH terminal and file transfer |
| [**Munjigi**](../munjigi/index.md) | Brings a Linux node's desktop session back so Pumasi has something to show |

## Principles

- **Your data stays yours.** Dureh, Pumasi and Masil do not collect or upload it.
- **No surprises on your machines.** Credentials, SSH config, services and network exposure change only after you review the exact target and confirm it.
- **Passwords.** An SSH password goes only to the SSH server that checks it, for one login, and is never stored. Pumasi never stores a password. The one exception: unlocking a Mac's lock screen from the Screen view, when the person at the Mac has allowed it. Then the password you type passes through to the lock screen as ordinary keystrokes, never logged or stored.

## Pages

- [Getting started](getting-started.md): install, first launch, your first node and your first screen.
- [Use cases](use-cases.md): what people do with Dureh.
- [Reference](reference.md): screens, menus, settings, files and versions.
- [Troubleshooting](troubleshooting.md): known problems and their fixes.
- [Security and privacy](security.md): what stays where, keys, and the permissions you grant.
