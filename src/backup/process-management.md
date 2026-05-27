# Removed from process management chapter

## Process priorities

Not all processes are equally important. A video call needs the CPU more urgently than a background backup job. Linux lets you express this with a **nice value**: a number from `-20` (highest priority) to `+19` (lowest priority), defaulting to `0`. The name comes from the idea that a process with a high nice value is being "nice" to others by stepping aside.

The scheduler uses the nice value to derive an effective priority (`PR` column in `htop` and `ps`). A lower nice value means higher priority and more CPU time. Only root can set a negative nice value; any user can make their own processes *less* important by raising it.

Start the CPU-intensive script in the background and inspect its priority:

```bash
chmod u+x kill-signals.sh
./kill-signals.sh &
ps -lp <pid>
```

Look at the `NI` column (the nice value) and the `PRI`/`PR` column (the effective priority). Both should show the defaults (`0` and `80` respectively).

### Starting a process with a different priority

Use `nice -n <value>` to launch a process with a non-default nice value from the start:

```bash
nice -n 10 ./kill-signals.sh &
ps -lp <pid>
```

Open `htop` and compare the two running instances — you will see different values in the `NI` column.

### Changing the priority of a running process

Use `renice` to adjust the nice value of a process that is already running:

```bash
renice 5 -p <pid>
```

This sets the nice value of the given PID to `5`. You can verify the change immediately in `htop` or with `ps -lp <pid>`.

Note that you can only raise your own processes' nice value (make them less important). Lowering a nice value below `0` — giving a process higher priority than the default — requires root:

```bash
sudo renice -5 -p <pid>
```

<details>
<summary>Why can only root lower nice values? What could go wrong if any user could give their process the highest priority?</summary>

If any user could set a negative nice value, a single process could starve every other process on the system — including critical system services — by monopolising the CPU. For example, a malicious or runaway user process at nice `-20` would be scheduled far ahead of `systemd`, `sshd`, and the kernel threads that keep the system responsive. Restricting negative nice values to root ensures that only a privileged administrator can grant elevated scheduling priority, preserving system stability for all users.

</details>

## Concurrency

When multiple processes run at the same time and access shared resources, things can go wrong in subtle ways. **Concurrency** is the ability of a system to handle multiple tasks that overlap in time — either truly in parallel on multiple CPU cores, or interleaved on a single core. The tricky part is not running tasks simultaneously; it is doing so safely when those tasks share state.

A **race condition** occurs when the outcome depends on the relative timing of two or more processes. If process A reads a value, and process B reads and updates the same value before A has finished writing, A will overwrite B's update — one increment is lost. This kind of bug is notoriously hard to reproduce because it depends on exact scheduling order, which varies between runs.

### Demonstrating a race condition

`counter-unsafe.sh` reads a counter from `counter.txt`, adds one, and writes it back. Launch 50 instances simultaneously and wait for them all to finish:

```bash
echo 0 > counter.txt
chmod u+x counter-unsafe.sh
for i in $(seq 1 50); do ./counter-unsafe.sh & done
wait
```

Now wait until all instances have finished and check the final value.

```bash
cat counter.txt
```

<details>
<summary>If 50 instances each increment the counter once, what would you expect the final value to be? What do you actually see, and why?</summary>

You would expect `50`. In practice the value is almost always lower — often significantly so. Each instance reads the current value, computes `value + 1`, and writes it back. If two instances read the same value before either has written, they both write the same result and one increment is lost. The more instances run in parallel, the worse the loss.

</details>

### Fixing it with a lock file

`counter-safe.sh` wraps the same read-increment-write sequence in a **lock file**: before touching the counter it tries to create a file exclusively; if the file already exists, it waits and retries. Only one instance can hold the lock at a time, so the counter is always updated atomically.

```bash
echo 0 > counter.txt
chmod u+x counter-safe.sh
for i in $(seq 1 50); do ./counter-safe.sh & done
wait
```

Now wait until all instances have finished and check the final value.

```bash
cat counter.txt
```

The result should now be exactly `50`.

<details>
<summary>What is the downside of a lock file as a mutex? What can go wrong if a script crashes while holding the lock?</summary>

If the process holding the lock crashes before it can remove the lock file, the file remains on disk. Every other instance will then wait forever — a **deadlock**. A robust solution adds cleanup logic: for example, trapping signals to delete the lock file before exiting, or storing the holder's PID inside the lock file so other instances can detect whether the holder is still alive.

</details>

## Threads

A **thread** is a unit of execution that lives inside a process. Where two processes have completely separate address spaces, threads within the same process share the same memory. This makes communication between threads much cheaper than between processes — no file, pipe, or socket needed — but it also means a bug in one thread can corrupt data that every other thread relies on.

Each thread has its own stack and program counter, but shares the heap, global variables, and open file descriptors with all other threads in the process. The operating system schedules threads the same way it schedules processes, so multiple threads can run truly in parallel on multiple CPU cores.

### Race condition between threads

The race condition from the concurrency section can happen just as easily inside a single process. `threads-unsafe.py` spawns a number of threads that all increment a shared counter — without any coordination:

```bash
python3 threads-unsafe.py
```

The final value will be lower than expected for exactly the same reason as before: one thread reads the counter, another thread reads and updates it before the first has written back, and an increment is lost.

### Fixing it with a lock

`threads-safe.py` wraps the increment in a `threading.Lock`. A lock is the in-memory equivalent of the lock file from the previous section: only one thread can hold it at a time, so the read-modify-write sequence becomes atomic.

```bash
python3 threads-safe.py
```

The result is now correct. The lock is more efficient than a lock file — it lives in memory rather than on disk — but the principle is identical: mutual exclusion ensures that only one thread touches the shared state at a time.

### Threads and I/O

Threads are most valuable when tasks spend time waiting rather than computing. `threads-io.py` simulates a number of slow network requests, first sequentially and then with one thread per request:

```bash
python3 threads-io.py
```

While one thread is blocked waiting for a response, the scheduler runs another thread. The threaded version finishes in roughly the time of a single request rather than the sum of all of them.

> When you run `threads-io.py`, how does the threaded runtime compare to the sequential runtime? Does the speedup grow indefinitely as you add more threads?
