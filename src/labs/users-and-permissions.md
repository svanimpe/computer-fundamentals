# Users and Permissions

::: warning
This lab is still in draft. It contains all the information you need, but the text isn't polished yet.
:::

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

Every Linux system has this special user named **root**, also known as the **superuser**, which has a UID of 0. The root user can modify any file on the system, regardless of its permissions.

Because root is so powerful, any mistake made as root can damage or compromise the entire system. For this reason, it's best practice to avoid logging in directly as root, which is why we use `sudo` instead to temporarily elevate our privileges to those of root.

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
cat /etc/shadow
```

Try again with `sudo` to elevate your permissions:

```bash
sudo cat /etc/shadow
```

Each line in **/etc/shadow** corresponds to a user account in **/etc/passwd** and stores the hashed password alongside information such as when the password was last changed and when it expires.

::: info
A **hash function** transforms a password into a fixed-length string through a non-reversible process. When you log in, the system hashes the password you entered and compares the result to the stored hash. This way, the system can authenticate you without ever needing to store your password.
:::

## Groups

A **group** is a collection of user accounts. Groups make it practical to share access to resources: instead of managing permissions for each user individually, you add users to a group and assign permissions to that group.

Every user belongs to at least one group: their **primary group**. This group usually has the same name as its user and is automatically assigned to all files created by this user. Users can also belong to **secondary groups**, which grant access to resources shared by those groups.

Group information is stored in **/etc/group**. Take a look at its contents:

```bash
cat /etc/group
```

Each line represents one group, with fields separated by colons. For example:

```
sudo:x:27:steven
```

| Field                | Example            | Description                                                         |
| -------------------- | ------------------ | ------------------------------------------------------------------- |
| Group name           | `sudo`       | The name of the group.                                              |
| Password placeholder | `x`                | Groups can have passwords, but this is rarely used.                 |
| GID                  | `27`             | The group ID.                                                       |
| Members              | `steven` | A comma-separated list of users for whom this is a secondary group. |

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

## Changing passwords

Use the **`passwd`** command to change your password:

```bash
passwd
```

You will be prompted for your current password, then asked to enter and confirm the new one.

As root, you can change the password of any user. To try this out, first create a new user named alice:

```bash
sudo useradd -m alice
```

Now set an initial password for Alice:

```bash
sudo passwd alice
```

You can set this password to expire immediately after Alice signs in. She will then be prompted to change her password:

```bash
sudo passwd --expire alice
```

You can also use `passwd` to lock a user account, for example, when a user leaves your organization:

```bash
sudo passwd -l alice
```

A locked account cannot be logged into, even when a user knows the password. To unlock the account, use the `-u` option:

```bash
sudo passwd -u alice
```

## Permissions

Every file and directory has a set of **permissions** that control who can read, modify, or execute it. These permissions are divided into three categories:

| Category | Symbol | Description                   |
| -------- | ------ | ----------------------------- |
| Owner (*user*)    | `u`    | Permissions for the user that owns the file.  |
| Group    | `g`    | Permissions for the group that owns the file. |
| Others   | `o`    | Permissions for everyone else.                |

Each of these categories has three permission bits. The meaning of each bit depends on whether it's set on a file or on a directory:

| Permission | Symbol | On a file                       | On a directory                                        |
| ---------- | ------ | ------------------------------ | ----------------------------------------------------- |
| Read       | `r`    | View the contents of the file. | List the contents of the directory.                   |
| Write      | `w`    | Modify the file.     | Create, rename, or delete files inside the directory. |
| Execute    | `x`    | Run the file as a program.     | Enter the directory and access its contents.          |

Directory permissions can take some getting used to. For example, you cannot `cd` into a directory without execute permission on that directory, even if you have permission to read the directory. Also, you cannot remove a file from a directory without write permission on the *directory*, even if you have write permission on the *file*.

### Viewing permissions

Use `ls -l` to view the permissions of files and directories:

```bash
ls -l
```

Each line of output starts with a string of ten characters. For example:

```
-rwxr-xr--
```

The first of these characters indicates the **file type**:

| Character | File type     |
| --------- | ------------- |
| `-`       | Regular file  |
| `d`       | Directory     |
| `l`       | Symbolic link |

The remaining nine characters form three groups of three, representing the permissions for the owner, group, and others respectively:

```
rwx  r-x  r--
 │    │    └── Others: read only
 │    └── Group: read and execute
 └── Owner: read, write, and execute
```

Each letter indicates that permission is granted; a dash (`-`) means it's not.

### Octal notation

Permissions can also be expressed as three-digit octal numbers, with one digit per category (owner, group, and others), ranging from 0 to 7. The value of each digit is the sum of the granted permissions for that category:

| Permission | Value |
| ---------- | ----- |
| Read       | 4     |
| Write      | 2     |
| Execute    | 1     |

For example, the permissions `rwxr-xr--` correspond with:

- Owner: `r` + `w` + `x` = 4 + 2 + 1 = **7**
- Group: `r` + `x` = 4 + 1 = **5**
- Others: `r` = **4**

The octal representation of `rwxr-xr--` is therefore **754**. You can use this octal representation as a shorthand to set all permission bits at once.

### Changing permissions

Use the **`chmod`** (*change mode*) command to change the permissions of a file or directory. To try this out, first create a few new files:

```bash
touch script.sh report.txt secret
```

The **`touch`** command updates the modification time of a file, and as a side effect, also creates the file.

Use `ls -l` to view the permissions of these files. By default, they should all be set to `rw-rw-r--`. You can use either **symbolic notation** or **octal notation** to change these permissions.

With symbolic notation, you build up a change from three parts: **who**, **what**, and **which**.

The **who** part specifies the category to change:

| Symbol | Category                     |
| ------ | ---------------------------- |
| `u`    | Owner (*user*)               |
| `g`    | Group                        |
| `o`    | Others                       |
| `a`    | All categories               |

The **what** part specifies the operation:

| Symbol | Operation                                           |
| ------ | --------------------------------------------------- |
| `+`    | Add the permission.                                 |
| `-`    | Remove the permission.                              |
| `=`    | Set exactly these permissions, removing any others. |

The **which** part specifies the permissions to change:

| Symbol | Permission                                          |
| ------ | --------------------------------------------------- |
| `r`    | Read                                 |
| `w`    | Write                              |
| `x`    | Execute |

You can specify multiple categories and permissions in a single change, and even specify multiple changes in a single command. For example:

```bash
chmod u+x script.sh
chmod ug+x script.sh
chmod a+x script.sh
chmod g-w report.txt
chmod g-rw report.txt
chmod g=r,o= secret
```

Here's what these example do:

1. Add execute permission for the owner on **script.sh**.
2. Add execute permission for the owner and group on **script.sh**.
3. Add execute permission for all categories on **script.sh**.
4. Remove write permission for the group on **report.txt**.
5. Remove read and write permissions for the group on **report.txt**.
6. Set the group permissions to read-only and remove all permissions for other users on **secret**.

With octal notation, you set all permission bits at once:

```bash
chmod 644 report.txt
```

This sets the permissions of **report.txt** to `rw-r--r--`: read and write for the owner, read-only for the group and others.

When you're done experimenting with `chmod`, clean up the files you created:

```bash
rm script.sh report.txt secret
```

### Changing owner and group

As root, you can change the owner and group of a file. To try this out, suppose you want to prepare the lab materials for the new user you created earlier.

Create a new directory for the lab materials in Alice's home directory:

```bash
sudo mkdir /home/alice/lab-materials
```

::: info
You can now unzip and organize the lab materials into this directory, as you did in [Files and Directories](files-and-directories#materials). However, this step is optional because you don't actually need these files to complete this lab.
:::

Because you used `sudo`, the **lab-materials** directory is owned by root, not Alice:

```bash
sudo ls -ld /home/alice/lab-materials
```

Use the **`chown`** (*change owner*) command to transfer ownership to Alice:

```bash
sudo chown -R alice /home/alice/lab-materials
```

The `-R` option applies this change recursively to all of the files and subdirectories in **lab-materials**.

Next, use the **`chgrp`** (*change group*) command to set the group to Alice's primary group, which is also named `alice`:

```bash
sudo chgrp -R alice /home/alice/lab-materials
```

Alternatively, you can use `chown` to change both the owner and the group:

```bash
sudo chown -R alice:alice /home/alice/lab-materials
```

Confirm these changes with `ls`:

```bash
sudo ls -ld /home/alice/lab-materials
```

### Default permissions

When you create a new file or directory, Linux assigns it a default set of permissions based on the base set and the current **umask** (*user file-creation mask*).

The base permissions are:

- **666** (`rw-rw-rw-`) for files
- **777** (`rwxrwxrwx`) for directories

This enables all permissions, except for files, which aren't executable by default.

The umask specifies the permissions to *remove* from the base set. Each bit in the umask that is set to 1 removes the corresponding permission from the base set.

For example, a umask of **022** (`----w--w-`) removes write permissions for the group and other users. This results in default permissions of **755** (`rwxr-xr-x`) for directories:

```
Base:     rwxrwxrwx  (777)
Mask:     ----w--w-  (022)
          ─────────
Default:  rwxr-xr-x  (755)
```

and **644** (`rw-r--r--`) for files:

```
Base:     rw-rw-rw-  (666)
Mask:     ----w--w-  (022)
          ─────────
Default:  rw-r--r--  (644)
```

The **`umask`** command displays the current umask:

```bash
umask
```

You also use it to set the umask:

```bash
umask 007
```

This value only applies to your current shell session. To make it permanent, add this `umask` command to your **.bashrc** file.

## Switching users

The **`su`** (*switch user*) command starts a new shell session as a different user:

```bash
su alice
```

This prompts for Alice's password. After authenticating, you're running commands as Alice. When you're done, use the `exit` command to return to your own shell.

You can add a dash (`-`) to start a **login shell** instead:

```bash
su - alice
```

This will load a fresh environment for Alice, load her settings from **.bashrc**, and start in her home directory. Verify this with `pwd` and compare it to using `su` without the dash.

If you don't specify a username, `su` will attempt to sign in as root:

```bash
su
```

However, this won't work because the root user doesn't have a password configured. Ubuntu, like many Linux distributions, doesn't allow signing in as `root`, which is why we use `sudo` instead.

## Elevated privileges

The **`sudo`** (*switch user and do* or *superuser do*) command lets an authorized user run a single command with elevated privileges, typically as root:

```bash
sudo apt update
```

This approach is safer than signing in as root because you only gain elevated privileges for a single command, you authenticate with your own password rather than the root password, and every `sudo` command is logged.

Use the `-u` option to run a command as a user other than root:

```bash
sudo -u alice mkdir /home/alice/lab-materials
```

This is particularly useful when creating files or directories, as it avoids having to transfer ownership afterwards.

Finally, you can also use `sudo` to start an interactive (`-i`) login shell, where you can run multiple commands as a different user:

```bash
sudo -u alice -i
```

This is similar to using `su`, but `sudo` does allow signing in as root:

```bash
sudo -i
```

This is slightly safer than `su` because it doesn't require a root password. However, it remains risky because, as root, every mistake you make can effect the entire system.

### The sudo group

Not every user is allowed to use `sudo`. Most Linux distributions configure a dedicated group whose members are authorized to use `sudo`. On Ubuntu, this group is named **sudo**. On some other systems, it's named **wheel**.

Use the `groups` command to verify that you belong to this group:

```bash
groups
```

Or use `grep` to see everyone in the sudo group:

```bash
grep sudo /etc/group
```

::: info
In [Exercise 1.4](../exercises/exercises1#user), you used the desktop environment to create a new user account. The panel where you configured this user had an “Administrator” toggle. This toggle adds the user to the sudo group.
:::

## Up next

In this lab, you learned how Linux organizes users and groups and how it controls access to files and directories through permissions. Practice what you've learned by solving the upcoming exercises.

When you're done, proceed to the next lab, where you'll learn how the operating system runs applications.
