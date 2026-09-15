# Exercises 4


## Exercise 4.1 {#variable-with-quotes-needed}

<!-- 
Make localvar containing two strings
Use echo command to test it
 -->

 Make a (**local**) variable called greeting. It should contain the value `Hello World!`
 
 Use the **echo** command with the variable to print this "Hello World!" statement on your terminal.

## Exercise 4.2 {#variables-local-and-global}

<!-- 
Make local var
Export to global var
Check global var using env
Use echo command with global var

 -->

 Make a (**local**) variable called `firstname`. It should contain the value of your own first name.

 Turn this local variable into a global variable.

 Print the list of global variables on your system. Check that your variable firstname is present using the `env` and grep commands together first

 Print your first name on your terminal, and use this global variable to do so. The output should be something like "My first name is systemuser!"

## Exercise 4.3 {#quotes-using-backticks}

<!-- 
Make a command that prints the sentence "This is the value of the local variable X: VALUE"
Fill in VALUE using command substition backticks and "echo ${variable_X}"
 -->

 Find the command on your system that prints your current user (don't use variables).

 Use this command to print the following on your terminal: `I am currently logged in as [systemuser]` - where system user is the output of the command you found.

 Hint: you should use command substitution here!

## Exercise 4.4 {#quotes-print-a-backslash}

<!-- 
Print a backslash within a specific echo command
 -->

Print exactly the following on your terminal: `This is a backslash on the terminal: \`

## Exercise 4.5 {#globbing-echo-for-files}

<!-- 
Globbing pattern: all files that start with a specific letter (eg. D)
Use standard Linux filesystem on Ubuntu LTS to test (eg. echo D* in home directory)

 -->

Find all files in your home directory that start with the letter "D" and print them on your terminal.

## Exercise 4.6 {#globbing-specific-file-extension}

<!-- 
Globbing pattern: all files that have a file extension with 3 letters (*.???)
Find all files in the /etc folder that have a file extension with 3 letters
 -->

 Find all files in the /etc folder that have a file extension with 3 letters and print them on your terminal.

## Exercise 4.7 {#globbing-big-exercises}

<!-- Big globbing exercise in which the /etc/host* pattern is explored. Use globbing to define the following patterns with ls and echo:

    - Everything that matches begins with the string "host" in the /etc directory of the system. Try both echo and ls in this case! (ls /etc/host*)
    - Only files and directories that start with hostname in /etc/ (ls /etc/hostname*)
    - Only files and directories that start with hosts and have a file extension of four characters (echo /etc/hosts.????)
    - Only files and directories that start with hosts and have a file extension of **at least** three characters (echo /etc/hosts.???*)
    - Only files and directories that start with "hosts" or "hostn" (ls /etc/host[sn]*)
    - Only files and directories that DON'T start with "hosts" (ls /etc/host[!s]*)
    - 
 -->

Print the following on your terminal using **globbing** patterns:

    - Everything that matches begins with the string "host" in the /etc directory of the system. 
      - Try both echo and ls for this!
    - Only files and directories that start with hostname in /etc/
    - Only files and directories that start with hosts and have a file extension of four characters
    - Only files and directories that start with hosts and have a file extension of **at least** three characters 
    - Only files and directories that start with "hosts" or "hostn"
    - Only files and directories that DON'T start with "hosts"

## Exercise 4.8 {#brace-expansion-echo-easy}

<!-- 
Using brace expansion:
print the numbers 1-10 the screen
print the numbers 7-20 on the screen
print the letters f-k on the screen
 -->

Print the following on your terminal using brace expansion:
    - The numbers 1-10
    - The numbers 7-20
    - The letters f-k

## Exercise 4.9 {#brace-expansion-make-files-realistic}

<!-- 
Using brace expansion:
create the directories directory_number_1 through directory_number_3 (mkdir directory_number_{1..3})
 -->

 Create the following directories in your home folder using brace expansion:

    - directory_number_1
    - directory_number_2
    - directory_number_3

 Create the following directories in your home folder using brace expansion:
 
    - computer_fundamentals_1_folder
    - computer_fundamentals_2_folder
    - computer_fundamentals_3_folder

Hints: Test your brace expansion with the echo command first! You should use the preamble for this exercise.

## Exercise 4.10 {#alias-brace-expansion}

<!-- 
Make an alias called `alphabet` that:
    - Uses brace expansion 
    - Prints the entire alphabet letter by letter

(echo {a..z})
 -->

 Create an alias called `alphabet` that prints the entire alphabet letter by letter using brace expansion.

## Exercise 4.11 {#redirection-repetition}