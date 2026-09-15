# Using the Shell

## Lab overview

In this lab assignment, you will learn:

- Working with **variables**
- Writing and managing **aliases**
- Leveraging the **Bash history**
- **Quotes**, **globbing** and **brace expansion**
<!-- - Input, output, piping and redirection - moved to working with text? TODO -->
- Using a `.bashrc`file to **manage aliases and variables**
<!-- - **Customising** your **shell** and **prompt** TODO -> Cut because of content amount -->

## Variables

### What are variables?

Variables allow the user (or the shell) to save values. Every variable is assigned a name (and a specific value) and will be stored temporarily in memory. This allows for easy use during operations with the Bash-shell, for use in other commands or to work more efficiently.

Variables are an important tool when working with the shell - they allow defining and re-using specific values to ensure a more fluent workflow and offer much functionality.

### Local versus global variables

We can make a distinction between two types of variables:

**Local variables** are variables that only exist within the context of our current shell-enviornment. When the shell is exited or the terminal is closed, this variable will no longer exist.

**Environment variables**, also referred to as **global variables**, are variables that exist system-wide and are readily available for use in any shell-session. On system-startup, a decent amount of environment variables are present and defined.


#### Local variable creation

To get started, let's create our very first variable, which will be a local variable. Defining a variable in the shell, can be done using the following command structure:

```bash
systemuser@localhost:~$ variable="Value" # variable = variable name, "Value" = its value
```

Notice that we are using quotes (`"`) when defining a variable. While not strictly required, this can be necessary in some cases - especially when the value is a string that contains multiple 'words' or parts. Please refer to our section about `Quotes` where we learn how and when to use the different types of quotes.

For now, let's get started by making a variable for our own name, that contains the content of our first name. For example:

```bash
systemuser@localhost:~$ name="Alice"
```

Congratulations, you have now created your first local variable! You will notice you do not receive any feedback or confirmation for its creation - this is something that is typical for the shell. No worries, we will actually use this variable and verify it is created correctly in our next step!

#### Using the variable in an echo command

In order to showcase our new variable, we can use it in a shell-command.

We will make use of a new command - the `echo` command. This command can be used to print any given argument on the screen, as such:

```bash
systemuser@localhost:~$ echo "Hello World!"
```

<!-- Output: Hello World! -->

Since we have created our variable, we can now use it in our shell using the `${ }` notation, and putting our variable name between the brackets. Try the following command:

```bash
systemuser@localhost:~$ echo ${name}
```

<!-- Output: Alice -->

You will see the value of our variable will be used in the `echo` command - this illustrates the most common way of interacting with variables while using the shell.


#### Creating and using a variable for navigation

Let's say, for the sake of this course, we always start working in the same directory on our system: `/home/systemuser/lab-materials`. If we want to use this path in our shell-commands, we always have to type the entirety of that location.

```bash
systemuser@localhost:~$ cd /home/systemuser/lab-materials
```

We could, however, use a variable to make our life easier:

```bash
systemuser@localhost:~$ lab="/home/systemuser/lab-materials"
```

By defining this variable, we could now use this variable to make navigating to our directory more efficient:

```bash
systemuser@localhost:~$  cd ${lab}
```

There are different ways to make this process faster and easier, but by using a variable this way you can see how useful they can be.


#### Creating a different variable

Let's create a different local variable - this time, we will define a variable to store the name of one of our friends:

```bash
systemuser@localhost:~$ friend="Bob"
```

Note that we can define as many variables on our system as needed. It is important to try to give our variables meaningful names, especially as we start to define more variables for specific uses.

#### Using both variables in a new echo command

Now that we have two lcoal variables, we can demonstrate that we can use as many variables as we want in a single shell-command. For example, we can use our two current local variables within the `echo` command:

```bash
systemuser@localhost:~$ echo "My name is ${name} and my friend's name is ${friend}"
```

<!-- Output: My name is Alice and my friend's name is Bob -->

Remark that we use different forms of quotes for this echo command. TODO refer to quotes bit!

### Environment variables: pointing out some important and useful ones

Aside from those local variables, we also have environment variables (or global variables).  Many of these environment variables are present on the system for use, often having to do with some useful variables and values for system use. As a convention, we tend to write the names of environment variables in capital lettes, while we tend to define local variables in lowercase.

Have a look at a few of the following environment variables:

```bash
systemuser@localhost:~$ echo ${USER}
```

```bash
systemuser@localhost:~$ echo ${SHELL}
```

```bash
systemuser@localhost:~$ echo ${PATH}
```

In order to check all of the environment variables, give the `env` command a try! Depending on what (operating) system you are using, you may see a varying amount of environment variables already present.

### Using both local and global variables in a single command

You can combine the use of local and environment variables in any given command. Have a look at the following command:

```bash
systemuser@localhost:~$ echo "My name is ${name}. I am currently logged in as user ${USER} on the system."
```

Notice the difference in naming convention, but the similar use for both types of variables.

### Turning local variables into global variables

Sometimes, a defined local variable can be useful to define for the entire system. In that case, it is possible to turn any given local variable into an environment variable as follows:

```bash
systemuser@localhost:~$ export name
```

At this point, the variable `name` will be turned into an environment variable - making it accessible beyond the scope of your single terminal session. Similarly, you can undo this using the `unset` command.

## Aliases

When working with the shell, commands can get quite lengthy - especially when using lots of options and arguments. In Bash, we can make use of **aliases** to make our lives on the terminal less cumbersome and less repetitive.

Let's take a look at one of the commands we used earlier:

```bash
systemuser@localhost:~$ cd /home/systemuser/lab-materials
```

We used a variable for this location in order to make navigation a little bit easier. Another way to reduce our typing even more here, is by making use of an alias. We can define one as follows:


```bash
systemuser@localhost:~$ alias cf="cd /home/systemuser/lab-materials"
```

After defining an alias like this, you can use it in the same session:

```bash
systemuser@localhost:~$ cf
```

To check if a specific command is an alias or not, you can use the `type` command as such:

```bash
systemuser@localhost:~$ type cf
```


You can define aliases for any command you like! If you want to unassign an alias, you can simply use the `unalias` command.

## Quotes

### Kinds of quotes and when to use them

Different types of quotes have different meanings and use cases when used in our shell. In this course, we will talk about the usage of single quotes, double quotes and backticks and how they can be used in our shell-environment. Additionally, you will learn how to make it so our quotes do nót get interpreted as these special characters, but instead simply print our desired quotes as 'plain text'.

### Single quotes

Within our shell environment, one of the quotes we can use are the **single quotes** ('). The single quote makes it so all special characters are ignored by bash, and can be used to group multiple characters so they are considered as one single element.

Consider using a variable in Bash. As mentioned in an earlier section, you need to use a `$` to tell Bash when to use a variable (and its value). Let's take a look at our previous example:

```bash
systemuser@localhost:~$ friend="Bob"
systemuser@localhost:~$ echo ${friend}
```

What if we wanted our terminal to print the **literal characters** '${friend}', instead of inserting the value of this variable? This can be done using single quotes! Try out the following commands:

```bash
systemuser@localhost:~$ friend="Bob"
systemuser@localhost:~$ echo ${friend}
systemuser@localhost:~$ echo '${friend}'
```

Notice the difference? When using the single quotes, our special character `$` gets ignored, and our literal text is printed on our terminal.

Let's try this command to really highlight the difference:

```bash
systemuser@localhost:~$ friend="Bob"
systemuser@localhost:~$ echo The value of the '${friend}' variable is ${friend}
```

Additionally, we can also use single quotes to simply group characters and words together. Consider the following command:

```bash
systemuser@localhost:~$ friends=Bob and Alice
```

The intent of our command is clear, but bash will not be able to perform this command correctly. It interprets `friends=Bob`, `and` and `Alice` as seperate commands - with the last two not being valid shell commands. Instead, we can use quotes to group these arguments together:

```bash
systemuser@localhost:~$ friends='Bob and Alice'
```

This command is interpreted correctly by bash. Do note that double quotes ("), as seen before in the examples, work for grouping these arguments as well.


Lastly, single quotes prevent brace expansion from happening - a feature we will learn about in a following section.

<!-- - Don't interpret special characters
- No brace expansion -->

### Double quotes

Double quotes can be used to prevent interpreting specific special characters, but most importantly to prevent globbing-characters from being interpreted. These special characters include `*` `?` `[]`.

Globbing will be visited in a following section in more detail, but you can see its effect already using the following commands after one another:

```bash
systemuser@localhost:~$ echo D*
systemuser@localhost:~$ echo "D*"
```

Globbing characters define a specific pattern - when we want to literally print these special globbing characters, we can use the double quotes. As mentioned before, double quotes can also be used to simply group arguments and characters together.

### Backticks

The last type of quote we will learn to use in Bash, are the backticks (`). 

Backticks are a special type of character in Bash, because they allow for **command substitution**. Consider the following command:

```bash
systemuser@localhost:~$ date
```

This command prints the current system date and time on the shell. What if we wanted to use the output of this command in an `echo` statement? We can use backticks for this exact purpoise of command substitution.

```bash
systemuser@localhost:~$ echo Current system date and time is `date`
```

Similarly to backticks, you can use `$()` to achieve command substitution. Be mindful of the parentheses here - this is not the same as using a variable!

```bash
systemuser@localhost:~$ echo Current system date and time is $(date)
```


### Escape characters

We have now learned of these 3 types of quotes that we can use within our shell environment - these characters have a special meaning and are interpreted with their own specific uses within Bash. What then if we want to print these specific characters on our terminal, instead of having them be interpreted?

For this use case, and many others, you can use what we call an escape character. In Bash, we can use the backslash (\) for this purpose. A bactick ignores the special meaning of the next character. For example:

```bash
systemuser@localhost:~$ friend="Bob"
systemuser@localhost:~$ echo The value of the \${friend} variable is ${friend}
```

Additionally, if you want to use a literal backslash, you can simply use a double backslash - to prevent the second backslash from being interpreted!


```bash
systemuser@localhost:~$ echo This is how a \\ is used as a literal character!
```


## Globbing

Globbing (sometimes called file globbing) is a method for identifying filenames based on specific patterns. You can define these kinds of patterns based on your use case or goal - depending on what it is you need to do in your shell environment.

Globbing is often used for **filtering** for specific filenames, or **performing actions** on a **selection of different files**. Some use cases where globbing is efficiënt would be:

- Finding all `.txt` files in a specific directory
- Deleting all files that have the word `temp` in their filename
- Copying all `.jpg`, `jpeg` and `.png` files from one directory to another

In order to define patterns, we can use specific **globbing characters** that dictate what our pattern should match. These globbing characters are sometimes referred to as **wild cards** as well. Globbing can be used in conjunction with many commands, but for demonstration purposes we will mostly be working with commands such as `ls` and `echo`.

::: info
The term `globbing` or `glob` is originally derived from the term `global (command)`, but has now become a term of its own.
:::

### Globbing patterns

Below is an overview of common globbing patterns and characters we will discuss:


| Globbing character        |   Usage                                 |
| -------------             |   :-----------:                         |
| *                         |   0 or more occurences of any character |
| ?                         |   1 or more occurences of any character |
| []                        |   Match characters inside brackets      |
| !                         |   Match anything but pattern            |

You can use these characters in all kinds of combinations to achieve your specific goal.

#### Globbing patterns - use and exercises

Let's put these globbing patterns to use to see how they translate into the actual command-line. In the following examples, we will use one or more of the globbing characters with the **Bash-shell** to define specific patterns. Perform the following commands on your Bash-shell, and play around with the globbing patterns yourself to get a feel for how globbing is used.


::: info
For most of these tests, we will use files already present on most Linux filesystems by default. Depending on what Linux distribution and software/configuration you use, outputs of these commands may vary.

If a specific location or path is used that you are not familiar in and doesn't appear in this course elsewhere, you do not need to know what the path or files on this location mean exactly. 
::: 

#### Globbing patterns - examples

Show me all files in a specific directory that begin with the letter `t`:

```bash
systemuser@localhost:~$ echo /etc/t*

```

::: info
You could interpret the `*` globbing character as 'any character, however many, or no character, goes in this spot'. In this case, our pattern is essentially defined as "Anything that starts with `t` followed by either nothing or any amount of any characters". 
::: 


Show me all files in a specific directory with an extension that end with 3 characters:


```bash
systemuser@localhost:~$ echo /etc/*.???

```

::: info
You could interpret the `?` globbing character as 'any single one character goes in this spot'. By using three here with our `*`, we are essentially defining our pattern as 'Anything followed by a `.` and three characters, whatever those three characters may be'
::: 

Show me all files in a specific directory that start with the letter `g` OR the letter `u`:

```bash
systemuser@localhost:~$ echo /etc/[gu]*

```

Show me all files in a specific directory that **don't** start with the letter `g` OR the letter `u`:

```bash
systemuser@localhost:~$ echo /etc/[!gu]*

```


Show me all files in a specific directory that start with any letter from `a` to `d`:

```bash
systemuser@localhost:~$ echo /etc/[a-d]*

```


Be sure to test all of these commands, and mess around with them. See what happens if you change the patterns, and try creating your own. For more practice using globbing, have a look at the exercises that accompany this lab.

#### Globbing - ending note

Remember that you can use this idea of globbing with most commands. The commands we used here are **non-destructive commands** (such as `ls` or `echo`). When using destructive or commands that alter your system (such as `rm` or `mv`), be sure to **test your globbing pattern** before using it!


## Brace expansion

In Bash, brace expansion is a way to generate strings (~text) using specific patterns, with a specific use case in mind. Most often, brace expansion will be used to work more efficiently or to make automation of specific tasks a bit easier.

Let's look at an example of basic brace expansion in bash, using an `echo` command:

```bash
systemuser@localhost:~$ echo {1..5}
```

You will see that all the numerical characters between our given range 1 and 5 will be printed on the terminal. You can integrate this in your commands in different ways:

```bash
systemuser@localhost:~$ echo Counting to 5: {1..5}
```

This is what brace expansion does - generating ranges of strings based on patterns or ranges you define. Do remember that brace expansion is ignored when using single quotes - as mentioned in a previous section:

```bash
systemuser@localhost:~$ echo '{1..5}'
```

### Expansion range

There are different ways to define your ranges for brace expansions. In this course, we will only handle some basic use cases - **nesting** of brace expansions and **reversing** expansions is considered out of scope for this introductory course.

#### Counting numerically

```bash
systemuser@localhost:~$ echo {1..5}
systemuser@localhost:~$ echo {10..15}
```

#### Counting alphabetically

You can also define similar ranges using alphabetical characters (~letters):

```bash
systemuser@localhost:~$ echo {a..z}
systemuser@localhost:~$ echo {f..i}
```

### Expanding - preamble and postscript

Aside from the basic brace expansion, you will often see that we want our generated strings to **start** and/or **end** with a specific set of characters - these components are called the **preamble** and **postscript** respectively.

#### Preamble

The preamble is a set of characters you can use in front of your brace expansions, to define a specific pattern. For example:

```bash
systemuser@localhost:~$ echo letter{a..z}
systemuser@localhost:~$ echo number{1..10}
```

#### Postscript

Similar to the preamble, the postscript is a set of characters you want to use after your brace expansions:

```bash
systemuser@localhost:~$ echo {a..z}letter
systemuser@localhost:~$ echo {1..10}number
```

#### Combining preamble and postscripts

In some cases, you might want to combine the use of a preamble and a postscript. Using both could look something like this:

```bash
systemuser@localhost:~$ echo my{a..z}letter
systemuser@localhost:~$ echo my{1..10}number
```


### Expanding - using brace expansion in directory structure

Not just limited to our `echo` commands for demonstration, you can use brace expansion for any shell-command you can imagine. You could use this same system, for example, to create a bunch of (empty) files or directories for future use.



<!-- ## Redirection and piping

Earlier in this course, you learned about the basics of input, output and redirecting. -->

<!-- TODO: moet dit nog uitgebreider aan bod komen dan in het labo werken met tekst? Anders best al veel leerstof... -->

## Using `.bashrc`

### What is .bashrc?

On the system, there is a hidden file called the `.bashrc`-file in your home directory. This file is what we call a control script, and it is run whenever the shell starts up. The letters 'rc' in the `.bashrc`-file stand for 'run control'.

::: info
Hidden files on the system are usually files with a `.` at the beginning. These files won't be visible by default for the file explorer system (you can turn them visible in your operating systems' file explorer, or in Bash you can use `ls -a`)
:::

We can look at the content of this file using `cat`, or we could open it up with a text editor for changing its content:


```bash
systemuser@localhost:~$ nano .bashrc
```

By default, this file already contains some basic configuration and customization commands, depending on your operating system. We can add any shell-commands in here, similar to a normal script, and those commands would get run whenever we start up a shell session.

### Defining a variable in .bashrc

You can define variables in your `.bashrc`-file if needed. If you use a specific variable or value often, you might find it useful to define it here so it is always available in any shell.

In order to achieve this, you can add the following line at the bottom line using `nano` or your own favorite text editor:

```bash
systemuser@localhost:~$ firstname=Alice
```

From here on out, this firstname local variable will always be available when starting up a shell-session.


### Defining an alias in .bashrc

Perhaps one of the more common uses of the `.bashrc`-file, is defining a premade alias that you often use. This way, your custom alias are always available for you to use and don't need to be redefined again.

In order to make the command `cf` navigate to our specific directory for practice, for example, you could add the following line to the end of `.bashrc`:

```bash
systemuser@localhost:~$ alias cf="cd /home/systemuser/lab-materials"
```

You will now have access to your custom alias at all times when using the Bash-shell!

## Bash history

The Bash shell has a very useful feature: it keeps all your previous commands. In order to see this, you can use the `history` command.

```bash
systemuser@localhost:~$ history
```

You can use this history to your advantage in many different ways. It is also possible to ask a specific amount of commands from your recent history as such (for example, the last five commands):

```bash
systemuser@localhost:~$ history 5
```

Note that every command performed gets assigned a specific number.

You can directly call a specific line of your history as such:

```bash
systemuser@localhost:~$ !5
```

### Navigation and reverse search

In your terminal, you can always use the arrow keys UP and DOWN to navigate your previous commands. This may prove useful when you need to perform a specific command a second time

Additionally, you can use the `CTRL + R` shortcut to perform a reverse search. You can start typing, and the shell will bring up the previous command that matches what you type. You can press `ENTER` to perform the command of your choice, or you can press `CTLR + R` again to go to the previous match in your history.

### Example flow

Let's say you try to install the `vim` package with `apt`, and you use the following command:

```bash
systemuser@localhost:~$ apt install vim
```

You will get an error, as you did not use sudo and don't have the proper permissions on your current user for this task. You could rewrite the entire command, but that is a lot of work. Some options using history are:

- Press the UP key, then simply add the `sudo` command in front of it
- Use the following command: `sudo !!`
  - `!!` is used to perform the last command
  - We add sudo in front of the previous command