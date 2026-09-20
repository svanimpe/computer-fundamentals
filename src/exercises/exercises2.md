# Exercises 2

In these exercises, you’ll practice the commands you learned in the previous labs and learn a few new ones along the way.

All the commands you need are either covered in the labs or introduced here. However, you will need to use the man pages to discover new options and features on your own. Make a habit of consulting the relevant man pages before you start each exercise.

These exercises are designed to be solvable using only the information available in the labs, exercises, and man pages. Avoid seeking outside help. You won’t learn anything by having someone — or something — spoon-feed you a solution.

Some exercises may be challenging as they combine multiple options and commands. Solve these exercises step by step. Figure out the commands and options you need for each step, then try to combine them.

Unless otherwise indicated, start each exercise in the **lab-materials** directory.

## Exercise 2.1

Look up what the options `S`, `r`, and `t` do for `ls`. Use these options to list the contents of the **Downloads** directory, sorted by size, from largest to smallest. Your output should include the size in a human-readable format.

<details>
<summary>Example output</summary>
<pre>
total 200K
-rw-rw-r-- 1 ubuntu ubuntu 195K Sep 18 12:47 lab-materials.zip
drwxrwxr-x 5 ubuntu ubuntu 4.0K Sep 19 15:21 lab-materials
</pre>
</details>

<details>
<summary>Solution</summary>
<pre>
ls -lhS ~/Downloads
</pre>
</details>

Now sort the contents by modification time, from oldest to newest. Your output should include the modification time.

<details>
<summary>Example output</summary>
<pre>
total 200
-rw-rw-r-- 1 ubuntu ubuntu 199571 Sep 18 12:47 lab-materials.zip
drwxrwxr-x 5 ubuntu ubuntu   4096 Sep 19 15:21 lab-materials
</pre>
</details>

<details>
<summary>Solution</summary>
<pre>
ls -ltr ~/Downloads
</pre>
</details>

## Exercise 2.2

Assuming the **lab-materials** directory is in the **Downloads** directory, navigate to the **Downloads** directory and run the following command:

```bash
ls -lh lab-materials
```

What is the total size of the **lab-materials** directory?

<details>
<summary>Answer</summary>
The <strong>text</strong> and <strong>scripts</strong> directories take up 4KB each, and the total size of the <strong>lab-materials</strong> directory is listed as 8KB.
</details>

Now run the following command:

```bash
ls -lhd lab-materials
```

This command adds the `-d` option, which lists the directory itself, not its contents.

What size does this command report, and why do you think this is?

<details>
<summary>Answer</summary>
This command reports the size of the <strong>lab-materials</strong> directory as 4KB, not 8KB. It seems like every directory takes up 4KB, regardless of its contents.

The size you see here is the size of the directory itself — not its contents. On Linux, a directory is a file that acts like a table of contents. Its size is 4KB because that’s the minimum size of each file. Directories can grow larger than 4KB, but they’ll always grow in increments of 4KB.
</details>

## Exercise 2.3

Use the **`du`** (*disk usage*) command to find the total size of the **lab-materials** directory.

<details>
<summary>Example output</summary>
<pre>
552K	.
</pre>
</details>

<details>
<summary>Solution</summary>
<pre>
du -sh .
</pre>
</details>

`du` can also print the size of each subdirectory of **lab-materials**, not just the sum total. Print a sorted list of these directories, from largest to smallest.

::: tip
`sort` knows how to sort human-readable sizes. Consult the man page to learn more.
:::

<details>
<summary>Example output</summary>
<pre>
552K  .
524K  ./text
488K  ./text/shakespeare
24K   ./scripts
</pre>
</details>

<details>
<summary>Solution</summary>
<pre>
du -h . | sort -hr
</pre>
</details>

## Exercise 2.4 {#nl}

The **`nl`** (*number lines*) command adds line numbers when printing a text file. Use this command to complete the following tasks.

Print the contents of **generate-log.py** with line numbers. The numbers should be right-justified, with no leading zeros. Empty lines should also be numbered.

<details>
<summary>Expected output</summary>
<pre>
     1	# Appends a random log message to log.txt every three seconds.
     2	from datetime import datetime
     3	import random
     4	import time
     5	
     6	messages = [
     7	    "WARNING: Connection timeout",
     8	    "WARNING: Disk space running low",
     9	    "WARNING: Low memory available",
    10	    "ERROR: Authentication failed",
    11	    "ERROR: Database connection failed",
    12	    "ERROR: Failed to open configuration file",
    13	    "ERROR: Network unreachable",
    14	]
    15	print("Running...\nPress Ctrl+C to stop.")
    16	try:
    17	    while True:
    18	        timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    19	        message = random.choice(messages)
    20	        with open("log.txt", "a", encoding="utf-8") as log:
    21	            log.write(f"[{timestamp}] {message}\n")
    22	        time.sleep(3)
    23	except KeyboardInterrupt:
    24	    print("\nStopped.")
</pre>
</details>

<details>
<summary>Solution</summary>
<pre>
nl -n rn -b a scripts/generate-log.py
</pre>
</details>

Print the contents of **dictionary.txt** with line numbers. The numbers should be right-justified with leading zeros and have a fixed width of three digits.

<details>
<summary>Expected output (first ten lines)</summary>
<pre>
001	abstraction
002	access
003	accessibility
004	accessor
005	accumulator
006	adapter
007	address
008	addressing
009	administrator
010	adversarial
</pre>
</details>

<details>
<summary>Solution</summary>
<pre>
nl -n rz -w 3 text/dictionary.txt
</pre>
</details>

Save the output of the previous command as **dictionary_numbered.txt** in the **text** directory.

<details>
<summary>Solution</summary>
<pre>
nl -n rz -w 3 text/dictionary.txt > text/dictionary_numbered.txt
</pre>
</details>

Create a new directory named **output** and move the file you created in the previous command to this directory.

<details>
<summary>Solution</summary>
<pre>
mkdir output
mv text/dictionary_numbered.txt output
</pre>
</details>

## Exercise 2.5

Open **dictionary_numbered.txt** and jump directly to line 510. Which word is on that line?

<details>
<summary>Solution</summary>
Open <strong>dictionary_numbered.txt</strong> with <code>less</code>, then type <code>510g</code>. The word on that line is “shell”.
</details>

On which line is the word “terminal”?

<details>
<summary>Solution</summary>
Type <code>/terminal</code> to search for the word “terminal”. You’ll find it on line 549.
</details>

## Exercise 2.6 {#tr}

This exercise explores the features of `tr`. The options you’ll need are explained in the man page. In addition to these options, you also need to learn about **special characters** and **character classes**.

Special characters start with an **escape character**, in this case a backslash (`\`). An escape character turns a regular character into a special character by “escaping” the normal meaning of the character that follows it. Special characters include `\n` for a newline, `\t` for a horizontal tab, and `\\` for a regular backslash.

The following example uses a special character to replace all tabs with spaces:

```bash
tr '\t' ' '
```

Character classes are predefined sets of characters. The following table lists some of them:

Class | Characters
----- | ----------
`[:alpha:]` | Letters
`[:lower:]` | Lowercase letters
`[:upper:]` | Uppercase letters
`[:digit:]` | Digits
`[:alnum:]` | Letters and digits
`[:punct:]` | Punctuation
`[:blank:]` | Horizontal whitespace (spaces and tabs)
`[:space:]` | Horizontal and vertical whitespace (spaces, tabs, and newlines)

The following example uses character classes to replace all uppercase letters with lowercase ones:

```bash
tr '[:upper:]' '[:lower:]'
```

Armed with this knowledge, and the options explained in the man page, use `tr` to perform the following tasks.

Replace all spaces with underscores in the filename “my long story.txt”.

::: tip
Use `echo` to print this name.
:::

<details>
<summary>Expected output</summary>
<pre>
my_long_story.txt
</pre>
</details>

<details>
<summary>Solution</summary>
<pre>
echo 'my long story.txt' | tr ' ' '_'
</pre>
</details>

Remove all excess spaces from the sentence “This&nbsp;&nbsp;sentence&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;has&nbsp;&nbsp;too&nbsp;&nbsp;&nbsp;&nbsp;many spaces”.

<details>
<summary>Expected output</summary>
<pre>
This sentence has too many spaces
</pre>
</details>

<details>
<summary>Solution</summary>
<pre>
echo 'This  sentence     has  too    many spaces' | tr -s ' '
</pre>
</details>

Print all words from **dictionary.txt** on a single line.

<details>
<summary>Expected output (first five words)</summary>
<pre>
abstraction access accessibility accessor accumulator
</pre>
</details>

<details>
<summary>Solution</summary>
<pre>
tr '\n' ' ' < text/dictionary.txt
</pre>
</details>

Replace all non-alphanumeric characters in the text “apple,banana;orange” with newlines.

<details>
<summary>Expected output</summary>
<pre>
apple
banana
orange
</pre>
</details>

<details>
<summary>Solution</summary>
<pre>
echo 'apple,banana;orange' | tr -c '[:alnum:]' '\n'
</pre>
</details>

## Exercise 2.7

In [Working with Text](../labs/working-with-text#sort), you used `sort -u` to remove duplicate lines after sorting. The **uniq** (*unique lines*) command provides this functionality as a standalone command with additional features. `uniq` only works on sorted files and is intended to be used after `sort`.

Use `uniq` to perform the following tasks. For all of these tasks, uniqueness should be case-insensitive, meaning “apple” and “Apple” are duplicates.

Print the contents of **fruits.txt** without duplicates. Save your output as **fruits_unique.txt** in the **output** directory.

<details>
<summary>Expected output (first ten lines)</summary>
<pre>
ackee
apple
apricot
aronia
avocado
bael
banana
bilberry
blackberry
blackcurrant
</pre>
</details>

<details>
<summary>Solution</summary>
<pre>
sort text/fruits.txt | uniq -i > output/fruits_unique.txt
</pre>
</details>

Print the fruits that have duplicates.

<details>
<summary>Expected output</summary>
<pre>
apple
banana
dragonfruit
fig
grape
guava
kiwi
lemon
lime
lychee
mango
orange
pear
plum
raspberry
</pre>
</details>

<details>
<summary>Solution</summary>
<pre>
sort text/fruits.txt | uniq -id
</pre>
</details>

Print the fruits that *don’t* have duplicates.

<details>
<summary>Expected output (first ten lines)</summary>
<pre>
ackee
apricot
aronia
avocado
bael
bilberry
blackberry
blackcurrant
Blueberry
boysenberry
</pre>
</details>

<details>
<summary>Solution</summary>
<pre>
sort text/fruits.txt | uniq -iu
</pre>
</details>

Count the number of fruits reported by the previous two commands. Then count the number of fruits in **fruits_unique.txt** and make sure these numbers add up.

<details>
<summary>Expected output</summary>
<pre>
15
71
86
</pre>
</details>

<details>
<summary>Solution</summary>
<pre>
sort text/fruits.txt | uniq -id | wc -l
sort text/fruits.txt | uniq -iu | wc -l
cat output/fruits_unique.txt | wc -l
</pre>
</details>

Create a table that shows how many times each fruit is present in **fruits.txt**. The table should be sorted by count, from high to low, then alphabetically by name.

<details>
<summary>Expected output (first ten lines)</summary>
<pre>
      3 apple
      3 banana
      3 grape
      2 dragonfruit
      2 fig
      2 guava
      2 kiwi
      2 lemon
      2 lime
      2 lychee
</pre>
</details>

<details>
<summary>Solution</summary>
<pre>
sort text/fruits.txt | uniq -ic | sort -k1,1nr -k2
</pre>
</details>

## Exercise 2.8

Use the **`shuf`** (*shuffle*) command to perform the following tasks.

Shuffle the fruits in **fruits_unique.txt** so they’re back to random order.

<details>
<summary>Example output (first ten lines)</summary>
<pre>
bilberry
apricot
watermelon
Blueberry
tangerine
pomelo
blackberry
blackcurrant
rose apple
avocado
</pre>
</details>

<details>
<summary>Solution</summary>
<pre>
shuf output/fruits_unique.txt
</pre>
</details>

Pick three random fruits from **fruits_unique.txt**.

<details>
<summary>Example output</summary>
<pre>
banana
fig
huckleberry
</pre>
</details>

<details>
<summary>Solution</summary>
<pre>
shuf -n 3 output/fruits_unique.txt
</pre>
</details>

Pick a random number between 1 and 100.

<details>
<summary>Example output</summary>
<pre>
42
</pre>
</details>

<details>
<summary>Solution</summary>
<pre>
shuf -n 1 -i 1-100
</pre>
</details>

Pick a random word from “hearts”, “diamonds”, “spades”, and “clubs”.

<details>
<summary>Example output</summary>
<pre>
spades
</pre>
</details>

<details>
<summary>Solution</summary>
<pre>
shuf -n 1 -e hearts diamonds spades clubs
</pre>
</details>

## Exercise 2.9

Sort **grades.csv** by grade, highest to lowest, then by group. Remove the header first so it doesn’t get sorted.

<details>
<summary>Expected output (first ten lines)</summary>
<pre>
Patrick Walsh;1A;20
Andreas Georgiou;1C;20
Benjamin Clark;1E;20
Ruben Delgado;1E;20
Petra Varga;1F;20
Niklas Hansen;1A;19
Eva Kruger;1B;19
Hanna Kowalska;1B;19
David Cohen;1C;19
Fatima Saleh;1D;19
</pre>
</details>

<details>
<summary>Solution</summary>
<pre>
tail -n +2 text/grades.csv | sort -t ';' -k3nr -k2
</pre>
</details>

## Exercise 2.10

Perform the following tasks using **grades.csv**. You’ll have to combine quite a few commands to complete these tasks, so take it one step at a time.

Count how many students achieved a score of 8.

<details>
<summary>Expected output</summary>
<pre>
5
</pre>
</details>

<details>
<summary>Solution</summary>
<pre>
grep -c ';8' text/grades.csv
</pre>
</details>

Print the names of these students in alphabetical order, sorted by their last name.

<details>
<summary>Expected output</summary>
<pre>
Tereza Dvorak
Mason Green
Lucas Silva
Mina Stojanovic
Marta Zielinska
</pre>
</details>

<details>
<summary>Solution</summary>
<pre>
grep ';8' text/grades.csv | cut -d ';' -f1 | sort -k2
</pre>
</details>

List all scores achieved by students in group 1C. Your output should be a list of unique scores, sorted from highest to lowest.

<details>
<summary>Expected output</summary>
<pre>
20
19
18
17
16
15
14
10
9
8
7
</pre>
</details>

<details>
<summary>Solution</summary>
<pre>
grep '1C' text/grades.csv | cut -d ';' -f3 | sort -nru
</pre>
</details>

Print a numbered ranking of all students in group 1A, sorted from highest score to lowest. Don’t worry about resolving ties.

<details>
<summary>Expected output</summary>
<pre>
     1	Patrick Walsh
     2	Niklas Hansen
     3	Nathan White
     4	Erik Larsson
     5	Julian Fischer
     6	Christian Olsen
     7	Leo Muller
     8	Liam O'Connor
     9	Sebastian Diaz
    10	Adrien Leroy
    11	Simon Eklund
    12	Hugo Almeida
    13	Jakob Schmidt
    14	Thomas Baker
    15	Victor Moreau
    16	Arthur King
    17	Lucas Silva
    18	Bruno Teixeira
    19	Finn Murphy
    20	Stefan Ionescu
</pre>
</details>

<details>
<summary>Solution</summary>
<pre>
grep '1A' text/grades.csv | sort -t ';' -k3nr | cut -d ';' -f1 | nl
</pre>
</details>

Print a table that shows how many students achieved each score. Sort the table from highest score to lowest. You don’t have to show scores that no student achieved.

<details>
<summary>Expected output</summary>
<pre>
      5 20
      6 19
      9 18
     11 17
     15 16
     11 15
     17 14
     13 13
      2 12
      7 11
      7 10
      4 9
      5 8
      3 7
      3 6
      2 5
</pre>
</details>

<details>
<summary>Solution</summary>
<pre>
tail -n +2 text/grades.csv | cut -d ';' -f3 | sort -nr | uniq -c
</pre>
</details>

## Exercise 2.11

In [Working with Text](../labs/working-with-text#cut), you learned how `cut` extracts fields from a structured file. The **`paste`** command does the inverse: it merges lines from multiple files into a single structured file. In this exercise, you’ll use `paste` to assign each student a random fruit.

Perform the following steps.

Extract the students from **grades.csv** and store them in a file named **temp_students**.

<details>
<summary>Expected output (first ten lines)</summary>
<pre>
Liam O'Connor
Sofia Rossi
Noah Jensen
Mila Novak
Ethan Miller
Emma Dubois
Lucas Silva
Hanna Kowalska
Mateo Garcia
Freya Andersen
</pre>
</details>

<details>
<summary>Solution</summary>
<pre>
tail -n +2 text/grades.csv | cut -d ';' -f1 > temp_students
</pre>
</details>

Count the number of students in **temp_students**.

<details>
<summary>Expected output</summary>
<pre>
120 temp_students
</pre>
</details>

<details>
<summary>Solution</summary>
<pre>
wc -l temp_students
</pre>
</details>

Generate an equal number of random fruits from **fruits_unique.txt** and store them in a file named **temp_fruits**. Note that you have more students than fruits available, so you’ll have to allow duplicates in your list.

<details>
<summary>Example output (first ten lines)</summary>
<pre>
watermelon
surinam cherry
Blueberry
pear
papaya
persimmon
rose apple
tangerine
melon
feijoa
</pre>
</details>

<details>
<summary>Solution</summary>
<pre>
shuf -r -n 120 output/fruits_unique.txt > temp_fruits
</pre>
</details>

Count the number of fruits in **temp_fruits**.

<details>
<summary>Expected output</summary>
<pre>
120 temp_fruits
</pre>
</details>

<details>
<summary>Solution</summary>
<pre>
wc -l temp_fruits
</pre>
</details>

Use `paste` to create a structured file where each line contains a student and a fruit, separated by a semicolon (`;`). Save your output as **students_fruits.txt** in the **output** directory.

<details>
<summary>Example output (first ten lines)</summary>
<pre>
Liam O'Connor;watermelon
Sofia Rossi;surinam cherry
Noah Jensen;Blueberry
Mila Novak;pear
Ethan Miller;papaya
Emma Dubois;persimmon
Lucas Silva;rose apple
Hanna Kowalska;tangerine
Mateo Garcia;melon
Freya Andersen;feijoa
</pre>
</details>

<details>
<summary>Solution</summary>
<pre>
paste -d ';' temp_students temp_fruits > output/students_fruits.txt
</pre>
</details>

Delete **temp_students** and **temp_fruits**.

<details>
<summary>Solution</summary>
<pre>
rm temp_*
</pre>
</details>

## Exercise 2.12

List the contents of the **shakespeare** directory but show only the files and their human-readable sizes. Sort the output by size, highest to lowest.

::: tip
Like `sort`, `cut` can also use any amount of whitespace as a delimiter. However, unlike `sort`, this is not its default behavior.
:::

<details>
<summary>Expected output</summary>
<pre>
187K	text/shakespeare/hamlet.txt
166K	text/shakespeare/romeo-and-juliet.txt
125K	text/shakespeare/macbeth.txt
</pre>
</details>

<details>
<summary>Solution</summary>
<pre>
ls -lh text/shakespeare/* | sort -k5hr | cut -w -f5,9
</pre>
</details>
