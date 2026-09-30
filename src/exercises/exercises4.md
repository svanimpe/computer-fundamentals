# Exercises 4

::: warning
These exercises are still in draft. The text isn't polished yet and new exercises may be added in the future.
:::

Some of these exercises require a user account named **bob**. Create this account now:

```bash
sudo useradd -m bob
```

When you're done with the exercises, remove the account with the following command:

```bash
sudo userdel -r bob
```

## Exercise 4.1

Convert the following symbolic permissions to octal notation:

- `rwxr-xr-x`
- `rw-------`
- `r--r--r--`
- `rwxrwx---`

<details>
<summary>Solution</summary>
<pre>
755
600
444
770
</pre>
</details>

Convert the following octal permissions to symbolic notation:

- `644`
- `700`
- `754`
- `640`

<details>
<summary>Solution</summary>
<pre>
rw-r--r--
rwx------
rwxr-xr--
rw-r-----
</pre>
</details>

## Exercise 4.2

Set the umask to `002`.

<details>
<summary>Solution</summary>
<pre>
umask 002
</pre>
</details>

Create a file named **permissions.txt** in your home directory.

<details>
<summary>Solution</summary>
<pre>
cd
touch permissions.txt
</pre>
</details>

What permissions do you expect this file to have?

<details>
<summary>Answer</summary>
<pre>
rw-rw-r--
</pre>
</details>

Verify this by viewing the permissions of this file.

<details>
<summary>Solution</summary>
<pre>
ls -l permissions.txt
</pre>
</details>

Perform the following changes on **permissions.txt** and verify the result after each change.

Use octal notation to remove all permissions from the group and others.

<details>
<summary>Expected result</summary>
<pre>
rw-------
</pre>
</details>

<details>
<summary>Solution</summary>
<pre>
chmod 600 permissions.txt 
</pre>
</details>

Use symbolic notation to add read permission for the group.

<details>
<summary>Expected result</summary>
<pre>
rw-r-----
</pre>
</details>

<details>
<summary>Solution</summary>
<pre>
chmod g+r permissions.txt
</pre>
</details>

Use octal notation to give all categories the permissions `r--`.

<details>
<summary>Expected result</summary>
<pre>
r--r--r--
</pre>
</details>

<details>
<summary>Solution</summary>
<pre>
chmod 444 permissions.txt
</pre>
</details>

Use symbolic notation to add write permission for the owner and remove read permission for others in a single command.

<details>
<summary>Expected result</summary>
<pre>
rw-r-----
</pre>
</details>

<details>
<summary>Solution</summary>
<pre>
chmod u+w,o-r permissions.txt
</pre>
</details>

Finally, remove the file **permissions.txt**.

<details>
<summary>Solution</summary>
<pre>
rm permissions.txt
</pre>
</details>

## Exercise 4.3

Give Bob a temporary password and configure his account so that he has to change his password when he first signs in.

<details>
<summary>Solution</summary>
<pre>
sudo passwd bob
sudo passwd --expire bob
</pre>
</details>

Sign in as Bob and set a password.

<details>
<summary>Solution</summary>
<pre>
su bob
</pre>
</details>

Return to your own account.

<details>
<summary>Solution</summary>
<pre>
exit
</pre>
</details>

## Exercise 4.4

Copy the file **lab-materials.zip** from your **Downloads** directory into Bob's home directory.

<details>
<summary>Solution</summary>
<pre>
sudo cp ~/Downloads/lab-materials.zip /home/bob
</pre>
</details>

Transfer ownership of this file to Bob's user account and primary group.

<details>
<summary>Solution</summary>
<pre>
sudo chown bob:bob /home/bob/lab-materials.zip
</pre>
</details>

Can you combine the previous two steps in a single command? Explain your answer.

<details>
<summary>Answer</summary>
<p>No. To perform this copy, you need access to your own home directory (to read the original file) as well as Bob's (to write the copy). Only root can do this.</p>
<p>You can try to use <code>sudo -u bob</code> here but it won't work because Bob cannot access your <strong>Downloads</strong> directory.</p>
</details>

## Exercise 4.5

Create an environment value named `MY_NAME` that holds your username.

<details>
<summary>Solution</summary>
<pre>
export MY_NAME=$USER
</pre>
</details>

Sign in as Bob using a *non-login* shell.

<details>
<summary>Solution</summary>
<pre>
su bob
</pre>
</details>

Print the value of `MY_NAME`.

<details>
<summary>Solution</summary>
<pre>
echo $MY_NAME
</pre>
</details>

Return to your own account.

<details>
<summary>Solution</summary>
<pre>
exit
</pre>
</details>

Sign in as Bob using a *login* shell.

<details>
<summary>Solution</summary>
<pre>
su - bob
</pre>
</details>

Print the variable again. How would you explain what you see?

<details>
<summary>Answer</summary>
<p>A non-login shell inherits the environment of the shell that created it, which is why the <code>MY_NAME</code> variable still exists.</p>
<p>A login shell starts a fresh environment, so it doesn't inherit the <code>MY_NAME</code> variable.</p>
</details>

## Exercise 4.6

Return to your own account, then lock Bob's account.

<details>
<summary>Solution</summary>
<pre>
sudo passwd -l bob
</pre>
</details>

Try to sign in as Bob. What happens, and why do you think this is?

<details>
<summary>Answer</summary>
<p>Even though Bob's account is locked and he cannot sign in, the shell still prompts you for a password.</p>
<p>This is a security measure. Announcing that an account is locked would provide important information to an attacker, who can then direct their attention elsewhere. Therefore, the shell always prompts you for a password, even if your account is locked.</p>
</details>

Unlock Bob's account and verify it still works.

<details>
<summary>Solution</summary>
<pre>
sudo passwd -u bob
su bob
</pre>
</details>
