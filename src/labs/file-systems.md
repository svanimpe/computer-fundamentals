# File Systems

In this lab, you'll learn how Linux organizes and manages storage.

You'll explore the types of storage media and file systems in common use, learn how disks are divided into partitions, and practice mounting file systems into the directory tree. You'll also use essential commands to monitor disk usage and copy data at a low level.

## Storage media

Before a computer can store any data, it needs a physical medium to write it to. Several types of storage media are in common use today:

| Medium                                                                            | Description                                                                                                                                                                                                   |
| --------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| <img src="/images/storage-media/hdd.svg" width="140" alt="Hard disk drive">       | A **hard disk drive (HDD)** stores data on spinning magnetic platters. HDDs offer large capacity at a low cost per gigabyte, but are slower than other media and vulnerable to physical shock.                |
| <img src="/images/storage-media/ssd.svg" width="140" alt="Solid-state drive">     | A **solid-state drive (SSD)** stores data in flash memory chips with no moving parts. SSDs are significantly faster than HDDs, use less power, and are more resistant to physical shock.                      |
| <img src="/images/storage-media/usb-drive.svg" width="140" alt="USB flash drive"> | A **USB flash drive** is a portable form of flash storage that connects via USB. USB drives are convenient for transferring data between systems.                                                             |
| <img src="/images/storage-media/optical-disc.svg" width="140" alt="Optical disc"> | **Optical media** such as CDs, DVDs, and Blu-ray discs store data using laser-readable patterns. They are used for distributing software and long-term archiving, but are rarely used for day-to-day storage. |

Modern computers typically use at least one internal SSD as their primary storage device.

### Block devices

From the operating system's perspective, every storage device is a **block device**: a device that stores and retrieves fixed-size blocks of data. Linux represents block devices as files in the **/dev** directory. The first detected disk is named **sda**, the second **sdb**, and so on. Partitions on a disk are named by appending a number: **sda1**, **sda2**, and so on.

Use the **`lsblk`** (*list block devices*) command to display all block devices connected to the system:

```bash
lsblk
```

The output shows a tree of disks and their partitions, along with their sizes and where they are mounted:

```
NAME   MAJ:MIN RM   SIZE RO TYPE MOUNTPOINTS
sda      8:0    0    25G  0 disk
├─sda1   8:1    0  23.1G  0 part /
├─sda2   8:2    0     1K  0 part
└─sda5   8:5    0   1.9G  0 part [SWAP]
sr0     11:0    1  1024M  0 rom
```

> <mark>TODO:</mark> Hebben we op dit punt al gesproken over swapping?

The partition mounted at `[SWAP]` is used as overflow memory when the system runs low on RAM. The **sr0** device is the optical drive.

The device names assigned by the kernel (`sda`, `sdb`, ...) are not stable: if you connect a drive to a different port, it may receive a different letter. Linux therefore also provides stable identifiers in **/dev/disk/by-id/**, which are tied to the physical device rather than its connection point.

Run the following command to see these identifiers:

```bash
ls -l /dev/disk/by-id/
```

Each entry is a symbolic link to the corresponding device file in **/dev**:

```
lrwxrwxrwx ata-VBOX_HARDDISK_VBda1b77f7          -> ../../sda
lrwxrwxrwx ata-VBOX_HARDDISK_VBda1b77f7-part1    -> ../../sda1
```

You can use these stable identifiers wherever you would otherwise use a device name such as `/dev/sda`.

## File systems

Raw block devices store sequences of bits with no structure. Without a **file system**, there is no way to know where one file ends and another begins, what names files have, or who is allowed to access them. A file system imposes that structure: it defines how files and directories are organized on the storage device.

When you format a partition, you choose a file system and write its data structures to the partition. These structures record the names, locations, sizes, and permissions of every file stored there.

Several file systems are in common use today:

| File system | Typical use                                                                                                                                  | OS support                                                                        |
| ----------- | -------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------- |
| **FAT32**   | USB drives and SD cards, but limited to files smaller than 4 GB and partitions up to 2 TB.                                                   | Windows, macOS, Linux, and virtually every other operating system                 |
| **exFAT**   | USB drives and SD cards where FAT32's 4 GB file size limit is a problem.                                                                     | Windows, macOS, and modern Linux distributions                                    |
| **NTFS**    | The default file system for Windows. Supports large files, permissions, and encryption.                                                      | Windows (native); Linux (read/write); macOS (read-only without third-party tools) |
| **ext4**    | The default file system for most Linux distributions. Reliable, performant, and well-supported.                                              | Linux (native); Windows and macOS require third-party drivers                     |
| **ZFS**     | An advanced file system designed for servers and storage appliances, with built-in data integrity verification, RAID support, and snapshots. | Linux and FreeBSD (native); macOS via OpenZFS; no native Windows support          |

To see the file system type of every partition on your system, pass the `-o` option to `lsblk` to select specific output columns:

```bash
lsblk -o name,fstype
```

Partitions that haven't been formatted show no file system type.

### Disk usage

The **`df`** (*disk free*) command reports how much space is available on each mounted file system:

```bash
df -h
```

The `-h` option prints sizes in a human-readable format (MB, GB). The output includes the total size, the amount used, and the amount remaining for each file system.

The **`du`** (*disk usage*) command reports how much space a directory is consuming:

```bash
du -h ~/Downloads
```

This lists every subdirectory with its size. Add the `-s` option to show only the total for the directory, without listing each subdirectory individually:

```bash
du -sh ~/Downloads
```

## Partitions

A single storage device can be divided into multiple independent regions called **partitions**. Each partition can hold a separate file system. There are several reasons to partition a disk:

- **Isolation**: if one partition fills up or becomes corrupted, the others are unaffected.
- **Multiple operating systems**: each operating system can occupy its own partition and share the same physical disk.
- **Separation of concerns**: system files, user data, and swap space can each live on separate partitions with different file systems or size constraints.

### Partition table

The layout of partitions on a disk is recorded in a **partition table** stored at the start of the disk. Two partition table formats are in use today.

**Master Boot Record (MBR)** is the older format, introduced with IBM PC DOS in 1983:

- Supports a maximum disk size of **2 TB**.
- Supports at most **4 primary partitions**. To create more, one of the four must be designated an *extended partition* that can contain additional *logical partitions* inside it.
- Stores the bootloader in the first 512 bytes of the disk, alongside the partition table, leaving very little space.

**GUID Partition Table (GPT)** is the modern replacement, introduced as part of the UEFI standard:

- Supports disk sizes up to **9.4 ZB** (zettabytes).
- Supports up to **128 partitions** with no distinction between primary and extended.
- Stores a backup copy of the partition table at the end of the disk for redundancy.

|                    | MBR       | GPT                   |
| ------------------ | --------- | --------------------- |
| Maximum disk size  | 2 TB      | 9.4 ZB                |
| Maximum partitions | 4 primary | 128                   |
| Firmware           | BIOS      | UEFI                  |
| Redundancy         | None      | Backup at end of disk |

New systems and disks use GPT. MBR remains relevant for older hardware and for removable media that must work with a wide range of devices.

## Adding a virtual disk

> <mark>TODO:</mark> Should we add screenshots here?

In this section, you'll add a second disk to your virtual machine, partition and format it, and mount it into the directory tree.

### Attaching the disk

Shut down your virtual machine. In VirtualBox, open the settings for your Ubuntu VM and navigate to **Storage**. Click the hard disk icon next to **Controller: SATA** to add a new virtual disk with the following settings:

- Type: **VDI**
- Storage: **Dynamically allocated**
- Name: **filesystems.vdi**
- Size: **2 GB**

Start the virtual machine again. Run `lsblk` to confirm the new disk is visible:

```bash
lsblk
```

The disk appears as **sdb** (or the next available letter). It has no partitions and no file system yet.

### Partitioning and formatting

Open the **Disks** application from the application menu. Select the new 2 GB disk from the list on the left. Open the menu (the three dots in the top-right corner) and choose **Format Disk**. Select a **GPT** partition table.

Create two partitions in the resulting free space using the **+** button:

| Name   | Size            | File system |
| ------ | --------------- | ----------- |
| Linux  | 1 GB            | ext4        |
| Shared | remaining space | FAT32       |

Once both partitions are created, verify the result:

```bash
lsblk -o name,fstype
```

You should see **sdb1** formatted as **ext4** and **sdb2** formatted as **vfat** (the kernel's name for FAT32).

### Mounting the partitions

In [Files and Directories](files-and-directories#virtual-file-system), you learned that Linux uses a virtual file system (VFS) that merges all file systems into a single directory tree. To make a file system accessible, you **mount** it at a directory in that tree.

First, create two empty directories to serve as mount points:

```bash
mkdir ~/partition-linux ~/partition-shared
```

Use the **`mount`** command to mount the first partition at the first directory:

```bash
sudo mount /dev/sdb1 ~/partition-linux
```

After mounting, the root of the ext4 partition becomes visible at **~/partition-linux**. Create a file there to confirm:

```bash
echo "Hello from Linux!" > ~/partition-linux/hello.txt
```

Now mount the second partition:

```bash
sudo mount /dev/sdb2 ~/partition-shared
```

::: info
You can explicitly specify the file system type with the `-t` option:

```bash
sudo mount -t vfat /dev/sdb2 ~/partition-shared
```

Linux detects the file system type automatically in most cases, so `-t` is optional.
:::

Run `df -h` to confirm that both partitions appear as mounted file systems:

```bash
df -h
```

Now try copying the file you created earlier to the shared partition:

```bash
cp ~/partition-linux/hello.txt ~/partition-shared/
```

Run `ls -l` in your home directory and compare the ownership of **partition-linux** and **partition-shared**. FAT32 has no concept of Linux user permissions, so the system assigns a default owner when the partition is mounted.

### Unmounting

When you're done with a partition, use the **`umount`** command to detach it from the directory tree:

```bash
sudo umount ~/partition-linux
sudo umount ~/partition-shared
```

After unmounting, the mount point directories still exist but are empty again.

::: warning
Always unmount all partitions before disconnecting the physical device. Removing a device while it is still mounted can corrupt the file system if there are pending writes.
:::

## The boot partition

In [Process Management](process-management#process-hierarchy), you learned how a computer boots: firmware initializes the hardware, loads a bootloader, which then loads the kernel.

The bootloader must read files from the disk before any file system driver is available. On UEFI systems, this is solved by a dedicated partition known as the **EFI System Partition (ESP)**. The ESP is always formatted as FAT32 — a format that UEFI firmware can read natively, without needing a driver. The firmware reads the bootloader files directly from this partition.

On a running Linux system, the **/boot** directory holds everything needed to start the system, including the kernel itself. Inspect its contents:

```bash
ls -ls /boot
```

| File              | Description                                                                                                                                                                                                                                                                                                                         |
| ----------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **vmlinuz-\***    | The compiled, compressed Linux kernel image. This is the file the bootloader hands off to when the kernel takes over from the firmware. The `z` at the end signals that the image is compressed (with zlib/gzip).                                                                                                                   |
| **initrd.img-\*** | The **initial RAM disk** (or *initramfs*): a small, temporary root file system loaded into memory alongside the kernel. It carries just enough drivers and tools (for RAID, LVM, encrypted disks, and so on) to locate and mount the real root file system. Once that's mounted, the system switches to it and discards the initrd. |
| **System.map-\*** | A table mapping kernel symbol names to memory addresses, used when debugging kernel crashes.                                                                                                                                                                                                                                        |
| **config-\***     | The kernel configuration options that were used to build that kernel.                                                                                                                                                                                                                                                               |
| **grub/**         | The GRUB bootloader's configuration files and modules.                                                                                                                                                                                                                                                                              |

## Low-level copies with dd

The **`dd`** (*data duplicator*) command copies data at a low level, reading from a source and writing to a destination block by block:

```bash
dd if=<source> of=<destination>
```

| Option   | Description                                                                               |
| -------- | ----------------------------------------------------------------------------------------- |
| `if=`    | Input file (source). Can be a regular file, a device, or a special file like `/dev/zero`. |
| `of=`    | Output file (destination). Can be a regular file or a device.                             |
| `bs=`    | Block size: how much data to read and write per operation (e.g. `4M` for 4 megabytes).    |
| `count=` | Number of blocks to copy before stopping.                                                 |

Because `dd` operates directly at the block level, it can create exact images of disks and partitions, and restore them. A common use case is writing a bootable ISO image to a USB drive:

```bash
sudo dd if=ubuntu.iso of=/dev/sdb bs=4M
```

This writes the ISO byte-for-byte to the USB drive, making it bootable.

::: warning
`dd` writes directly to the destination without any confirmation prompt. Specifying the wrong output device will immediately and permanently overwrite its contents. Always verify the device name with `lsblk` before running `dd`.
:::

## Up next

In this lab, you learned about storage media, file systems, and partitions, and practiced mounting file systems into the directory tree.

Practice what you've learned by solving the upcoming exercises.

When you're done, proceed to the next lab, where you'll learn how to install and manage software.
