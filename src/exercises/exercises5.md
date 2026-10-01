# Exercises 5

The following exercises use files from the **scripts** directory of the lab materials. Navigate to that directory first.

## Exercise 5.1 {#memory}

Run the script **memory-usage.py**. In a different tab, look up the PID of this script and find out how much memory it’s consuming. What do you observe?

<details>
<summary>Solution</summary>
In the first tab:
<pre>
python3 memory-usage.py
</pre>
In the second tab:
<pre>
top -p $(pgrep python3)
</pre>
Or use any combination of <code>ps</code>, <code>pidof</code>, and <code>pgrep</code> to find the PID, then use <code>top</code> to monitor the process.
</details>

<details>
<summary>Answer</summary>
You should see the memory usage go up by about 1MB every two seconds.
</details>

## Exercise 5.2 {#cpu}

Run the script **cpu-usage.py**. In a different tab, look up the PID of this script and find out how much CPU time it’s consuming. What do you observe?

<details>
<summary>Solution</summary>
In the first tab:
<pre>
python3 cpu-usage.py
</pre>
In the second tab:
<pre>
top -p $(pgrep python3)
</pre>
Or use any combination of <code>ps</code>, <code>pidof</code>, and <code>pgrep</code> to find the PID, then use <code>top</code> to monitor the process.
</details>

<details>
<summary>Answer</summary>
You should see the process consuming about 50% CPU.
</details>

## Exercise 5.3 {#htop}

In this exercise, you’ll install and use **`htop`**, an alternative to `top` which provides a more intuitive interface.

First, use `apt` to install `htop`. Next, run `htop` and press `F2` to enter its setup screen. Use the arrow keys to navigate to “Display options”, find the “Hide userland process threads” setting, and press `Enter` to enable it. When you’re done, press `q` to return to the previous screen.

Now that `htop` is installed and configured, repeat [Exercise 5.1](#memory) and [Exercise 5.2](#cpu) using `htop` instead of `top`. Explore the following features:

- Press `F3` or `/` to perform a search. `htop` will highlight the first process that matches your query. Use `F3` and `Shift+F3` to jump between matches.
- Press `F4` to filter the list of processes. `htop` will only show processes that match your query.
- Press `F6` to choose a sort order.

When you’re done, press `q` to quit.

Finally, `htop` also supports the `-p` option. Use this option to only see the processes you’re interested in, without having to search or filter first.

## Exercise 5.4

In the previous lab, you used `pstree` to view the ancestry of a process. In this exercise, you’ll gather the same information using only `ps`.

Start `htop`, then open an additional tab and use `ps` to find its PID. Next, use the `-f` (*full-format*) option of `ps` to find the PPID of `htop`. Repeat this step for each parent process until you’ve worked your way up the process tree. Finally, compare your findings with the output of `pstree`.

::: info
`htop` can also show the process tree. Press `F5` to toggle between a list view and a tree view.
:::

## Exercise 5.5 {#signals}

Run the script **well-behaved.py**. Send it the signals SIGINT, SIGTERM, and SIGKILL, and observe how the script responds to these signals.

<details>
<summary>Solution</summary>
Start the script with:
<pre>
python3 well-behaved.py
</pre>
In a second tab run:
<pre>
kill -INT $(pgrep python3)
</pre>
<p>Repeat these steps for SIGTERM (<code>-TERM</code>) and SIGKILL (<code>-KILL</code>). For SIGINT, you can also press <code>Ctrl+C</code> in the tab where the script is running.</p>
<p>Any one of these signals will stop the script.</p>
</details>

Next, perform the same steps for the script **misbehaved.py**. What do you observe?

<details>
<summary>Answer</summary>
This script ignores SIGINT and SIGTERM. You can only stop it by sending SIGKILL.
</details>

## Exercise 5.6

Signals can also be sent using their number instead of their name. Run the following command to list all available signals and their number:

```bash
kill -l
```

Consult the man page for `kill` to learn how you can send a signal using its number, then repeat [Exercise 5.5](#signals) using signal numbers instead of names.

::: info
Signal numbers can vary between systems, so you should always prefer names over numbers.
:::

<details>
<summary>Solution</summary>
SIGINT:
<pre>
kill -2 $(pgrep python3)
</pre>
SIGTERM:
<pre>
kill -15 $(pgrep python3)
</pre>
SIGKILL:
<pre>
kill -9 $(pgrep python3)
</pre>
</details>

## Exercise 5.7

In this exercise, you’ll explore the **/proc** directory, which contains a [virtual filesystem](../labs/files-and-directories#virtual-filesystem) that provides information about running processes.

The files in **/proc** aren’t stored on disk; the kernel provides them dynamically whenever you access them. Each running process has its own subdirectory in **/proc**, named after its PID.

To get started, run the script **well-behaved.py**, find its PID, and navigate to its subdirectory in **/proc**. Browse the contents of this directory with `ls` and answer the following questions:

- What is the current working directory of the process?
- What executable is the process running?

<details>
<summary>Solution</summary>
<pre>
cd /proc/$(pgrep python3)
ls
ls -l cwd
ls -l exe
</pre>
</details>

<details>
<summary>Answer</summary>
The current working directory will be the <strong>scripts</strong> directory of the lab materials. The executable will be <strong>/usr/bin/python3.14</strong> (or a newer version).
</details>

Next, read the contents of the **cmdline** file. This file contains the full command that started the process, including any options and arguments. Unfortunately, these options and arguments are separated by null bytes (`\0`), which don’t display in your terminal. Use `tr` to replace these null bytes with spaces.

<details>
<summary>Solution</summary>
<pre>
tr '\0' ' ' < cmdline
</pre>
</details>

Next, read the contents of the **environ** file. This file contains the environment variables for the process, again separated by null bytes. Use `tr` to replace these null bytes with newline characters (`\n`), then find the environment value that contains the current working directory.

<details>
<summary>Solution</summary>
<pre>
tr '\0' '\n' < environ | grep PWD
</pre>
</details>

Finally, read the contents of the **status** file. Find out how much memory the process is using and compare your findings to the numbers reported by `top` or `htop`.

<details>
<summary>Solution</summary>
<pre>
cat status
</pre>
The memory usage is listed as <strong>VmRSS</strong> (<em>virtual memory resident set size</em>), which corresponds with the <strong>RES</strong> column in <code>top</code> and <code>htop</code>.
</details>