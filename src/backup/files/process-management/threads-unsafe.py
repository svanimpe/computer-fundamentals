import threading
import time

THREAD_COUNT = 50
INCREMENTS_PER_THREAD = 100

counter = 0

def increment():
    global counter
    for _ in range(INCREMENTS_PER_THREAD):
        value = counter
        time.sleep(0)  # yield GIL so another thread can run before we write back
        counter = value + 1

threads = [threading.Thread(target=increment) for _ in range(THREAD_COUNT)]
for t in threads:
    t.start()
for t in threads:
    t.join()

expected = THREAD_COUNT * INCREMENTS_PER_THREAD
print(f"Expected: {expected}")
print(f"Actual:   {counter}")
print(f"Lost increments: {expected - counter}")
