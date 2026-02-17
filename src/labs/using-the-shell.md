# Using the Shell

::: warning
This lab is still in draft. It contains all the information you need, but the text isn't polished yet.
:::

In this lab, you will learn how to:

- use **variables**
- create and managing **aliases**
- use **quotes**, **globbing** and **brace expansion**
- manage aliases and variables in **.bashrc**
- leverage the **Bash history**

## Variables

### What are variables?

Variables allow the user (or the shell) to save values. Every variable is assigned a name (and a specific value) and will be stored temporarily in memory. This allows for easy use during operations with the Bash-shell, for use in other commands or to work more efficiently.

Variables are an important tool when working with the shell - they allow defining and re-using specific values to ensure a more fluent workflow and offer much functionality.

### Local versus global variables

We can make a distinction between two types of variables:

**Local variables** are variables that only exist within the context of our current shell-environment. When the shell is exited or the terminal is closed, this variable will no longer exist.

**Environment variables**, also referred to as **global variables**, are variables that exist system-wide and are readily available for use in any shell-session. On system-startup, a decent amount of environment variables are present and defined.

#### Local variable creation

To get started, let's create our very first variable, which will be a local variable. Defining a variable in the shell, can be done using the following command structure:

```bash
variable="value"
```

Notice that we are using quotes (`"`) when defining a variable. While not strictly required, this can be necessary in some cases - especially when the value is a string that contains multiple words or parts. You'll learn more about quotes later in this lab.

For now, let's get started by making a variable for our own name, that contains the content of our first name. For example:

```bash
name="Alice"
```

Congratulations, you have now created your first local variable! You will notice you do not receive any feedback or confirmation for its creation - this is something that is typical for the shell. No worries, we will actually use this variable and verify it is created correctly in our next step!

#### Using the variable in an echo command

In order to showcase our new variable, we can use it in a shell-command.

We will use the `echo` command. Since we have created our variable, we can now use it in our shell using the `${ }` notation, and putting our variable name between the brackets. Try the following command:

```bash
echo ${name}
```

You will see the value of our variable will be used in the `echo` command - this illustrates the most common way of interacting with variables while using the shell.

#### Creating and using a variable for navigation

Let's say, for the sake of this course, we always start working in the same directory on our system: `~/Downloads/lab-materials`. If we want to use this path in our shell-commands, we always have to type the entirety of that location:

```bash
cd ~/Downloads/lab-materials
```

We could, however, use a variable to make our life easier:

```bash
lab="~/Downloads/lab-materials"
```

By defining this variable, we could now use this variable to make navigating to our directory more efficient:

```bash
 cd ${lab}
```

There are different ways to make this process faster and easier, but by using a variable this way you can see how useful they can be.

#### Creating a different variable

Let's create a different local variable - this time, we will define a variable to store the name of one of our friends:

```bash
friend="Bob"
```

Note that we can define as many variables on our system as needed. It is important to try to give our variables meaningful names, especially as we start to define more variables for specific uses.

#### Using both variables in a new echo command

Now that we have two local variables, we can demonstrate that we can use as many variables as we want in a single shell-command. For example, we can use our two current local variables within the `echo` command:

```bash
echo "My name is ${name} and my friend's name is ${friend}"
```

### Environment variables

Aside from those local variables, we also have environment variables (or global variables).  Many of these environment variables are present on the system for use, often having to do with some useful variables and values for system use. As a convention, we tend to write the names of environment variables in uppercase, while we tend to define local variables in lowercase.

Have a look at the following environment variables:

```bash
echo ${USER}
echo ${SHELL}
echo ${PATH}
```

In order to check *all* of the environment variables, give the `env` command a try:

```bash
env
```

Depending on what system you are using, you may see a varying amount of environment variables already present.

### Using both local and global variables in a single command

You can combine the use of local and environment variables in any given command. Have a look at the following command:

```bash
echo "My name is ${name}. I am currently logged in as ${USER}."
```

Notice the difference in naming convention, but the similar use for both types of variables.

### Turning local variables into global variables

Sometimes, a defined local variable can be useful to define for the entire system. In that case, it is possible to turn any given local variable into an environment variable as follows:

```bash
export name
```

At this point, the variable `name` will be turned into an environment variable - making it accessible beyond the scope of your single terminal session. You can undo this using the `unset` command:

```bash
unset name
```

## Aliases

When working with the shell, commands can get quite lengthy - especially when using lots of options and arguments. In Bash, we can make use of **aliases** to make our lives on the terminal less cumbersome and less repetitive.

Let's take a look at one of the commands we used earlier:

```bash
cd ~/Downloads/lab-materials
```

We used a variable for this location in order to make navigation a little bit easier. Another way to reduce our typing even more here, is by making use of an alias. We can define one as follows:

```bash
alias lm="cd ~/Downloads/lab-materials"
```

After defining an alias like this, you can use it in the same session:

```bash
lm
```

To check if a specific command is an alias or not, you can use the `type` command as such:

```bash
type lm
```

You can define aliases for any command you like! If you want to unassign an alias, you can simply use the `unalias` command:

```bash
unalias lm
```

## Quotes

### Kinds of quotes and when to use them

Different types of quotes have different meanings and use cases when used in our shell. In this course, we will talk about the usage of single quotes, double quotes and backticks and how they can be used in our shell-environment. Additionally, you will learn how to make it so our quotes do nót get interpreted as these special characters, but instead simply print our desired quotes as 'plain text'.

### Single quotes

Within our shell environment, one of the quotes we can use are the **single quotes** (`'`). The single quote makes it so that all special characters are ignored by bash, and can be used to group multiple characters so they are considered as one single element.

Consider using a variable in Bash. As mentioned in an earlier section, you need to use a `$` to tell Bash when to use a variable (and its value). Let's take a look at our previous example:

```bash
friend="Bob"
echo ${friend}
```

What if we wanted our terminal to print the literal characters “${friend}”, instead of inserting the value of this variable? This can be done using single quotes! Try out the following commands:

```bash
friend="Bob"
echo ${friend}
echo '${friend}'
```

Notice the difference? When using the single quotes, our special character `$` gets ignored, and our literal text is printed on our terminal.

Let's try this command to really highlight the difference:

```bash
friend="Bob"
echo The value of the '${friend}' variable is ${friend}
```

Additionally, we can also use single quotes to simply group characters and words together. Consider the following command:

```bash
friends=Bob and Alice
```

The intent of our command is clear, but Bash will not be able to perform this command correctly. It interprets `friends=Bob`, `and` and `Alice` as seperate commands - with the last two not being valid shell commands. Instead, we can use quotes to group these arguments together:

```bash
friends='Bob and Alice'
```

This command is interpreted correctly by bash. Do note that double quotes (`"`), as seen before in the examples, also work for grouping these arguments.

Lastly, single quotes prevent brace expansion from happening - a feature we will learn about in a following section.

### Double quotes

Double quotes can be used to prevent interpreting specific special characters, but most importantly to prevent globbing-characters from being interpreted. These special characters include `*`, `?`, and `[]`.

You will learn more about globbing soon, but you can see its effect already using the following commands after one another:

```bash
echo D*
echo "D*"
```

Globbing characters define a specific pattern. When we want to literally print these characters, we can use the double quotes. As mentioned before, double quotes can also be used to simply group arguments and characters together.

### Backticks

The last type of quote we will learn to use in Bash, are the backticks (`` ` ``). 

Backticks are a special type of character in Bash, because they allow for **command substitution**. Consider the following command:

```bash
date
```

This command prints the current system date and time. What if we wanted to use the output of this command in an `echo` statement? We can use backticks for this exact purpose:

```bash
echo Current system date and time is `date`
```

Similarly to backticks, you can use `$()` to achieve command substitution. Be mindful of the parentheses here - this is not the same as using a variable:

```bash
echo Current system date and time is $(date)
```

### Escape characters

We have now learned of these 3 types of quotes that we can use within our shell environment - these characters have a special meaning and are interpreted with their own specific uses within Bash. What then if we want to print these specific characters on our terminal, instead of having them be interpreted?

For this use case, and many others, you can use what we call an escape character. In Bash, we can use the backslash (`\`) for this purpose. A backslash ignores the special meaning of the next character. For example:

```bash
friend="Bob"
echo The value of the \${friend} variable is ${friend}
```

Additionally, if you want to use a literal backslash, you can simply use a double backslash - to prevent the second backslash from being interpreted!

```bash
echo This is how a \\ is used as a literal character!
```

## Globbing

Globbing (sometimes called file globbing) is a method for identifying filenames based on specific patterns. You can define these kinds of patterns based on your use case or goal - depending on what it is you need to do in your shell environment.

Globbing is often used for **filtering** for specific filenames, or **performing actions** on a **selection of different files**. Some use cases where globbing is efficiënt would be:

- Finding all `.txt` files in a specific directory
- Deleting all files that have the word `temp` in their filename
- Copying all `.jpg`, `.jpeg` and `.png` files from one directory to another

In order to define patterns, we can use specific **globbing characters** that dictate what our pattern should match. These globbing characters are sometimes referred to as **wildcards** as well. Globbing can be used in conjunction with many commands, but for demonstration purposes we will mostly be working with commands such as `ls` and `echo`.

::: info
The term `globbing` or `glob` is originally derived from the term `global (command)`, but has now become a term of its own.
:::

### Globbing patterns

Below is an overview of common globbing patterns and characters we will discuss:

| Globbing character        |   Usage                                 |
| -------------             |   :-----------:                         |
| *                         |   0 or more occurrences of any character |
| ?                         |   1 or more occurrences of any character |
| []                        |   Match characters inside brackets      |
| !                         |   Match anything but what follows            |

You can use these characters in all kinds of combinations to achieve your specific goal.

Let's put these globbing patterns to use. In the following examples, we will use one or more of the globbing characters to define specific patterns. Perform the following commands and play around with the globbing patterns yourself to get a feel for how they work.

::: info
For most of these tests, we will use files already present on most Linux filesystems by default. Depending on what Linux distribution and software/configuration you use, outputs of these commands may vary.

If a specific location or path is used that you are not familiar with, you do not need to know what the path or files on this location mean exactly. 
::: 

#### Examples

Show me all files in the **/etc** directory that begin with the letter `t`:

```bash
echo /etc/t*

```

::: info
You could interpret the `*` globbing character as 'any character, however many, or no character, goes in this spot'. In this case, our pattern is essentially defined as "Anything that starts with `t` followed by either nothing or any amount of any characters". 
::: 

Show me all files in the **/etc** directory with an extension that consists of 3 characters:

```bash
echo /etc/*.???

```

::: info
You could interpret the `?` globbing character as 'any single one character goes in this spot'. By using three here with our `*`, we are essentially defining our pattern as 'Anything followed by a `.` and three characters, whatever those three characters may be'
::: 

Show me all files in the **/etc** directory that start with the letter `g` *or* the letter `u`:

```bash
echo /etc/[gu]*

```

Show me all files in the **/etc** directory that *don't* start with the letter `g` or the letter `u`:

```bash
echo /etc/[!gu]*

```

Show me all files in the **/etc** directory that start with any letter from `a` to `d`:

```bash
echo /etc/[a-d]*

```

Be sure to test all of these commands, and play around with them. See what happens if you change the patterns, and try creating your own. You'll get more practice using globbing in the exercises that accompany this lab.

Remember that you can use this idea of globbing with most commands. The commands we used here are **non-destructive commands** (such as `ls` or `echo`). When using destructive commands that alter your system (such as `rm` or `mv`), be sure to **test your globbing pattern** before using it!

## Brace expansion

In Bash, brace expansion is a way to generate strings using specific patterns. Most often, brace expansion is used to work more efficiently or to make automation of specific tasks a bit easier.

As with globbing, we'll use `echo` as a non-destructive command for these examples. Here's a simple example that uses brace expansion:

```bash
echo draft_{v1,v2,final}.txt
```

If you substitute `echo` with `cp`, `mv`, or `rm`, you can imagine how useful brace expansion can be when you want to apply a single command to multiple files, especially when those files cannot be described by a single globbing pattern.

Recall that single quotes ignore brace expansion, so the following command simply prints the text between quotes and doesn't expand the pattern:

```bash
echo 'draft_{v1,v2,final}.txt'
```

### Range expansion

Brace expansion can generate strings based on **ranges** you define. These ranges can be numeric or alphabetical. Here are a few examples:

```bash
echo draft_v{1..5}
echo {10..1}
echo {x..z}-axis
echo {z..a}
```

## Using **.bashrc**

### What is .bashrc?

In your home directory, there is a hidden file called **.bashrc** (*Bash run control*). This file is known as a **control script**. It runs whenever you start a new shell. 

::: info
Hidden files start with a dot (`.`). Use `ls -a` to find them.
:::

We can look at the content of this file using `cat`, or we could open it up with a text editor for changing its content:

```bash
nano .bashrc
```

By default, this file already contains some basic configuration and customization commands, depending on your operating system. We can add any shell-commands in here, similar to a normal script, and those commands would get run whenever we start up a shell session.

### Defining a variable in .bashrc

You can define variables in **.bashrc**. If you use a specific variable or value often, you might find it useful to define it here so it is always available in any shell.

Use `nano` to add the following line at the bottom of the file:

```bash
firstname=Alice
```

From here on out, this `firstname` local variable will always be available when starting up a shell-session.

### Defining an alias in .bashrc

Perhaps one of the more common uses of **.bashrc** is defining an alias that you use regularly. This way, your custom aliases are always available.

Add the following line to **.bashrc** to define the alias `lm` from earlier:

```bash
alias lm="cd ~/Downloads/lab-materials"
```

Next time you open a Bash shell, this alias will be available automatically!

## History

The Bash shell has a very useful feature: it remembers all your previous commands. Use the **`history`** command to see these commands:

```bash
history
```

You can specify how many commands you would like to see. The following example shows the five most recently executed commands:

```bash
history 5
```

As you can see, Bash also numbers each command you perform. You can rerun a specific command from your history by typing its number after an exclamation point (`!`):

```bash
!5
```

A double exclamation point reruns the most recent command from your history:

```bash
!!
```

You can also use the `Up` and `Down` arrow keys to navigate your history. Use these keys to recall a command from your history, then use the `Left` and `Right` arrow keys to move the cursor, so that you can modify the command before you run it. You can also use `Ctrl+A` or `Ctrl+E` to move the cursor to the start or the end of the line, respectively.

Additionally, you can use `Ctrl+R` to perform a **reverse search**. Start typing, and the shell will bring up the previous command that matches your query. Press `Enter` to rerun this command, or press `Ctrl+R` again to find another match.

::: tip
Should you ever get stuck, you can always press `Ctrl+U` (*undo*) to remove everything before the cursor, or `Ctrl+L` (*clear*) to clear your terminal.
:::

## Up next

The following exercises will help you practice what you've learned in this lab. Complete these exercises first, then move on to the next lab, where you'll learn to install and manage software from the command line.
