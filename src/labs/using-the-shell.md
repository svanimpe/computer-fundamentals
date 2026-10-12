# Using the Shell

::: warning
This lab is still in draft. It contains all the information you need, but the text isn't polished yet.
:::

This lab focuses less on learning new commands and more on using the shell itself. You'll learn features that make using the shell easier, such as targeting multiple files at once, storing often-used values, and recalling earlier commands.

## Globbing

Globbing is a method for identifying filenames using **patterns**. Glob patterns use special characters that Bash will expand into matching filenames. By using a glob pattern, you can target multiple files at once without having to type them out individually.

You saw an example of globbing in [Files and Directories](files-and-directories), where you used the pattern `*.txt` to move multiple text files with a single command:

```bash
mv -v *.txt text
```

This pattern includes an asterisk (`*`), which is a glob character that expands into any number of matching characters (even zero).

In this section, you'll learn about the remaining glob characters: question mark (`?`), square brackets (`[` and `]`), and exclamation point (`!`). All examples use files from the **lab-materials** directory, so navigate into that directory first.

::: info
Globbing is a shell feature that works with any command. For demonstration purposes, I will only use non-destructive commands such as `ls` and `echo`. Always try your patterns with `ls` or `echo` first, before you use commands such as `cp`, `mv`, or `rm`.
:::

A question mark (`?`) matches exactly one character. For example:

```bash
ls text/*.???
```

This pattern matches all filenames in the **text** directory that consist of zero or more characters (`*`), followed by dot, and exactly three characters (`???`).

Square brackets (`[` and `]`) contain a list of possible characters. The pattern will match any character from that list. For example:

```bash
ls text/shakespeare/[mr]*.txt
```

This pattern matches all filenames in the **shakespeare** directory that start with `m` or `r`, followed by zero or more characters (`*`), and ending in `.txt`.

You can specify consecutive characters as a **range** and mix ranges with other characters. For example:

```bash
ls text/[e-gr]*
```

This pattern matches all filenames in the **text** directory that start with any of the characters `e`, `f`, `g`, or `r`, followed by zero or more characters (`*`).

An exclamation point (`!`) at the start of a list inverts that list, meaning the pattern will match any character that is *not* in the list. For example:

```bash
ls text/[!a-z]*
```

This pattern matches all filenames in the **text** directory that *don't* start with a lowercase letter.

Bash has a few more globbing features but these aren't enabled by default and are out-of-scope for this course.

## Brace expansion

Like globbing, **brace expansion** lets you target multiple files at once. Whereas globbing uses pattern matching to match existing filenames, brace expansion can generate any string — it doesn't have to be a filename.

As an example, suppose you want to generate the following files:

```
draft_v1.txt
draft_v2.txt
draft_v3.txt
draft_final.txt
```

These filenames have a similar structure; only the middle part is different. You can generate these names by listing the different values for the middle part in braces:

```bash
echo draft_{v1,v2,v3,final}.txt
```

Bash will expand these braces once for every value listed within. The resulting `echo` command has four arguments, not one:

```bash
echo draft_v1.txt draft_v2.txt draft_v3.txt draft_final.txt
```

### Sequences

Brace expansion supports **sequences** (ranges). You specify a sequence as a start value, followed by two dots, and an end value. Try the following examples to see how they expand:

```bash
echo draft_v{1..3}.txt
echo {10..1}
echo {x..z}-axis
echo {z..a}
```

Sequences can be either increasing or decreasing. They can also include an optional **stride** (step) as the third element:

```bash
echo {0..20..2}
```

This sequence has a stride of 2 and only includes even numbers.

### Multiple expansions

A single command can contain multiple brace expansions. How Bash expands these braces depends on whether or not the expansions are part of the same string.

The following example contains two expansions:

```bash
echo The hexadecimal digits are {0..9} and {A..F}
```

These expansions aren't part of the same string so Bash expands them separately:

```
The hexadecimal digits are 0 1 2 3 4 5 6 7 8 9 and A B C D E F
```

However, this behavior changes when the expansions are part of the same string:

```bash
echo The available sizes are {1..3}x{1..3}
```

In this case, Bash generates a Cartesian product, combining every element from the first sequence with every element from the second one:

```
The available sizes are 1x1 1x2 1x3 2x1 2x2 2x3 3x1 3x2 3x3
```

### Nested expansions

Finally, expansions can be **nested**. When Bash encounters a nested expansion, it first expands the inner one. For example:

```bash
echo draft_{v{1..3},final}.txt
```

In this case, Bash first expands `{1..3}`, so the example is equivalent to:

```bash
echo draft_{v1,v2,v3,final}.txt
```

## Variables

Variables can make your life easier by storing often-used values. For example, you can store the path to the **lab-materials** directory in a variable named `labs`:

```bash
labs=~/Downloads/lab-materials
```

You can then use the variable whenever you want to navigate to this directory:

```bash
cd $labs
```

As you can see, you create a variable by assigning a value to its name, and you read a variable by prefixing its name with a dollar sign (`$`). This notation is actually just a shorthand. The full syntax for reading a variable includes braces around the variable's name:

```bash
cd ${labs}
```

This syntax clearly delimits the variable and is required when the variable is part of a larger string:

```bash
fruit=apple
echo I like ${fruit}s
```

Without the braces, Bash would look for a variable named `fruits`, which doesn't exist.

Variables are part of Bash's programming features. However, this feature is less strict than variables in strongly typed programming languages. For example, Bash will not report an error when you use a variable that doesn't exist:

```bash
echo ${secret_message}
```

Bash will simply replace this variable with an empty string.

Bash also doesn't check if a variable exists when you assign it a value. You use the same assignment to create a variable as you do to modify it:

```bash
secret_message='The password is password'
secret_message='The password is supersecret'
```

In this example, the first command creates a new variable, whereas the second command modifies the existing variable. The quotes are required here because the values contain spaces. Without these quotes, Bash would assign `secret_message` a value of `The`, then look for a command named `password`, which doesn't exist.

### Environment variables

Bash distinguishes between two types of variables:

- **Local variables** only exist in your current session. When you exit your shell or close the terminal, these variables cease to exist.
- **Environment variables** — also known as **global variables** — exist system-wide and are available for use in any shell session. Most environment variables get created when the system starts or when you log in.

As a convention, we use lowercase names for local variables, and uppercase names for environment variables.

Use the **`env`** command to list the current environment variables:

```bash
env
```

You may recognize some of these variables:

| Variable | Value |
| -------- | ----- |
| `HOME` | Your home directory. |
| `PWD` | Your current working directory.<br>This is what the `pwd` command prints. |
| `OLDPWD` | Your previous working directory.<br>This is where you navigate to with `cd -`. |
| `SHELL` | Your current shell. |
| `USER` | Your username. |

The syntax for reading environment variables is the same as for reading local variables. You can use either the full syntax or the shorthand:

```bash
echo My username is ${USER}.
echo My username is $USER.
```

The **`export`** command creates a new environment variable. You can either export an existing variable:

```bash
NAME=Steven
export NAME
```

or create and export it with a single command:

```bash
export NAME=Steven
```

Finally, the **`unset`** command clears a variable and removes it from the environment:

```bash
unset NAME
```

## Command substitution

**Command substitution** lets you use the output of one command as part of another command. Here's an example:

```bash
echo I have been $(uptime --pretty)
```

In this example, Bash first runs the **`uptime`** command, which tells you how long your system has been running, then replaces (*substitutes*) this command with its output. As you can see, the syntax for command substitution is similar to how you read a variable, but it uses parentheses instead of braces.

The substituted command can be as complex as you need it to be. The following example uses the **`date`** command to print the current date, `cut` to extract the year, and `echo` to print the result:

```bash
echo The year is $(date -I date | cut -d '-' -f1)
```

### Backquotes

Historically, command substitution used **backquotes** (also known as backticks) for its delimiters:

```bash
echo I have been `uptime --pretty`
echo The year is `date -I date | cut -d '-' -f1`
```

You may encounter this syntax in legacy code but we won't use it in this course. The newer dollar-parenthesis syntax is more readable, more flexible, and highly recommended over backquotes.

## Quotes

In previous labs, you used quotes to stop Bash from interpreting special characters. For example, in [Files and Directories](files-and-directories#find), you used quotes around a search expression for `find`:

```bash
find scripts -iname '*usage*'
```

These quotes stop Bash from interpreting the asterisks (`*`) as globbing characters. Without these quotes, Bash would perform pattern matching in the current directory, and `find` would not be able to perform its search.

Likewise, in [Working with Text](working-with-text#sort-structured), you used quotes around the field delimiter for `sort`:

```bash
sort -t ';' -k2 grades.csv
```

Without these quotes, Bash would interpret the semicolon (`;`) as the end of the current command — that's what a semicolon means — and interpret the rest of the line as a separate command.

Finally, you used quotes earlier in this lab, to assign a value that contains spaces:

```bash
secret_message='The password is password'
```

In this section, you'll learn the difference between **single quotes** and **double quotes**, and how they relate to globbing, variables, and command substitution.

### Single quotes

Single quotes (`'`) stop Bash from interpreting any special characters in a string. These are the quotes you've been using so far. You should continue to use single quotes whenever you want to print a literal piece of text, or pass text to a command unmodified.

The following string contains several special characters but Bash won't perform any globbing, variable substitutions, or command substitutions. The text will be printed as-is:

```bash
echo '*?[!abc]; $USER ${PWD} $(pwd)'
```

### Double quotes

Double quotes (`"`) stop Bash from interpreting *most* special characters, but enables variable and command substitution.

Try the following examples:

```bash
echo "*** Welcome ${USER} ***"
echo "*** Today is $(date) ***"
```

These double quotes disable the globbing characters (`*`) but the `USER` variable and `date` command still work.

In general, single quotes should be your first choice for disabling special characters. Use double quotes only when you require their extra features.

### Escape character

In [Exercise 2.6](../exercises/exercises2#tr), you learned how backslash (`\`) functions as an **escape character**, by “escaping” the normal meaning of the character that follows it. Bash supports this feature as well.

You can use a backslash to selectively disable some special characters. Try the following examples:

```bash
echo One star review: \*
echo Your home directory is stored in \$HOME
echo Prefer \$\(command\) for command substitution
```

In these examples, backslash disables the globbing character (`*`), variable substitution, and command substitution. In the last example, you also have to escape the parentheses, which also have a special meaning in Bash.

You also use a backslash to split a command over multiple lines. The following example applies this technique to the solution for [Exercise 2.12](../exercises/exercises2#cut-w):

```bash
ls -lh text/shakespeare/* \
    | sort -k5hr \
    | cut -w -f5,9
```

Type a backslash immediately before starting a new line and it will escape this newline character. The command will then continue on the next line.

Backslash also works inside double quotes. Here's how you can rewrite the examples from earlier using double quotes:

```bash
echo "One star review: *"
echo "Your home directory is stored in \$HOME"
echo "Prefer \$(command) for command substitution"
```

These double quotes disable the globbing character and parentheses but you still need backslashes to escape the dollar signs and prevent variable and command substitution.

You also use a backslash to escape double quotes inside a quoted string:

```bash
echo "Use double quotes (\") around strings that contain variables"
```

You can even escape a backslash itself, to generate a regular backslash:

```bash
echo "Use backslash (\\) to escape special characters"
```

However, this only applies to double quotes. A backslash has no special meaning inside single quotes, as these quotes disable *all* special characters. The following text will be printed as-is:

```bash
echo 'On Windows, your home directory is C:\Users\%USERNAME%\'
```

## Aliases

Commands can become lengthy and complex when you add lots of options and arguments. If you find yourself often using the same lengthy command, you can create an **alias** for it.

Earlier in this lab, you stored the path to the **lab-materials** directory in a variable so that you could quickly navigate to it: 

```bash
labs=~/Downloads/lab-materials
cd $labs
```

You can achieve the same result with an alias:

```bash
alias labs='cd ~/Downloads/lab-materials'
```

This command defines a new alias **`labs`** that runs the command assigned to it:

```bash
cd ~/Downloads/lab-materials
```

You can now run the alias instead of typing the full command:

```bash
labs
```

::: info
Use single quotes to define an alias, as I did. You almost always want Bash to interpret special characters when you *run* the alias, not when you *define* it.
:::

Your default shell configuration already includes some aliases. Use the **`alias`** command to list them:

```bash
alias
```

As you can see, even `ls` is an alias! Use the **`type`** command to verify this:

```bash
type ls
```

This alias adds support for colored output. You can temporarily disable the alias with the **`unalias`** command:

```bash
unalias ls
```

Defining or disabling aliases only affects your current shell session. The next time you open a shell, you'll return to your default configuration. In the next section, you'll learn how you can change this configuration.

## Configuring the shell

Your home directory contains a hidden file named **.bashrc** (*Bash run control*). Use `ls` with the `-a` option to find it:

```bash
ls -a ~
```

This file is known as a **control script**. It contains configuration and customization commands and runs every time you start a new shell. You use this file to make permanent changes to your shell environment, such as declaring variables and defining aliases.

Before you begin, open a new shell to reset your configuration, then open **.bashrc** with `nano`:

```bash
nano ~/.bashrc
```

This file defines the aliases you saw earlier. Press `Ctrl+F` and search for `alias` to find them. When you're done, navigate to the end of the file and add the following lines:

```
export LABS=~/Downloads/lab-materials
alias labs='cd ~/Downloads/lab-materials'
```

Press `Ctrl+X` and save your changes. These changes will be visible when you open a new shell, but you can also apply them to your current shell.

Use the **`source`** command to reload your configuration:

```bash
source ~/.bashrc
```

You can also use the dot (**`.`**) command instead of `source`:

```bash
. ~/.bashrc
```

This dot command is standard across all Linux shells. The `source` command is more recent and less standardized, but much easier to read.

Verify that the `LABS` variable and `labs` alias exist in your current shell:

```bash
echo $LABS
type labs
```

Finally, open a new shell and verify that they exist there as well.

## History

Every time you run a command, your shell logs this command so that you can recall it later. The **`history`** command shows your previously executed commands:

```bash
history
```

You can add an argument to specify how many commands you would like to see:

```bash
history 5
```

This command shows only the five most recently executed commands. As you can tell from its output, Bash numbers each command. You can rerun a specific command from your history by typing its number after an exclamation point (`!`):

```bash
!5
```

A double exclamation point reruns the most recent command from your history:

```bash
!!
```

You can also use the arrow keys to navigate your history. Use `Up` and `Down` to recall a command from your history, then use `Left` and `Right` to move the cursor so that you can modify the command before you run it. You can also use `Ctrl+A` or `Ctrl+E` to move the cursor to the start or the end of the line, respectively.

Additionally, you can use `Ctrl+R` to perform a **reverse search**. Start typing, and the shell will bring up the most recent command that matches your query. Press `Enter` to rerun this command or press `Ctrl+R` again to find the next match.

::: tip
Should you ever get stuck, you can always press `Ctrl+U` (*undo*) to remove everything before the cursor, or `Ctrl+L` (*clear*) to clear your terminal.
:::

## Up next

The following exercises will help you practice what you've learned in this lab. Complete these exercises first, then move on to the next lab, where you'll learn to install and manage software from the command line.
