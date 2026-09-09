# Working with Text

In this lab, you’ll learn to read and write **text** files.

Text processing is an essential skill for Linux users. As a system administrator, you’ll spend plenty of time reading and writing text files, from configuration files to automation scripts.

Text also serves as the common interface between commands. Most commands accept text as input and produce text as output. This makes it possible to use the output of one command as input for the next. This technique, known as **piping**, lets you compose simple commands to perform a complex task.

Finally, you’ll learn to consult the manual that comes with most commands. These manuals, known as **man pages**, will be your main source of information throughout these labs and exercises.

## Viewing text files

The examples in this lab use files from the **text** and **scripts** directory of the lab materials. Navigate to the **text** directory first. You learned how to do this in the previous lab.

Use the **`cat`** (*concatenate*) command to print the contents of a text file to the terminal:

```bash
cat hello.py
```

As its name implies, `cat` can print multiple files, concatenating their output:

```bash
cat COPYRIGHT hello.py
```

You can save this output using an **output redirect** (**`>`**):

```bash
cat COPYRIGHT hello.py > hello_final.py
```

This saves the output of `cat` to a file named **hello_final.py**. Because the output was redirected, you won’t see it in the terminal anymore.

`cat` can add line numbers to its output. This is especially useful when viewing source code. Use the `-n` option to add line numbers:

```bash
cat -n hello_final.py
```

::: info
The **`nl`** (*number lines*) command provides more control over line numbering. You’ll learn about this command in [Exercise ??]().
:::

### Viewing large files

`cat` only works well for viewing small files. Large files can overflow your terminal, and not all terminals support scrolling. Fortunately, Linux includes a **pager** that lets you view text one page at a time. It even supports navigation and search.

Use the **`less`** command to view a large document:

```bash
less shakespeare/romeo-and-juliet.txt
```

Try out the following features:

- Use the `↑`, `↓`, `Space`, and `Enter` keys to scroll vertically in the document.
- Use the `←` and `→` keys to scroll horizontally in the document.
- Type `h` to view the built-in help.
- Type `q` to quit.
- Type `g` to jump to the start of the document, or `G` to jump to the end.
- Type `32g` to jump to the thirty-second line.
- Type `/Juliet` to search for the text “Juliet”. Type `n` or `N` to jump between the results.

Finally, type `q` to quit `less`, then run it again with multiple files as arguments:

```bash
less shakespeare/*
```

Type `:n` (*next*) or `:p` (*previous*) to jump between the files.

::: info
`less` replaces an older pager named **`more`**, which only supported forward scrolling. `more` would display a single page of text, then prompt the user to display more. `less` is much more advanced. Its name is a play on words, inspired by the phrase “less is more”.
:::

### Partial viewing

If you’re only interested in part of a large file, you can use the **`head`** or **`tail`** commands to view the beginning or the end of a file, respectively.

Use the `head` command to view the first ten lines of a file:

```bash
head dictionary.txt
```

Use the `tail` command to view the last ten lines:

```bash
tail dictionary.txt
```

Use the `-n` option to view a different number of lines:

```bash
head -n 5 dictionary.txt
tail -n 5 dictionary.txt
```

`head` also accepts a negative number of lines:

```bash
head -n -5 dictionary.txt
```

This will display the entire file, starting from the top, but excluding the last five lines.

`tail` has a similar feature that accepts a signed positive number:

```bash
tail -n +5 dictionary.txt
```

This will display the entire file, starting at line five.

::: info
If you find these signed numbers confusing, remember that `head` always shows the start of the file, and `tail` always shows the end.
:::

Finally, you can use `tail` to track live updates to a file. To see this in action, first run the **generate-log.py** script from the **scripts** directory:

```bash
python3 ../scripts/generate-log.py
```

While this script runs, it adds messages to a file named **log.txt**. Open a new tab in your terminal and run `tail` with the `-f` (*follow*) option to track this file:

```bash
tail -f log.txt
```

`tail` will display the last ten lines of the file and show any new lines as they get added to the end of the file. When you’re done, press `Ctrl+C` in both tabs to quit both `tail` and the script.

## Text statistics

The **`wc`** (*word count*) command prints the number of lines, words, and characters in a file:

```bash
wc shakespeare/romeo-and-juliet.txt
```

`wc` accepts multiple files as arguments, in which case it displays a table with the counts per file:

```bash
wc shakespeare/*
```

If you’re only interested in some of these statistics, use the `-l` (*lines*), `-w` (*words*), or `-c` (*characters*) options to show only the number of lines, words, or characters, respectively:

```bash
wc -l shakespeare/*
wc -w shakespeare/*
wc -c shakespeare/*
```

Finally, use the `-m` (*multibyte*) option for files that contain complex Unicode characters, such as emoji:

```bash
wc -m emoji.txt
```

These characters can take up multiple bytes each. The `-m` option handles them correctly, whereas `-c` simply counts the number of bytes:

```bash
wc -c emoji.txt
```

## Text processing

Linux includes many commands that process text. This lab introduces the most common ones, and you’ll explore a few more in the exercises. Expert tools such as **`sed`** and **`awk`** are too advanced for this course, but worth learning at a later stage in your career.

### Transforming characters

The **`tr`** (*translate*) command performs a character-by-character transformation. The following example replaces each lowercase character with the corresponding uppercase one:

```bash
tr 'a-z' 'A-Z'
```

As you can see, `tr` takes two characters, or ranges of characters, as arguments. It then replaces each character from the first range with the corresponding character from the second range.

::: info
Always add quotes around arguments that may contain special characters. Without these quotes, Bash will act upon certain characters, such as replacing `*` with any matching filenames from the current directory.
:::

What the example didn’t show is how `tr` gets its input. Unlike most commands you’ve used so far, `tr` doesn’t accept files as arguments. By default, it reads input from the terminal.

When you run the example above, nothing appears to happen. This is because `tr` is waiting for input. Enter a line of text and press `Enter` to send it to `tr`, which will transform it to uppercase and print the result. Send a few more lines of input, then type `Ctrl+D` to stop. This tells the program reading from the terminal that no more input is available.

This interactive way of using `tr` isn’t very useful. In most cases, you’ll use `tr` to transform text that comes from a file, or from a different command.

To read text from a file, use an **input redirect** (**`<`**):

```bash
tr 'a-z' 'A-Z' < fruits.txt
```

This redirect attaches the input of `tr` to **fruits.txt** instead of the terminal. 

`tr` has many more features for you to explore. You’ll learn about them in the exercises.

### Sorting lines

The **`sort`** command sorts the lines of a file in ascending alphabetical order. Run the following command to try it out:

```bash
sort fruits.txt
```

Use the `-r` option to reverse the sort order:

```bash
sort -r fruits.txt
```

After it has sorted the lines, `sort` can easily detect and remove duplicates. Use the `-u` (*unique*) option to remove duplicate lines:

```bash
sort -u fruits.txt
```

However, this doesn’t remove duplicates that differ in case only, such as “apple” and “Apple”. To remove these, add the `-f` option to perform a case-insensitive comparison:

```bash
sort -uf fruits.txt
```

These are just some of the basic use cases of `sort`. The command also has advanced options that support **structured text files**. This is the topic of the next section.

### Structured text

Linux stores most of its configuration as structured text, making it both easy to read by the user and easy to parse by the operating system.

For example, user accounts and user groups are stored in **/etc/passwd** and **/etc/group**, respectively. Use `head` or `tail` to view a few lines of each file:

```bash
head -n 5 /etc/passwd
head -n 5 /etc/group
```

As you can see, both files contain tabular data, where each line contains fields separated by colons (`:`). This format is similar to **CSV** (*comma-separated values*), a structured text format you may be familiar with. Because this format is so widely used on Linux, many commands support it natively.

::: info
You’ll learn more about **/etc/passwd** and **/etc/group** in [Users and Permissions](users-and-permissions).
:::

The lab materials include a CSV file you’ll use throughout this lab. Familiarize yourself with its contents:

```bash
less grades.csv
```

The file contains multiple lines with fields separated by semicolons:

```
Student;Group;Grade
Liam O'Connor;1A;16
Sofia Rossi;1B;14
Noah Jensen;1C;18
Mila Novak;1D;10
...
```

The first line is a header that labels the fields as “Student”, “Group”, and “Grade”. All other lines contain a value for each of these fields.

### Sorting structured text

To sort a structured file, you use the `-t` option to specify the **field delimiter**, and the `-k` option to specify a **sort key**. For example, here’s how to sort **grades.csv** by the second field, “Group”:

```bash
sort -t ';' -k2 grades.csv
```

::: info
Remember to always add quotes around arguments that may contain special characters. In this case, the quotes are required because `;` is a special character for Bash.
:::

Next, try to sort by the third field, “Grade”:

```bash
sort -t ';' -k3 grades.csv
```

You’ll notice the output is only partially sorted. For example, 10 is sorted before 11, as expected, but 20 is sorted before 5. This is because `sort` performs a *lexicographical* sort by default. To perform a numeric sort instead, specify the `-n` option or add the `n` modifier to the sort key: 

```bash
sort -t ';' -k3n grades.csv
```

Sort keys may have multiple modifiers. For example, you can add the `r` modifier to reverse the sort order and sort by grade descending:

```bash
sort -t ';' -k3nr grades.csv
```

Next, suppose you want to sort by group, then by grade descending within each group. This is possible by specifying multiple sort keys, but this feature is tricky to get right.

Try the following (incorrect) command:

```bash
sort -t ';' -k2 -k3nr grades.csv
```

You’ll notice the first key seems to work correctly, but the second one doesn’t. This is because `-k2` doesn’t actually mean “sort by the second field”. `sort` interprets this key as “start sorting from the second field onwards, up to the end of the line”. This key therefore already includes the third field, rendering the second key (and its modifiers) useless. The end result is that the third field is also sorted lexicographically, not numerically.

To get the desired behavior, specify the first key as a **range**:

```bash
sort -t ';' -k2,2 -k3nr grades.csv
```

The key `-k2,2` starts at the second field, and stops at the second field. Thus, it only sorts by group. This leaves the second key as a tie breaker to sort by grade within each group.

### Extracting fields

Once you’re familiar with `sort`, the other commands that operate on structured text are easy to learn. For example, the **`cut`** command extracts fields from a structured file.

`cut` works similarly to `sort` but uses `-d` to specify the field delimiter, and `-f` to specify the fields to extract:

```bash
cut -d ';' -f1 grades.csv
```

This command extracts the first field (“Student”) from **grades.csv**. Its output is a list of students, including the header row:

```
Student
Liam O'Connor
Sofia Rossi
Noah Jensen
Mila Novak
...
```

You can extract multiple fields by specifying them as a comma-separated list. Here’s how you extract the first and third fields:

```bash
cut -d ';' -f1,3 grades.csv
```

When you extract multiple fields, `cut` will output structured text that uses the original delimiter:

```
Student;Grade
Liam O'Connor;16
Sofia Rossi;14
Noah Jensen;18
Mila Novak;10
...
```

You can specify a different delimiter with the `--output-delimiter` option. The following example replaces the semicolons with commas:

```bash
cut -d ';' -f1-3 --output-delimiter=',' grades.csv
```

This example also shows that you can specify a range of fields using a hyphen (`-`). In this case, all three fields are included in the output.

### Interactive editing

So far, you’ve only used commands to edit text files. In many cases, you may find it easier to edit a file *interactively*. Ubuntu includes **`nano`** as a simple text editor that you can use from the command line.

Launch `nano` by specifying one or more files as arguments:

```bash
nano recipe.txt
```

`nano` displays its most commonly used shortcuts at the bottom of the screen. Press `Ctrl+G` to open the built-in help and look up how to perform the following tasks:

- Navigate around the document
- Perform a search and jump between the results
- Copy and paste text
- Insert the output of a command
- Save your changes
- Exit `nano`

Try out these features as you follow the instructions in **recipe.txt**.

::: info
`nano` uses an internal buffer for its cut, copy, and paste commands. To copy or paste text between apps, press `Shift+Ctrl+C` or `Shift+Ctrl+V` in your terminal.
:::

`nano` makes it easy to quickly edit a document in your terminal. For more advanced use cases, such as programming, most distributions also include **`vi`**, or its improved version, **`vim`**. However, `vi` has a very steep learning curve and is not recommended for new users.

## Searching for text

In the previous lab, you used the `find` command to search for files and directories. In this lab, you’ll use the **`grep`** command to search *inside* files. 

`grep` takes a search pattern and one or more files as arguments:

```bash
grep '20' grades.csv
```

This command searches for the text “20” in **grades.csv**. The search pattern is quoted so that Bash will not attempt to interpret any special characters it may contain.

`grep` prints all lines that contain a match for the search pattern:

```
Benjamin Clark;1E;20
Petra Varga;1F;20
Patrick Walsh;1A;20
Andreas Georgiou;1C;20
Ruben Delgado;1E;20
```

If you’d rather see the lines that *don’t* contain a match, use the `-v` (*inverse*) option:

```bash
grep -v '1A' grades.csv
```

This example prints all grades, except those for group 1A.

If you’re only interested in the number of matching lines, not the lines themselves, use the `-c` (*count*) option:

```bash
grep -c '1A' grades.csv
```

This prints the number of grades for group 1A.

When searching multiple files, `grep` prints the filename before each matching line. Try the following command:

```bash
grep 'To be, or not to be' shakespeare/*
```

If you’re only interested in these filenames, use the `-l` (*list*) option to list the files (not the lines) that contain a match:

```bash
grep -l 'To be, or not to be' shakespeare/*
```

Note that, by default, `grep` will not search directories. Use the `-r` (*recursive*) option to search directories:

```bash
grep -r 'To be, or not to be' .
```

This searches the current directory, including any subdirectories, for the given text.

One downside of using `grep` is that, while it prints all matching lines, it doesn’t tell you where it found those lines in the original text. Fortunately, `grep` does remember this information, and you can use the `-n` option to add line numbers to the output:

```bash
grep -n '20' grades.csv
```

If you want even more information, `grep` can also show some of the surrounding text around each matching line. Use the `-C` (*context*) option and specify a number of lines:

```bash
grep -C 3 'To be, or not to be' shakespeare/hamlet.txt
```

`grep` will print this many lines of context before and after each matching line.

::: info
Use `-B` (*before*) or `-A` (*after*) instead to only show context before or after each matching line.
:::

Finally, keep in mind that capitalization matters when searching text. The following search will not yield any matches:

```bash
grep -C 3 'to be, or not to be' shakespeare/hamlet.txt
```

You can make your search less strict by adding the `-i` option to perform a case-insensitive search:

```bash
grep -i -C 3 'to be, or not to be' shakespeare/hamlet.txt
```

This finds the text you’re searching for, even though the capitalization is different.

As you can see, `grep` is a powerful command. It can even perform much more complicated searches, thanks to its support for **regular expressions**. However, regular expressions are quite complex and out of scope for this course. They deserve a lab of their own and will be covered in a future course.

::: info
The name “grep” refers to the `g/re/p` command from an old Unix text editor. This command performed a global search (`g`) for a regular expression (`re`) and printed the results (`p`). Because the command was so powerful, it was eventually extracted into a standalone program: `grep`.
:::

## Piping input and output

You’ve learned quite a lot of commands already, some of them quite advanced. However, the real power of Linux comes not only from its commands, but from its ability to *combine* these commands.

Earlier in this lab, you learned that `head` prints the first lines of a file, whereas `tail` prints the last. But what if you want to print some lines from the middle of a file, say lines 11 to 20?

You could use `head` to print the first 20 lines of the file, save this output to a temporary file, then print the last 10 lines of that file:

```bash
head -n 20 fruits.txt > temp
tail -n 10 temp
rm temp
```

This is quite cumbersome. Fortunately, Bash includes a **pipe operator** (`|`) that makes this easy. The pipe operator combines two commands by connecting the output of the first command to the input of the second:

```bash
head -n 20 fruits.txt | tail -n 10
```

Note how `tail` doesn’t specify an input file; the output of `head` is the input for `tail`. This technique, known as **piping**, is an essential skill for Linux users. Most Linux commands take text as input and produce text as output, making them easy to combine.

To extend the example a bit more, suppose you want to sort the list of fruits first, then print lines 11 to 20 of this sorted list. You can achieve this by adding `sort` as the first command:

```bash
sort fruits.txt | head -n 20 | tail -n 10
```

Next, suppose you want to show the original line number of each fruit before it was sorted. You can use `cat -n` to add line numbers *before* the sorting step:

```bash
cat -n fruits.txt | sort -k2 | head -n 20 | tail -n 10
```

This will add an additional field (the line numbers) to the text, so you now have to sort by the second field (the fruit).

::: info
This `sort` command doesn’t specify a delimiter. In the absence of a delimiter, `sort` will consider any amount of whitespace to be a delimiter.
:::

Finally, suppose you only want to print lowercase characters. This is an easy task for `tr`:

```bash
cat -n fruits.txt | sort -k2 | head -n 20 | tail -n 10 | tr 'A-Z' 'a-z'
```

This extended example demonstrates the power of the command line. Linux includes many small commands that have a clear and single purpose, and by combining them, you can perform some pretty complicated tasks.

## Literal text

All examples so far have read text from a file. In some cases, you may want to start from a literal piece of text instead, without having to save it to a file first. This is where the **`echo`** command is useful. This command simply prints the text you give it:

```bash
echo 'Hello, world!'
```

You can then pipe the output of `echo` to a different command. For example:

```bash
echo 'Hello, world!' | wc -c
```

This command counts the number of characters in the text “Hello, world!”.

::: info
The output of the previous command will be one higher than expected. This is because `echo` prints a newline character (`\n`) after its output, which counts as an additional character.
:::

## Getting help

The commands you’re learning about in these labs were developed long ago, before the age of the internet, search engines, or AI assistants. The name of each command usually reflects its purpose, but is often abbreviated to fit on the tiny screens of the day. Letter options are even harder to remember. They can be unrelated to the function they perform, and differ from command to command.

For these reasons, every Linux command ships with a manual that explains what the command does and which options it supports. These manuals are known as **man pages** (*manual pages*), named after the command you use to access them:

```bash
man ls
```

This command shows the man page for `ls`.

Man pages are written in an archaic format known as **troff**. `man` renders this format and passes the formatted output on to `less` for paging. That’s why you can use the familiar `less` commands — such as slash (`/`) to search — when viewing man pages.

When you don’t know the name of a command you’re looking for, use the `-k` option to perform a keyword search. For example, search for “password” to find the command to change your password:

```bash
man -k password
```

That command is **`passwd`**, which you’ll learn about in [Users and Permissions](users-and-permissions).

You may have noticed that `passwd` is listed multiple times:

```
passwd (1)           - change user password
passwd (5)           - the password file
```

The number in parentheses refers to the **section** of each man page. These sections are:

Section | Description
------- | -----------
1 | Executable programs or shell commands
5 | File formats and conventions, e.g. /etc/passwd

You can find a full list of sections in the man page for `man` itself:

```bash
man man
```

You can specify a section to disambiguate between man pages with the same name. For example, use the following command to learn more about the file **/etc/passwd**:

```bash
man 5 passwd
```

Without this explicit section 5, you would see the man page for the command `passwd` from section 1 instead.

Even in this day and age, man pages are still useful: They provide complete reference manuals, they’re always available, even offline, and they don’t require power- and water-hungry data centers to process your online search or AI prompt. Make a habit of always checking the man page first, before you search for information elsewhere.

Most traditional Linux commands have man pages. However, commands built into the shell, newer commands, or commands you install yourself, may not have them. In those cases, try using the `--help` option:

```bash
firefox --help
```

This option prints a quick summary of how to use the command. You can pipe it into less to make it easier to navigate and search:

```bash
firefox --help | less
```

The `--help` option isn’t standardized, but many commands support it.

## Up next

Congratulations on making it through the longest lab of this course! The length of this lab really shows the importance of working with text on Linux.

Even though you’ve learned quite a lot of commands already, there are plenty more to discover during the exercises. Take your time with these exercises; spread them out over multiple days if needed. When you’re done, proceed to the next lab, which focuses less on learning commands, and more on using the shell itself.
