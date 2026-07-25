# Exercises 5

## Exercise 5.1 {#users}

Use the `id` command to look up your own UID, primary GID, and group memberships. Then do the same for the `root` user. What differences do you notice?

Next, look up your entry in **/etc/passwd**. Identify each field and explain what it means.

Finally, look up the entry for `root` and compare its home directory and login shell to your own.

## Exercise 5.2 {#shadow}

Try to display the contents of **/etc/shadow** as a regular user. What happens and why?

Now use `sudo` to display its contents. Find your own entry and identify the hashed password field.

## Exercise 5.3 {#service-accounts}

Browse **/etc/passwd** and find two service accounts. For each one, note the login shell and explain why that shell was chosen for a service account.

## Exercise 5.4 {#groups}

Use the `groups` command to list all groups you belong to. Then use `id` to verify the result.

Look up each of your groups in **/etc/group**. For each group, note its GID and explain what purpose it likely serves based on its name.

## Exercise 5.5 {#read-permissions}

Navigate to **/etc** and run `ls -l`. Find one file where others have no permissions at all, one where the owner has different permissions from the group, and one where everyone has the same permissions.

For each file, write out its permissions in both symbolic and octal notation.

## Exercise 5.6 {#calculate}

Convert the following symbolic permissions to octal notation:

- `rwxr-xr-x`
- `rw-------`
- `r--r--r--`
- `rwxrwx---`

Then convert the following octal values to symbolic notation:

- `644`
- `700`
- `755`
- `640`

## Exercise 5.7 {#chmod}

Create a file named **permissions.txt** in your home directory.

Perform the following changes, verifying the result with `ls -l` after each step:

1. Remove all permissions from the group and others using octal notation.
2. Add read permission for the group using symbolic notation.
3. Give the owner, group, and others exactly `r-x` permissions using octal notation.
4. Add write permission for the owner and remove read permission for others using a single symbolic `chmod` command.

## Exercise 5.8 {#chown}

Create a file named **shared.txt** in your home directory.

Use `sudo` to change the group owner to `root`. Verify the change with `ls -l`.

Next, use `sudo` to change both the owner and group back to your own user and group in a single `chown` command.

## Exercise 5.9 {#umask}

Check the current umask value and write it out in both octal and symbolic notation.

Calculate what default permissions a new file and a new directory will receive with this umask. Verify your calculation by creating a file and a directory and inspecting their permissions.

Now temporarily set the umask to `077` and create another file and directory. What permissions do they receive? Who can access them besides the owner?

## Exercise 5.10 {#permissions-scenario}

Start by creating a second user named **bob** that you'll use in this exercise:

```bash
sudo useradd -m bob
```

Set bob's password using `passwd`. After changing it, log in to verify it works.

Next, use `sudo passwd -l` to lock bob's account, then try switching to it with `su`. What happens?

Unlock the account again and verify that login works as expected.

Finally remove bob's account and home directory with:

```bash
sudo userdel -r bob
```
