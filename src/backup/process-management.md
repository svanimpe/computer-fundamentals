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
