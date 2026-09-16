# 04 — Technical Learnings & Architecture Notes

[← Known Issues](03-known-issues.md) | [Table of Contents](README.md) | [Tools & Resources →](05-tools-and-resources.md)

---

This document summarizes non-obvious engineering lessons, system behaviors, and debugging patterns discovered throughout the AC 26.04 porting process.

---

## 1. Cubic Configuration Overrides
Cubic dynamically generates `.disk/info` from its graphical user interface fields (Volume ID, Release Name, Disk Name) during every ISO generation run. Manual modifications made directly to `.disk/info` inside the workspace are overwritten without warning. Always configure these values inside the Cubic interface itself.

## 2. Casper CD-ROM Script Renaming in 26.04
Ubuntu 26.04 renamed casper's CD-ROM initialization script from `41apt_cdrom` to `41apt_build_cache_cdrom`. Crucially, this updated script no longer generates a new `cdrom.sources` file if one is absent — it only preserves an existing one. If starting from a base or chroot lacking `/etc/apt/sources.list.d/cdrom.sources`, the file must be seeded manually before building the ISO.

## 3. `gsettings set` Does Not Work Inside Chroots
Running `gsettings set` inside a chroot environment fails silently because `gsettings` requires an active D-Bus session bus connection. Even when the command exits with return code `0`, no setting changes are actually committed. All permanent system defaults must instead be defined using system **dconf keyfiles** (e.g., in `/etc/dconf/db/local.d/` followed by `dconf update`).

## 4. MATE Schema Path Casing
MATE dconf schema paths do not always match the casing implied by their schema IDs. Never guess schema paths; always dump and inspect the real path from an active MATE session using `dconf dump /` before constructing dconf keyfiles.

## 5. Dconf Isolation and Test Hygiene
A setting modified via `gsettings` inside a live testing session can appear to persist across reboots if the live home directory or persistent overlay is reused, because user-level dconf settings supersede system defaults. Always validate configuration changes on a completely fresh, non-persistent live boot.

## 6. Keybinding Precedence in Window Managers
Custom keybinding conflicts frequently occur at the window-manager level before the desktop settings daemon receives the key event. If a shortcut fails to trigger, check whether the window manager (e.g., Marco) already reserves that combination for an internal action (such as panel cycling with `Super+Tab`) and remap the conflicting action.

## 7. No Duplicate Headers in Dconf Keyfiles
In a dconf keyfile, all keys belonging to a given schema must be declared under a single section header. If identical headers are duplicated within the same file, the dconf parser fails silently without logging an error.

## 8. Initramfs Authority Over Chroot Files
In live boot environments, scripts inside the initramfs execute before the root filesystem is mounted. Casper establishes system hostname, user accounts, and live environment configurations at boot time using parameters embedded inside the initramfs itself. Modifying `/etc/hostname` or `/etc/casper.conf` inside the chroot filesystem has no effect; changes must be applied directly to the unpacked initramfs and repacked.

## 9. Calamares Post-Install Script Independence
Calamares runs `update-grub` within the target filesystem chroot during disk installation, relying on the target system's own bootloader configuration. Live ISO bootloader customizations do not automatically propagate to installed systems unless mirrored into target system templates.

---

[← Known Issues](03-known-issues.md) | [Table of Contents](README.md) | [Tools & Resources →](05-tools-and-resources.md)
