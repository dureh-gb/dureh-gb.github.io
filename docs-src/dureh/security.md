---
title: Security and privacy
---

# Security and privacy

What Dureh keeps, where it keeps it, what it never does, and which permissions you grant. For the helper on the node see [Pumasi › Security and privacy](../pumasi/security.md).

## The short version

- **Local-first.** Dureh keeps its data on the computer it runs on and on your nodes. It does not collect, upload or report anything.
- **Only the connections you already trust.** Everything goes over your SSH logins. Dureh opens no listening port on the network; the only server it runs for agents listens on `127.0.0.1`.
- **Nothing changes without a review.** Credentials, SSH config, services and network exposure change only after you see the exact target and confirm it. Dureh never runs `sudo`; where an install needs it, Dureh shows the line and you type it.
- **Closed beta.** Dureh is a beta for personal use. Treat it as such.

## Passwords and keys

| Item | What Dureh does |
|---|---|
| **SSH password** | Typed for one login, sent only to the SSH server that checks it, and never saved. There is no password store. A reconnect can never use a password. |
| **Key passphrase** | Used for that login only, never saved. A key with a passphrase cannot reconnect on start. |
| **Private key file** | Stays where it is; Dureh opens it for the login and does not copy it. It must be a regular file owned by you with private permissions; Dureh never changes permissions. |
| **ssh-agent identity** | Dureh asks your agent to sign; it never reads the key. |
| **Keys made on a node** | Private keys made from Properties › Account › SSH keys stay on that node in that account. Dureh registers only public keys, after you confirm the target. |
| **Agent CLI sign-in** | You type it into the CLI in a terminal. Dureh never sees the token and never reads it. |
| **Pumasi** | Has no password field and never stores a password. One exception, on macOS only: while the person at the Mac allows lock screen control, the lock-screen password you type in the Screen view passes through SSH and Pumasi to the Mac's lock screen as ordinary keystrokes. It is never logged or stored. See [Pumasi security](../pumasi/security.md#lock-screen-control-macos). |

## Host keys

The first login to a node shows the SSH host key fingerprint. You compare it with a trusted source and pin it. From then on a different key is refused, never accepted silently: a manual login stops at a **HOST KEY CHANGED** popup, and a reconnect on start pauses before any credential is sent. Dureh does not edit your `~/.ssh/known_hosts`.

## What stays on this computer

The app data folder (`~/.local/share/dev.dureh.desktop/` on Linux) holds the graph of nodes and services, settings, reconnect records (endpoint, pinned key and method, no secret), hired agents' key **hashes** (a hash cannot authenticate), the workspace policy, and an audit log. Files that carry anything sensitive are created readable by your account only. See [Reference › Files and paths](reference.md#files-and-paths).

The audit log (`agent-audit.jsonl`) records agent access, proposals, decisions and reconnect attempts. It never holds a key, a token or a password; it does hold host names, accounts and folders.

**Backups** (Settings › Data) contain the stores above and the app's own settings. They never contain passwords, private keys, the agents' own keys or Dureh's browser profiles. **Copy diagnostics** removes hosts, accounts, paths and keys before copying.

**Exports** (YAML) drop credential-like fields and ask you to review the identity path references they still contain, because a path reveals your folder layout.

## Approvals

Some actions run only after you approve them in a Dureh popup that shows the exact target:

- a **port forward** or **reverse forward**;
- opening a node's **web page** in a tab;
- an **agent's proposal** (port forward, reverse forward, message, screen control);
- **hiring a cloud agent** into a Standard workspace, and any later **widening** of a tier, grant or egress;
- registering a public key, writing an SSH alias, removing a node's workstation config.

Each approval is a one-time token bound to what the popup showed and valid for two minutes; a changed or expired request is refused and you review again. The **Approve** button arms 0.7 s after a popup appears so a click meant for the previous one cannot land on a new request.

A port forward listens on loopback by default. **Listen on LAN / Tailnet** and **Service wiring** (which changes SSH settings on nodes) are Labs flags, off by default, and each shows what it opens before you turn it on.

## Agents

- **Access is off by default.** You turn it on per app run on the Agents screen. The server listens on `127.0.0.1` only, with a random key made for this run and shown masked. **New key** cuts off every client at once.
- **Each hired agent has its own key** with its own scope. Dureh stores only the hash; newer builds give every launch a fresh key that is not kept at all.
- **Scope is chosen at hire time** and shown in Properties › Access: read nodes and routes, propose port forwards, message other agents, see Mac screens, control Mac screens in windows you approve. Every tool call is checked on the server side.
- **Workspaces and tiers.** An agent works in its workspace folder. A **Private** workspace refuses cloud agents, so nothing leaves the node. A **Standard** workspace needs your approval for a cloud agent, and the Review step names the model provider the agent's reads go to. A **Locked** workspace is read-only for agents. Conflicting rules are listed, never resolved silently; the most restrictive reading runs meanwhile.
- **Honest limit.** Today the tiers are *enforced by the harness*: Dureh checks its own tools on the server side, and the agent's CLI applies the file and network rules Dureh writes into its settings. An agent running as the same OS account could step outside them. OS-level enforcement (a container or a separate OS account) is planned, and the tier chip says which one applies.
- **Own CLI home.** Each new agent gets its own CLI home under `~/.local/state/dureh/agents/<id>/`, with a policy file Dureh checks on every start. Your `~/.claude` and `~/.codex` are not written. The policy is written only for CLI versions Dureh has checked.
- **Screen control for agents** is granted in windows you approve, per node, and can be revoked in Properties › Access.
- **Dismiss** removes only what Dureh wrote (harness files, its relay, optionally the agent's conversation and CLI data). The CLI's own histories stay.

## Screens

- Pumasi reaches Dureh only through the node's normal SSH login; it opens no network port and uses no relay.
- Dureh runs only a Pumasi build whose hash it recorded. A changed binary shows **Record again…** and does not start until you confirm it.
- **Permissions you grant on a Mac:** Screen & System Audio Recording (to see), Accessibility (to control). macOS asks for them on the Mac; Dureh cannot grant them. An ad-hoc signed Pumasi needs them again after each update.
- **Permissions you grant on Linux:** the desktop's Remote Desktop dialog, with **Allow Remote Interaction** for control and **Remember This Selection** so it does not ask every time.
- **Lock screen control** on a Mac is off by default and can be changed only at the Mac, with an auto-off (8 hours by default), an indicator, a rate limit while locked and curtain-only unlock as adjustable safe defaults. A stolen SSH key cannot switch it on from Dureh.
- **Typed input is never logged or stored**, on either side.
- The **curtain** blacks out the Mac's screen while you work; the person at the Mac can always take it back (Touch ID or lock).

## Browser and editor

- **Open in browser** can start a Chromium-family browser or Firefox with Dureh's own profile under the app data folder, so logins to your nodes' web pages stay apart from your personal profile. Those profiles hold cookies and are never in a backup.
- **Web tabs** inside Dureh are sandboxed frames.
- **Open in VS Code** uses the Remote-SSH extension and your own SSH config; **VS Code tunnel** (Labs) goes through Microsoft's relay and is off by default.

## Reconnect on start

Opt-in per node, default off. The record holds the endpoint, the pinned host key and the method (key file path or agent fingerprint), never a secret. An attempt checks the host key before it reads or sends any credential, backs off when the node is unreachable, and pauses after three login failures. A node you disconnected yourself is not reconnected. Settings › Connections has the master switch.

## Operating-system notes

- **Linux:** private files are created with mode `0600`; the root account can read them, as on any Unix system.
- **macOS:** the same file model; the app data paths on macOS are not yet documented.
- **Windows (not yet available):** private files get an access list for your account only; as on Unix with root, other administrators can read them. Dureh refuses to keep private files on OneDrive placeholders, FAT volumes or network drives.

## What Dureh never does

- Collect or upload your data, or contact any service of its own.
- Save a password or a passphrase.
- Copy a private key, or change a key file's permissions.
- Accept a changed host key without you.
- Run `sudo`, change a node's SSH settings, services or firewall without a reviewed confirmation.
- Give an agent a tool outside the scope you chose, or widen a workspace without asking.
