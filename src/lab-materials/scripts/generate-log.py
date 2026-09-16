# Appends a random log message to log.txt every three seconds.
from datetime import datetime
import random
import time

messages = [
    "WARNING: Connection timeout",
    "WARNING: Disk space running low",
    "WARNING: Low memory available",
    "ERROR: Authentication failed",
    "ERROR: Database connection failed",
    "ERROR: Failed to open configuration file",
    "ERROR: Network unreachable",
]
print("Running...\nPress Ctrl+C to stop.")
try:
    while True:
        timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
        message = random.choice(messages)
        with open("log.txt", "a", encoding="utf-8") as log:
            log.write(f"[{timestamp}] {message}\n")
        time.sleep(3)
except KeyboardInterrupt:
    print("\nStopped.")
