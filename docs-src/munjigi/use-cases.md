---
title: Use cases
---

# Munjigi use cases

## The viewer shows black after "Switch user"

Someone at the computer chose **Switch user**. Your session is still running, but it is behind the login screen. Pumasi has nothing to show.

Over SSH, run `munjigi status`, then the `munjigi activate <session>` command shown next to your account. Your session comes back. A locked session stays locked, so you unlock it as usual.

## The computer restarted and nobody logged in

After a restart there is no desktop session, so there is no Pumasi. Run `munjigi start <your account>`. Munjigi starts your desktop session without a password, and Pumasi starts with it.

This opens an unlocked session on the screen. Use it only where that is safe.

## A build or service account with a desktop

Some computers run a service account, for example `builder`, that nobody sits at. An admin can start or bring back its session.

Add the account to `managed` in `/etc/dureh/munjigi.json`:

```json
{ "admins": ["alice"], "managed": ["builder"], "inUseSeconds": 300 }
```

Then `alice` can run `munjigi start builder --code 123456`, with her own current one-time code. From version 0.3.0, `builder` is another account, so the code is required.

## A shared family or office computer

`bob` uses the computer himself, but wants `alice` (an admin) to be able to bring his session back when he is away. `bob` logs in as himself and runs `munjigi allow-admin`. He can run `munjigi allow-admin --revoke` at any time.

Without that consent, `alice` cannot act on `bob`'s sessions, even as an admin.

## Someone is working at the screen

`carol` is typing at the computer. `alice` tries to bring her own session to the screen from far away. Munjigi refuses with `InUse`, because that would push `carol`'s session aside.

Once the screen has had no keyboard or mouse input for `inUseSeconds` (default 300 seconds), the request is allowed. `carol` herself can always switch away. Asking the person at the screen for permission, instead of refusing, is not yet available.

## Extra protection for admins (version 0.3.0)

From version 0.3.0, an admin who acts on another account must also give a one-time code from an authenticator app. A stolen SSH key alone is then not enough to open someone else's desktop. Five wrong codes in a row lock the second factor for 15 minutes, then 30, then 60. After the fourth lockout, an admin must run `sudo munjigi 2fa unlock <account>` at the computer.
