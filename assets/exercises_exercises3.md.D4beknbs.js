import{_ as a,o as t,c as s,a0 as r}from"./chunks/framework.1R7PBCUH.js";const h=JSON.parse('{"title":"Exercises 3","description":"","frontmatter":{},"headers":[],"relativePath":"exercises/exercises3.md","filePath":"exercises/exercises3.md"}'),i={name:"exercises/exercises3.md"};function o(n,e,l,m,p,d){return t(),s("div",null,[...e[0]||(e[0]=[r(`<h1 id="exercises-3" tabindex="-1">Exercises 3 <a class="header-anchor" href="#exercises-3" aria-label="Permalink to &quot;Exercises 3&quot;">​</a></h1><div class="warning custom-block"><p class="custom-block-title">Warning</p><p>These exercises are still in draft. The text isn&#39;t polished yet and new exercises may be added in the future.</p></div><h2 id="exercise-3-1" tabindex="-1">Exercise 3.1 <a class="header-anchor" href="#exercise-3-1" aria-label="Permalink to &quot;Exercise 3.1&quot;">​</a></h2><p>Define a local variable named <code>FULL_NAME</code> that contains your full name.</p><details><summary>Solution</summary><pre>FULL_NAME=&quot;John Appleseed&quot;
</pre></details><p>Turn this local variable into a global one.</p><details><summary>Solution</summary><pre>export FULL_NAME
</pre></details><p>Verify that the variable is present in the list of global variables on your system.</p><details><summary>Solution</summary><pre>env | grep FULL_NAME
</pre></details><p>Use the variable to print the greeting “Hi, my name is (full name)”. Replace the placeholder with your full name.</p><details><summary>Example output</summary><pre>Hi, my name is John Appleseed
</pre></details><details><summary>Solution</summary><pre>echo Hi, my name is \${FULL_NAME}
</pre></details><p>Delete the variable <code>FULL_NAME</code>.</p><details><summary>Solution</summary><pre>unset FULL_NAME
</pre></details><p>Use the history to recall the command you used to verify that the variable was present in the list of global variables, then rerun this command to verify that the variable was deleted.</p><details><summary>Answer</summary> There are multiple ways to do this: <ul><li>Press the <code>Up</code> arrow key to scroll through your history until you find the correct command.</li><li>Press <code>Ctrl+R</code> to perform a reverse search and type <code>env</code> to recall the command.</li><li>Run <code>history</code> to look up the number for the command you need, then rerun it using <code>!number</code>.</li></ul></details><h2 id="exercise-3-2" tabindex="-1">Exercise 3.2 <a class="header-anchor" href="#exercise-3-2" aria-label="Permalink to &quot;Exercise 3.2&quot;">​</a></h2><p>Revisit <a href="./exercises1.html#commands">Exercise 1.5</a> and find the command that prints your username. Use this command to print the text “I&#39;m signed in as (username)”. Replace the placeholder with your username.</p><details><summary>Example output</summary><pre>I&#39;m signed in as jappleseed
</pre></details><details><summary>Solution</summary><pre>echo &quot;I&#39;m signed in as $(whoami)&quot;
</pre></details><p>Print the full <em>command</em> you used to print this text. This is trickier than it sounds, so experiment with different combinations of quotes and backslashes to find out what works.</p><details><summary>Example output</summary><pre>echo &quot;I&#39;m signed in as $(whoami)&quot;
</pre></details><details><summary>Solutions</summary><pre>echo &quot;echo \\&quot;I&#39;m signed in as \\$(whoami)\\&quot;&quot;
echo echo \\&quot;I\\&#39;m signed in as &#39;$(whoami)&#39;\\&quot;
echo echo \\&quot;I\\&#39;m signed in as \\$\\(whoami\\)\\&quot;
</pre></details><h2 id="exercise-3-3" tabindex="-1">Exercise 3.3 <a class="header-anchor" href="#exercise-3-3" aria-label="Permalink to &quot;Exercise 3.3&quot;">​</a></h2><p>Navigate to your home directory and print all file and directory names that start with the letter “D”.</p><details><summary>Example output</summary><pre>Desktop Documents Downloads
</pre></details><details><summary>Solution</summary><pre>echo D*
</pre></details><p>Use <code>find</code> to perform a recursive search of your home directory and find all directories that start with the letter “D”.</p><details><summary>Example output</summary><pre>./.config/Code/DawnGraphiteCache
./.config/Code/Dictionaries
./.config/Code/Service Worker/Database
./.config/Code/DawnWebGPUCache
./Desktop
./.cache/Microsoft/DeveloperTools
./Documents
./Downloads
</pre></details><details><summary>Solution</summary><pre>find . -type d -name &quot;D*&quot;
</pre></details><h2 id="exercise-3-4" tabindex="-1">Exercise 3.4 <a class="header-anchor" href="#exercise-3-4" aria-label="Permalink to &quot;Exercise 3.4&quot;">​</a></h2><p>Navigate to the <strong>/etc</strong> directory, then use globbing to perform the following tasks.</p><p>Print all filenames that start with the string “host”.</p><details><summary>Expected output</summary><pre>host.conf hostname hosts hosts.allow hosts.deny
</pre></details><details><summary>Solution</summary><pre>echo host*
</pre></details><p>Print all filenames that start with the string “host” and have a file extension of exactly four characters.</p><details><summary>Expected output</summary><pre>host.conf hosts.deny
</pre></details><details><summary>Solution</summary><pre>echo host*.????
</pre></details><p>Print all filenames that start with the string “host” and have a file extension of <em>at least</em> three characters.</p><details><summary>Expected output</summary><pre>host.conf hosts.allow hosts.deny
</pre></details><details><summary>Solution</summary><pre>echo host*.???*
</pre></details><p>Print all filenames that start with the string “hosts” or the string “hostn”.</p><details><summary>Expected output</summary><pre>hostname hosts hosts.allow hosts.deny
</pre></details><details><summary>Solution</summary><pre>echo host[sn]*
</pre></details><p>Print all filenames that start with the string “host” but not the string “hosts”.</p><details><summary>Expected output</summary><pre>host.conf hostname
</pre></details><details><summary>Solution</summary><pre>echo host[!s]*
</pre></details><h2 id="exercise-3-5" tabindex="-1">Exercise 3.5 <a class="header-anchor" href="#exercise-3-5" aria-label="Permalink to &quot;Exercise 3.5&quot;">​</a></h2><p>Navigate to your <strong>Documents</strong> directory, then use brace expansion to create the following directory hierarchy:</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>computer-fundamentals/</span></span>
<span class="line"><span>├── lab-1-materials</span></span>
<span class="line"><span>├── lab-2-materials</span></span>
<span class="line"><span>├── lab-3-materials</span></span>
<span class="line"><span>├── lab-4-materials</span></span>
<span class="line"><span>└── lab-5-materials</span></span></code></pre></div><p>You only need one command to create all of these directories! Test your expansion with <code>echo</code> first, before your attempt to create the directories.</p><details><summary>Solution</summary><pre>mkdir -p computer-fundamentals/lab-{1..5}-materials
</pre></details><p>Remove the directories you created with the previous command.</p><details><summary>Solution</summary><pre>rm -R computer-fundamentals
</pre></details><h2 id="exercise-3-6" tabindex="-1">Exercise 3.6 <a class="header-anchor" href="#exercise-3-6" aria-label="Permalink to &quot;Exercise 3.6&quot;">​</a></h2><p>Create an alias <code>alnum</code> that prints the letters a through z and the digits 0 through 9, all on one line.</p><details><summary>Expected output</summary><pre>a b c d e f g h i j k l m n o p q r s t u v w x y z 0 1 2 3 4 5 6 7 8 9
</pre></details><details><summary>Solution</summary><pre>alias alnum=&#39;echo {a..z} {0..9}&#39;
</pre></details><p>Delete this alias.</p><details><summary>Solution</summary><pre>unalias alnum
</pre></details>`,60)])])}const c=a(i,[["render",o]]);export{h as __pageData,c as default};
