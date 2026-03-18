# Process management

## Learning objectives

In this lab assignment you will learn:

- Query and interpret an overview of active processes
- View the hierarchical structure of processes
- Start processes in the foreground and background
- Look up a running process by name or PID
- Stop a process using a kill signal

## What is a process?

(uitleg over wat een process is, wat een PID is, hoe een proces opgebouwd is, etc.)

## Querying active processes

(intro tot het bekijken van actieve processen via ps, top, htop, btop)

```bash
ps -ef
top
```

(uitleg procestabel)

(overzichterlijkere weergave van actieve processen via htop)

```bash
sudo apt install htop

htop
```

(TODO: btop in exercise?)

## Booting the system

(uitleg bootproces, initramfs, systemd)
(schematische voorstelling van een process tree via mermaid)

```bash
ls -l /boot
```

(uitleg over de files in /boot)

## Process hierarchy

```bash
pstree
```

(uitleg over de boomstructuur: systemd als root, ouder-kind relatie zichtbaar maken, PID's tonen met -p vlag)

```bash
pstree -p
```

(vraag: wat is het PID van systemd en wat betekent dat?)

## Starting processes

(uitleg over het ontstaan van processen: fork, exec, wait)

(voorbeeld: script 1 — een script dat een child process aanmaakt via fork/exec en wacht via wait; toont PID en PPID van ouder en kind)

```bash
./script1.sh
```

(uitleg over het verschil tussen foreground en background processen)

(voorbeeld: script 1 starten op de voorgrond — terminal bevriest)

```bash
./script1.sh
```

(uitleg: terminal is geblokkeerd zolang het proces loopt, stoppen met Ctrl+C)

(voorbeeld: script 1 op de achtergrond starten met &)

```bash
./script1.sh &
```

(uitleg: jobnummer en PID worden getoond, terminal blijft beschikbaar)

## Looking up processes

(uitleg: hoe vind je een lopend proces terug via naam of PID)

```bash
pidof script1.sh
```

(uitleg: pidof geeft het PID terug van een proces op basis van zijn naam)

```bash
ps <pid>
```

(uitleg: details van één specifiek proces opvragen)

(vraag: zoek het PID van je eigen bash-sessie op)

## Inspecting /proc

(uitleg: /proc is een virtueel bestandssysteem dat de kernel realtime beschikbaar stelt; voor elk actief proces bestaat er een map /proc/PID)

```bash
ls /proc/<pid>
```

(uitleg: overzicht van de bestanden in de procesmap — elk bestand stelt een eigenschap van het proces voor)

```bash
cat /proc/<pid>/status
```

(uitleg: toont naam, PID, PPID, status, geheugengebruik en meer van het proces)

```bash
cat /proc/<pid>/cmdline
```

(uitleg: het exacte commando waarmee het proces gestart werd)

(vraag: open /proc/PID/status van script1. Welke velden herken je uit de uitvoer van ps?)

## Stopping processes

(uitleg over signalen: wat zijn het, hoe werken ze)

(tabel met de belangrijkste signalen: SIGTERM, SIGKILL, SIGSTOP, SIGCONT)

(voorbeeld: script 2 — een script dat een lange taak simuleert en SIGTERM opvangt; toont een bericht wanneer het signaal ontvangen wordt en sluit netjes af)

```bash
./script2.sh &
kill <pid>
```

(uitleg: script2 vangt SIGTERM op en sluit netjes af — studenten zien dit in de output)

(voorbeeld: script 2 starten en forceren te stoppen via SIGKILL — het script kan het signaal niet opvangen)

```bash
./script2.sh &
kill -9 <pid>
```

(uitleg: SIGKILL omzeilt de signaalafhandeling van het proces volledig — geen nette afsluiting mogelijk)

(vraag: wat is het verschil tussen kill en kill -9?)

## Process priorities

(uitleg over nice values: schaal van -20 tot +19, standaard 0)

(voorbeeld: script 3 — een CPU-intensief script dat continu rekent, zodat het effect van de nice-waarde zichtbaar is in htop)

```bash
./script3.sh &
ps -el | grep script3
```

(uitleg: NI-kolom toont de nice waarde, PR-kolom de effectieve prioriteit)

```bash
nice -n 10 ./script3.sh &
```

```bash
renice 5 -p <pid>
```

(uitleg: prioriteit aanpassen van een lopend proces; alleen root kan negatieve waarden instellen)

## Concurrency

(uitleg: wat is concurrency, waarom ontstaan race conditions bij gedeelde bronnen)

(voorbeeld: script 4 — een bash-script dat een teller leest uit een bestand, ophoogt en terugschrijft; meerdere instanties worden tegelijk op de achtergrond gestart; de eindwaarde is lager dan verwacht door de race condition)

```bash
# start N instanties tegelijk op de achtergrond
for i in $(seq 1 50); do ./script4.sh & done
wait
cat counter.txt
```

(uitleg: elke instantie leest dezelfde waarde voordat een andere heeft kunnen schrijven — de verhogingen gaan verloren)

(vraag: als 50 instanties elk de teller 1 keer ophogen, wat zou de verwachte eindwaarde zijn? Wat zie je in werkelijkheid? Waarom?)

(voorbeeld: script 5 — zelfde als script 4 maar gebruikt een lockfile als mutex; slechts één instantie tegelijk mag de teller lezen en schrijven)

```bash
for i in $(seq 1 50); do ./script5.sh & done
wait
cat counter.txt
```

(uitleg: de lockfile zorgt voor mutual exclusion — de eindwaarde is nu correct)

(vraag: wat is het nadeel van een lockfile als mutex? Wat kan er misgaan als een script crasht terwijl het de lock vasthoudt?)

## Threads

(uitleg: wat is een thread, verschil met een proces, gedeeld geheugen als voordeel én risico)

(voorbeeld: script 6 — een Python-script met twee threads die zonder locking een gedeelde variabele ophogen; toont de verkeerde eindwaarde; mirrors de race condition van script 4 maar nu binnen één proces)

```bash
python3 script6.py
```

(uitleg: threads delen hetzelfde geheugen, waardoor de race condition nog sneller optreedt dan bij processen)

(voorbeeld: script 7 — zelfde als script 6 maar gebruikt threading.Lock; eindwaarde is correct; mirrors script 5)

```bash
python3 script7.py
```

(uitleg: threading.Lock werkt als een mutex op geheugeniveau — efficiënter dan een lockfile maar zelfde principe)
(TODO: is mutex niet teveel out of scope?)

(voorbeeld: script 8 — een Python-script dat een tijdrovende taak eerst sequentieel uitvoert en daarna met threads; toont de uitvoertijd van beide aanpakken + illustratie dat er een limiet is aan de snelheidstoename door threads)

```bash
python3 script8.py
```

(uitleg: threads zijn nuttig wanneer taken onafhankelijk van elkaar zijn en kunnen overlappen, bv. bij I/O-wachttijden)
