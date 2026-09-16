# 05 — Tools & Resources

[← Technical Learnings](04-technical-learnings.md) | [Table of Contents](README.md)

---

The following tools, utilities, and reference distributions formed the core development and validation toolchain for the Accessible Coconut 26.04 project:

---

## Toolchain & Utilities

| Tool | Role & Usage |
|---|---|
| **Cubic** (*Custom Ubuntu ISO Creator*) | GUI-driven ISO chroot environment used to install packages, configure filesystem defaults, and assemble the final bootable ISO. |
| **QEMU** | Command-line system emulator used for end-to-end boot validation, Orca screen reader audio testing, and installation dry runs. |
| **dconf** | Low-level configuration backend used to dump settings (`dconf dump`) from the AC 22.04 reference system and compile system-wide keyfiles (`dconf update`) in AC 26.04. |
| **unsquashfs** | Extraction tool used to unpack SquashFS filesystems from stock Kubuntu 26.04 ISOs to recover baseline configuration templates (such as `cdrom.sources`). |

---

## Reference Environments

- **Accessible Coconut 22.04:** The golden master reference build utilized to ensure behavioral parity across desktop layout, default shortcuts, audio chime, and bundled software.
- **Kubuntu 26.04 ("Resolute Raccoon") Stock ISO:** The base distribution image providing the Calamares installer base and modern package tree.

---

## Maintainer Information

Accessible Coconut is maintained by **Zendalona**.  
This documentation reflects build findings and verified configurations as of the current development cycle and will continue to be updated as remaining items are resolved.

---

## Contact & Support

- **Contact & Socials:** [prajwal-56.github.io/contact](https://prajwal-56.github.io/contact)
- **Support / Donate:** [prajwal-56.github.io/donate](https://prajwal-56.github.io/donate)

---

[← Technical Learnings](04-technical-learnings.md) | [Table of Contents](README.md)
