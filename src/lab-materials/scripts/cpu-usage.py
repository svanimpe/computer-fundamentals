# Uses about 50% of one CPU core.
import time

print("Running...\nPress Ctrl+C to stop.")
try:
    while True:
        start = time.perf_counter()
        # Busy-wait for 0.1s
        while (time.perf_counter() - start) < 0.1:
            pass
        # Sleep for 0.1s
        time.sleep(0.1)
except KeyboardInterrupt:
    print("\nStopped.")
