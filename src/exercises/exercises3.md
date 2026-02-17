# Exercises 3

::: warning
These exercises are still in draft. The text isn't polished yet and new exercises may be added in the future.
:::

## Exercise 3.1

Define a local variable named `FULL_NAME` that contains your full name.

<details>
<summary>Solution</summary>
<pre>
FULL_NAME="John Appleseed"
</pre>
</details>

Turn this local variable into a global one.

<details>
<summary>Solution</summary>
<pre>
export FULL_NAME
</pre>
</details>

Verify that the variable is present in the list of global variables on your system.

<details>
<summary>Solution</summary>
<pre>
env | grep FULL_NAME
</pre>
</details>

Use the variable to print the greeting “Hi, my name is (full name)”. Replace the placeholder with your full name.

<details>
<summary>Example output</summary>
<pre>
Hi, my name is John Appleseed
</pre>
</details>

<details>
<summary>Solution</summary>
<pre>
echo Hi, my name is ${FULL_NAME}
</pre>
</details>

Delete the variable `FULL_NAME`.

<details>
<summary>Solution</summary>
<pre>
unset FULL_NAME
</pre>
</details>

Use the history to recall the command you used to verify that the variable was present in the list of global variables, then rerun this command to verify that the variable was deleted.

<details>
<summary>Answer</summary>
There are multiple ways to do this:
<ul>
<li>Press the <code>Up</code> arrow key to scroll through your history until you find the correct command.</li>
<li>Press <code>Ctrl+R</code> to perform a reverse search and type <code>env</code> to recall the command.</li>
<li>Run <code>history</code> to look up the number for the command you need, then rerun it using <code>!number</code>.</li>
</ul>
</details>

## Exercise 3.2

Revisit [Exercise 1.5](exercises1#commands) and find the command that prints your username. Use this command to print the text “I'm signed in as (username)”. Replace the placeholder with your username.

<details>
<summary>Example output</summary>
<pre>
I'm signed in as jappleseed
</pre>
</details>

<details>
<summary>Solution</summary>
<pre>
echo "I'm signed in as $(whoami)"
</pre>
</details>

Print the full *command* you used to print this text. This is trickier than it sounds, so experiment with different combinations of quotes and backslashes to find out what works.

<details>
<summary>Example output</summary>
<pre>
echo "I'm signed in as $(whoami)"
</pre>
</details>

<details>
<summary>Solutions</summary>
<pre>
echo "echo \"I'm signed in as \$(whoami)\""
echo echo \"I\'m signed in as '$(whoami)'\"
echo echo \"I\'m signed in as \$\(whoami\)\"
</pre>
</details>

## Exercise 3.3

Navigate to your home directory and print all file and directory names that start with the letter “D”.

<details>
<summary>Example output</summary>
<pre>
Desktop Documents Downloads
</pre>
</details>

<details>
<summary>Solution</summary>
<pre>
echo D*
</pre>
</details>

Use `find` to perform a recursive search of your home directory and find all directories that start with the letter “D”.

<details>
<summary>Example output</summary>
<pre>
./.config/Code/DawnGraphiteCache
./.config/Code/Dictionaries
./.config/Code/Service Worker/Database
./.config/Code/DawnWebGPUCache
./Desktop
./.cache/Microsoft/DeveloperTools
./Documents
./Downloads
</pre>
</details>

<details>
<summary>Solution</summary>
<pre>
find . -type d -name "D*"
</pre>
</details>

## Exercise 3.4

Navigate to the **/etc** directory, then use globbing to perform the following tasks.

Print all filenames that start with the string “host”.

<details>
<summary>Expected output</summary>
<pre>
host.conf hostname hosts hosts.allow hosts.deny
</pre>
</details>

<details>
<summary>Solution</summary>
<pre>
echo host*
</pre>
</details>

Print all filenames that start with the string “host” and have a file extension of exactly four characters.

<details>
<summary>Expected output</summary>
<pre>
host.conf hosts.deny
</pre>
</details>

<details>
<summary>Solution</summary>
<pre>
echo host*.????
</pre>
</details>

Print all filenames that start with the string “host” and have a file extension of *at least* three characters.

<details>
<summary>Expected output</summary>
<pre>
host.conf hosts.allow hosts.deny
</pre>
</details>

<details>
<summary>Solution</summary>
<pre>
echo host*.???*
</pre>
</details>

Print all filenames that start with the string “hosts” or the string “hostn”.

<details>
<summary>Expected output</summary>
<pre>
hostname hosts hosts.allow hosts.deny
</pre>
</details>

<details>
<summary>Solution</summary>
<pre>
echo host[sn]*
</pre>
</details>

Print all filenames that start with the string “host” but not the string “hosts”.

<details>
<summary>Expected output</summary>
<pre>
host.conf hostname
</pre>
</details>

<details>
<summary>Solution</summary>
<pre>
echo host[!s]*
</pre>
</details>

## Exercise 3.5

Navigate to your **Documents** directory, then use brace expansion to create the following directory hierarchy:

```
computer-fundamentals/
├── lab-1-materials
├── lab-2-materials
├── lab-3-materials
├── lab-4-materials
└── lab-5-materials
```

You only need one command to create all of these directories! Test your expansion with `echo` first, before your attempt to create the directories.

<details>
<summary>Solution</summary>
<pre>
mkdir -p computer-fundamentals/lab-{1..5}-materials
</pre>
</details>

Remove the directories you created with the previous command.

<details>
<summary>Solution</summary>
<pre>
rm -R computer-fundamentals
</pre>
</details>

## Exercise 3.6

Create an alias `alnum` that prints the letters a through z and the digits 0 through 9, all on one line.

<details>
<summary>Expected output</summary>
<pre>
a b c d e f g h i j k l m n o p q r s t u v w x y z 0 1 2 3 4 5 6 7 8 9
</pre>
</details>

<details>
<summary>Solution</summary>
<pre>
alias alnum='echo {a..z} {0..9}'
</pre>
</details>

Delete this alias.

<details>
<summary>Solution</summary>
<pre>
unalias alnum
</pre>
</details>
