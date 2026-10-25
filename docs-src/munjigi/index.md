---
title: Munjigi
---

# 문지기 Munjigi

*Munjigi* means gatekeeper: the person who decides who may come through the gate.

Munjigi is a small service on a Linux computer. It brings an account's desktop session back to the screen, or starts one, so that [Pumasi](../pumasi/index.md) can serve that screen again.

Pumasi runs inside the desktop session of the account at the screen. Two cases leave a remote viewer with a black picture:

- Someone used **Switch user**, and the session is now behind the login screen.
- Nobody has logged in at the screen since the computer started.

Munjigi fixes both cases without a password.

## How it protects the computer

- **No passwords.** Munjigi never asks for, sees or stores a password. A locked session stays locked.
- **You are who you logged in as.** The service knows the caller from the local account that connects to it. Your SSH login already proved who you are.
- **Your own account by default.** Any account may act on its own sessions. Acting on another account needs an admin role, and either a managed service account or that account's own consent (`munjigi allow-admin`).
- **The person at the screen comes first.** If someone else is using the screen, Munjigi refuses to push their session aside.
- **A second factor for other accounts.** From version 0.3.0, acting on another account also needs the caller's own one-time code (TOTP).
- **Everything is logged.** Every request goes to the system journal with caller, operation, target and result. Codes and secrets are never logged.

## Platforms and status

| Platform | Version | Status |
|---|---|---|
| Linux with systemd and GDM | 0.3.0 | Private beta |
| Linux, second factor (TOTP) | 0.3.0 | Private beta |
| macOS | — | Not yet available |

- `munjigi start` needs GDM, the GNOME login screen. `munjigi activate` works without it.
- Only local accounts (from `/etc/passwd`) are listed in this version.
- A public download is not yet available.

!!! note "Private beta"
    Munjigi is in private beta. Versions start with `0.`, and behaviour can still change between releases.

## Next steps

- [Getting started](getting-started.md): install the service and bring a session back.
- [Use cases](use-cases.md): common situations.
- [Reference](reference.md): commands, settings, status output and error codes.
- [Troubleshooting](troubleshooting.md): refusals and what they mean.
