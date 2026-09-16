# Allocates about 1MB of RAM every two seconds.
import time

memory = []
print("Running...\nPress Ctrl+C to stop.")
try:
    while True:
        memory.append(bytearray(1024 * 1024))
        time.sleep(2)
except KeyboardInterrupt:
    print("\nStopped.")
