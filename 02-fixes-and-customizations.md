# 02 — Fixes & Customizations

[← Overview](01-overview.md) | [Table of Contents](README.md) | [Known Issues →](03-known-issues.md)

---

Each of the items detailed below was broken or missing during early test builds and has since been resolved and verified on a fresh boot (unless otherwise noted).

---

## 1. Calamares Installer Crash `[Fixed]`

The Calamares installer crashed during installation due to two separate, independent issues:

### A. Cubic Disk Metadata Overwrites
Cubic's GUI fields for **Volume ID**, **Release**, and **Disk Name** were initially malformed. Because Cubic automatically regenerates the ISO's `.disk/info` file directly from these GUI fields each time the ISO is compiled, manual edits applied directly to `.disk/info` are overwritten on rebuild. The solution was entering corrected values directly into Cubic's configuration interface.

### B. Missing `cdrom.sources` in Casper Script
In Ubuntu 26.04, casper's CD-ROM setup script was renamed from `41apt_cdrom` to `41apt_build_cache_cdrom`. Unlike its predecessor, the new script only preserves an existing `cdrom.sources` file — it does not generate one. Because the chroot environment lacked this file entirely, the installer failed.
- **Fix:** A working `cdrom.sources` file was extracted from a stock Kubuntu 26.04 squashfs image and placed at:
  `/etc/apt/sources.list.d/cdrom.sources` inside the chroot.

> **Related Fix:** A secondary installation failure observed during testing was traced to a required file inadvertently removed during a cleanup pass. Once restored, installation completed normally and was verified on fresh boot.

---

## 2. Panel Layout `[Fixed]`

The panel layout is enforced as a **system-wide dconf default** rather than a per-user configuration, ensuring that every user account receives the intended layout upon initial login without extra configuration steps. The layout was captured directly from a running AC 22.04 live session using `dconf dump`.

### Layout Structure
- **Top Panel:** Main menu bar, Firefox launcher, notification area, and the combined system tray indicator.
- **Bottom Panel:** Brisk application menu, trash applet, show-desktop button, workspace switcher, and window list.

### Applet Adjustments
- **Brisk Menu:** Early builds inadvertently included MATE's default Compact Menu on the bottom panel. This was corrected to use Brisk Menu, matching AC 22.04 conventions. Applet identifiers were verified directly from their respective `.mate-panel-applet` files rather than guessed from package names.
- **Combined Indicator Tray:** To make Wi-Fi, Bluetooth, volume, and clock display reliably within the indicator applet, the complete **Ayatana indicator** service stack was installed alongside `network-manager-gnome` and `blueman`.

---

## 3. Keyboard Shortcuts `[Fixed]`

All shortcuts from Accessible Coconut 22.04 have been reimplemented and validated on a fresh live boot.

Under MATE, GNOME-style custom keybindings through media keys settings are not supported. Therefore, all custom shortcuts are mapped through **Marco window manager's key-binding schema**, pairing specific key combinations with executable commands.

- **Volume Controls:** Bound directly to `pactl` commands rather than routing through helper scripts.
- **Panel Switching (`Super+Tab`):** Required remapping Marco's built-in panel-cycling shortcut to resolve key conflict.

### Shortcuts Reference Table

| Shortcut | Action / Function |
|---|---|
| `Super+Alt+Up` | Increase system volume |
| `Super+Alt+Down` | Decrease system volume |
| `Super+Alt+7` | Mute system volume |
| `Super+Alt+S` | Toggle screen reader (Orca) |
| `Super+Alt+O` | Restart screen reader (Orca) |
| `Super+Alt+B` | Announce battery status |
| `Super+Tab` | Switch between panels and desktop |
| `Super+Alt+Page Down` | Turn screen off |
| `Super+Alt+Page Up` | Turn screen on |
| `Super+Alt+End` | Turn touchpad off |
| `Super+Alt+Home` | Turn touchpad on |

> **Dconf Header Note:** In dconf keyfiles, all keys defined under the same schema path must reside under a single section header. Splitting keys across duplicate headers causes the parser to fail silently without errors.

---

## 4. IBus-Braille Toggle `[Fixed]`

- **Keybinding:** `Super+I` (configured via Marco window manager).
- **Behavior:** The script checks whether the IBus daemon is running and whether `IBus-Braille` is the currently active input engine. It activates the Braille engine only if needed, rather than restarting the input daemon indiscriminately.

---

## 5. Orca at the Login Screen `[Fixed]`

In initial testing, the screen reader remained silent at the LightDM login screen despite working in the user session. 

- **Fix:** LightDM's greeter configuration (`/etc/lightdm/lightdm-gtk-greeter.conf`) was updated to explicitly launch Orca and enable accessibility features for the greeter environment.

---

## 6. Orca Autostart `[Fixed]`

Orca is configured to start automatically as a system-wide default upon user login. This is applied via system dconf profiles targeting all user sessions automatically.

---

## 7. Casper Overlay Crash `[Fixed]`

In Ubuntu 26.04, the `overlay` filesystem driver is compiled directly into the kernel rather than provided as a loadable kernel module (`overlay.ko`). However, casper's live boot script still attempted to invoke `modprobe overlay` and treated non-zero exit codes as fatal errors.

- **Fix:** Removed the fatal failure exit path in the casper boot script and rebuilt the initramfs image.

---

## 8. Rebranding `[Fixed]`

Accessible Coconut branding has been applied across all user-visible touchpoints:
- Desktop wallpaper and LightDM greeter artwork
- Plymouth boot splash theme
- System identification files (`/etc/os-release`, `/etc/issue`)
- GRUB bootloader menu entries and audio boot chime

### Live Session Hostname & Username
Editing `/etc/hostname` or casper configuration files directly in the chroot does not persist in the live environment because casper overwrites them at boot using parameters stored inside the initramfs.
- **Fix:** Unpacked the live initramfs, modified the casper configuration within the ramdisk, and repacked the initramfs image.

---

## 9. Installed Applications `[Fixed]`

All default applications from AC 22.04 have been restored and verified:

| Application | Category / Purpose |
|---|---|
| **Artha** | Offline English dictionary & thesaurus |
| **Audacious** | Lightweight audio player |
| **Audacity** | Multi-track audio recording and editor |
| **Blueman** | Bluetooth device manager |
| **Brasero** | CD/DVD disc burning utility |
| **Chromium & Firefox** | Web browsers |
| **Daisy-Player** | DAISY digital talking book audio player |
| **eBook-Speaker** | E-book reader with text-to-speech output |
| **GIMP** | Image editing and manipulation |
| **GParted** | Graphical partition manager |
| **IBus-Braille** | Six-key and eight-key Braille input engine |
| **LibreOffice** | Complete productivity office suite |
| **Lios** | OCR scanning and document reading tool |
| **LMMS** | Digital audio workstation and music production |
| **Pluma** | Lightweight MATE text editor |
| **SMPlayer & VLC** | Audio and video media players |
| **Startup Disk Creator** | Bootable USB drive creation tool |
| **Orca** | Screen reader and magnifier |

*(Note: See [Known Issues](03-known-issues.md) regarding Sharada Braille Writer).*

---

[← Overview](01-overview.md) | [Table of Contents](README.md) | [Known Issues →](03-known-issues.md)
