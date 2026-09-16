# 01 — Overview

[← Table of Contents](README.md) | [Fixes & Customizations →](02-fixes-and-customizations.md)

---

## Introduction

**Accessible Coconut (AC) 26.04** is an accessibility-focused Linux distribution built on top of a Kubuntu base with the **MATE** desktop environment.

AC 26.04 continues the work of Accessible Coconut on a newer foundation, using AC 22.04 as the reference standard for all proven behaviors:
- Keyboard shortcuts
- Panel layout
- Screen reader behavior (Orca)
- Bundled application set

---

## Base Selection: Why Kubuntu 26.04?

The base for this release is a stock **Kubuntu 26.04** ISO rather than Ubuntu MATE directly. Two key considerations drove this choice:
1. **Installer Accessibility:** Kubuntu uses the **Calamares** installer, whose accessibility stack behaved significantly better as a starting point. In contrast, Ubuntu 26.04's default installer (**Subiquity**) lacks sufficient accessibility support for visually impaired users.
2. **Customization Workflow:** The ISO is customized using **Cubic**, which chroots into the ISO filesystem for package and configuration changes, then regenerates the bootable ISO image.

---

## Desktop Conversion Sequence (KDE to MATE)

Converting the base image from KDE Plasma to MATE required a strict sequence of checks to prevent accidental breakage of installer dependencies:

1. **Dependency Audit:** Confirm the full dependency tree of the KDE/Plasma stack, verifying that Calamares does not depend directly on Plasma components.
2. **KDE Removal:** Remove `kubuntu-desktop`, `plasma-desktop`, and `sddm`. Clean orphaned packages and dependencies, then re-verify that Calamares survived the purge intact.
3. **MATE Installation:** Install `mate-desktop-environment-core` and `lightdm`.
4. **Display Manager Configuration:** Resolve display manager conflicts by setting MATE as the default session in LightDM's `.conf.d` configuration (crucial because live ISOs auto-login rather than presenting a greeter selection).
5. **Session Verification:** Verify that only one display manager is active, that a valid MATE `.desktop` session entry exists, and that Orca is installed.
6. **Installer Launcher:** Confirm the Calamares installer launcher desktop entry remains present and functional on the live desktop.
7. **Clean Chroot & Build:** Clean the chroot environment and generate the ISO image in Cubic.
8. **Multi-Stage Testing:** Test in QEMU with Orca driving both the desktop session and the Calamares installer, followed by live boot tests on physical hardware.

---

## Testing Methodology

Testing throughout the project relied on invoking **QEMU directly from the command line** rather than using Cubic's built-in emulator test button, which has proven unreliable during live boot cycles.

Issues and missing features identified through emulated testing and tester feedback — including shortcuts, panel applet behavior, and missing bundled software — were subsequently resolved and validated on fresh live boots.

---

[← Table of Contents](README.md) | [Fixes & Customizations →](02-fixes-and-customizations.md)
