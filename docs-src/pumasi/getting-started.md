---
title: Getting started
---

# Getting started with Pumasi

You install Pumasi on the **host**: the computer whose screen you want to see. You then add that host in a viewer on your other device.

## Before you start

- **An account on the host that logs in at its screen.** Pumasi runs inside that account's desktop session. It shares the screen of that account only.
- **SSH on the host.** The viewer logs in to that account over SSH. Pumasi itself opens no port; SSH is the only way in.
- **A viewer**: [Pumasi Viewer](../viewer/index.md) or [Masil](../masil/index.md) on your other device, or [Dureh](../dureh/index.md).
- **The package** for your host from the download page.

## Install on the host

=== "macOS"

    Requires macOS 13 or later.

    1. Log in at the Mac's screen with the account you want to reach.
    2. Open `Pumasi-<version>.pkg` and follow the installer.
        - It puts `Pumasi.app` in `/Applications`.
        - It starts Pumasi for the user logged in at the screen (a LaunchAgent). Other accounts are not changed.
    3. Pumasi appears in the menu bar. At the first start the **Set up Pumasi…** window opens.
    <!-- screenshot: the Set up Pumasi window with the three permissions -->
    4. Turn on **Remote Login** if it is off: **System Settings › General › Sharing › Remote Login**.
    5. Allow Pumasi in **System Settings › Privacy & Security**:
        - **Screen & System Audio Recording**: the picture and the sound.
        - **Accessibility**: mouse and keyboard.
        - **Input Monitoring**: the privacy curtain.
    6. Note the address and the account name that **Set up Pumasi…** shows. You need both in the viewer.

    Each item in **Set up Pumasi…** has a button that only opens the right System Settings pane. Pumasi changes no setting by itself, and it never asks for or shows a password. You can open the window again from the menu bar at any time.

    Pumasi starts at every login. You can turn that off in **System Settings › General › Login Items › Allow in the Background**.

=== "Linux"

    Built for Ubuntu on amd64 (tested on Ubuntu 24.04). Works on X11 and on Wayland.

    1. Install the package. apt pulls in GStreamer and the other dependencies:

        ```sh
        sudo apt install ./pumasi_<version>_amd64.deb
        ```

    2. Nothing is turned on at install. Turn Pumasi on for your account. Run this as the account that logs in at the screen, **without** `sudo`:

        ```sh
        pumasi enable
        ```

        If you are logged in at the screen now, Pumasi starts at once. Otherwise it starts with the next login at the screen.

    3. Check that it runs:

        ```sh
        pumasi status
        ```

    4. Make sure the SSH server is installed and running on the host, for example the `openssh-server` package.

    5. On **Wayland** (for example GNOME), the desktop must allow sharing once. Pumasi Viewer and Masil cannot ask for it yet, so ask from a terminal on the host, as the same account, while you sit at its screen:

        ```sh
        pumasi request
        ```

        GNOME's **Remote Desktop** dialog opens on the host's screen. Accept it there. Pumasi keeps the grant for later sessions. In Dureh you can use **Request approval** instead.

    On X11 no dialog is needed.

    Repeat `pumasi enable` for every account that should be reachable.

=== "Windows"

    Not yet available. A Windows host is in development. Today, use Windows as the **viewer** side with [Pumasi Viewer](../viewer/index.md) or [Masil](../masil/index.md).

## First connection

=== "Pumasi Viewer or Masil for Windows"

    In Masil for Windows, choose **+ › Pumasi node…**. See [Pumasi Viewer](../viewer/index.md) for the viewer's own steps.

    1. Enter the host's address and the account name.
    2. Confirm the host's **SSH host key**. The viewer reads it before any login.
    3. Log in with an SSH key: a key file, a `Host` entry from `~/.ssh/config`, or the Windows OpenSSH agent. No password or private key is stored.
    4. Confirm the **Pumasi build** (its SHA-256) that the viewer found on the host.
    5. Connect. The host's screen appears.

    The viewer refuses the host later if its host key or its Pumasi build no longer matches what you confirmed.

=== "Masil for Android"

    1. Add the host by its address and account name.
    2. Type the account's password once. Masil installs the phone's own SSH key on the host.
    3. From then on Masil logs in with that key.

    See [Masil](../masil/index.md) for details.

=== "Dureh"

    Add the computer as a node in Dureh. Then open the node's details › **Overview › Screen**, and choose **Record…** if Dureh asks. Dureh can also install and update Pumasi on the node. See [Dureh](../dureh/index.md).

When the session starts, the host shows it: on macOS the menu bar lists who is **Watching** or **Controlling**, each with its own **Stop**.

## Uninstall

=== "macOS"

    In the menu bar, choose **Uninstall Pumasi…**. It shows a command and copies it. Run it in Terminal as the user logged in at the Mac, **not** with `sudo`:

    ```sh
    bash "/Applications/Pumasi.app/Contents/Resources/uninstall.sh"
    ```

    Add `--dry-run` to only list the steps. The script:

    - stops your Pumasi and removes its LaunchAgent and socket;
    - keeps your settings folder `~/.local/state/dureh/pumasi` if settings are in it;
    - asks before it uses `sudo` to remove `/Applications/Pumasi.app`.

    Pumasi never runs this script by itself. Other accounts' LaunchAgents and the **Privacy & Security** entries stay; remove those in System Settings. A copy that Dureh installed has no script; remove it from Dureh.

=== "Linux"

    Turn it off for your account, then remove the package:

    ```sh
    pumasi disable
    sudo apt remove pumasi
    ```

    Removing the package stops running copies. Each account's `~/.local/state/dureh/pumasi/` folder stays; delete it by hand if you want.
