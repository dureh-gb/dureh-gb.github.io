---
title: Use cases
---

# Use cases

Six things people do with Dureh. Each one names the screens and buttons it uses; the [Reference](reference.md) has the details.

## 1. One window for the computers at home

You have a desktop, a laptop and a small server. Each already has an SSH server.

1. Add each one with **＋ › Add node…**, or import them at once with **＋ › Import SSH config…**.
2. Pin each host key the first time you connect.
3. Log in with your ssh-agent identity and tick **Reconnect on start**.

From then on Dureh logs in to all of them when it starts. The **Network** canvas shows one card per machine with its state (Offline, Reachable, Logged in, Connected). The terminal panel at the bottom opens shells on any of them, side by side or stacked. **Resources** shows CPU, memory, the fullest disk and GPU of every logged-in node in one table, with **Refresh all** to scan again.

## 2. Reach a service on a node without opening a port

A node runs a web app on its own loopback port, and you want it in your browser here.

1. Open the node's details (double-click the card) and go to **Actions**, or use Properties › Account › Session › Port forwarding.
2. Enter the target port on the node and the local port here. Dureh shows the exact forward before it starts, and you approve it.
3. Open `127.0.0.1:<local port>` in a browser. **Open in browser** can start the browser with Dureh's own separate profile, so the node's logins stay apart from your personal browsing (Settings › Browser).

The forward listens on loopback only, accepts a few TCP clients, and ends when the session ends. Listening on the LAN or a tailnet is a Labs feature, off by default.

A **reverse forward** goes the other way: a port on the node reaches a port on this computer. Dureh uses it for hired agents on remote nodes, and you approve each one.

## 3. Use a Mac from a Linux desktop

Your Mac mini sits under the desk without a monitor. With Pumasi on the Mac, Dureh shows its screen in a tab.

- **View or control.** **View only** in the screen bar keeps your pointer and keys local. With Accessibility granted on the Mac, pointer and keys reach the Mac while the screen tab has focus.
- **Several displays.** **Single** shows one display, **Span** lays out every display that is on as on the Mac, **Cycle** rotates through them. **Spread to my monitors** opens one full-screen window per local monitor.
- **Curtain.** Blacks out the Mac's own screen and blocks its keyboard and mouse while you work. Someone at the Mac takes it back with Touch ID or by locking the Mac.
- **Sound.** The Mac's audio plays here, with a volume slider and an option to mute the Mac's own speakers meanwhile.
- **Resolution.** Pick a host resolution in the screen settings (⚙) and **Reconnect with this resolution**.
- **Locked Mac.** If the Mac is locked, the screen view says whether lock screen control is on at the Mac and when the curtain is needed to unlock. The switch itself is changed only at the Mac, never from Dureh.

The same works for a Linux node with a desktop session, on X11 and on Wayland.

## 4. Hire a coding agent into one folder on a GPU node

You want Claude Code to work on one project on a remote machine, and nowhere else.

1. On **Agents**, click **＋ Hire agent**. The wizard has four steps: **Where**, **What**, **How**, **Review**.
2. **Where:** pick the machine and account. Log in first if needed.
3. **What:** Dureh scans the account for agent CLIs. Pick one that is installed, or click **Install** to type its install command into a terminal.
4. **How:** give the agent a name and an optional role and group. Choose **Chat** or **Terminal** mode. Choose a **Workspace**: an existing one or a new folder with a **tier** (Open, Standard, Private or Locked). Tick the access it gets: read nodes and routes, propose port forwards, message other agents, see or control Mac screens.
5. **Review** shows the workspace, the tier, the model provider the agent's reads go to, the files Dureh writes, and any policy conflicts. **Hire** writes the harness files and starts the agent.

A cloud agent (Claude Code, Codex) in a **Standard** workspace needs your approval; the Hire click is that approval, and it is shown in the agent's Properties › Access, where you can revoke it. A **Private** workspace takes local agents only (Ollama), so nothing leaves the node. A **Locked** workspace is read-only for agents.

Each agent gets its own CLI home. Your own `~/.claude` and `~/.codex` are not touched, and the agent signs in on its own in a terminal step after Hire.

## 5. Run several agents and approve what they ask

Three agents work on three nodes. You want one place to see them.

- **Agents › Overview** shows a tile per agent with its last activity and a **waiting** badge when it asks for approval.
- **Conversations** lists every chat. A Chat-mode agent streams its text, shows its tool calls as cards, and asks inline when a command or edit needs your yes; **Approve** arms 0.7 s after it appears so a stray click cannot land on it.
- **Requests** lists port forwards, reverse forwards, messages and screen-control windows that agents proposed. Each one runs only after you approve it in Dureh.
- Agents message each other through Dureh (**Message other agents** in their access), and you read those messages in the side panel's Activity tab.

Agents run in tmux sessions on their nodes, so they keep working while Dureh is closed. When Dureh starts again it reconnects to the node and picks up the conversation where it left off.

## 6. Keep this computer's own terminals and tools in order

Dureh is also a desk for the computer it runs on.

- **This computer** is a card on Network and the first row in the Outliner. Its terminals, local Files and a local agent work without any node.
- **Open in VS Code** opens a node folder in VS Code through its Remote-SSH extension (Settings › Editor chooses the editor).
- **Web tabs** open a node's web page as a sandboxed tab next to Canvas.
- **Settings › Data** backs up everything Dureh keeps here into one file, restores it, or resets the app. Keys, passwords and the agents' own keys are never in a backup.
