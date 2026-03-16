# Using the Shell

## Lab overview

In this lab assignment, you will learn:

- Working with variables in bash
- Writing and managing aliases
- Leveraging the bash history
- Quotes, globbing and brace expansion
- Input, output, piping and redirection
- Using a `.bashrc`file to manage aliases and variables
- Customising your shell and prompt TODO

## Variables in bash

### What are variables?

Variables allow the user (or the shell) to save values. Every variable is assigned a name (and a specific value) and will be stored temporarily in memory. This allows for easy use during operations with the Bash-shell, for use in other commands or to work more efficiently.

Variables are an important tool when working with the shell - they allow defining and re-using specific values to ensure a more fluent workflow and offer much functionality.

### Local versus global variables

We can make a distinction between two types of variables:

**Local variables** are variables that only exist within the context of our current shell-enviornment. When the shell is exited or the terminal is closed, this variable will no longer exist.

**Environment variables**, also referred to as **global variables**, are variables that exist system-wide and are readily available for use in any shell-session. On system-startup, a decent amount of environment variables are present and defined.

### How to create variables

### Creating your first (local) variables


#### Local variable creation for demo

To get started, let's create our very first variable, which will be a local variable. Defining a variable in the shell, can be done using the following command structure:

```bash
systemuser@localhost:~$ variable="Value" # variable = variable name, "Value" = its value
```

It is important to define our value using quotes (see chapter on quotes TODO) - especially when the value is a string contains multiple 'words' or parts. Let's get started by making a variable for our own name, that contains the content of our first name. For example:

```bash
systemuser@localhost:~$ name="Alice"
```

Congratulations - you have now created your first local variable! You will notice you do not receive any feedback or confirmation for its creation - this is something that is typical for the shell. No worries, however - we will actually use this variable and verify it is created correctly in our next step!

#### Using the variable in an echo command

In order to showcase our new variable, we can use it in a shell-command.

We will make use of a new command - the `echo` command. This command can be used to print any given argument on the screen, as such:

```bash
systemuser@localhost:~$ echo "Hello World!"
```

Output: Hello World!

Since we have created our variable, we can now use it in our shell using the `${ }` notation, and putting our variable name between the brackets. Try the following command:

```bash
systemuser@localhost:~$ echo ${name}
```

Output: Alice

You will see the value of our variable will be used in the `echo` command - this illustrates the most common way of interacting with variables while using the shell.


#### Creating and using a variable for navigation

Let's say, for the sake of this course, we always start working in the same directory on our system: `/home/systemuser/computer-fundamentals`. If we want to use this path in our shell-commands, we always have to type the entirety of that location.

```bash
cd /home/systemuser/computer-fundamentals
```

We could, however, use a variable to make our life easier:

```bash
location="/home/systemuser/computer-fundamentals"
```

By defining this variable, we could now use this variable to make navigating to our directory more efficient:

```bash
cd ${location}
```

There are different way to make this process faster and easier, but by using a variable this way you can see how useful they can be.


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

Output: My name is Alice and my friend's name is Bob

Remark that we use different forms of quotes for this echo command. TODO refer to quotes bit!

### Environment variabes: pointing out some important and useful ones

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

In order to check all of the environmetn variables, give the `env` command a try! Depending on what (operating) system you are using, you may see a varying amount of environment variables already present.

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
cd /home/systemuser/computer-fundamentals
```

We used a variable for this location in order to make navigation a little bit easier. Another way to reduce our typing here is by making use of an alias. We can define one as follows:


```bash
alias cf="cd /home/systemuser/computer-fundamentals"
```

After defining an alias like this, you can use it in the same session:

```bash
cf
```

You can define aliases for any command you like! If you want to unassign an alias, you can simply use the `unalias` command.

## Quotes

### Kinds of quotes and when to use them

### Single quotes

- Don't interpret special characters
- No brace expansion

### Double quotes

- No globbing! (TODO see globbing)


### Backticks

- Command substitution
- Alternative= `$()`

### Escape characters

- Ignore the specific next character as a special character 
- Character: `\`
- Double backslash to ignore escape character and use backslash

## Globbing

### Globbing patterns

- Explain what globbing is
- Basic globbing patterns

## Brace expansion

### Expansion range

- Count numerical
- Count alphabetically
- Count backwards, forwards and from any start to any end point that makes sense

### Expanding - preamble and postscript

- What is preamble?
- What is postscript?
- Using both preamble and postscript together

### Expanding - using brace expension in directory structure

- Generating directory structure
- Generating files based on specific structure

## Input, output and error

TODO - how detailed? See working-with-text

### Input and output channels

TODO - how detailed? See working-with-text

## Redirection and piping

TODO - how detailed? See working-with-text

## Leveraging .bashrc

### What is .bashrc?

On the system, there is a hidden file called the `.bashrc`-file in your home directory. This file is what we call a control script, and it is run whenever the shell starts up. The letters 'rc' in the `.bashrc`-file stand for 'run control'.

We can look at the content of this file using `cat`, or we could open it up with a text editor for changing its content:

```bash
nano .bashrc
```

By default, this file already contains some basic configuration and customization commands, depending on your operating system. We can add any shell-commands in here, similar to a normal script, and those commands would get run whenever we start up a shell session.

### Defining a variable in .bashrc

You can define variables in your `.bashrc`-file if needed. If you use a specific variable or value often, you might find it useful to define it here so it is always available in any shell.

In order to achieve this, you can add the following line at the bottom line using `nano` or your own favorite text editor:

```bash
firstname=Alice
```

From here on out, this firstname local variable will alwas be available when starting up a shell-session.


### Defining an alias in .bashrc

Perhaps on of the more common uses of the `.bashrc`-file, is defining a premade alias that you often use. This way, your custom alias are always available for you to use and don't need to be redefined again.

In order to make the command `cf` navigate to our specific directory for practice, for example, you could add the following line to the end of `.bashrc`:

```bash
alias cf="cd /home/systemuser/computer-fundamentals"
```

Any shell you will use from now on will have access to your custom alias at all times!

## Shell customization

TODO