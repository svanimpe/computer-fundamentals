# Exercises 5

The following exercises use files from the **scripts** directory of the lab materials. Navigate to that directory first.

## Exercise 5.1 {#memory}

Run the script **memory-usage.py**. In a different tab, look up the PID of this script and find out how much memory it’s consuming. What do you observe?

## Exercise 5.2 {#cpu}

Run the script **cpu-usage.py**. In a different tab, look up the PID of this script and find out how much CPU time it’s consuming. What do you observe?

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

Next, perform the same steps for the script **misbehaved.py**. What do you observe?

## Exercise 5.6

Signals can also be sent using their number instead of their name. Run the following command to list all available signals and their number:

```bash
kill -l
```

Consult the man page for `kill` to learn how you can send a signal using its number, then repeat [Exercise 5.5](#signals) using signal numbers instead of names.

::: info
Signal numbers can vary between systems, so you should always prefer names over numbers.
:::

## Exercise 5.7

In this exercise, you’ll explore the **/proc** directory, which contains a [virtual filesystem](../labs/files-and-directories#virtual-filesystem) that provides information about running processes.

The files in **/proc** aren’t stored on disk; the kernel provides them dynamically whenever you access them. Each running process has its own subdirectory in **/proc**, named after its PID.

To get started, run the script **well-behaved.py**, find its PID, and navigate to its subdirectory in **/proc**. Browse the contents of this directory with `ls` and answer the following questions:

- What is the current working directory of the process?
- What executable is the process running?

Next, read the contents of the **cmdline** file. This file contains the full command that started the process, including any options and arguments. Unfortunately, these options and arguments are separated by null bytes (`\0`), which don’t display in your terminal. Use `tr` to replace these null bytes with spaces.

Next, read the contents of the **environ** file. This file contains the environment variables for the process, again separated by null bytes. Use `tr` to replace these null bytes with newline characters (`\n`), then find the environment value that contains the current working directory.

Finally, read the contents of the **status** file. Find out how much memory the process is using and compare your findings to the numbers reported by `top` or `htop`.
