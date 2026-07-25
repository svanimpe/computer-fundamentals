# Users and Permissions

In this lab, you'll learn how Linux manages users and controls access to files and directories.

You'll learn where user and group information is stored, how to read and change permissions, and how to work with elevated privileges.

## Users

Linux is a multi-user operating system: multiple people can use the same system, either at the same time or one after another. To keep their files separate and secure, the operating system assigns every person a **user account**.

When you log in, the operating system identifies you by your **user ID (UID)**. This is a unique number assigned to your account. Your username is a human-readable alias for this number. The operating system always works with UIDs internally.

Use the **`id`** command to display your UID and the groups you belong to:

```bash
id
```

The output looks similar to this:

```
uid=1000(steven) gid=1000(steven) groups=1000(steven),4(adm),27(sudo)
```

| Field  | Description                                             |
| ------ | ------------------------------------------------------- |
| uid    | Your user ID and username.                              |
| gid    | Your primary group ID and group name.                   |
| groups | All groups you belong to, including your primary group. |

You can also look up another user's UID and groups by passing their username as an argument:

```bash
id root
```

### /etc/passwd

Linux stores user account information in the file **/etc/passwd**. Despite its name, this file does not store passwords. Display its contents:

```bash
cat /etc/passwd
```

Each line represents one user account. The fields on each line are separated by colons (`:`). A typical entry looks like this:

```
steven:x:1000:1000:Steven:/home/steven:/bin/bash
```

| Field                | Example        | Description                                                              |
| -------------------- | -------------- | ------------------------------------------------------------------------ |
| Username             | `steven`       | The human-readable name for the account.                                 |
| Password placeholder | `x`            | Always `x`; the actual password is stored elsewhere.                     |
| UID                  | `1000`         | The user ID. UIDs below 1000 are typically reserved for system accounts. |
| GID                  | `1000`         | The primary group ID.                                                    |
| Comment              | `Steven`       | A human-readable description, often the user's full name.                |
| Home directory       | `/home/steven` | The path to the user's home directory.                                   |
| Login shell          | `/bin/bash`    | The shell that starts when the user logs in.                             |

You'll notice many entries that aren't for real people. These are **service accounts**: user accounts created not for human users, but for system services. A web server, for example, might run under a dedicated `www-data` account.

Service accounts exist for security. Running a service under its own account limits the damage if that service is ever compromised. It can only access what its account is permitted to.

Service accounts typically have `/usr/sbin/nologin` or `/bin/false` as their login shell. These are not real shells; they immediately exit when invoked, preventing anyone from logging in as that account interactively.

### /etc/shadow

Passwords are stored in **/etc/shadow**, not in **/etc/passwd**. The reason is simple: **/etc/passwd** must be readable by all users so the system can look up usernames and UIDs. Storing passwords there — even in hashed form — would allow any user to attempt to crack them offline.

**/etc/shadow** is protected: only the root user can read it. Verify this:

```bash
ls -l /etc/shadow
```

Each line in **/etc/shadow** corresponds to a user account in **/etc/passwd** and stores the hashed password alongside information such as when the password was last changed and when it expires.

::: info
A **hash function** transforms a password into a fixed-length string that cannot be reversed. When you log in, the system hashes the password you entered and compares the result to the stored hash. If they match, you're authenticated without the system ever needing to store your actual password.
:::

## Groups

A **group** is a collection of user accounts. Groups make it practical to share access to resources: instead of managing permissions for each user individually, you add users to a group and assign permissions to that group.

Every user belongs to at least one group: their **primary group**. This is the group assigned to files they create. Users can also belong to additional **secondary groups**, which grant access to resources shared by those groups.

Group information is stored in **/etc/group**. Take a look at its contents:

```bash
cat /etc/group
```

Each line represents one group, with fields separated by colons:

```
developers:x:1001:steven,alice
```

| Field                | Example            | Description                                                         |
| -------------------- | ------------------ | ------------------------------------------------------------------- |
| Group name           | `developers`       | The name of the group.                                              |
| Password placeholder | `x`                | Groups can have passwords, but this is rarely used.                 |
| GID                  | `1001`             | The group ID.                                                       |
| Members              | `steven,alexander` | A comma-separated list of users for whom this is a secondary group. |

::: info
Primary group membership is recorded in **/etc/passwd** (the GID field), not in **/etc/group**. The **/etc/group** file only lists secondary memberships.
:::

Use the **`groups`** command to list the groups you belong to:

```bash
groups
```

You can also check the groups of another user by passing their username:

```bash
groups root
```

## File permissions

Every file and directory on a Linux system has a set of **permissions** that control who can read it, modify it, or execute it. These permissions are divided into three categories:

| Category | Symbol | Description                   |
| -------- | ------ | ----------------------------- |
| Owner    | `u`    | The user that owns the file.  |
| Group    | `g`    | The group that owns the file. |
| Others   | `o`    | Everyone else.                |

Each category has three permission bits:

| Permission | Symbol | On files                       | On directories                                        |
| ---------- | ------ | ------------------------------ | ----------------------------------------------------- |
| Read       | `r`    | View the contents of the file. | List the contents of the directory.                   |
| Write      | `w`    | Modify or delete the file.     | Create, rename, or delete files inside the directory. |
| Execute    | `x`    | Run the file as a program.     | Enter the directory and access its contents.          |

::: info
The execute permission on a directory is easy to overlook but crucial. Without it, you cannot `cd` into the directory and you cannot open, read, or write any of its files — even if you have read permission. Read permission alone only lets you see the names of the files inside; execute permission is what lets you actually reach them.
:::

### Reading permissions

Use `ls -l` to display the permissions of files and directories:

```bash
ls -l
```

Each line starts with a string of ten characters, e.g.:

```
-rwxr-xr--
```

The first character indicates the **file type**:

| Character | File type     |
| --------- | ------------- |
| `-`       | Regular file  |
| `d`       | Directory     |
| `l`       | Symbolic link |

The remaining nine characters are three groups of three, representing the permissions for the owner, group, and others respectively:

```
rwx  r-x  r--
 │    │    └── Others: read only
 │    └── Group: read and execute
 └── Owner: read, write, and execute
```

A letter means the permission is granted; a dash (`-`) means it is not.

### Octal notation

Permissions can also be expressed as a three-digit octal number. Each digit corresponds to one category (owner, group, others), and its value is the sum of the granted permissions:

| Permission | Value |
| ---------- | ----- |
| Read       | 4     |
| Write      | 2     |
| Execute    | 1     |

For example, `rwxr-xr--` translates to:

- Owner: `r` + `w` + `x` = 4 + 2 + 1 = **7**
- Group: `r` + `-` + `x` = 4 + 0 + 1 = **5**
- Others: `r` + `-` + `-` = 4 + 0 + 0 = **4**

The octal representation of `rwxr-xr--` is therefore **754**.

## Changing permissions

### chmod

Use the **`chmod`** (*change mode*) command to change the permissions of a file or directory.

With octal notation, you specify the exact permissions you want:

```bash
chmod 644 report.txt
```

This sets the permissions of **report.txt** to `rw-r--r--`: read and write for the owner, read-only for the group and others.

With symbolic notation, you build up a change from three parts: **who**, **what**, and **which permissions**.

The **who** part specifies which category to change:

| Symbol | Category                     |
| ------ | ---------------------------- |
| `u`    | Owner (*user*)               |
| `g`    | Group                        |
| `o`    | Others                       |
| `a`    | All three categories at once |

The **what** part specifies the operation:

| Symbol | Operation                                           |
| ------ | --------------------------------------------------- |
| `+`    | Add the permission.                                 |
| `-`    | Remove the permission.                              |
| `=`    | Set exactly these permissions, removing any others. |

For example:

```bash
chmod u+x script.sh
chmod g-w report.txt
chmod o= secret.txt
chmod a+r public.html
```

Here's what these commands do:

1. Adds execute permission for the owner on **script.sh**.
2. Removes write permission for the group on **report.txt**.
3. Removes all permissions for others on **secret.txt**.
4. Adds read permission for all three categories on **public.html**.

You can combine multiple changes in a single command:

```bash
chmod u+x,g-w script.sh
```

To apply changes recursively across an entire directory tree, add the `-R` option:

```bash
chmod -R 755 project/
```

### chown and chgrp

Use the **`chown`** (*change owner*) command to change the owner of a file:

```bash
sudo chown alice report.txt
```

You can also set the group owner in the same command by adding a colon followed by the group name:

```bash
sudo chown alice:developers report.txt
```

To change only the group owner, use the **`chgrp`** (*change group*) command:

```bash
sudo chgrp developers report.txt
```

Both commands support the `-R` option for recursive changes:

```bash
sudo chown -R alice:developers project/
```

::: info
Only the root user can change the owner of a file. A regular user can change the group owner of their own files, but only to a group they already belong to.
:::

## Default permissions

When you create a new file or directory, Linux assigns it a default set of permissions. The starting point for these defaults is:

- **666** (`rw-rw-rw-`) for files, execute is never granted by default.
- **777** (`rwxrwxrwx`) for directories.

These starting permissions are then filtered by the **umask** before being applied. The umask specifies which permission bits to **remove**. Each bit set in the umask removes the corresponding permission from the default.

For example, with a umask of **022** (`----w--w-`), the permissions for a new file are calculated as follows:

```
Base:  rw-rw-rw-  (666)
Mask:  ----w--w-  (022)
       ─────────
Final: rw-r--r--  (644)
```

And for a new directory:

```
Base:  rwxrwxrwx  (777)
Mask:  ----w--w-  (022)
       ─────────
Final: rwxr-xr-x  (755)
```

Use the **`umask`** command to display the current umask value:

```bash
umask
```

Add the `-S` option to see the symbolic representation instead:

```bash
umask -S
```

To set a new umask for the current session:

```bash
umask 027
```

A umask of **027** (`----w-rwx`) removes write from the group and all permissions from others, giving new files `rw-r-----` (640) and new directories `rwxr-x---` (750).

::: info
A umask set in the terminal only applies to the current session. To make it permanent, add the `umask` command to your `.bashrc` file.
:::

## Elevated privileges

### The root account

Every Linux system has a special user account named **root**, also known as the **superuser**. The root account is not subject to permission checks: it can read, write, and execute any file on the system, regardless of the permissions set on it.

Because root is so powerful, a mistake made as root can damage or compromise the entire system. For this reason, it is best practice to avoid logging in directly as root.

### sudo

The **`sudo`** (*superuser do*) command lets an authorized user run a single command with elevated privileges, typically as root:

```bash
sudo apt update
```

This approach is safer than logging in as root because you only gain elevated privileges for a single command, you authenticate with your own password rather than the root password, and every command run with `sudo` is logged.

To run a command as a specific user other than root, use the `-u` option:

```bash
sudo -u alice cat /home/alice/notes.txt
```

### The sudo group

Not every user is allowed to use `sudo`. Most Linux distributions configure a dedicated group whose members are authorized to use the `sudo` command:

- **sudo** on Debian-based systems such as Ubuntu
- **wheel** on Red Hat-based systems such as Fedora

Check whether you belong to this group:

```bash
groups
```

Your username should appear next to `sudo` or `wheel` in the output.

### su

The **`su`** (*switch user*) command starts a new shell session as another user:

```bash
su alice
```

This prompts for Alice's password. After authenticating, you're running commands as Alice.

To switch to the root account, run `su` with a dash and no username:

```bash
su -
```

The dash starts a **login shell**, which also loads root's environment variables and navigates to root's home directory. Without the dash, you switch to root but keep your current environment.

Use the `exit` command to return to your previous user.

::: info
On many modern distributions, the root account has no password set and cannot be logged into directly. In that case, use `sudo -i` to start a root login shell instead.
:::

## Passwords

Use the **`passwd`** command to change your own password:

```bash
passwd
```

You will be prompted for your current password, then asked to enter and confirm the new one.

As root, you can change the password of any user by specifying their username:

```bash
sudo passwd alice
```

You can also lock a user account to prevent login, for example when an employee leaves:

```bash
sudo passwd -l alice
```

A locked account cannot be logged into with a password, even if the user knows it. To unlock the account:

```bash
sudo passwd -u alice
```

## Up next

In this lab, you learned how Linux identifies users and groups and how it controls access to files and directories through permissions. Practice what you've learned by solving the upcoming exercises.

When you're done, proceed to the next lab, where you'll learn how the operating system runs applications.
