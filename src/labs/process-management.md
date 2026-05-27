# Process management

## Learning objectives

In this lab assignment you will learn:

- Query and interpret an overview of active processes
- View the hierarchical structure of processes
- Start processes in the foreground and background
- Look up a running process by name or PID
- Stop a process using a kill signal

## Introduction

Processes are the fundamental units of execution in an operating system. They represent running instances of programs and are responsible for executing code, managing resources, and performing tasks on behalf of users and applications. Understanding how processes work and how to manage them is crucial for system administration, performance optimization, and troubleshooting.

## What is a process?

(TODO: stuk over compileren? compileren staat ook bij OS)

A process is an instance of a running program. When you execute a command in the terminal, the operating system creates a new process to run that command. When you execute the same command multiple times, each execution creates a separate process sharing the same program code but with its own memory space and execution context.

### Address space

When creating a process, the operating system reserves a block of memory for it, which includes the program code, data, and stack. This memory is called the "address space". The address space typically contains the following segments:

- Stack: temporary storage for variables, function parameters, return addresses from functions, etc. If there is no more space on the stack, due to for example too deep or infinite recursion, one gets the infamous stack overflow error.
- Heap: dynamically allocated memory. If something is too large to place on the stack, or if something needs to be available across function boundaries, the stack is not a viable option. In that case, the heap can be used to dynamically allocate something. The heap does not work like a stack: what is stored there remains available until it is cleaned up by the programmer.
- Data: global variables.
- Text: the instructions to be executed.

Keep in mind that the address space may differ between operating systems and architectures, but the general concept of separate memory segments for code, data, and stack is common across most systems.

The process also has a state (running, sleeping, stopped, etc.) and may have child processes that it has spawned.

## Querying active processes

(intro tot het bekijken van actieve processen via ps, top, htop, btop)

In Linux, you can use various commands to view active processes and their details. The most basic command is `ps`, which provides a snapshot of the current processes. The `-e` flag shows all processes, and the `-f` flag provides a full-format listing with additional details (e.g. the command that started the process, the user who owns it, etc.).

```bash
ps -ef
```

The output of `ps -ef` contains several columns:

| Column | Description                                                                                        |
| ------ | -------------------------------------------------------------------------------------------------- |
| UID    | The user ID of the process owner                                                                   |
| PID    | The unique process identifier                                                                      |
| PPID   | The parent process ID — the PID of the process that created this one                               |
| C      | CPU utilization (percentage)                                                                       |
| STIME  | The time at which the process started                                                              |
| TTY    | The terminal associated with the process (`?` means no terminal, i.e. a background system process) |
| TIME   | Total CPU time consumed by the process                                                             |
| CMD    | The command that started the process                                                               |

Another useful command is `top`, which provides a real-time, interactive view of the system's processes. It shows CPU and memory usage, as well as other details about each process. You can sort processes by different criteria (e.g. CPU usage, memory usage) and interact with them (e.g. kill a process directly from the interface).

```bash
top
```

Try typing `?` while in `top` to see the available commands and options. You'll quickly notice that the interface is not very user-friendly, which is where `htop` comes in. `htop` is an improved version of `top` with a more intuitive interface, color coding, and additional features.

```bash
sudo apt install -y htop

htop
```

As you can see in `htop`, each process has a PID. The PID is a unique identifier assigned to each process by the operating system. It is used to manage and track processes, allowing you to perform actions such as sending signals (e.g. to stop a process) or changing its priority.

You'll also see a column "TIME+" in `htop`, which shows the total CPU time consumed by the process since it started. You might notice that some process have a value of 0:00.00 in this column, which means that they have not consumed any CPU time yet. This can happen if the process is sleeping or waiting for an event, or if it has just started and has not had a chance to execute any instructions.

## Process states

At any given moment, a process is in one of several states. You can see the state of each process in the `S` column in `htop`.

| State                                | Code | Description                                                                                                                                                                     |
| ------------------------------------ | ---- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Running                              | `R`  | The process is currently being executed by the CPU, or is in the run queue waiting to be executed.                                                                              |
| Sleeping                             | `S`  | The process is waiting for an event (e.g. user input, a timer, or data from disk). It will become runnable again once the event occurs.                                         |
| Uninterruptible sleep                | `D`  | Similar to sleeping, but the process cannot be interrupted by signals. This usually happens when the process is waiting for I/O (e.g. reading from disk).                       |
| Stopped                              | `T`  | The process has been paused, typically by a signal such as `SIGSTOP`. It will not execute until it receives a `SIGCONT` signal.                                                 |
| Zombie                               | `Z`  | The process has finished executing, but its entry is still in the process table because its parent has not yet read its exit status. Zombies consume no resources and disappear |
| once the parent reads the exit code. |

(TODO: btop in exercise?)

## Scheduling

The operating systems scheduler is responsible for allocating CPU time to processes. It uses various algorithms to determine which process should run next based on factors such as priority, CPU usage, and waiting time. When a process is scheduled to run, it is given access to the CPU and can execute its instructions. If a process is sleeping or waiting for an event, it will not consume CPU time until it becomes active again.

In the meantime the process state is kept in memory. When the process becomes active again, all necessary information is retrieved from memory, moved over to the CPU and the process can continue executing from where it left off. This is how the operating system manages multiple processes and allows them to share the CPU effectively.

### Scheduling algorithms

(TODO: schematische voorstelling van scheduling?)

Scheduling algorithms differ primarily in one dimension: whether they allow the scheduler to interrupt a running process.

#### Non-preemptive scheduling

In non-preemptive scheduling, once a process is given the CPU it runs until it either finishes or voluntarily yields. This simplifies the scheduler but hurts responsiveness — a single long-running process can block everything else.

Common non-preemptive algorithms:

- **First-Come, First-Served (FCFS)**: Processes are run in arrival order. Simple, but can cause long wait times when a slow process lands at the front of the queue.
- **Shortest Process Next (SPN)**: The process with the shortest expected execution time runs next. Minimizes average wait time, but longer processes can be starved indefinitely if short ones keep arriving.

#### Preemptive scheduling

In preemptive scheduling, the scheduler can pause a running process and switch to another one. This keeps the system responsive and prevents any single process from monopolizing the CPU.

Common preemptive algorithms:

- **Shortest Remaining Time (SRT)**: The preemptive variant of SPN. If a newly arrived process has a shorter remaining time than the current one, the scheduler immediately switches to it.
- **Round Robin (RR)**: Each process gets a fixed time slice (e.g. 100 ms). If it doesn't finish in time, it is preempted and moved to the back of the ready queue, giving every process a fair turn.

## Booting the system

When the computer is powered on, it goes through a boot process that initializes the hardware and starts the operating system. The boot process typically involves several stages:

1. **BIOS/UEFI**: The Basic Input/Output System (BIOS) or Unified Extensible Firmware Interface (UEFI) is the first code that runs when the computer is powered on. It performs hardware initialization and checks for a bootable device. It searches for a bootloader on the storage devices (e.g. hard drive, SSD) and loads it into memory.
2. **Bootloader**: The bootloader (e.g. GRUB in the case of Linux) is responsible for loading the operating system kernel into memory and transferring control to it.
3. **Unpacking the kernel and initramfs**: The kernel and initramfs are compressed to save space on disk and are unpacked into memory during the boot process. The initramfs (initial RAM filesystem) is a temporary root filesystem loaded into memory before the real root filesystem is available. It contains the minimal tools and drivers needed to mount the actual root filesystem, after which it is discarded.
4. **Kernel initialization**: The bootloader transfers control to the kernel, which initializes the hardware and sets up the necessary data structures for managing processes, memory, and devices.
5. **Starting the init system**: The kernel starts the init system (e.g. systemd), which is responsible for starting and managing all other processes on the system. The init system reads its configuration files to determine which services and processes to start at boot time. The init system is the first process started by the kernel and is assigned PID 1. Every other process on the system is a descendant of this process, making it the root of the entire process tree.

On Linux, the files involved in the boot process can be found in the `/boot` directory. This directory contains the kernel, initramfs, and the bootloader configuration files, among others.

```bash
ls -l /boot
```

In `/boot` you'll typically find the following files:

- `vmlinuz-<version>`: The compressed Linux kernel image.
- `initrd.img-<version>`: The initramfs image.
- `grub/`: A directory containing the GRUB bootloader configuration files and modules.

## Process hierarchy

`systemd` is the init system used by many Linux distributions. It is responsible for starting and managing all other processes on the system. Since `systemd` is the first process started by the kernel, it has PID 1 and is the root of the entire process tree. All other processes on the system are descendants of `systemd`, either directly or indirectly.

The process hierarchy can be visualized as a tree structure, where `systemd` is the root and all other processes are branches stemming from it.

```bash
pstree
```

(TODO: schematische voorstelling van een process tree via mermaid?)

When you pass the `-p` flag to `pstree`, it will show the PID of each process in parentheses next to its name. This can help you understand the parent-child relationships between processes and identify which processes are running under which parents. It will enlarge the output as `pstree` will by default merge identical processes into a single line with a count.

```bash
pstree -p
```

## Starting processes

When you run a command in the terminal, the shell starts a new child process to execute it. For example, running `firefox` launches the Firefox browser as a child of the shell process.

The new process inherits certain properties from its parent, such as environment variables and open file descriptors, and can receive additional arguments at start-up. The operating system also allocates dedicated resources for it, such as memory and CPU time.

Every process is assigned a unique **Process ID (PID)** by the kernel, along with a **Parent Process ID (PPID)** that links it back to the process that created it.

### Foreground vs background processes

A process can be started in the foreground or in the background. When a process is started in the foreground, it takes control of the terminal and the user cannot execute any other commands until the process finishes.

When a process is started in the foreground, it blocks the terminal until it finishes. Try running `sleep` for 10 seconds:

```bash
sleep 10
```

Notice that the terminal is unresponsive for the duration. You can cancel the process early by pressing `Ctrl+C`, which sends a signal to terminate it.

When a process is started in the background, it runs independently of the terminal and you can continue executing other commands while it is running. In bash, you start a process in the background by appending an ampersand (`&`) to the command:

```bash
sleep 10 &
```

You will immediately see output like `[1] 3428`, where `[1]` is the job number assigned by the shell and `3428` is the PID of the new process. The terminal remains available and you can keep working. Once the background process finishes, the shell will print a notification like `[1]+  Done  sleep 10` the next time you press Enter.

## Looking up processes

Once a process is running, you often need to find its PID — for example to inspect it, change its priority, or stop it. Start Firefox in the background so it keeps running while you work:

```bash
firefox &
```

You'll notice that however Firefox is running in the background, it will show the process' output in your terminal. This is because the standard output and error of the process are still connected to the terminal.

You can now look up its PID by name using `pidof` (in a separate terminal):

```bash
pidof firefox
```

`pidof` returns the PID (or multiple PIDs if several instances are running) of a process by its name. You can then use that PID with `ps` to get more details about the process:

```bash
ps -p $(pidof firefox)
```

TODO: hebben ze $(...) al gezien?

This shows the same columns as `ps -ef`, but filtered to just the process you are interested in. The `$(...)` syntax runs `pidof firefox` first and passes its output as an argument to `ps`.

If you want to search more broadly — for example when you do not know the exact process name — you can use `pgrep`:

```bash
pgrep -a fire
```

The `-a` flag also prints the full command line, not just the PID. `pgrep` matches against the process name as a substring, so `fire` is enough to find Firefox.

## Inspecting /proc

Every operating system keeps track of all processes running on the system in a process table. Linux exposes this information through a special virtual filesystem called `/proc`. This filesystem contains a directory for each active process, named after its PID. Inside each process directory, there are various files that provide information about the process, such as its status, memory usage, open file descriptors, and more.

Check out the contents of the process directory for one of the Firefox processes you found earlier:

```bash
ls /proc/<pid>
```

Each entry in that directory represents a property or resource of the process. The table below covers the most important ones:

| Entry     | Type      | Description                                                                                                        |
| --------- | --------- | ------------------------------------------------------------------------------------------------------------------ |
| `cmdline` | file      | The full command used to start the process, with arguments separated by null bytes.                                |
| `status`  | file      | Human-readable summary: name, PID, PPID, current state, and memory usage figures.                                  |
| `stat`    | file      | Machine-readable version of the same data, used internally by tools such as `ps` and `top`.                        |
| `environ` | file      | The environment variables the process was started with, separated by null bytes.                                   |
| `exe`     | symlink   | Points to the executable binary that was launched.                                                                 |
| `cwd`     | symlink   | Points to the process's current working directory.                                                                 |
| `fd/`     | directory | Contains one symlink per open file descriptor (stdin, stdout, stderr, open files, sockets, …).                     |
| `maps`    | file      | The virtual memory map: which address ranges are in use and what is mapped there (code, heap, stack, shared libs). |
| `io`      | file      | I/O statistics: how many bytes the process has read from and written to storage since it started.                  |
| `limits`  | file      | The resource limits in effect for the process (e.g. maximum number of open files, maximum stack size).             |
| `task/`   | directory | Contains one subdirectory per thread. Each subdirectory has the same layout as the process directory itself.       |

```bash
cat /proc/<pid>/status
```

This shows the name, PID, PPID, current state, and memory usage of the process in a readable format. Which of these fields do you recognize from the output of `ps`?

```bash
cat /proc/<pid>/cmdline
```

This prints the exact command used to launch the process. Because arguments are separated by null bytes rather than spaces, pipe through `tr` to make it readable:

```bash
cat /proc/<pid>/cmdline
```

## Stopping processes

In Linux, processes communicate with each other and with the operating system through signals. A signal is a software interrupt — a notification sent to a process to inform it that a specific event has occurred. When a process receives a signal, it can respond in one of three ways:

1. **Default action**: Perform the built-in action for that signal (e.g. terminate, stop, or ignore).
2. **Custom handler**: Execute a function the process registered for that signal, allowing it to clean up before exiting.
3. **Ignore**: Discard the signal entirely.

Signals are identified by both a name (e.g. `SIGTERM`) and a number (e.g. `15`). The most important ones are listed below:

| Signal    | Number | Default action | Description                                                                                                                        |
| --------- | ------ | -------------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| `SIGHUP`  | 1      | Terminate      | Sent when the controlling terminal is closed. Daemons often use it as a trigger to reload their configuration.                     |
| `SIGINT`  | 2      | Terminate      | Sent when the user presses `Ctrl+C`. Asks the process to stop, but the process can catch and handle it.                            |
| `SIGTERM` | 15     | Terminate      | The standard way to ask a process to stop. The process can catch the signal, perform cleanup, and then exit gracefully.            |
| `SIGKILL` | 9      | Terminate      | Forces the kernel to destroy the process immediately. Cannot be caught, ignored, or blocked — there is no opportunity to clean up. |
| `SIGSTOP` | 19     | Stop           | Pauses the process. Like `SIGKILL`, it cannot be caught or ignored.                                                                |
| `SIGCONT` | 18     | Continue       | Resumes a process that was previously stopped with `SIGSTOP`.                                                                      |

The `kill` command sends a signal to a process by its PID. Despite its name, it is not limited to terminating processes — it can send any signal. Without a signal specified, it sends `SIGTERM` (15) by default:

```bash
kill <pid>         # sends SIGTERM
kill -9 <pid>      # sends SIGKILL
kill -SIGSTOP <pid>  # sends SIGSTOP — pauses the process
kill -SIGCONT <pid>  # sends SIGCONT — resumes it
```

Try to stop the Firefox process you started earlier using `kill`:

```bash
kill $(pidof firefox)
```

### Graceful shutdown with SIGTERM

Start the simulation script in the background:

```bash
chmod u+x kill-signals.sh
./kill-signals.sh &
```

Note the PID printed by the shell, then send `SIGTERM` to it:

```bash
kill <pid>
```

`kill-signals.sh` catches `SIGTERM`, prints a message, and exits cleanly. You can observe the output in the terminal — the process has a chance to finish any work in progress before it stops.

### Forced termination with SIGKILL

Start the script again and this time send `SIGKILL`:

```bash
./kill-signals.sh &
kill -9 <pid>
```

The process is destroyed by the kernel immediately, with no opportunity to run a cleanup handler. You will not see the graceful-shutdown message this time.

<details>
  <summary>
  When should we use <code>kill &lt;pid&gt;</code> versus <code>kill -9 &lt;pid&gt;</code>?
  </summary>

`kill <pid>` sends **SIGTERM** (15): the process receives the signal and can handle it — running cleanup code, flushing buffers, closing connections — before it exits. The process can also choose to ignore it entirely.

`kill -9 <pid>` sends **SIGKILL** (9): the kernel destroys the process immediately, bypassing any signal handler. There is no cleanup, no graceful shutdown, no way for the process to refuse.

Always try `kill <pid>` first. Well-written processes handle SIGTERM correctly and exit cleanly. Fall back to `kill -9 <pid>` only if the process does not respond — for example if it is frozen or stuck in an infinite loop ignoring signals. Be aware that a SIGKILL'd process may leave behind partial writes, open sockets, or lock files that need manual cleanup.
</details>
