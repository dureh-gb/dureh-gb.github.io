---
title: Troubleshooting
---

# Troubleshooting

## The viewer cannot connect

- **Check SSH first.** From the viewer's device, log in to the host account with a plain SSH client. If that fails, Pumasi cannot work either.
    - macOS: turn on **System Settings › General › Sharing › Remote Login**. **Set up Pumasi…** shows whether it is on.
    - Linux: install and start the SSH server (for example `openssh-server`).
- **Use the right account.** Pumasi runs only for an account that is logged in on the host. If the account you connect as is not logged in at all, there is no Pumasi to reach (log it in first). If it is logged in but in the background (fast user switching), the stream shows its own desktop but input is dropped until it is back at the screen.
- **Host key or Pumasi build changed.** Pumasi Viewer refuses a host whose SSH host key or Pumasi build no longer matches what you confirmed. If you reinstalled the host or updated Pumasi, confirm the new values in the viewer. If you did not, do not connect: something else may have changed.

## Pumasi is not running on the host

=== "macOS"

    - Look for the Pumasi icon in the menu bar. If it is missing, open `/Applications/Pumasi.app`.
    - Pumasi starts only for a user **logged in at the Mac's screen**. It does not run for an account that is only logged in over SSH.
    - Check **System Settings › General › Login Items › Allow in the Background**: Pumasi must be allowed there to start at login.

=== "Linux"

    - Run `pumasi status`. If the service is not enabled, run `pumasi enable` (without `sudo`).
    - The service needs a desktop session. It starts when the account logs in at the screen, and stops at logout.
    - A desktop that runs `systemctl --user preset` does **not** turn Pumasi on (since 0.5.5). Each account must run `pumasi enable` once.
    - Read the journal: `journalctl --user -u app-dureh.pumasi.service --since "10 min ago"`.

## Black screen, or "Screen recording not allowed"

=== "macOS"

    Allow Pumasi in **System Settings › Privacy & Security › Screen & System Audio Recording**. The Pumasi menu shows **⚠ permissions needed…** while one is missing; **Status…** and **Set up Pumasi…** show which.
=== "Linux (Wayland)"

    Wayland needs permission through the desktop portal. Accept the **Remote Desktop** dialog on the host's screen. Without the grant a stream ends with `ScreenRecordingNotAllowed`. If you denied it, or chose **Stop sharing** later, run `pumasi request` in a terminal on the host (in Dureh: **Request approval**) and accept the dialog at the host. `pumasi request` prints the consent state: `asking`, `granted`, `denied` or `none`.

    If the dialog never appears, read the journal: since 0.5.6 Pumasi logs each portal step with its response code, so you can see where it stopped.

    The dialog appears only on the host's own screen, so someone must be at the host the first time.

=== "Linux (X11)"

    X11 needs no permission dialog. A black picture usually means a video encoder problem; see below.

## The picture is missing or stuck (Linux)

- Run `pumasi probe` and look at `missing`. It names the packages to install, for example:

    ```sh
    sudo apt install gstreamer1.0-plugins-good gstreamer1.0-plugins-ugly
    ```

- Pumasi tests hardware encoders before it uses them. A broken one is skipped, and Pumasi falls back to the next, ending with the software encoder `x264enc`. If no encoder works, the viewer reports `EncoderUnavailable`.
- On Wayland, a still screen used to answer a fresh key frame only at the next screen change. Since 0.5.6 it answers within 250 ms. Update if the picture is slow to recover on a still screen.
- For Intel graphics, `gstreamer1.0-plugins-bad` (recommended by the package) adds the low-power hardware encoder.

## Mouse and keyboard do not work

- **macOS:** allow Pumasi in **Privacy & Security › Accessibility**.
- **Mac is locked:** input is ignored while the Mac is locked, unless **Allow lock screen control** is on at the Mac. The viewer shows a note. See [Lock screen control](security.md#lock-screen-control-macos).
- **Another account is at the Mac's screen:** with fast user switching, a background account cannot be controlled. Input is dropped. Dureh says that another account is using the screen; the Windows Pumasi Viewer does not show this yet.
- **Remote control paused:** after someone took the Mac back from the curtain, remote control pauses for 5 minutes. The person at the Mac can end the pause with **Allow remote control again** in the menu bar.
- **Linux, Wayland:** input needs the same portal grant as the screen. Accept the Remote Desktop dialog, with keyboard and pointer allowed.
- **Linux, typed text:** pasting text as typed characters is not yet available on Linux. Single key presses work.

## The curtain does not come up (macOS)

The viewer shows a reason:

| Reason | What to do |
|---|---|
| `CurtainNeedsInputMonitoring` | Allow Pumasi in **Privacy & Security › Input Monitoring**. |
| `CurtainNeedsControl` | Pumasi cannot post input on this connection. Check **Accessibility**. |
| `CurtainNeedsDisplay` | Open a display stream first. |
| `CurtainCoolingDown` | Someone took the Mac back recently. Wait 5 minutes, or ask them to choose **Allow remote control again**. |
| `CurtainNotOnConsole` | Another account is at the Mac's screen. |
| `CurtainNotForAgents` | Only people can raise the curtain, not AI agents. |

## The stream stops by itself

| Reason | Meaning |
|---|---|
| `PrivacyMode` | **Privacy mode** is on at the host. Nobody can watch or control until it is turned off there. |
| `ScreenBusy`, `ScreenLimit` | Too many streams, or too many pixels or too much bit rate in total. Close a stream or ask for a smaller size. |
| `DisplayNotFound`, `DisplayChanged` | The display was switched off or unplugged. Pick another display. |
| `CaptureStopped`, `CaptureStalled` | Capture ended (for example **Stop sharing** on Wayland). The viewer retries up to 3 times, then shows **Reconnect**. |
| `TakenBack` | Someone at the Mac took it back from the curtain. |

The viewer never retries privacy or permission refusals by itself.

## No sound

- Sound is available from a Mac host only.
- **Allow sound** must be on in the Pumasi menu (on by default).
- Sound needs **Screen & System Audio Recording**.

## The resolution did not change back (macOS)

Pumasi restores a changed resolution when the viewer disconnects, after 30 s without contact, when Pumasi exits, or at its next start. To restore it at once, choose **Resolution changed remotely — Restore resolution** in the menu bar.

## Windows host

Not yet available.
