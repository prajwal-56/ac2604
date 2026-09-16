# 03 — Known Issues

[← Fixes & Customizations](02-fixes-and-customizations.md) | [Table of Contents](README.md) | [Technical Learnings →](04-technical-learnings.md)

---

The following items are open matters requiring further testing, validation, or upstream resolution prior to release. They are tracked separately here rather than marked as completed fixes.

---

## 1. Post-Install GRUB Menu Branding `[Open]`

### Problem Description
The live-boot GRUB menu displays full Accessible Coconut branding as expected. However, it is not yet verified whether this branding survives an end-to-end disk installation.

### Root Cause / Context
Calamares executes its own `update-grub` inside the target installation environment using the target system's own GRUB configurations and `/etc/default/grub` distributor identification. This execution path is entirely separate from the ISO bootloader configuration.

### Action Plan
Boot directly into a fully installed target system on real hardware or virtual disk and inspect the resulting GRUB bootloader menu to confirm branding persistence.

---

## 2. Orca Voice Sounded Different During Install `[Open]`

### Problem Description
During installer testing, Orca's speech synthesizer voice did not sound consistent with the standard expected speech voice in Accessible Coconut.

### Context
It is not yet determined whether this was an isolated anomaly of the Calamares live installer sub-environment (e.g., speech-dispatcher or audio pipe fallback) or a configuration defect.

### Action Plan
Verify speech output from within a fully installed system session rather than testing solely within the live installer container. The fix is anticipated to be straightforward once isolated.

---

## 3. Sharada Braille Writer Unavailable `[Open]`

### Problem Description
The external PPA that originally distributed **Sharada Braille Writer** does not provide package builds for Ubuntu 26.04's codename. Consequently, it cannot currently be installed via standard package management.

### Status
Documented as an open packaging gap. Unless an updated PPA, native Debian package, Flatpak/Snap, or source build is identified, this application will remain unavailable in initial builds.

---

[← Fixes & Customizations](02-fixes-and-customizations.md) | [Table of Contents](README.md) | [Technical Learnings →](04-technical-learnings.md)
