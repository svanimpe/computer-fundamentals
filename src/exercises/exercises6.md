# Exercises 6

::: warning
These exercises are still in draft. The text isn't polished yet and new exercises may be added in the future.
:::

## Exercise 6.1

Every time you log in using SSH, the server greets you with a welcome message. This message is known as the **message of the day** (`motd`). In this exercise, you'll learn to configure this message.

The message you saw when you first used `ssh` is configured by various scripts in the **/etc/update-motd.d** directory. Disable these scripts by removing their execute permissions.

<details>
<summary>Solution</summary>
<pre>
sudo chmod a-x /etc/update-motd.d/*
</pre>
</details>

Configure your own greeting by editing the file **/etc/motd**. Log in using SSH and verify that you can see this greeting.

<details>
<summary>Solution</summary>
<pre>
sudo nano /etc/motd
</pre>
Then use <code>ssh</code> to connect from your host machine.
</details>

Use **`figlet`** to generate a banner that says “Welcome to Ubuntu!”. You'll have to install this command first, then consult its man page to learn how to use it, how to select a font, and where to find these fonts.

Pick a font that's small enough for the text to fit on a single line, and store the resulting banner in **/etc/motd**. This may be trickier than it sounds, so be creative!

<details>
<summary>Solution</summary>
Install Figlet:
<pre>
sudo apt install figlet
</pre>
Print the font directory and list its contents:
<pre>
figlet -I 2
ls /usr/share/figlet
</pre>
Generate the banner in a small font:
<pre>
figlet -f small Welcome to Ubuntu! > banner
sudo mv banner /etc/motd
</pre>
Output redirect doesn't work properly with <code>sudo</code>, so save the text in a regular file first, then move it to <strong>/etc/motd</strong>.
</details>

## Exercise 6.2 {#sftp}

In this exercise, you'll install and use [FileZilla](https://filezilla-project.org), a popular open source application for remote file transfers.

Install the free FileZilla Client for your host machine and run the application. Enter the IP address of your virtual machine in the **Host** field, enter your username and password, and connect using port 22.

FileZilla will use SFTP to connect to the virtual machine and display two file managers: one for your host machine on the left, and one for your virtual machine on the right. Use these file managers to transfer some files between the two machines.

## Exercise 6.3 {#bandit}

[OverTheWire](https://overthewire.org/wargames/) is an online platform that offers free **wargames** to test your skills in Linux, cybersecurity, and reverse engineering. Your goal for this exercise is to play the first game, [Bandit](https://overthewire.org/wargames/bandit/), and complete a few levels.

You'll use SSH to connect to Bandit with the username and password for Level 0. In each level, you'll complete a challenge which will give you the password for the next level. Read the [general instructions](https://overthewire.org/wargames/bandit/) before you begin, then start [Level 0](https://overthewire.org/wargames/bandit/bandit0.html).

Although Bandit claims to be aimed at beginners, the difficulty can vary wildly between levels. Some levels are extremely easy to complete, while others can feel impossibly hard. Many levels also require knowledge that you simply don't have (yet).

For this exercise, you're not expected to be able to complete this game. Even if you only make it to Level 1, that's fine. At least you had a chance to practice using SSH. If you do want to proceed further, keep the following guidelines in mind:

1. Be prepared to read. A lot. You're allowed to consult search engines or AI chatbots during this exercise. However, avoid looking up solutions. Instead, ask questions such as “What does X mean in Bash?”, “What does command X do?”, and “How can I use command X to do Y?”.

2. If you don't know where to start, every level has a section labeled “Commands you may need to solve this level”. Look up what these commands do and browse their man pages. While many commands listed in this section are decoys, you usually do need at least one of them to solve the challenge.

3. If you get stuck on a level, feel free to skip it by looking up the solution. The game covers a few different topics and you may find a few more easy levels later on in the game. Again, you're not expected to be able to complete this game yet.

Have fun learning!
