# Package Management

::: warning
This lab is still in draft. It contains all the information you need, but the text isn't polished yet.
:::

In this lab, you'll learn how to use a **package manager** to install and manage the software on your system.

## Binaries and packages

When you compile the source code for a program, the compiler outputs an executable file known as a **binary**. This binary is then bundled with the assets, libraries, configuration files, and documentation for the program into a **package**.

Linux distributions include a vast selection of packages, and a **package manager** to add, upgrade, or remove these packages.

A package manager knows where to install the contents of a package, tracks which file belongs to which package, and understands the dependencies between packages.

You'll start this lab by installing a package without the help of a package manager. This experience will help you understand and appreciate what a package manager does.

## Installing software manually

As an example, you'll install [Dust](https://github.com/bootandy/dust), a small tool for visualizing disk usage, similar to `du`.

Start by navigating to your **Downloads** directory:

```bash
cd ~/Downloads
```

Dust publishes its releases on [GitHub](https://github.com/bootandy/dust/releases). Some of these are premade Ubuntu packages, but most are compressed archives for various platforms (including Windows and macOS).

For this example, you'll use a **tarball**, which is an old archiving and compression format for Linux. It combines the **`tar`** (*tape archive*) and **`gzip`** formats into a single file with the **.tar.gz** extension.

You'll use **`wget`** to download the file you need straight from the command line.

If your computer uses the Intel/AMD 64-bit architecture (**x86_64**), run the following command:

```bash
wget https://github.com/bootandy/dust/releases/download/v1.2.6/dust-v1.2.6-x86_64-unknown-linux-gnu.tar.gz
```

For the ARM 64-bit architecture (**AArch64**), use the following command instead:

```bash
wget https://github.com/bootandy/dust/releases/download/v1.2.6/dust-v1.2.6-aarch64-unknown-linux-gnu.tar.gz
```

Next, extract the contents of the tarball:

```bash
tar -xzf dust-v1.2.6-*-unknown-linux-gnu.tar.gz
```

This command tells `tar` to read the file (`-f`) you specified as an argument, unzip it (`-z`), and extract (`-x`) its contents.

::: info
I used globbing so the command will work on any machine, regardless of its architecture. However, you can just press `Tab` after typing `dust` and Bash will autocomplete the rest of the filename for you.
:::

The archive contained a directory named **dust-v1.2.6-x86_64-unknown-linux-gnu** or **dust-v1.2.6-aarch64-unknown-linux-gnu**. Inspect the contents of this directory:

```bash
ls dust-v1.2.6-*-unknown-linux-gnu
```

You'll see three files, one of which is a binary executable named **dust**. Run this binary to try it out:

```bash
./dust-v1.2.6-*-unknown-linux-gnu/dust
```

`dust` will show the contents of the current directory and how much space they take up.

To install `dust`, you need to move the executable to a location where Bash knows to look for it. The `PATH` environment variable lists these locations:

```bash
echo $PATH
```

Whenever you type a command, Bash goes through the directories on your `PATH`, from left to right, until it finds a match. If it doesn't, it will report this as an error. That's why earlier, you specified the *path* to the executable (not just its name) so Bash knows where to find it:

```bash
./dust-v1.2.6-*-unknown-linux-gnu/dust
```

To install `dust`, copy or move its executable to **/usr/local/bin**, which is the appropriate home for it:

```bash
cp dust-v1.2.6-*-unknown-linux-gnu/dust /usr/local/bin
```

This command will fail because, as a regular user, you're not allowed to modify files outside of your home directory. Rerun the previous command with **`sudo`** to elevate your permissions to that of a system administrator:

```bash
sudo cp dust-v1.2.6-*-unknown-linux-gnu/dust /usr/local/bin
```

Alternatively, use the double exclamation point (`!!`) to recall the previous command from your history, and add `sudo` in front:

```bash
sudo !!
```

You'll find this quite useful, as it's common to forget `sudo` when you need it.

::: info
You'll learn more about `sudo` in the next lab, [Users and Permissions](users-and-permissions).
:::

Now that `dust` is installed, you can run it from anywhere on your system:

````bash
dust
````

Try it out, then uninstall `dust` by removing its executable from **/usr/local/bin**:

```bash
sudo rm /usr/local/bin/dust
```

In the next section, you'll reinstall `dust` using a package manager.

## Using a package manager

If the previous section felt like a lot of work, that's because it was. In most cases, a manual installation process is even more complicated: packages can include many more files that need to go into specific directories, and can depend on other packages that should be installed first. Fortunately, a package manager handles all of this for you.

Ubuntu is based on [Debian](https://www.debian.org) and uses the Debian package format (**.deb**), the Debian Package tool (**`dpkg`**), and the Advanced Package Tool (**`apt`**). The latter is what you'll use for most package management tasks.

Before you do anything with `apt`, update your local package database so `apt` is aware of the latest available versions of each package:

```bash
sudo apt update
```

Next, search for the package you want to install:

```bash
apt search dust
```

::: info
Searching doesn't modify your system so it doesn't require elevated permissions (`sudo`).
:::

Scroll through the list. You'll find `dust` as `du-dust`.

Install `dust` with the following command:

```bash
sudo apt install du-dust
```

This one command is all you need. `apt` will find the correct package for your architecture, check for and install any dependencies, and extract the contents of the package to the appropriate directories.

`dpkg` can list the files that were installed as part of this package:

```bash
dpkg -L du-dust
```

Among the files you should recognize are the executable **/usr/bin/dust** and the man page **/usr/share/man/man1/dust.1.gz**.

All of these files will be removed when you uninstall the package:

```bash
sudo apt remove du-dust
```

For more information about `apt`, consult its man page. You'll find that `apt` has many more useful subcommands, such as `show`, `list`, `upgrade`, and `remove`.

## Self-contained packages

Traditional package managers such as `apt` are deeply integrated with the system and offer the best possible performance. However, this performance comes with some drawbacks. For example, packages often have conflicting dependencies, requiring different versions of the same library. Also, any package you install has full access to all of your files and directories, which is a potential security risk. For these reasons, newer package managers use **self-contained** packages, similar to how applications work on mobile platforms with app stores.

Self-contained packages require additional memory and storage, making them much less efficient than traditional packages, but they do offer some benefits. A self-contained package can include all of its dependencies, making it compatible with many more operating systems and versions. A self-contained package is also **sandboxed**, meaning it's isolated from the rest of the system. Sandboxed applications have a limited set of permissions that have to be requested by the developer and granted by the user. Without these permissions, the application cannot open any files, use the network, or access any devices. 

Ubuntu uses **`snap`** for self-contained packages, whereas most other distributions use **`flatpak`**. In the following sections, you'll use `snap` to install **GIMP**, and `flatpak` to install **Inkscape**. GIMP and Inkscape are popular open source alternatives to Adobe Photoshop and Illustrator.

### Installing a package with snap

`snap` powers the **App Center** that you used in [Exercise 1.3](../exercises/exercises1#appcenter). You can use this application to browse the [Snap Store](https://snapcraft.io/store) and install or remove packages, but in this lab, you'll use the command line instead.

Search for “gimp” to find the package you want to install:

```bash
snap search gimp
```

Install this package as follows:

```bash
sudo snap install gimp
```

Once GIMP is installed, you can click its icon in the Applications Overview, or run it from the command line:

```bash
gimp
```

For more information about `snap`, consult its man page and look up the subcommands `info`, `list`, `refresh`, and `remove`.

### Installing a package with flatpak

Ubuntu doesn't include `flatpak` out of the box, but you can install it using `apt`:

```bash
sudo apt install flatpak
```

Unlike `snap`, which is tied to the [Snap Store](https://snapcraft.io/store), `flatpak` is decentralized and lets you download packages from any store. You first have to register one or more stores before you can start using it.

Use the following command to register [Flathub](https://flathub.org/en), a popular store for `flatpak` packages:

```bash
flatpak remote-add flathub https://dl.flathub.org/repo/flathub.flatpakrepo
```

Restart your system (or sign out and back in) for this change to take effect, then confirm that Flathub has been registered:

```bash
flatpak remotes
```

You can now search for “inkscape” to find the package you want to install:

```bash
flatpak search inkscape
```

Find the correct **Application ID** and use this ID to install the package:

```bash
flatpak install org.inkscape.Inkscape
```

This will install Inkscape and any dependencies it requires.

::: info
`flatpak` is designed to not require `sudo`. Instead, it will prompt you for your password whenever it needs additional permissions.
:::

Once Inkscape is installed, you can click its icon in the Applications Overview, or run it from the command line:

```bash
flatpak run org.inkscape.Inkscape
```

As you can see, this is very different from how you run `snap` packages. `snap` installs binaries in **/snap/bin**, which is listed in the `PATH` variable, whereas `flatpak` applications are more heavily sandboxed and invoked through `flatpak` itself.

For more information about `flatpak`, consult its man page and look up the subcommands `info`, `list`, `update`, and `uninstall`.

## Up next

This lab briefly touched on permissions when discussing `sudo`. In the next lab, you'll learn how Linux handles users, groups, and permissions.
