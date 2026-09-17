import{_ as t,o as s,c as a,a0 as r}from"./chunks/framework.1R7PBCUH.js";const c=JSON.parse('{"title":"Exercises 2","description":"","frontmatter":{},"headers":[],"relativePath":"exercises/exercises2.md","filePath":"exercises/exercises2.md"}'),n={name:"exercises/exercises2.md"};function o(i,e,l,u,d,p){return s(),a("div",null,[...e[0]||(e[0]=[r(`<h1 id="exercises-2" tabindex="-1">Exercises 2 <a class="header-anchor" href="#exercises-2" aria-label="Permalink to &quot;Exercises 2&quot;">​</a></h1><p>In these exercises, you’ll practice the commands you learned in the previous labs and learn a few new ones along the way.</p><p>All the commands you need are either covered in the labs or introduced here. However, you will need to use the man pages to discover new options and features on your own. Make a habit of consulting the relevant man pages before you start each exercise.</p><p>These exercises are designed to be solvable using only the information available in the labs, exercises, and man pages. Avoid seeking outside help. You won’t learn anything by having someone — or something — spoon-feed you a solution.</p><p>Some exercises may be challenging as they combine multiple options and commands. Solve these exercises step by step. Figure out the commands and options you need for each step, then try to combine them.</p><p>Unless otherwise indicated, start each exercise in the <strong>lab-materials</strong> directory.</p><h2 id="exercise-2-1" tabindex="-1">Exercise 2.1 <a class="header-anchor" href="#exercise-2-1" aria-label="Permalink to &quot;Exercise 2.1&quot;">​</a></h2><p>Look up what the options <code>S</code>, <code>r</code>, and <code>t</code> do for <code>ls</code>. Use these options to list the contents of the <strong>Downloads</strong> directory, sorted by size, from largest to smallest. Your output should include the size in a human-readable format.</p><details><summary>Example output</summary><pre>total 200K
-rw-rw-r-- 1 ubuntu ubuntu 195K Sep 18 12:47 lab-materials.zip
drwxrwxr-x 5 ubuntu ubuntu 4.0K Sep 19 15:21 lab-materials
</pre></details><details><summary>Solution</summary><pre>ls -lhS ~/Downloads
</pre></details><p>Now sort the contents by modification time, from oldest to newest. Your output should include the modification time.</p><details><summary>Example output</summary><pre>total 200
-rw-rw-r-- 1 ubuntu ubuntu 199571 Sep 18 12:47 lab-materials.zip
drwxrwxr-x 5 ubuntu ubuntu   4096 Sep 19 15:21 lab-materials
</pre></details><details><summary>Solution</summary><pre>ls -ltr ~/Downloads
</pre></details><h2 id="exercise-2-2" tabindex="-1">Exercise 2.2 <a class="header-anchor" href="#exercise-2-2" aria-label="Permalink to &quot;Exercise 2.2&quot;">​</a></h2><p>Assuming the <strong>lab-materials</strong> directory is in the <strong>Downloads</strong> directory, navigate to the <strong>Downloads</strong> directory and run the following command:</p><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">ls</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -lh</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> lab-materials</span></span></code></pre></div><p>What is the total size of the <strong>lab-materials</strong> directory?</p><details><summary>Answer</summary> The <strong>text</strong> and <strong>scripts</strong> directories take up 4KB each, and the total size of the <strong>lab-materials</strong> directory is listed as 8KB. </details><p>Now run the following command:</p><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">ls</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -lhd</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> lab-materials</span></span></code></pre></div><p>This command adds the <code>-d</code> option, which lists the directory itself, not its contents.</p><p>What size does this command report, and why do you think this is?</p><details><summary>Answer</summary> This command reports the size of the <strong>lab-materials</strong> directory as 4KB, not 8KB. It seems like every directory takes up 4KB, regardless of its contents. <p>The size you see here is the size of the directory itself — not its contents. On Linux, a directory is a file that acts like a table of contents. Its size is 4KB because that’s the minimum size of each file. Directories can grow larger than 4KB, but they’ll always grow in increments of 4KB.</p></details><h2 id="exercise-2-3" tabindex="-1">Exercise 2.3 <a class="header-anchor" href="#exercise-2-3" aria-label="Permalink to &quot;Exercise 2.3&quot;">​</a></h2><p>Use the <strong><code>du</code></strong> (<em>disk usage</em>) command to find the total size of the <strong>lab-materials</strong> directory.</p><details><summary>Example output</summary><pre>552K	.
</pre></details><details><summary>Solution</summary><pre>du -sh .
</pre></details><p><code>du</code> can also print the size of each subdirectory of <strong>lab-materials</strong>, not just the sum total. Print a sorted list of these directories, from largest to smallest.</p><div class="tip custom-block"><p class="custom-block-title">Tip</p><p><code>sort</code> knows how to sort human-readable sizes. Consult the man page to learn more.</p></div><details><summary>Example output</summary><pre>552K  .
524K  ./text
488K  ./text/shakespeare
24K   ./scripts
</pre></details><details><summary>Solution</summary><pre>du -h . | sort -hr
</pre></details><h2 id="nl" tabindex="-1">Exercise 2.4 <a class="header-anchor" href="#nl" aria-label="Permalink to &quot;Exercise 2.4 {#nl}&quot;">​</a></h2><p>The <strong><code>nl</code></strong> (<em>number lines</em>) command adds line numbers when printing a text file. Use this command to complete the following tasks.</p><p>Print the contents of <strong>generate-log.py</strong> with line numbers. The numbers should be right-justified, with no leading zeros. Empty lines should also be numbered.</p><details><summary>Expected output</summary><pre>     1	# Appends a random log message to log.txt every three seconds.
     2	from datetime import datetime
     3	import random
     4	import time
     5	
     6	messages = [
     7	    &quot;WARNING: Connection timeout&quot;,
     8	    &quot;WARNING: Disk space running low&quot;,
     9	    &quot;WARNING: Low memory available&quot;,
    10	    &quot;ERROR: Authentication failed&quot;,
    11	    &quot;ERROR: Database connection failed&quot;,
    12	    &quot;ERROR: Failed to open configuration file&quot;,
    13	    &quot;ERROR: Network unreachable&quot;,
    14	]
    15	print(&quot;Running...\\nPress Ctrl+C to stop.&quot;)
    16	try:
    17	    while True:
    18	        timestamp = datetime.now().strftime(&quot;%Y-%m-%d %H:%M:%S&quot;)
    19	        message = random.choice(messages)
    20	        with open(&quot;log.txt&quot;, &quot;a&quot;, encoding=&quot;utf-8&quot;) as log:
    21	            log.write(f&quot;[{timestamp}] {message}\\n&quot;)
    22	        time.sleep(3)
    23	except KeyboardInterrupt:
    24	    print(&quot;\\nStopped.&quot;)
</pre></details><details><summary>Solution</summary><pre>nl -n rn -b a scripts/generate-log.py
</pre></details><p>Print the contents of <strong>dictionary.txt</strong> with line numbers. The numbers should be right-justified with leading zeros and have a fixed width of three digits.</p><details><summary>Expected output (first ten lines)</summary><pre>001	abstraction
002	access
003	accessibility
004	accessor
005	accumulator
006	adapter
007	address
008	addressing
009	administrator
010	adversarial
</pre></details><details><summary>Solution</summary><pre>nl -n rz -w 3 text/dictionary.txt
</pre></details><p>Save the output of the previous command as <strong>dictionary_numbered.txt</strong> in the <strong>text</strong> directory.</p><details><summary>Solution</summary><pre>nl -n rz -w 3 text/dictionary.txt &gt; text/dictionary_numbered.txt
</pre></details><p>Create a new directory named <strong>output</strong> and move the file you created in the previous command to this directory.</p><details><summary>Solution</summary><pre>mkdir output
mv text/dictionary_numbered.txt output
</pre></details><h2 id="exercise-2-5" tabindex="-1">Exercise 2.5 <a class="header-anchor" href="#exercise-2-5" aria-label="Permalink to &quot;Exercise 2.5&quot;">​</a></h2><p>Open <strong>dictionary_numbered.txt</strong> and jump directly to line 510. Which word is on that line?</p><details><summary>Solution</summary> Open <strong>dictionary_numbered.txt</strong> with <code>less</code>, then type <code>510g</code>. The word on that line is “shell”. </details><p>On which line is the word “terminal”?</p><details><summary>Solution</summary> Type <code>/terminal</code> to search for the word “terminal”. You’ll find it on line 549. </details><h2 id="tr" tabindex="-1">Exercise 2.6 <a class="header-anchor" href="#tr" aria-label="Permalink to &quot;Exercise 2.6 {#tr}&quot;">​</a></h2><p>This exercise explores the features of <code>tr</code>. The options you’ll need are explained in the man page. In addition to these options, you also need to learn about <strong>special characters</strong> and <strong>character classes</strong>.</p><p>Special characters start with an <strong>escape character</strong>, in this case a backslash (<code>\\</code>). An escape character turns a regular character into a special character by “escaping” the normal meaning of the character that follows it. Special characters include <code>\\n</code> for a newline, <code>\\t</code> for a horizontal tab, and <code>\\\\</code> for a regular backslash.</p><p>The following example uses a special character to replace all tabs with spaces:</p><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">tr</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &#39;\\t&#39;</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &#39; &#39;</span></span></code></pre></div><p>Character classes are predefined sets of characters. The following table lists some of them:</p><table tabindex="0"><thead><tr><th>Class</th><th>Characters</th></tr></thead><tbody><tr><td><code>[:alpha:]</code></td><td>Letters</td></tr><tr><td><code>[:lower:]</code></td><td>Lowercase letters</td></tr><tr><td><code>[:upper:]</code></td><td>Uppercase letters</td></tr><tr><td><code>[:digit:]</code></td><td>Digits</td></tr><tr><td><code>[:alnum:]</code></td><td>Letters and digits</td></tr><tr><td><code>[:punct:]</code></td><td>Punctuation</td></tr><tr><td><code>[:blank:]</code></td><td>Horizontal whitespace (spaces and tabs)</td></tr><tr><td><code>[:space:]</code></td><td>Horizontal and vertical whitespace (spaces, tabs, and newlines)</td></tr></tbody></table><p>The following example uses character classes to replace all uppercase letters with lowercase ones:</p><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">tr</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &#39;[:upper:]&#39;</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &#39;[:lower:]&#39;</span></span></code></pre></div><p>Armed with this knowledge, and the options explained in the man page, use <code>tr</code> to perform the following tasks.</p><p>Replace all spaces with underscores in the filename “my long story.txt”.</p><div class="tip custom-block"><p class="custom-block-title">Tip</p><p>Use <code>echo</code> to print this name.</p></div><details><summary>Expected output</summary><pre>my_long_story.txt
</pre></details><details><summary>Solution</summary><pre>echo &#39;my long story.txt&#39; | tr &#39; &#39; &#39;_&#39;
</pre></details><p>Remove all excess spaces from the sentence “This  sentence     has  too    many spaces”.</p><details><summary>Expected output</summary><pre>This sentence has too many spaces
</pre></details><details><summary>Solution</summary><pre>echo &#39;This  sentence     has  too    many spaces&#39; | tr -s &#39; &#39;
</pre></details><p>Print all words from <strong>dictionary.txt</strong> on a single line.</p><details><summary>Expected output (first five words)</summary><pre>abstraction access accessibility accessor accumulator
</pre></details><details><summary>Solution</summary><pre>tr &#39;\\n&#39; &#39; &#39; &lt; text/dictionary.txt
</pre></details><p>Replace all non-alphanumeric characters in the text “apple,banana;orange” with newlines.</p><details><summary>Expected output</summary><pre>apple
banana
orange
</pre></details><details><summary>Solution</summary><pre>echo &#39;apple,banana;orange&#39; | tr -c &#39;[:alnum:]&#39; &#39;\\n&#39;
</pre></details><h2 id="exercise-2-7" tabindex="-1">Exercise 2.7 <a class="header-anchor" href="#exercise-2-7" aria-label="Permalink to &quot;Exercise 2.7&quot;">​</a></h2><p>In <a href="./../labs/working-with-text.html#sort">Working with Text</a>, you used <code>sort -u</code> to remove duplicate lines after sorting. The <strong>uniq</strong> (<em>unique lines</em>) command provides this functionality as a standalone command with additional features. <code>uniq</code> only works on sorted files and is intended to be used after <code>sort</code>.</p><p>Use <code>uniq</code> to perform the following tasks. For all of these tasks, uniqueness should be case-insensitive, meaning “apple” and “Apple” are duplicates.</p><p>Print the contents of <strong>fruits.txt</strong> without duplicates. Save your output as <strong>fruits_unique.txt</strong> in the <strong>output</strong> directory.</p><details><summary>Expected output (first ten lines)</summary><pre>ackee
apple
apricot
aronia
avocado
bael
banana
bilberry
blackberry
blackcurrant
</pre></details><details><summary>Solution</summary><pre>sort text/fruits.txt | uniq -i &gt; output/fruits_unique.txt
</pre></details><p>Print the fruits that have duplicates.</p><details><summary>Expected output</summary><pre>apple
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
</pre></details><details><summary>Solution</summary><pre>sort text/fruits.txt | uniq -id
</pre></details><p>Print the fruits that <em>don’t</em> have duplicates.</p><details><summary>Expected output (first ten lines)</summary><pre>ackee
apricot
aronia
avocado
bael
bilberry
blackberry
blackcurrant
Blueberry
boysenberry
</pre></details><details><summary>Solution</summary><pre>sort text/fruits.txt | uniq -iu
</pre></details><p>Count the number of fruits reported by the previous two commands. Then count the number of fruits in <strong>fruits_unique.txt</strong> and make sure these numbers add up.</p><details><summary>Expected output</summary><pre>15
71
86
</pre></details><details><summary>Solution</summary><pre>sort text/fruits.txt | uniq -id | wc -l
sort text/fruits.txt | uniq -iu | wc -l
cat output/fruits_unique.txt | wc -l
</pre></details><p>Create a table that shows how many times each fruit is present in <strong>fruits.txt</strong>. The table should be sorted by count, from high to low, then alphabetically by name.</p><details><summary>Expected output (first ten lines)</summary><pre>      3 apple
      3 banana
      3 grape
      2 dragonfruit
      2 fig
      2 guava
      2 kiwi
      2 lemon
      2 lime
      2 lychee
</pre></details><details><summary>Solution</summary><pre>sort text/fruits.txt | uniq -ic | sort -k1,1nr -k2
</pre></details><h2 id="exercise-2-8" tabindex="-1">Exercise 2.8 <a class="header-anchor" href="#exercise-2-8" aria-label="Permalink to &quot;Exercise 2.8&quot;">​</a></h2><p>Use the <strong><code>shuf</code></strong> (<em>shuffle</em>) command to perform the following tasks.</p><p>Shuffle the fruits in <strong>fruits_unique.txt</strong> so they’re back to random order.</p><details><summary>Example output (first ten lines)</summary><pre>bilberry
apricot
watermelon
Blueberry
tangerine
pomelo
blackberry
blackcurrant
rose apple
avocado
</pre></details><details><summary>Solution</summary><pre>shuf output/fruits_unique.txt
</pre></details><p>Pick three random fruits from <strong>fruits_unique.txt</strong>.</p><details><summary>Example output</summary><pre>banana
fig
huckleberry
</pre></details><details><summary>Solution</summary><pre>shuf -n 3 output/fruits_unique.txt
</pre></details><p>Pick a random number between 1 and 100.</p><details><summary>Example output</summary><pre>42
</pre></details><details><summary>Solution</summary><pre>shuf -n 1 -i 1-100
</pre></details><p>Pick a random word from “hearts”, “diamonds”, “spades”, and “clubs”.</p><details><summary>Example output</summary><pre>spades
</pre></details><details><summary>Solution</summary><pre>shuf -n 1 -e hearts diamonds spades clubs
</pre></details><h2 id="exercise-2-9" tabindex="-1">Exercise 2.9 <a class="header-anchor" href="#exercise-2-9" aria-label="Permalink to &quot;Exercise 2.9&quot;">​</a></h2><p>Sort <strong>grades.csv</strong> by grade, highest to lowest, then by group. Remove the header first so it doesn’t get sorted.</p><details><summary>Expected output (first ten lines)</summary><pre>Patrick Walsh;1A;20
Andreas Georgiou;1C;20
Benjamin Clark;1E;20
Ruben Delgado;1E;20
Petra Varga;1F;20
Niklas Hansen;1A;19
Eva Kruger;1B;19
Hanna Kowalska;1B;19
David Cohen;1C;19
Fatima Saleh;1D;19
</pre></details><details><summary>Solution</summary><pre>tail -n +2 text/grades.csv | sort -t &#39;;&#39; -k3nr -k2
</pre></details><h2 id="exercise-2-10" tabindex="-1">Exercise 2.10 <a class="header-anchor" href="#exercise-2-10" aria-label="Permalink to &quot;Exercise 2.10&quot;">​</a></h2><p>Perform the following tasks using <strong>grades.csv</strong>. You’ll have to combine quite a few commands to complete these tasks, so take it one step at a time.</p><p>Count how many students achieved a score of 8.</p><details><summary>Expected output</summary><pre>5
</pre></details><details><summary>Solution</summary><pre>grep -c &#39;;8&#39; text/grades.csv
</pre></details><p>Print the names of these students in alphabetical order, sorted by their last name.</p><details><summary>Expected output</summary><pre>Tereza Dvorak
Mason Green
Lucas Silva
Mina Stojanovic
Marta Zielinska
</pre></details><details><summary>Solution</summary><pre>grep &#39;;8&#39; text/grades.csv | cut -d &#39;;&#39; -f1 | sort -k2
</pre></details><p>List all scores achieved by students in group 1C. Your output should be a list of unique scores, sorted from highest to lowest.</p><details><summary>Expected output</summary><pre>20
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
</pre></details><details><summary>Solution</summary><pre>grep &#39;1C&#39; text/grades.csv | cut -d &#39;;&#39; -f3 | sort -nru
</pre></details><p>Print a numbered ranking of all students in group 1A, sorted from highest score to lowest. Don’t worry about resolving ties.</p><details><summary>Expected output</summary><pre>     1	Patrick Walsh
     2	Niklas Hansen
     3	Nathan White
     4	Erik Larsson
     5	Julian Fischer
     6	Christian Olsen
     7	Leo Muller
     8	Liam O&#39;Connor
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
</pre></details><details><summary>Solution</summary><pre>grep &#39;1A&#39; text/grades.csv | sort -t &#39;;&#39; -k3nr | cut -d &#39;;&#39; -f1 | nl
</pre></details><p>Print a table that shows how many students achieved each score. Sort the table from highest score to lowest. You don’t have to show scores that no student achieved.</p><details><summary>Expected output</summary><pre>      5 20
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
</pre></details><details><summary>Solution</summary><pre>tail -n +2 text/grades.csv | cut -d &#39;;&#39; -f3 | sort -nr | uniq -c
</pre></details><h2 id="exercise-2-11" tabindex="-1">Exercise 2.11 <a class="header-anchor" href="#exercise-2-11" aria-label="Permalink to &quot;Exercise 2.11&quot;">​</a></h2><p>In <a href="./../labs/working-with-text.html#cut">Working with Text</a>, you learned how <code>cut</code> extracts fields from a structured file. The <strong><code>paste</code></strong> command does the inverse: it merges lines from multiple files into a single structured file. In this exercise, you’ll use <code>paste</code> to assign each student a random fruit.</p><p>Perform the following steps.</p><p>Extract the students from <strong>grades.csv</strong> and store them in a file named <strong>temp_students</strong>.</p><details><summary>Expected output (first ten lines)</summary><pre>Liam O&#39;Connor
Sofia Rossi
Noah Jensen
Mila Novak
Ethan Miller
Emma Dubois
Lucas Silva
Hanna Kowalska
Mateo Garcia
Freya Andersen
</pre></details><details><summary>Solution</summary><pre>tail -n +2 text/grades.csv | cut -d &#39;;&#39; -f1 &gt; temp_students
</pre></details><p>Count the number of students in <strong>temp_students</strong>.</p><details><summary>Expected output</summary><pre>120 temp_students
</pre></details><details><summary>Solution</summary><pre>wc -l temp_students
</pre></details><p>Generate an equal number of random fruits from <strong>fruits_unique.txt</strong> and store them in a file named <strong>temp_fruits</strong>. Note that you have more students than fruits available, so you’ll have to allow duplicates in your list.</p><details><summary>Example output (first ten lines)</summary><pre>watermelon
surinam cherry
Blueberry
pear
papaya
persimmon
rose apple
tangerine
melon
feijoa
</pre></details><details><summary>Solution</summary><pre>shuf -r -n 120 output/fruits_unique.txt &gt; temp_fruits
</pre></details><p>Count the number of fruits in <strong>temp_fruits</strong>.</p><details><summary>Expected output</summary><pre>120 temp_fruits
</pre></details><details><summary>Solution</summary><pre>wc -l temp_fruits
</pre></details><p>Use <code>paste</code> to create a structured file where each line contains a student and a fruit, separated by a semicolon (<code>;</code>). Save your output as <strong>students_fruits.txt</strong> in the <strong>output</strong> directory.</p><details><summary>Example output (first ten lines)</summary><pre>Liam O&#39;Connor;watermelon
Sofia Rossi;surinam cherry
Noah Jensen;Blueberry
Mila Novak;pear
Ethan Miller;papaya
Emma Dubois;persimmon
Lucas Silva;rose apple
Hanna Kowalska;tangerine
Mateo Garcia;melon
Freya Andersen;feijoa
</pre></details><details><summary>Solution</summary><pre>paste -d &#39;;&#39; temp_students temp_fruits &gt; output/students_fruits.txt
</pre></details><p>Delete <strong>temp_students</strong> and <strong>temp_fruits</strong>.</p><details><summary>Solution</summary><pre>rm temp_*
</pre></details><h2 id="exercise-2-12" tabindex="-1">Exercise 2.12 <a class="header-anchor" href="#exercise-2-12" aria-label="Permalink to &quot;Exercise 2.12&quot;">​</a></h2><p>List the contents of the <strong>shakespeare</strong> directory but show only the files and their human-readable sizes. Sort the output by size, highest to lowest.</p><div class="tip custom-block"><p class="custom-block-title">Tip</p><p>Like <code>sort</code>, <code>cut</code> can also use any amount of whitespace as a delimiter. However, unlike <code>sort</code>, this is not its default behavior.</p></div><details><summary>Expected output</summary><pre>187K	text/shakespeare/hamlet.txt
166K	text/shakespeare/romeo-and-juliet.txt
125K	text/shakespeare/macbeth.txt
</pre></details><details><summary>Solution</summary><pre>ls -lh text/shakespeare/* | sort -k5hr | cut -w -f5,9
</pre></details>`,149)])])}const h=t(n,[["render",o]]);export{c as __pageData,h as default};
