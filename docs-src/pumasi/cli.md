---
title: Command line
---

# Command line

Most people never need the command line: on a Mac, Pumasi lives in the menu bar; on Linux, three commands turn it on and off. The other commands are for checking a host.

## Linux: `pumasi`

The `.deb` installs the command `pumasi`. Run it as the account that logs in at the screen, **without** `sudo`.

| Command | What it does |
|---|---|
| `pumasi enable` | Turns on the user service `app-dureh.pumasi.service` for this account. It starts now if this account's desktop session is active, then with every login at the screen. |
| `pumasi disable` | Turns it off for this account and stops it. |
| `pumasi status` | Shows `systemctl --user status` of the service. |
| `pumasi request` | Since 0.5.6. Asks this account's running Pumasi for screen sharing, as a viewer would. On Wayland, GNOME's Remote Desktop dialog opens on this screen. Prints `consent: asking`, `granted`, `denied` or `none`, with a hint. Exit code 0 when the dialog is open or sharing is allowed, 1 when it was refused or failed, 2 when Pumasi is not running for this account. |
| `pumasi probe` | Prints one line of JSON: the helper's version, displays, permissions, available encoders and missing packages. |
| `pumasi serve` | Runs the helper itself. The service runs this; you do not need to. |
| `pumasi keymap`, `pumasi check-input`, `pumasi check-streams` | Self-checks for diagnosis. They read test lines and print results. They post no input and capture nothing. |

Running `pumasi` with no command, or an unknown one, prints the usage and exits with code 2.

### Messages and exit codes

| Situation | Result |
|---|---|
| `enable` or `disable` run as root | `pumasi enable: run it as the account that logs in on the screen, without sudo.` Exit code 2. |
| `enable` while you are logged in at the screen | `Pumasi is running for <account>.` |
| `enable` while not logged in at the screen | `Pumasi starts with the next login on this computer's screen.` |
| An older copy installed by Dureh exists for this account | A warning that it runs instead of the package's copy. Uninstall it in Dureh to use the package. |
| `serve` without a desktop session | Exit code 3. The service does not restart. |
| `serve` when its folder or socket is not safe | Exit code 1. |

### Logs

The service writes to the systemd journal. Show recent lines with:

```sh
journalctl --user -u app-dureh.pumasi.service --since "10 min ago"
```

The lines name streams, displays, encoders and reasons. Since 0.5.6 they also list each Wayland portal step with its response code. They never contain input, tokens or screen content.

## macOS: `Pumasi`

On a Mac, the program is `/Applications/Pumasi.app/Contents/MacOS/Pumasi`. The LaunchAgent starts it with `serve`. Settings are in the menu bar, not on the command line.

| Command | What it does |
|---|---|
| `Pumasi serve` | Runs Pumasi. The LaunchAgent does this at login; you do not need to. |
| `Pumasi probe` | Prints the displays (size, refresh rate) and the video encoders as JSON. |
| `Pumasi list-modes` | Prints each display's resolutions as JSON. Read-only: it switches nothing. |
| `Pumasi still <w> <h> <display\|main> <jpeg\|png>` | Takes one screenshot and writes it to standard output in the stream's record format. Without the Screen Recording permission it prints `ScreenRecordingNotAllowed` and exits with code 1. It never opens a permission prompt. |
| `Pumasi check-…` | Self-checks used by the tests (for example `check-lock`, `check-curtain`, `check-modes`). They show, post or lock nothing. |

An unknown command prints the full usage.

### Logs

Pumasi writes stream events to the unified log. Show the last ten minutes with:

```sh
log show --predicate 'subsystem == "app.dureh.pumasi"' --last 10m
```

The lines carry display ids, sizes and reasons. They never contain names, screen content or input.

## Windows

Not yet available.
