# Remote Login

## Lab overview

In this lab assignment, you will learn:

- Brief introduction to **Secure Shell** (**SSH**)
- Installing the **SSH-server** on a Linux machine
- Connecting to a **remote machine** using **SSH**
- **Practicing** basic remote login and its possibilities

## SSH

### A brief overview

**Secure Shell**, or **SSH**, is a special network protocol, that is widely used for secure remote login. Its most basic use is connecting to a remote (Linux) machine, and performing CLI commands on that machine. In simple terms: it lets you **connect** to a **Linux instance** and **perform commands** on that machine from your own machine.

This course will not focus on what (networking) protocols are. Other courses such as *Computer Networks 1* will build further on these concepts. For now, let's simply explore the functionality of SSH and how you can get started using it. The goal of this course for SSH is to get familiar with the concept, and to trying it a few times so you understand how to connect using it.

<!-- TODO: add image for clarity? Or only in slides/during class? -->

### Installing SSH

#### Install SSH-server on Linux machine

First of all, you will need to install the SSH-server software on your Linux system. For this course, we assume you use the Ubuntu operating system, and we will isntall it using the `apt` package manager.

In order to install the software, use the following command:

```bash
systemuser@localhost:~$ sudo apt install openssh-server
```

After confirmation and installation, your software should be ready to use. You can confirm this using the following command:


```bash
systemuser@localhost:~$ sudo systemctl status ssh
```

::: info
Using an SSH-server comes with a lot of possibilities - both for features and security. For this course, however, we do not take into consideration these more advanced use cases or the usage of a firewall. Do note that these are very important and should be kept in mind when using SSH!
:::

#### Install SSH-client on your own device

In order to connect to a remote machine using SSH, you must have an SSH-client installed on your system. Most modern operating systems or Linux distributions, however, come with an SSH-client installed by default. For this course, we assume you are using Windows 11 - which should come pre-installed with this client. If this is not the case for your operating system, please ensure you install an SSH-client before continuing with this lab assignment!

### Connecting to a remote machine

Now all of the SSH-software is installed, we can start using SSH and connect to a remote machine. When connecting, we will be using the command line. In essence, the most simple SSH command is made up out of three parts:

- The **SSH command** itself, **with any options** you might want to use
- The **user** that you will log in as on the remote system
- The **destination** or **hostname** of the system that you will be logging in on

For this introduction, we will not be using any special options. The user will be the user we have been using on our Linux-system, and the destination will be the IP-address of that machine.

::: info
What IP-adresses are, and how we are able to connect to our virtual machine on VirtualBox, is not within the scope of this course. You will learn more about this in the courses such as *Computer Networks 1*. For this exercise, you can simply follow along with the steps for remote connection.
:::

<!-- TODO: refer to install guide for VM where the two network adapters (NAT and Host-only) should be configured?  -->

Open up your PowerShell (Windows) or other terminal on your own device where you have the SSH-client software installed.

We will use the following command structure to connect to our Linux machine:

```powershell
ssh user@host

```

In this case, we replace the `user` and `host` with the correct connection information. Our final commands becomes:

```powershell
ssh systemuser@192.168.56.20
```

::: info
The IP-address in this command may slightly differ for your setup. To check this, use the `ip a` command and look for the IP-address that looks like `192.168.56.X`. Alternatively, you can use the following command: `ip a | grep 192.168.56`
:::

You will then be prompted to give in your password. This is the same password you use when logging in to your Linux machine. Do note that when typing, your password will not shown - this is a safety measure to make sure nobody can read you typing in your password. Be sure to type your password correctly, or copy it using your clipboard and paste it using `CTRL+ SHIFT+ V` in your terminal.

Congratulations! You are now logged in on your Linux machine using SSH, and can use any bash-command you have learned so far. You are now working on the Linux machine using the bash shell - from your own device!

## Practicing and exploring SSH

In this section, we will share some tools and different ways to practice your SSH and Linux skills in interactive ways - in addition to the exercises we have offered throughout this course. 


### FileZilla

[FileZilla](https://filezilla-project.org) is a very useful graphical tool you can use for file transfers with a system where SSH is installed. In order to use it, you must first download the client software on your system.

Once installed and opened, you will see a list of connection options on the top. For our course, you could connect to your VM using the following:

- Host: `192.168.56.20`
- Username: `systemuser`
- Password: `your_user_password`
- Port: `22`

You can then use the Quickconnect button to connect to your system. You will now see every file on both the remote and your own system, and can use this graphical interface to quickly transfer files between the two. 

<!-- TODO: add images for clarity? Or only during classs -->

### SCP

Another use case of SSH, is SCP or the **Secure Copy Protocol**. We can use this software to safely copy files or data to and from our remote system. It is similar in functionality to what you did with FileZilla, but we can use it in our terminal.

The general command for SCP looks as follows:


```bash
systemuser@localhost:~$ scp localfile.txt username@remotehost:/path/to/destination/for/file
```

This means you will need to have SCP installed on your device - but this should come installed with the SSH client software. Let's say you have a file `example_file.txt` in the directory where your terminal on your own device tha tyou want to transfer to your home directory on the remote system. The command would look like:

<!-- TODO: add prompt for CMD/PowerShell? -->

```powershell
scp example_file.txt systemuser@192.168.56.20:/home/systemuser/example_file.txt
```

Be careful when using SCP to double-check your paths and files! As with everything on the terminal; with great power, comes great responsability.


### OverTheWire - Bandit

OverTheWire is a platform that is made for interactively practicing your Linux fundamentals. It offers different "**wargames**" - in which you complete different objectives with scaling difficulty. 

For this course and its topics, we recommend you check out [Bandit by OverTheWire](https://overthewire.org/wargames/bandit/). It is aimed for beginners, and uses SSH to jump from host to host. On every host, you have to find the credentials for the next host by using the Linux terminal. We recommend trying to make it to level 7 - but feel free to dig a bit deeper and learn about different commands

::: info
This source and the commands used for these exercises is not part of the material you need to learn for the exam. However, the first levels offer a fun way of practicing your CLI-skills some more!
:::