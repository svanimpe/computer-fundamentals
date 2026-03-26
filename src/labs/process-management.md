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

(TODO: de sectie hieronder staat wat los van de rest)

You'll also see a column "TIME+" in `htop`, which shows the total CPU time consumed by the process since it started. You might notice that some process have a value of 0:00.00 in this column, which means that they have not consumed any CPU time yet. This can happen if the process is sleeping or waiting for an event, or if it has just started and has not had a chance to execute any instructions.

The operating systems scheduler is responsible for allocating CPU time to processes. It uses various algorithms to determine which process should run next based on factors such as priority, CPU usage, and waiting time. When a process is scheduled to run, it is given access to the CPU and can execute its instructions. If a process is sleeping or waiting for an event, it will not consume CPU time until it becomes active again.

In the meantime the process state is kept in memory. When the process becomes active again, all necessary information is retrieved from memory, moved over to the CPU and the process can continue executing from where it left off. This is how the operating system manages multiple processes and allows them to share the CPU effectively.

### Process states

At any given moment, a process is in one of several states. You can see the state of each process in the `S` column in `htop`.

| State                 | Code | Description                                                                                                                                                                                                          |
| --------------------- | ---- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Running               | `R`  | The process is currently being executed by the CPU, or is in the run queue waiting to be executed.                                                                                                                   |
| Sleeping              | `S`  | The process is waiting for an event (e.g. user input, a timer, or data from disk). It will become runnable again once the event occurs.                                                                              |
| Uninterruptible sleep | `D`  | Similar to sleeping, but the process cannot be interrupted by signals. This usually happens when the process is waiting for I/O (e.g. reading from disk).                                                            |
| Stopped               | `T`  | The process has been paused, typically by a signal such as `SIGSTOP`. It will not execute until it receives a `SIGCONT` signal.                                                                                      |
| Zombie                | `Z`  | The process has finished executing, but its entry is still in the process table because its parent has not yet read its exit status. Zombies consume no resources and disappear once the parent reads the exit code. |

(TODO: btop in exercise?)

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

(uitleg over het ontstaan van processen: fork, exec, wait)

(voorbeeld: script 1 — een script dat een child process aanmaakt via fork/exec en wacht via wait; toont PID en PPID van ouder en kind)

```bash
./script1.sh
```

(uitleg over het verschil tussen foreground en background processen)

(voorbeeld: script 1 starten op de voorgrond — terminal bevriest)

```bash
./script1.sh
```

(uitleg: terminal is geblokkeerd zolang het proces loopt, stoppen met Ctrl+C)

(voorbeeld: script 1 op de achtergrond starten met &)

```bash
./script1.sh &
```

(uitleg: jobnummer en PID worden getoond, terminal blijft beschikbaar)

## Looking up processes

(uitleg: hoe vind je een lopend proces terug via naam of PID)

```bash
pidof script1.sh
```

(uitleg: pidof geeft het PID terug van een proces op basis van zijn naam)

```bash
ps <pid>
```

(uitleg: details van één specifiek proces opvragen)

(vraag: zoek het PID van je eigen bash-sessie op)

## Inspecting /proc

(uitleg: /proc is een virtueel bestandssysteem dat de kernel realtime beschikbaar stelt; voor elk actief proces bestaat er een map /proc/PID)

```bash
ls /proc/<pid>
```

(uitleg: overzicht van de bestanden in de procesmap — elk bestand stelt een eigenschap van het proces voor)

```bash
cat /proc/<pid>/status
```

(uitleg: toont naam, PID, PPID, status, geheugengebruik en meer van het proces)

```bash
cat /proc/<pid>/cmdline
```

(uitleg: het exacte commando waarmee het proces gestart werd)

(vraag: open /proc/PID/status van script1. Welke velden herken je uit de uitvoer van ps?)

## Stopping processes

(uitleg over signalen: wat zijn het, hoe werken ze)

(tabel met de belangrijkste signalen: SIGTERM, SIGKILL, SIGSTOP, SIGCONT)

(voorbeeld: script 2 — een script dat een lange taak simuleert en SIGTERM opvangt; toont een bericht wanneer het signaal ontvangen wordt en sluit netjes af)

```bash
./script2.sh &
kill <pid>
```

(uitleg: script2 vangt SIGTERM op en sluit netjes af — studenten zien dit in de output)

(voorbeeld: script 2 starten en forceren te stoppen via SIGKILL — het script kan het signaal niet opvangen)

```bash
./script2.sh &
kill -9 <pid>
```

(uitleg: SIGKILL omzeilt de signaalafhandeling van het proces volledig — geen nette afsluiting mogelijk)

(vraag: wat is het verschil tussen kill en kill -9?)

## Process priorities

(uitleg over nice values: schaal van -20 tot +19, standaard 0)

(voorbeeld: script 3 — een CPU-intensief script dat continu rekent, zodat het effect van de nice-waarde zichtbaar is in htop)

```bash
./script3.sh &
ps -el | grep script3
```

(uitleg: NI-kolom toont de nice waarde, PR-kolom de effectieve prioriteit)

```bash
nice -n 10 ./script3.sh &
```

```bash
renice 5 -p <pid>
```

(uitleg: prioriteit aanpassen van een lopend proces; alleen root kan negatieve waarden instellen)

## Concurrency

(uitleg: wat is concurrency, waarom ontstaan race conditions bij gedeelde bronnen)

(voorbeeld: script 4 — een bash-script dat een teller leest uit een bestand, ophoogt en terugschrijft; meerdere instanties worden tegelijk op de achtergrond gestart; de eindwaarde is lager dan verwacht door de race condition)

```bash
# start N instanties tegelijk op de achtergrond
for i in $(seq 1 50); do ./script4.sh & done
wait
cat counter.txt
```

(uitleg: elke instantie leest dezelfde waarde voordat een andere heeft kunnen schrijven — de verhogingen gaan verloren)

(vraag: als 50 instanties elk de teller 1 keer ophogen, wat zou de verwachte eindwaarde zijn? Wat zie je in werkelijkheid? Waarom?)

(voorbeeld: script 5 — zelfde als script 4 maar gebruikt een lockfile als mutex; slechts één instantie tegelijk mag de teller lezen en schrijven)

```bash
for i in $(seq 1 50); do ./script5.sh & done
wait
cat counter.txt
```

(uitleg: de lockfile zorgt voor mutual exclusion — de eindwaarde is nu correct)

(vraag: wat is het nadeel van een lockfile als mutex? Wat kan er misgaan als een script crasht terwijl het de lock vasthoudt?)

## Threads

(uitleg: wat is een thread, verschil met een proces, gedeeld geheugen als voordeel én risico)

(voorbeeld: script 6 — een Python-script met twee threads die zonder locking een gedeelde variabele ophogen; toont de verkeerde eindwaarde; mirrors de race condition van script 4 maar nu binnen één proces)

```bash
python3 script6.py
```

(uitleg: threads delen hetzelfde geheugen, waardoor de race condition nog sneller optreedt dan bij processen)

(voorbeeld: script 7 — zelfde als script 6 maar gebruikt threading.Lock; eindwaarde is correct; mirrors script 5)

```bash
python3 script7.py
```

(uitleg: threading.Lock werkt als een mutex op geheugeniveau — efficiënter dan een lockfile maar zelfde principe)
(TODO: is mutex niet teveel out of scope?)

(voorbeeld: script 8 — een Python-script dat een tijdrovende taak eerst sequentieel uitvoert en daarna met threads; toont de uitvoertijd van beide aanpakken + illustratie dat er een limiet is aan de snelheidstoename door threads)

```bash
python3 script8.py
```

(uitleg: threads zijn nuttig wanneer taken onafhankelijk van elkaar zijn en kunnen overlappen, bv. bij I/O-wachttijden)
