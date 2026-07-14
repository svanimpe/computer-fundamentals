# Process Management

In this lab, you’ll learn how an operating system runs applications.

You’ll learn about **processes**, their life cycle, and how you can monitor their activity. Understanding how processes work and how to manage them is crucial for system administration, performance optimization, and troubleshooting.

## Processes

When you compile the source code for an application, the compiler outputs an executable file that contains instructions for the CPU. When you run this file, the operating system creates a **process**. This process represents a running instance of the application and is responsible for executing its code and managing its resources. You can run the same application multiple times; each run creates a new process.

The operating system tracks the state of every process in a **process table** and provides processes with the resources they need to run their code, most notably **memory** and **CPU time**.

### Address space

The operating system reserves a piece of memory for every process it creates. This memory is known as the **address space** of the process and is divided into segments:

- The **text** segment contains instructions for the CPU, loaded from the executable file. This segment is read-only, so processes running the same executable can share a text segment.
- The **data** segment contains global and static variables used by the executable.
- The **stack** segment is used to implement function calls and is managed by the CPU. Every time the CPU encounters a function call, it reserves enough memory on the stack to store that function’s parameters, local variables, and return address. When the function ends, its memory is removed from the stack.
- The **heap** segment stores data whose lifetime is not bound to a single function and data that is too large to be put on the stack. Some programming languages require the programmer to manually allocate and free heap memory; other languages rely on reference counting or garbage collection to manage the heap for you. 

The organization of the address space may differ between operating systems and hardware architectures, but these segments are common across most systems.

### Virtual memory

Operating systems rely on **virtual memory** to improve their security and stability. With virtual memory, processes are assigned a virtual address space whose addresses do not directly correspond with physical memory locations. This virtual address space gives each process the illusion of having exclusive access to the entire memory, while in reality, it can only access a small part of it.

The operating system works together with the **memory management unit (MMU)** of the CPU to translate virtual addresses into physical addresses. This layer of indirection ensures that processes cannot access memory assigned to other processes.

### Scheduling

Processes need access to the CPU to execute their instructions. However, a CPU only has a small number of execution cores, limiting the number of processes it can execute in parallel. When the number of processes exceeds the number of execution cores, processes take turns sharing the CPU.

Operating systems use a **scheduler** to allocate CPU time to processes. Schedulers can handle a large number of processes and use various algorithms to balance fairness with overall system performance.

A scheduler starts by checking the state of each process:

- A process is in the **running** state when it’s able to continue executing. A running process is either executing on the CPU or waiting in the run queue. In both cases, the process is eligible to be scheduled for CPU time.
- A process is in the **sleeping** state when it’s waiting for an event. It may be waiting for input from the user, a timer to run out, or data to become available. A sleeping process is blocked and is unable to continue executing until the event it’s waiting for occurs. At that time, the process will rejoin the run queue.
   
The scheduler considers all running processes, determines the next process to execute, and allocates it CPU time.

When the time comes to execute the next process, the operating system performs a **context switch**:

1. The currently executing process is paused.
2. The operating system stores the current state of the CPU in the process table, so the paused process can be resumed later.
3. The operating system loads the state of the next process from the process table and configures the CPU.
4. The CPU resumes executing.

Rapidly switching between processes creates the illusion that all processes are executing simultaneously. However, context switches are expensive operations for the CPU and they can reduce system performance. Schedulers must balance these factors and optimize the number of context switches.

Schedulers must also prevent any single process from monopolizing the CPU. Most schedulers are **preemptive**: they can pause a running process when it has used up its allocated CPU time. A non-preemptive scheduler must wait until a process finishes executing, goes to sleep, or voluntarily yields the CPU.

An example of preemptive scheduling is **round robin**. This algorithm allocates each process a fixed time slice (e.g. 100ms) and preempts a process when its time is up. Processes that finish their turn move to the back of the queue and wait until all other processes are given a turn before resuming their work.

This algorithm seems fair but performs poorly in most real-world scenarios. Linux implements a far more advanced scheduling algorithm that uses variable time slices and takes into account the weight or priority of a process, the amount of CPU time it has used so far, and whether or not the process is interactive and requires quick response times.

## Process overview

A Linux distribution includes many useful commands to look up processes and monitor their activity.

The **`ps`** (*process status*) command lists active processes:

```bash
ps
```

The output of `ps` contains the following columns:

| Column | Description |
| ------ | ----------- |
| PID    | The **Process ID**, a unique identifier for the process. |
| TTY    | The terminal (“teletype”) associated with the process.<br>Background processes show a question mark (`?`) in this column. |
| TIME   | The total CPU time consumed by the process since it started. |
| CMD    | The executable or command this process is running. |

By default, `ps` only shows processes in your current session. Add the `-e` option to see every process on the system:

```bash
ps -e
```

You may be surprised to see how many processes are active on your system.

The **`top`** command displays process activity in real-time:

```bash
top
```

`top` shows a lot of information. For now, focus on the following columns:

| Column  | Description |
| ------- | ----------- |
| PID     | The Process ID. |
| USER    | The user that owns this process. |
| RES     | The amount of memory being used by the process (“resident memory”).<br>Press `e` to display this amount in a different unit. |
| S       | The current state of the process.<br>`R` indicates a running process.<br>`S` indicates a sleeping process.|
| %CPU    | The percentage of CPU time being used by the process.<br>This can exceed 100% if the process uses multiple CPU cores.<br>Press `P` to sort by this amount. |
| %MEM    | The percentage of memory being used by the process.<br>Press `M` to sort by this amount. |
| TIME+   | The total CPU time consumed by the process since it started.<br>Press `T` to sort by this amount. |
| CMD     | The executable or command this process is running. |

When you’re done, press `q` to quit `top`.

::: info
`top` is not very user-friendly. Most users prefer an alternative command, such as **`htop`**, which provides a more intuitive interface, color coding, and additional features. You’ll install and use `htop` in [Exercise 6.3](../exercises/exercises6#htop).
:::

## Starting processes

Every time you run a command in the terminal or start an application through the graphical user interface, the operating system creates a new process and assigns it a unique PID.

For example, start Firefox by clicking its icon in the dock, then run the following command:

```bash
ps -e | grep firefox
```

This command uses `grep` to find the newly created process in the output of `ps`.

Next, quit Firefox, then run it again from the command line:

```bash
firefox
```

This command starts Firefox as a **foreground** process. A foreground process remains in control of the terminal. You cannot execute any commands until the process finishes.

Quit Firefox to regain control of the terminal, then run the following command:

```bash
firefox &
```

The ampersand (**`&`**) at the end of this command starts Firefox as a **background** process. Bash will print its PID, for example:

```
[1] 3776
```

Background processes may continue to print messages to the terminal, but they don’t block you from running other commands. For example, while Firefox is running, press Enter to start a new prompt, and rerun this command from earlier:

```bash
ps -e | grep firefox
```

Finally, quit Firefox, then press Enter in the terminal. Bash will confirm the process has finished:

```
[1]+  Done                       firefox
```

::: info
A single command may create multiple processes, such as when using pipes (`|`). For this reason, Bash uses **job numbers** (not PIDs) to track background jobs. In the example above, `[1]` was the job number.
:::

### Daemons

Earlier in this lab, you used `ps` to list every process on the system:

```bash
ps -e
```

Most of these processes aren’t associated with a terminal — as indicated by the `?` in the TTY column — and don’t require user interaction. These processes are known as **daemons**.

Daemons provide important system services. They are usually created during system startup and continue running until you stop them, or the system shuts down. 

Daemons often have the suffix “d” in their name, such as `systemd` or `sshd`, but this is just a convention, not a requirement.

## Process information

Start Firefox, then use the **`pidof`** command to look up its PID:

```bash
pidof firefox
```

This command may list multiple PIDs, indicating either that you’ve launched multiple instances of Firefox, or that Firefox itself spawned multiple processes. In the first case, look for the largest PID (the most recently launched instance); in the second case, the smallest (the process that was created first).

If you don’t know the exact name of a process, use **`pgrep`** to perform a search. For example:

```bash
pgrep -u $USER -f snap
```

This command searches for processes that belong to the current user (`-u $USER`) and have “snap” somewhere in their full command line (`-f`).

Once you have the PIDs of the processes you’re interested in, use `ps` and `top` to monitor them:

```bash
ps $(pidof firefox)
top -p $(pidof -d, firefox)
```

`ps` supports multiple PIDs as arguments. However, `top` requires that you provide them as a single comma-separated argument for the `-p` option. Fortunately, `pidof` can provide such an argument by adding the `-d` option and specifying a delimiter (`,`).

## Process hierarchy

Linux organizes processes using parent-child relationships. Every process has a unique PID and stores the PID of the process that created it as the **Parent Process ID (PPID)**. The resulting hierarchy is known as the **process tree**.

The **`pstree`** command visualizes this process tree:

```bash
pstree -T
```

The `-T` option hides **threads**. Threads allow a process to perform multiple tasks in parallel, but they are out-of-scope for this course and clutter the output of `pstree`.

Add the `-p` option to show PIDs: 

```bash
pstree -pT
```

To view the ancestry of a single process, add the `-s` option and specify a PID. For example, leave the `top` command running in your terminal, then open an additional tab and run the following command to see the ancestry of `top`:

```bash
pstree -pT -s $(pidof top)
```

In my case, the output of this command was:

```
systemd(1)
└─ systemd(1482)
   └─ ptyxis(2981)
      └─ ptyxis-agent(2989)
         └─ bash(3013)
            └─ top(4300)
```

::: info
The formatting of this output was adjusted for readability.
:::

This output shows that `top` was created by `bash`, the shell, which was created by `ptyxis`, the terminal application, which was created by `systemd`.

**`systemd`** is the first process created by the kernel and manages system services. As the root of the process tree, it receives PID 1.

`systemd` plays an important role during system startup. Here’s what happens when you power on your computer:

1. The CPU starts executing instructions from a predefined memory location. These instructions, known as **firmware**, are stored on a small read-only memory chip on the computer’s motherboard. Modern systems use the **Unified Extensible Firmware Interface (UEFI)**; older systems use the **Basic Input/Output System (BIOS)**.
2. The firmware initializes essential hardware and performs a **Power-On Self-Test (POST)** to verify that the hardware is functioning correctly.
3. The firmware searches for a bootable device, loads a bootloader from that device into memory, and transfers control to it. Most Linux systems use the **Grand Unified Bootloader (GRUB)**.
4. The bootloader searches the **/boot** directory for a compressed kernel image and unpacks it into memory. It then loads a temporary root filesystem: the **Initial RAM Filesystem (initramfs)**. This filesystem contains the minimal tools and drivers needed to mount the actual root filesystem, after which it is discarded.
5. The bootloader transfers control to the kernel, which initializes the hardware and sets up the necessary data structures for managing processes, memory, and devices.
6. The kernel starts the **init** system, which starts and manages all other system services. Most Linux systems use `systemd` as the init system.
7. Finally, the init system starts a desktop environment or terminal, allowing a user to sign in and start using the system.

## Signals

Processes communicate with the operating system and with each other through **signals**. A signal is a software interrupt — a notification sent to a process to inform it that a specific event has occurred. Processes can register a **handler** to respond to a signal, or perform a default action. As a user, you’ll mostly use signals to stop a running process.

The **SIGINT** (*keyboard interrupt*) signal is sent to the foreground process when the user presses **Ctrl+C** in the terminal. The default action for this signal is to terminate the process, but the process can choose to handle it, cancel its current task, and continue executing.

In [Working with Text](working-with-text), you used `tail` to watch a log file for changes:

[TODO: Update this example after completing the Working with Text lab]

```bash
tail -f log.txt
```

This process runs indefinitely, so you need a signal to stop it. Press **Ctrl+C** to send SIGINT.

The **SIGTERM** (*graceful termination*) signal asks a process to terminate. This signal is stronger than SIGINT, which only asks a process to cancel its current task. The default action for SIGTERM is to terminate the process, but the process should handle it and perform any necessary cleanup first.

Use the **`kill`** command to send a SIGTERM signal. For example, run the previous `tail` command again, then open an additional tab and run the following command:

```bash
kill $(pidof tail)
```

The `kill` command can send any signal by specifying its name as an argument. For example, here’s how you send SIGINT instead of the default SIGTERM:

```bash
kill -INT $(pidof tail)
```

Any well-behaved process should handle SIGTERM and perform a graceful shutdown. However, a process may become stuck and unable to respond to signals. In that case, you can send the **SIGKILL** (*forced termination*) signal. This signal is handled by the kernel and forces the process to exit.

Here’s how you send SIGKILL instead of SIGTERM:

```bash
kill -KILL $(pidof tail)
```

The targeted process will not be able to handle this signal or perform any cleanup. Therefore, you should only use SIGKILL as a last resort and prefer SIGINT or SIGTERM whenever possible.

## Up next

In this lab, you learned about processes and how to manage them. Practice these skills by solving the upcoming exercises.

When you’re done, proceed to the next lab, where you'll learn how to connect to a Linux system remotely.

