# Package Management

## Lab overview

In this lab assignment, you will learn:

- Where software can live on your Linux-system
- Basic concepts of package managers
- How to install software using a package manager

## Software

### Binaries and executables

Within Linux-systems, we often refer to programs that we can run as **binaries**. Every program you use on these systems uses a specifc binary - code that allows our operating system to perform the necessary tasks.

Linux distributions (such as our Ubuntu) come pre-installed with a decent amount of binaries. However, just like on your own computer, you sometimes wish to use software that you still need to install. You can do this manually yourself, or preferably you use a system that is made for managing software.

All binaries on the system live in specific places, and your system knows where to look for them. Whenever you type a command in your terminal, your system looks in a few specific places for the binary that matches the command you want to use. 

You can take a look at the PATH global variable to see where your system looks for software:

```bash
systemuser@localhost:~$ echo $PATH
```

If it doesn't find a matching binary or command on any of the locations in the PATH variable, your system will report the software is not installed or can't be found.

### Manually downloading software

Let's install software manually, to see what would be involved. For this test, we could use any software, but we will use [Dust](https://github.com/bootandy/dust) - a small tool for visualising disk usage. Feel free to check out the source code on GitHub!

In order to install this software, we do the following:

- Download the source code in an archived format
- Unzip the files
- Place our binary/executable in one of the locations on our system PATH
- Test out the software in our terminal

On your Ubuntu system, we will start by downloading the source code using `wget`:

```bash
systemuser@localhost:~$ wget https://github.com/bootandy/dust/releases/download/v1.2.5/dust-v1.2.5-x86_64-unknown-linux-gnu.tar.gz
```

::: info
When installing manually, you have to check that the source code is built for the CPU-architecture for your chipset. If you use a different instruction set, you will have to look for the correct source code for your system.
:::

After downloading, you can unzip the source code using the `tar` command with the correct options:

```bash
systemuser@localhost:~$ tar -xzf dust-v1.2.5-x86_64-unknown-linux-gnu.tar.gz
```

When looking inside this directory, you should see the following:

```bash
systemuser@localhost:~$ tree dust-v1.2.5-x86_64-unknown-linux-gnu

dust-v1.2.5-x86_64-unknown-linux-gnu
├── dust
├── LICENSE
└── README.md
```

`dust` here is our executable! Check if the correct permissions are present using `ls -l`:

````bash
systemuser@localhost:~$ ls -l dust-v1.2.5-x86_64-unknown-linux-gnu
````

If the execute permissions are not present, you can add them using the `chmod command`

Finally, we need to move this binary to one of the locations on our PATH. For our use case, we can do the following:

````bash
systemuser@localhost:~$ sudo cp dust-v1.2.5-x86_64-unknown-linux-gnu/dust /usr/local/bin/
````

Note that we use a copy here. This is simply to still have our files in our home folder. You could simply use `mv` as well. Additionally, you will need to use `sudo` to have enough permissions for this operation.

After all that, you should be able to use the command `dust` on your system:

````bash
systemuser@localhost:~$ dust
````

This command will now work, and show you a basic overview of the disk usage of your current directory!

## Package managers

You can already tell that installing and using software like this is not ideal.Instead of 'manually' downloading software and managing everything yourself, you will want to use an organised system for this. This is where the concept of a package manager comes in handy - the package manager enables you to easily install, update or remove software from your system.

### APT

APT is the most commonly used package manager on Ubuntu systems, and is the one you use by default. In order to install using APT, we can use the following simple command structure:

```bash
systemuser@localhost:~$ sudo apt install NAME_PACKAGE
```

It is required to use sudo for installation with apt. A normal system user does not have permissions to install system-wide software.

Let's give it a go with actual software, and install our first package with APT - `figlet` :

```bash
systemuser@localhost:~$ sudo apt install figlet
```

When using `sudo`, we will be prompted for our password. Don't forget that while typing this, you will not get feedback, as this is a security measure. Additionally, you have to confirm your software installation when using `apt install` by typing `y` and pressing `ENTER` in our terminal, as shown.

After installation, we can use the `figlet` command, as APT has installed the binary and made it available on our system for use with our terminal. Give the following command a go:

```bash
systemuser@localhost:~$ figlet Hello World!
```

#### Add a repository to APT

Using APT is very straightforward, but not every single software that exists is available by default. Sometimes, you might want to add a different APT **repository**. You could view an APT repository as a place where software lives, bundled with metadata so that APT can install it properly. In reality, it is a bit more complex than that.

For example: when you want to install the latest version of `Docker` on your Ubuntu-system, it is nót sufficient to use the `apt install`  command. In order to use APT to install Docker, you need to add the repository first. Usually, you can find this information online, but for Docker the commands you need to use would look like this:

```bash
# Add Docker's official GPG key:
sudo apt update
sudo apt install ca-certificates curl
sudo install -m 0755 -d /etc/apt/keyrings
sudo curl -fsSL https://download.docker.com/linux/ubuntu/gpg -o /etc/apt/keyrings/docker.asc
sudo chmod a+r /etc/apt/keyrings/docker.asc

# Add the repository to Apt sources:
sudo tee /etc/apt/sources.list.d/docker.sources <<EOF
Types: deb
URIs: https://download.docker.com/linux/ubuntu
Suites: $(. /etc/os-release && echo "${UBUNTU_CODENAME:-$VERSION_CODENAME}")
Components: stable
Architectures: $(dpkg --print-architecture)
Signed-By: /etc/apt/keyrings/docker.asc
EOF

sudo apt update
```

::: info
Adding the Docker repository is not part of our course that you need to master, but this gives a good indication of what would be involved. You do not need to understand all of the commands above.
:::

### Snap

Another option on Ubuntu is Snap - a different package manager. Let's try to use Snap to install a different piece of software.

In order to install using Snap, we can use the following command:


```bash
systemuser@localhost:~$ sudo snap install --classic code
```

After some installing, you will now have installed Visual Studio Code on your system using the snap package manager! 

### Flatpak

A final package manager we want to introduce to you is Flatpak. SInce Flatpak is not natively installed, we will first install it using the APT package manager:

```bash
systemuser@localhost:~$ sudo apt install flatpak
```

In order to then use Flatpak to install software, we use the following command:

```bash
systemuser@localhost:~$ sudo flatpak install NAME_PACKAGE
```

Packages you install using Flatpak have to be run using the following command:

```bash
systemuser@localhost:~$ flatpak run NAME_PACKAGE
```

This works similar to the APT and Snap package manager, but Flatpak offers a lot of different packages and usage options. Most of these advanced use cases are beyond the scope of this course, however.