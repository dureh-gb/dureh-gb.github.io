---
title: Getting started
---

# Getting started with Munjigi

## What you need

- A Linux computer with systemd (`loginctl` must be present).
- GDM, the GNOME login screen, if you want `munjigi start`. Without GDM, `munjigi activate` still works.
- An account with `sudo` rights for the install.
- SSH access to the computer for the accounts that will use Munjigi.

A public download is not yet available. The steps below assume you already have the three install files.

## Install and enable the service

1. Put these three files in one folder on the computer:
    - `munjigi` (the program)
    - `munjigi.service` (the systemd unit)
    - `install.sh` (the installer)
2. In that folder, run:

    ```sh
    sudo ./install.sh
    ```

The installer:

- puts the program in `/usr/lib/dureh/` and links it as `/usr/bin/munjigi`;
- installs and starts the `munjigi.service` systemd service;
- writes `/etc/dureh/munjigi.json` if it does not exist yet. The account that ran `sudo` becomes the first admin.

Running the installer again upgrades the program. It keeps your existing settings.

Check that it works:

```sh
munjigi status
```

## Bring your own session back

Say you are `alice`. Someone used **Switch user**, and your session is behind the login screen. Over SSH, run:

```sh
munjigi status
```

Under **Accounts**, your line shows something like:

```
  alice        behind the greeter: `munjigi activate 2`
```

Run the command it shows:

```sh
munjigi activate 2
```

Your session comes back to the screen. Pumasi should serve again within a few seconds. If your session was locked, it stays locked.

## Start your session after a restart

If nobody has logged in since the computer started, your line says `no session`. Start your desktop session:

```sh
munjigi start alice
```

Pumasi starts with the session.

!!! warning "A new session is unlocked"
    `munjigi start` opens a new, unlocked desktop session on the screen. Anyone in front of the computer can use it. Lock it, or use this only where the screen is in a safe place.

## Let an admin act on your session (consent)

An admin can only start or bring back another person's session if that person agreed. To agree, log in as yourself on the computer and run:

```sh
munjigi allow-admin
```

To take it back at any time:

```sh
munjigi allow-admin --revoke
```

Service accounts that nobody sits at do not need consent. An admin lists them under `managed` in the settings file. See [Reference](reference.md#settings-file).

## Set up the second factor (version 0.3.0)

From version 0.3.0, acting on **another** account needs your own one-time code. Acting on your own account does not.

1. At the computer, an admin runs `sudo munjigi 2fa enroll alice`.
2. The terminal shows a QR code once. Scan it with an authenticator app. It is not shown again.
3. From then on, add your current code when you act on another account:

    ```sh
    munjigi activate 3 --code 123456
    ```

## Remove Munjigi

```sh
sudo ./install.sh --remove     # stop and remove; keeps /etc/dureh/munjigi.json
sudo ./install.sh --purge      # also removes the settings file
```
