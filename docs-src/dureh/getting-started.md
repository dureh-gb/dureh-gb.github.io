---
title: Getting started
---

# Getting started

This page takes you from the installer to your first node and your first remote screen.

## Before you install

- **The Dureh computer** runs Ubuntu 24.04 (amd64) or macOS on Apple silicon. Windows is not yet available.
- **Each node** needs an SSH server you can already log in to. Dureh does not turn SSH on for you.
    - macOS: **System Settings › General › Sharing › Remote Login**.
    - Ubuntu and Debian: `sudo apt install openssh-server`.
- **For the remote screen**, the node also needs [Pumasi](../pumasi/index.md). You can add it later from inside Dureh.
- **For agents**, the node needs `tmux` and the agent's own command-line tool (Claude Code, Codex or Ollama). Dureh can type the install command into a terminal for you, but you run it.

## Install

=== "Ubuntu 24.04"

    1. Download `dureh_<version>_amd64.deb` from the download page.
    2. Check its SHA-256 against the value in the release notes.
    3. Install it with apt, which also installs the dependencies (`openssh-client`, `zenity`, `python3` and the OpenSSL and zlib libraries):

        ```sh
        sudo apt install ./dureh_0.2.0~beta.6_amd64.deb
        ```

    The package version uses `~` (`0.2.0~beta.6`), so a later `0.2.0` release upgrades it. Inside the app the version reads `0.2.0-beta.6`.

    If apt warns that the file "couldn't be accessed by user _apt", the file sits in a folder other users cannot enter (usually your home folder). Copy it to a folder apt can read, such as a new folder under `/tmp`, and install from there. Do not change the permissions of your home folder.

=== "macOS"

    1. Download the app from the download page and check its SHA-256.
    2. Move it to **Applications**.
    3. The app is ad-hoc signed and not notarized, so macOS asks for confirmation on first open: **Control-click** the app, then choose **Open**.

## First launch

Dureh opens on **Home**. The left rail has five screens: **Home**, **Network**, **Agents**, **Resources** and **Settings**.

- **Home** shows widgets for this computer: Status, Resources, Network, Dureh services, Routes, Containers and Activity. Drag a widget's header to reorder, click **×** to hide it, and use **＋ Add widget** to bring one back.
- **Network** is the canvas. **This computer** is already there as a card. Each node you add becomes a card next to it.
- The top bar has the **＋** create menu (also ++shift+a++), a Dark/Light toggle and the toggles for the terminal panel and the side panel.

Nothing is saved anywhere but this computer, and nothing is sent anywhere. See [Security and privacy](security.md).

## Add your first node

1. Click **＋** in the top bar and choose **Add node…**.
2. Fill in **Address** (an IP address or a host name), **SSH account**, and optionally **Display name**, **SSH port** and **Operating system**.
3. Click **Add node**. (**Save without connecting** only adds the card.)
4. The login popup opens. Click **Connect**. Dureh reads the node's SSH host key and shows its fingerprint.
5. Compare the fingerprint with one you trust, for example `ssh-keygen -l -f /etc/ssh/ssh_host_ed25519_key.pub` run on the node itself. Then tick **I verified this fingerprint using a trusted source**. This pins the key: from now on a different key is refused.
6. Choose **Authentication**:
    - **Existing SSH agent identity**: click **Read existing agent identities** and pick one.
    - **Existing private key file**: click **Choose private key** and pick the file. The file stays where it is; it is not copied. A passphrase is used for this login only.
    - **Password**: typed for this login only, never saved.
7. Optionally tick **Reconnect on start**. It is offered only for an agent identity or a key file without a passphrase, never for a password.
8. Log in. The card now reads **Logged in**, and the popup offers **Open terminal** and the Files workspace.

A login ends after 30 minutes unless **Reconnect on start** is on for that node; then it is kept alive while the network holds, and logged in again when Dureh starts or the connection comes back. Terminals opened with **Keep running** live in a tmux session on the node and survive the login ending.

!!! tip "Several computers at once"
    **＋ › Import SSH config…** reads concrete `Host` entries from your `~/.ssh/config` and turns the selected ones into node cards. Only the entries you tick are added, and the file is not changed.

## Work on the node

- **Terminal:** the bottom panel (++ctrl+grave++) holds terminal tabs. **＋** opens one on this computer; the **▾** chooser opens one on a logged-in node. Split, kill and maximize are in the panel header.
- **Files:** from the login popup, the node's details (double-click the card) or the terminal panel group. Transfers can be paused and resumed.
- **Port forward:** in the node's details under **Actions**, or from Properties › Account › Session. Each forward is reviewed before it starts and ends with the session.
- **Properties:** the right side panel shows the selected node's Machine, Account, Services and Permissions tabs.

## Your first screen

The remote screen needs Pumasi on the node. The Pumasi card lives in the node's details popup (double-click the card on Network).

=== "Mac node"

    1. Log in to the Mac node.
    2. Open the node's details. The **Pumasi setup** card says whether Pumasi is installed, recorded and running.
    3. Install Pumasi on the Mac if it is missing (see [Pumasi › Getting started](../pumasi/getting-started.md)). The card's **Install…** needs the Mac's developer tools and builds Pumasi over SSH; the standalone package is the simpler path.
    4. If the card says the build was not recorded by this workspace, click **Record…**. Dureh then starts only that exact build (it checks the hash).
    5. On the Mac, allow **Pumasi** under **System Settings › Privacy & Security › Screen & System Audio Recording**, and under **Accessibility** if you want to control it. Click **Check again**.

=== "Linux node"

    1. Log in to the Linux node (Ubuntu 24.04 with a desktop session).
    2. Open the node's details. Click **Install…**: Dureh copies the Pumasi `.deb` to the node and shows one `sudo apt install` line. You type it in the terminal; Dureh never runs sudo.
    3. Click **Record…** so this workspace trusts that exact build, then **Start** if it is not running. Pumasi runs while the account is logged in at the node's screen.
    4. Click **Request approval**. The node shows its **Remote Desktop** dialog: turn on **Allow Remote Interaction** (for control), keep **Remember This Selection**, choose the monitors and click **Share**.

Then open the screen: click the monitor icon on the node's card, double-click the desktop row in the Outliner, or use the details popup. The screen opens as a tab next to **Canvas**. The **screen bar** at the top of the tab holds the display buttons, view mode (Single / Span / Cycle), **View only**, **Curtain** (Mac), **Sound**, **Settings** (⚙), **Full screen** (++f11++) and **Disconnect**. If the bar is hidden, move the pointer to the top edge of the tab.

<!-- screenshot: Network canvas with This computer, one node card and the Properties panel -->

## Next steps

- [Use cases](use-cases.md) shows what to do with several nodes and agents.
- [Reference](reference.md) lists every screen, setting and file.
- [Troubleshooting](troubleshooting.md) when a login or screen does not come up.
