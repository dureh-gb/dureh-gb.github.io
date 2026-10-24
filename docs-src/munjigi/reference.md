---
title: Reference
---

# Munjigi reference

## Commands

| Command | What it does |
|---|---|
| `munjigi status` | Shows sessions, accounts, what you may do with each, and who is at the screen. |
| `munjigi activate <session> [--code N]` | Brings a session back to the screen, for example after **Switch user**. A locked session stays locked. |
| `munjigi start <account> [--code N]` | Starts that account's desktop session, or brings it back if it exists. Needs GDM. |
| `munjigi allow-admin` | Run as yourself: lets the computer's admins start and bring back your session. |
| `munjigi allow-admin --revoke` | Takes that consent back. |
| `sudo munjigi 2fa enroll <account> [--replace]` | (0.3.0) Enrolls the account's one-time code. Shows a QR code once. `--replace` issues a new secret; old codes stop working. |
| `sudo munjigi 2fa revoke <account>` | (0.3.0) Removes the account's second factor. |
| `sudo munjigi 2fa unlock <account>` | (0.3.0) Lifts a lockout of the account's second factor. The secret stays the same, so the authenticator app keeps working. |
| `munjigi version` | Shows the version. |
| `munjigi serve` | The service itself. systemd runs it as `munjigi.service`; you do not run it by hand. |

`--code N` is your own one-time code. From version 0.3.0 it is required when the target is another account.

## Who may do what

| Caller | May act on |
|---|---|
| Any account | Its own sessions and its own account. |
| An admin | Accounts listed in `managed`, and accounts that ran `munjigi allow-admin`. |
| `root` | Everything. |

The consent from `munjigi allow-admin` is a file in that account's home folder, `~/.config/dureh/allow-admin-session`. It counts only if it is a regular file owned by that account.

Munjigi checks every request in this order:

1. **Policy.** The rules above. Refusal: `NotAllowed`.
2. **Someone is at the screen.** Refusal: `InUse`. See below.
3. **Second factor** (0.3.0). Refusal: `NeedsSecondFactor` or `SecondFactorLocked`.
4. **The action.**

## Settings file

The settings are in `/etc/dureh/munjigi.json`:

```json
{ "admins": ["alice"], "managed": ["builder"], "inUseSeconds": 300 }
```

| Key | Meaning | Default |
|---|---|---|
| `admins` | Accounts that may act on other accounts, within the rules above. | `[]` |
| `managed` | Service accounts that nobody sits at. Admins may act on them without consent. | `[]` |
| `inUseSeconds` | Input within this many seconds means someone is at the screen. `0` turns the rule off. | `300` |

If the file is not valid JSON, Munjigi treats it as having no admins.

Safe settings:

- Keep `admins` short.
- Put only real service accounts in `managed`. People should give consent with `munjigi allow-admin` instead.
- Keep `inUseSeconds` above `0` unless nobody ever sits at the computer.

## The "someone is at the screen" rule

Munjigi refuses `activate` and `start` with `InUse` when both are true:

- the session on the screen belongs to a different account than the target, and
- that session saw keyboard or mouse input within `inUseSeconds`.

If the system cannot tell when the last input was, the request is refused too.

The rule does not apply when:

- the caller is `root`;
- the caller is the person at the screen, switching away;
- the login screen is showing, or the target's own session is already on the screen.

The idle time comes from GNOME through systemd-logind. GNOME marks a session idle only after its own idle delay (the screen-blank delay, 5 minutes by default). So the real wait is the longer of `inUseSeconds` and that delay.

## Second factor (version 0.3.0)

Version 0.3.0 adds this.

- Acting on another account needs the caller's own one-time code. Acting on your own account, or as `root`, does not.
- The code is a standard TOTP code: 6 digits, a new code every 30 seconds. Any common authenticator app works.
- Each code is accepted once. Using the same code again counts as a wrong code.
- Five wrong codes in a row lock your second factor. The first lockout lasts 15 minutes, the second 30 minutes and the third 60 minutes. The fourth lockout does not end by itself: an admin must run `sudo munjigi 2fa unlock <account>` at the computer. A correct code starts the count again from zero.
- The secret is stored on the computer for `root` only, in `/etc/dureh/munjigi/totp/<account>`. Only the service checks it. Viewers only pass the code along.
- Enrollment is done at the computer, with `sudo`. The QR code is shown once, in the terminal. Do not photograph or share it.
- Passkeys (FIDO2) are not yet available.

## Status output

`munjigi status` prints four parts.

```
Sessions (seat0 = the screen; Pumasi serves the active user session):
  SESSION  ACCOUNT      SEAT   TTY    CLASS    STATE
  2        alice        seat0  tty2   user     online
  3        bob          seat0  tty3   user     active
Accounts:
  alice        behind the greeter: `munjigi activate 2`
  bob          not yours: bob has not allowed admin access (that account runs `munjigi allow-admin`)
  builder      no session: `munjigi start <account>`
Screen: bob (session 3), last input 42 s ago; in use: switching to another account is refused until 300 s without input
Second factor (to act on another account): TOTP enrolled for you; pass --code <6 digits>
```

- **Sessions.** Every session. `seat0` is the screen.
- **Accounts.** For each account, what you may do:
    - `on screen (session N)`: it is on the screen now.
    - `behind the greeter: ...`: it runs behind the login screen; the line shows the command to bring it back.
    - `no session: ...`: start it with `munjigi start`.
    - `not yours: <reason>`: you may not act on it, and why.
- **Screen.** Who is on the screen and when they last used it:
    - `in use now (not idle)`, `last input N s ago`, or `last input unknown`.
    - Then `in use: ...` (switching is refused) or `idle: another account may be brought to the screen`.
- **Second factor** (0.3.0). Whether you have one enrolled.

The **Screen** line is missing when the login screen is showing or nobody is logged in.

## Error codes

Each refusal shows a stable code and a message, for example `munjigi: InUse: ...`.

| Code | Meaning |
|---|---|
| `NotAllowed` | The policy does not allow this. |
| `InUse` | Someone is using the screen. |
| `NeedsSecondFactor` | (0.3.0) Code missing, wrong or reused, or you are not enrolled. The message shows the tries left. |
| `SecondFactorLocked` | (0.3.0) Five wrong codes in a row. Locked for 15, then 30, then 60 minutes; the fourth lockout lasts until an admin runs `sudo munjigi 2fa unlock <account>`. |
| `SecondFactorState` | (0.3.0) The service could not record the attempt, so it refused. |
| `SeatBusy` | `start` while another account has a session on the screen. |
| `NoSession`, `NotSeat`, `NoAccount` | The target does not exist, is not a screen session, or is not a login account. |
| `NotActive`, `NotStarted` | The session did not come up in time. `start` waits 45 seconds. |
| `NoGdm`, `Gdm`, `Logind` | GDM is missing, or GDM or systemd-logind failed. |
| `BadRequest`, `TooLong`, `NoPeer` | A malformed request, a request over 4 KiB, or the caller could not be identified. |

## Files

| Path | What |
|---|---|
| `/usr/bin/munjigi` | The command (a link to `/usr/lib/dureh/munjigi`). |
| `/etc/systemd/system/munjigi.service` | The service. |
| `/etc/dureh/munjigi.json` | Settings. |
| `/run/dureh/munjigi.sock` | The local socket that commands and viewers talk to. |
| `~/.config/dureh/allow-admin-session` | An account's consent. |
| `/etc/dureh/munjigi/totp/` | (0.3.0) Second-factor secrets, `root` only. |
| `/var/lib/dureh/munjigi/` | (0.3.0) Replay and lockout state, `root` only. |

## Log

```sh
journalctl -u munjigi
```

Each line shows caller, operation, target and result. Codes and secrets are never logged.

## Versions

| Version | Date | Change |
|---|---|---|
| 0.3.0 | 2026-10-23 | Second factor (TOTP) for acting on another account: `--code`, `2fa enroll`, `2fa revoke`, `2fa unlock`. |
| 0.2.0 | 2026-10-22 | `InUse` refusal while someone is at the screen; `Screen` line in `status`; `inUseSeconds` setting. |
| 0.1.0 | 2026-10-21 | First version: `status`, `activate`, `start`, `allow-admin`. |
