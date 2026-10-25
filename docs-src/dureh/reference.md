---
title: Reference
---

# Reference

Screens, menus, settings, files and versions of Dureh 0.2.0-beta.6. Labels are the English ones in the app.

## Screens

The left rail has five screens. **Network** stays loaded in the background so canvases and remote screens keep running while you look at another screen.

| Screen | What is there |
|---|---|
| **Home** | Widgets for this computer: Status, Resources, Network, Dureh services, Routes, Containers, Activity. Drag a header to reorder, **×** hides, **＋ Add widget** restores. |
| **Network** | The canvas with **This computer** and one card per machine, plus one tab per open remote screen or web page. |
| **Agents** | Tabs **Overview**, **Conversations**, **Access**, **Hired**, **Workspaces**, **Requests**, and the **＋ Hire agent** button. |
| **Resources** | One row per machine: CPU, Memory, Disk (the fullest mount), GPU, Updated. **Refresh** and **Refresh all** scan again (read-only). A node that is not logged in shows **Log in**. |
| **Settings** | Appearance, Terminal, Keyboard shortcuts, Connections, Browser, Editor, Add-ons, Stored tunnels, Data, Labs. |

### Top bar

Breadcrumb, status pills, the **＋** create menu, a Dark/Light toggle, and the toggles for the terminal panel and the side panel. A **Recovery** pill appears when stored tunnel records from an earlier run exist.

### Create menu (＋, ++shift+a++)

The menu lists the items for the current screen first, then **Everywhere** with the rest. Nothing is listed twice.

| Item | Where |
|---|---|
| **Add node…** | Network, Home, Resources; everywhere |
| **Add service** | Network |
| **Import SSH config…** | Network |
| **Import YAML**, **Export YAML…**, **Undo last import** | Network (under *Templates*); everywhere |
| **Hire agent…** | Agents, Home, Resources; everywhere |
| **New group…** | Agents |
| **Client setup (temporary agent)** | Agents |
| **Add add-on…** | everywhere |

### Side panel (++ctrl+alt+b++)

Three collapsible sections, each with a drag handle:

- **Outliner.** This computer first, then machine ▸ account ▸ services, endpoints, desktops, tmux/screen sessions and hired agents. Click selects, double-click opens the detail popup or the remote screen. The eye hides a row on the canvas; the lock keeps a card from being dragged, connected or deleted. Both are view state only.
- **Properties.** For a node: vertical tabs **Machine** (name, address, system, Connection with **Check now**, Reconnect), **Account** (account, login method, **SSH keys**, Connect, Session with port forwarding and the SSH config alias), **Services**, **Permissions**. For an agent: **Identity**, **Home**, **Access**, **Key**, **Activity**, **Actions**.
- **Layers.** One row per OS account name. Choosing one highlights that account in every card. A view filter only.

### Node detail popup

Double-click a card: **Overview · Ports · Sessions · Accounts · Actions**. Actions are marked `read-only` (scan), `uses login` (terminal, desktop), `needs approval` (port forward, reverse forward, open web) or `local` (add service). The Pumasi setup card is here too.

### Canvas

- Right-click a card: **Open details**, **Open terminal** / **Log in…**, **Add service**, **Delete node**. Deleting a node removes it from Dureh only; keys, grants and services on the node remain. **Undo** restores the card.
- Toolbar: endpoint labels, hide inactive, find node, fit, auto-arrange (**Flow**, **Grid**, **By group**). Endpoints are shown as dots or rows; a legend explains the colours.
- Drag from one endpoint dot to another to connect services.

### Node states

| State | Meaning |
|---|---|
| **Unknown** | Not checked yet (hollow dot). Never shown as Offline. |
| **Offline** | The last check did not reach the node. |
| **Reachable** | SSH answers; not logged in. |
| **Logged in** | A login is kept. |
| **Connected** | Logged in with an open terminal or a connected screen. |

### Terms

| Term | Meaning |
|---|---|
| **Port forward** | A local port here reaches a port on the node (SSH `-L`). |
| **Reverse forward** | A port on the node reaches a port here (SSH `-R`). |
| **Listen on** | Where a forward listens: Loopback, LAN or Tailnet. LAN and Tailnet need the Labs flag. |
| **Tunnel** | A persistent service wiring between nodes (Labs). |
| **Endpoint** | A service's connection point on a card (source → / → target). |

## Login popup

Opens from **Add node**, a card's **Log in** button, the context menu or Properties › Account › Connect.

1. **Connect** reads the host key and shows its fingerprint. With other keys known for the same machine, it says **Same host key as this machine** or warns that it is not.
2. **I verified this fingerprint using a trusted source** pins it.
3. **Authentication:** Existing SSH agent identity · Existing private key file · Password.
4. **Reconnect on start** (agent identity or key file without passphrase only).
5. Once logged in: **Open terminal**, Files, port forwarding, and **Create or select an SSH key** (optional). Private keys made there stay on the node; Dureh registers only public keys.

A login ends after 30 minutes unless **Reconnect on start** is on for that node.

## Terminal panel (++ctrl+grave++)

- **＋** opens a terminal on this computer; **▾** picks a machine ▸ account (logs in first when needed) or an agent CLI to start.
- Header: split (single → side by side → stacked), kill, maximize, close.
- With **Ask for a name when opening a terminal** (Settings › Terminal), a small popup asks for a name and **Keep running (tmux)**. A kept terminal survives the login and Dureh closing.
- New terminal: ++ctrl+shift+grave++.

## Screen bar

Shown at the top of a remote screen tab. If hidden, move the pointer to the top edge or use the **Show screen bar** shortcut.

| Group | Controls |
|---|---|
| **Displays** | One numbered button per display (main marked). |
| **View mode** | **Single** (one display), **Span** (every display that is on, laid out as on the Mac), **Cycle** (rotate; needs View only), Previous / Next display. |
| **Input** | **View only** (input is not sent). **Curtain** (Mac): blacks out the Mac's own screen and blocks its keyboard and mouse; the person there takes back with Touch ID or by locking the Mac. While the Mac is locked the toggle reads **Armed** and the curtain comes up at the unlock. |
| **Audio** | **Sound** on/off. Older Pumasi: "Update Pumasi to hear this computer". |
| **Host resolution** | Opens Settings at the Host resolution row (++ctrl+alt+shift+r++). |
| **Settings** (⚙) | The popover below. |
| **Session** | **Full screen** (++f11++), **Disconnect** (stops every stream and control connection to this node). In a spread window: **Close window**, **Close all**. |

### Screen settings popover

| Row | Choices |
|---|---|
| **Capture** | Capture size (what the node sends; **Match window** fits this view in device pixels) and frame rate (up to 15 fps, remembered per node). |
| **Window** | **Fit**, **Fit, no upscale**, **Stretch**, **1:1**; **Integer (sharp pixels)** with Fit. |
| **Input** | Input mode and the current input state. |
| **Cursor** | Local cursor over the stream; remote cursor (the node's pointer in the video) on or off. While a locked Mac holds input back, the local cursor shows a dot. |
| **Sound** | Volume; mute the node's own speakers while its sound plays here. |
| **Cycle** | Interval: every 5, 10, 20, 30 or 60 s. |
| **Displays** | Turn displays on or off for Span. |
| **Host resolution** | A display mode on the Mac, applied with **Reconnect with this resolution**. Needs control, Mac Pumasi 0.11.0 or newer, and **Allow resolution changes from Dureh** in the Pumasi menu on the Mac. Not available for Linux nodes yet, nor in a spread window. |
| **Monitors** | **Spread to my monitors**: one full-screen window per local monitor. |

### Notes on a Mac screen

- **Lock screen control on at <node> · until …** while the Mac allows it. The switch and its auto-off are changed only at the Mac.
- With the Mac locked and lock screen control off, the view says so and drops input; when the curtain is needed to unlock, **Turn on curtain** is offered.
- **Another account is using the screen of <node>** (fast user switching, Mac Pumasi 0.19.0): input from here is ignored until this account is back at the screen.

## Agents

### Hire wizard

| Step | Fields |
|---|---|
| **Where** | Machine and account (This computer or a logged-in node). |
| **What** | The agent CLIs found on the account (Claude Code, Codex, Ollama), with **Check version**, **Install**, **Uninstall** and **Record** for a CLI installed through Dureh. |
| **How** | **Name**, **Role**, **Group**, **Mode** (Chat or Terminal), **Workspace** (existing, or a new folder with a **Tier**), **Access** (read and write / read only), and the scope: Read nodes and routes · Propose port forwards · Message other agents · See Mac screens (Pumasi) · Control Mac screens (Pumasi) in windows you approve. |
| **Review** | Route, session, agent, workspace and tier, model provider, policy, conflicts, mode, access, folder trust, the harness files Dureh writes (new / replace with backup kept), the agent's CLI home and version, then **Hire**. |

After Hire: **Open sign-in terminal**, **Check sign-in**, **Start agent** or **Start later**. You type the sign-in into the CLI; Dureh never sees it.

### Workspace tiers

| Tier | Meaning |
|---|---|
| **Open** | Any agent you run. |
| **Standard** | Local agents freely; a cloud agent only with your approval for this workspace. The default. |
| **Private** | Local agents only; nothing leaves the node. |
| **Locked** | Agents read only; only you change it. |

Network egress per agent: **No network**, **Model APIs only**, **Any network**. Widening a tier, a grant or egress asks for approval; narrowing applies at once. Conflicts between rules are listed on the **Workspaces** tab, and until you pick a fix the most restrictive reading runs.

### Agent access (the **Access** tab)

- **Turn on / Turn off** the local server agents talk to. It listens on `127.0.0.1` only, port 47821 or a free port if that one is taken.
- **Connect a client** shows the lines for Claude Code and for other clients, with the key masked. **New key** stops the old key at once.
- **Clients**, **Waiting for approval** and **Requests this run**. Request kinds: Port forward, Reverse forward, Message, Screen control.

### Agent actions

In the agent's Properties › Actions: **Suspend** / **Resume** the key, **Dismiss…** (stop the session, remove harness files, optionally delete the conversation and the agent's CLI data). **Restore Dureh's settings** appears when the agent's policy file was changed.

## Settings

| Page | Contents |
|---|---|
| **Appearance** | Theme: System, Dark (default), Light, High contrast dark, Blender-like, VS Code Dark-like. Accent swatches or a custom colour, with a contrast check. Canvas motion. Canvas style. |
| **Terminal** | Ask for a name when opening a terminal. |
| **Keyboard shortcuts** | Presets Dureh, VS Code-like, Blender-like; click a row to record a key; per-row reset, **Reset all**. |
| **Connections** | **Reconnect on start for opted-in nodes** (master switch) and each opted-in node with its state and last result. |
| **Browser** | **Open with** (system default or a found browser) and **Use a separate Dureh profile**. |
| **Editor** | **Open with** for Open in VS Code (VS Code or VSCodium with the Remote-SSH extension). |
| **Add-ons** | The add-on catalog (node types, services, apps, clients, agents). |
| **Stored tunnels** | **Review stored tunnels** (journals from Labs service wiring). |
| **Data** | Saved counts, **Back up…**, **Restore…**, **Reset…** (type `RESET`), **Copy diagnostics**, automatic backups, notices. |
| **Labs** | Experimental flags, off by default: **VS Code tunnel** (goes through Microsoft's relay), **Service wiring and Link** (changes SSH settings on nodes), **Expose on LAN / Tailnet** (opens a port beyond this computer), **Run agents without tmux**, **Card style: Petal**. |

### Default shortcuts

| Action | Keys |
|---|---|
| Create menu | ++shift+a++ |
| Side panel | ++ctrl+alt+b++ |
| Terminal panel | ++ctrl+grave++ |
| New terminal | ++ctrl+shift+grave++ |
| Full screen (remote screen) | ++f11++ (++esc++ leaves) |
| Host resolution (remote screen) | ++ctrl+alt+shift+r++ |

## Files and paths

Linux paths. macOS paths are not yet documented; Windows is not yet available.

### App data: `~/.local/share/dev.dureh.desktop/`

| File | What | In a backup |
|---|---|---|
| `localstorage/` | The graph (nodes, services, agents, positions) and the settings, kept by the app's web view | yes |
| `reconnect.json` | Reconnect-on-start records: endpoint, pinned host key, method (key file path or agent fingerprint) | yes |
| `agent-keys.json` | Hired agents: key hashes, scope, home, CLI home | yes |
| `agent-policy.json` | Workspaces, tiers, grants and egress as enforced | yes |
| `host-key-algorithms.json` | Which key algorithm each pinned fingerprint negotiated | yes |
| `agent-audit.jsonl` (+ `.1`) | Audit log of agent access, approvals and reconnects; 1 MiB, one rotation | yes |
| `logs/dureh.log` (+ `.1`) | App log: start, version change, backups, store notices | no |
| `app-version.json` | The last version that started | no |
| `backups/dureh-<reason>-<time>-v<version>.tar` | Automatic backups: `upgrade`, `before-restore`, `before-reset`; last 5 of each | — |
| `<store>.corrupt-<time>` | A store that could not be read, kept aside | no |
| `wiring-transactions/` | Service-wiring journals (Labs) | no |
| `browser-profile/`, `browser-profile-firefox/` | Dureh's separate browser profiles (cookies and logins) | no |

### Elsewhere on this computer

| Path | What |
|---|---|
| `~/.ssh/dureh-<alias>/config` and an `Include` line in `~/.ssh/config` | The workstation SSH alias, written only after you confirm |
| `~/.local/state/dureh/{agents,code,pumasi}` | Agent relay sockets and CLI homes, editor sockets, the Pumasi socket when this computer is a node |
| `~/.local/share/dureh/{tools,helpers}` | CLIs installed through Dureh, the Pumasi helper |

Private key files you select are never copied or moved. On a node, hired agents live in their workspace folders and in `~/.local/state/dureh/agents/<id>/`.

### Backup and reset

A backup is one `.tar` with the stores above and the app's own settings. Not included: passwords (never saved), private keys and key files, the agents' own keys (only their hashes), the browser profiles, unfinished wiring journals, the app log. Restore refuses a backup from a newer Dureh and a damaged archive, and makes a `before-restore` backup first. Reset removes what Dureh keeps on this computer and never touches a node.

## Versions

- Dureh follows Semantic Versioning. Pre-releases go `alpha.N` → `beta.N` → `rc.N`. The Debian package writes `0.2.0~beta.6` so that the final `0.2.0` upgrades it.
- Dureh, Masil and every Pumasi build share the MAJOR number (0 until the first stable release); MINOR and PATCH belong to each module.
- Dureh 0.2.0-beta.6 was built for Mac Pumasi 0.17.0 and Pumasi for Linux 0.5.4. A newer Dureh follows newer Pumasi versions; an older Pumasi reads as "older" and the card offers **Update…**.
- The current version shows on Home (Status widget) and in Settings › Data.
