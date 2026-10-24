# Getting started

This page takes you from the installer to your first connection.

## Before you start

You need:

- A Windows PC (Windows 10 or later).
- A node: a Mac or a Linux desktop with [Pumasi](../pumasi/index.md) installed, reachable over SSH.
- An SSH key that logs you in to that node. Password login is not supported; the viewer never stores a password.

The key can be:

- A key in the **Windows OpenSSH agent** (the `ssh-agent` service). Use this for ed25519 keys and for keys with a passphrase.
- A **key file**: an RSA private key without a passphrase, in OpenSSH or PEM format. The file is read in memory and never changed or copied.

!!! tip "Check the agent"
    Open PowerShell and run `ssh-add -l`. If it lists your key, the viewer can use it. If the command reports that the agent is not running, start the *OpenSSH Authentication Agent* service in Windows Services and run `ssh-add` for your key.

## Install

1. Download `Pumasi-Viewer-Setup.exe` from the download page.
2. Run it. The installer is per user and asks for no administrator permission.
3. Choose whether to create a desktop shortcut, then click **Install**.
4. Tick **Open Pumasi Viewer when finished** if you want to continue right away.

The program goes to `%LOCALAPPDATA%\Programs\Pumasi Viewer` and gets a Start menu entry named *Pumasi Viewer*. Your saved nodes live separately, in `%APPDATA%\Pumasi Viewer`, and survive an uninstall.

<!-- screenshot: the Setup window with the desktop shortcut and "Open when finished" options -->

To remove the program later, use *Apps* in Windows Settings, or run the uninstaller in the install folder. Only the installed files, the shortcuts and the entry are removed. Saved nodes are kept.

!!! note
    The installer refuses to run while Pumasi Viewer is open. Close every viewer window first.

## Add a node

Start Pumasi Viewer from the Start menu. The home window lists your saved nodes. It is empty the first time.

<!-- screenshot: the home window with "No nodes yet. Choose Add node… to add one." -->

Click **Add node…**. The dialog has these fields:

| Field | What to enter |
| --- | --- |
| SSH host (optional) | An alias from your `~/.ssh/config`. Choosing one fills in the name, host, port, account and key file. |
| Name | The name shown in the list. Letters, digits, space, `.`, `_` and `-`. |
| Host | The node's host name or address. |
| Port | The SSH port, normally 22. |
| Account | The account on the node that runs Pumasi. |
| Login key | A key from the Windows OpenSSH agent, or **Choose a key file…**. |

Adding a node takes two checks. Nothing is saved until you confirm both.

1. Click **Check host key**. The viewer reads the node's SSH host key without logging in and shows its fingerprint (`SHA256:…`).
2. Compare it with the node. On the node, run `ssh-keygen -lf /etc/ssh/ssh_host_ecdsa_key.pub`. If it matches, tick **This is the node's SSH host key**.
3. Click **Log in and check Pumasi**. The viewer logs in with your key and reads the Pumasi version and the SHA-256 of the installed Pumasi build.
4. Compare the hash with the Pumasi SHA-256 in the release notes, or compute it on the node: on a Mac `shasum -a 256 /Applications/Pumasi.app/Contents/MacOS/Pumasi`, on Linux `sha256sum /usr/lib/pumasi/pumasi`. If it matches, tick **This is the Pumasi build installed on my node**.
5. The dialog now shows the node's screen and control permissions. You can request them here or later (see below).
6. Click **Save**. The viewer reads Pumasi once more and refuses to save if the hash changed in between.

<!-- screenshot: the Add node dialog after both checks, with both boxes ticked -->

Changing the host, port or account clears both confirmations. Choosing another key clears the Pumasi confirmation.

!!! note "The host key is ECDSA"
    The fingerprint the viewer shows is the node's ECDSA host key. It differs from the ed25519 line in your `known_hosts` file. Compare with `ssh_host_ecdsa_key.pub`, as above.

## Permissions on the node

Pumasi needs permission to capture the screen and to take input. The viewer can ask for them, but the answer is always given at the node, by the person sitting there.

Select a node in the home window and click **Permissions…**. The dialog shows two lines, *Screen* and *Control*, with a short hint each, and these buttons:

- **Request screen permission**: on a Mac, shows the macOS prompt once; on Linux, opens the Remote Desktop dialog on the node, where someone chooses *Share*.
- **Request control** (Mac only): shows the macOS Accessibility prompt. On Linux, control is part of the same Remote Desktop dialog (*Allow Remote Interaction*).
- **Check again**: reads the state once more. On a Mac, Pumasi restarts so that it sees a newly granted permission.

If a permission is missing, the hint tells you where to allow it, for example *System Settings › Privacy & Security › Screen & System Audio Recording › allow Pumasi*.

<!-- screenshot: the Permissions dialog with Screen: Allowed, Control: Allowed -->

Without screen permission a connection opens and then ends with a message that says where to allow it. Without control permission the screen is shown *view only*.

## First connection

Select the node and click **Connect**, or double-click it, or press ++enter++. A new window opens with the title *Connecting…*, then shows the node's screen. The home window stays open, so you can open several nodes.

<!-- screenshot: a node window showing a Mac desktop, with the screen bar handle at the top centre -->

Things to know in the first minute:

- Your keyboard and mouse go to the node while the window is in front. Move the pointer away or switch windows to get them back.
- Move the pointer to the top centre of the window. A small handle grows; click it (or press ++ctrl+alt+shift+g++) to open the **screen bar** with display, view and connection buttons. ++esc++ or a click outside closes it.
- ++ctrl+alt+shift+f++ switches full screen. ++ctrl+alt+shift+v++ switches *View only*.
- The window title shows the node's name, the stream size and the frame rate.

See the [reference](reference.md) for every menu item and shortcut.

## Remove a node

Select the node in the home window and click **Remove…**. Only the profile file on your PC is deleted. Nothing on the node changes: Pumasi, SSH keys, accounts and services stay as they are.
