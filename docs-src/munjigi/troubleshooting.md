---
title: Troubleshooting
---

# Munjigi troubleshooting

Each refusal names a code. Find it below. The full list is in [Reference](reference.md#error-codes).

## "cannot reach the service"

```
munjigi: cannot reach the service at /run/dureh/munjigi.sock
```

The service is not running. Check it:

```sh
systemctl status munjigi
journalctl -u munjigi
```

Start it with `sudo systemctl enable --now munjigi`, or run `sudo ./install.sh` again.

## `InUse`, but nobody is at the screen

Munjigi asks systemd-logind when the screen last saw input. GNOME marks a session idle only after its own idle delay (the screen-blank delay, 5 minutes by default). Until then, the session counts as in use, even if `inUseSeconds` is shorter.

Wait for the longer of `inUseSeconds` and the GNOME idle delay, then try again.

## "last input unknown" counts as in use

`munjigi status` may show:

```
Screen: bob (session 3), last input unknown; in use: ...
```

The system cannot tell when that session last saw input. Munjigi then plays safe and treats the screen as in use. `activate` and `start` for another account are refused with `InUse`.

What you can do:

- Wait and try again later. The value often appears once GNOME marks the session idle.
- Ask the person on the screen to switch away or log out. They can always do that themselves.
- If nobody ever sits at this computer, an admin can set `"inUseSeconds": 0` in `/etc/dureh/munjigi.json` to turn the rule off. Do this only on such computers.
- `root` is exempt, for local recovery.

## `NotAllowed`

You asked to act on another account, and the policy does not allow it. The message says why:

- **"only that account itself or an admin ... may"**: you are not in `admins` in `/etc/dureh/munjigi.json`.
- **"... has not allowed admin access"**: you are an admin, but the target is not in `managed` and has not given consent. That person logs in as themselves and runs `munjigi allow-admin`.

The consent file must be a regular file owned by that account. A link does not count.

## `SeatBusy`

`munjigi start` refuses while another account has a session on the screen, because starting a new one would end it. Either:

- bring the existing session forward with `munjigi activate <session>`, or
- have that account log out first.

## `NoGdm` or `Gdm`

`munjigi start` works only with GDM, the GNOME login screen. On other login screens, use `munjigi activate` for sessions that already exist. Starting a new session there is not yet available.

## `NotStarted` or `NotActive`

The session did not come up in time. For `start`, Munjigi waits 45 seconds after restarting GDM. The login screen may be back. Run `munjigi status` and try again.

## The session came back, but it is locked

This is by design. Munjigi never unlocks a session. Unlock it the usual way, through Pumasi or at the screen.

## `NeedsSecondFactor` (version 0.3.0)

You acted on another account, and the code was missing, wrong or already used, or you are not enrolled.

- Add `--code` with the current 6-digit code from your authenticator app.
- Each code works once. Wait for the next code before you try again.
- Check the clock on your phone. TOTP codes depend on the time.
- Not enrolled? An admin runs `sudo munjigi 2fa enroll <you>` at the computer.

## `SecondFactorLocked` (version 0.3.0)

Five wrong codes in a row lock your second factor. The message tells you how long the lock lasts.

- The first lockout lasts 15 minutes, the second 30 minutes, the third 60 minutes. Wait, then try again with a fresh code.
- The fourth lockout does not end by itself. An admin runs `sudo munjigi 2fa unlock <you>` at the computer. Your secret stays the same, so your authenticator app keeps working.
- A correct code starts the count again from zero.

If you lost your authenticator, an admin runs `sudo munjigi 2fa enroll <you> --replace` at the computer to issue a new secret.

## Settings seem ignored

If `/etc/dureh/munjigi.json` is not valid JSON, Munjigi treats it as having no admins. Check the file, for example with `python3 -m json.tool /etc/dureh/munjigi.json`.
