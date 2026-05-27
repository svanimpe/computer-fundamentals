import threading

THREAD_COUNT = 50
INCREMENTS_PER_THREAD = 100

counter = 0
lock = threading.Lock()

def increment():
    global counter
    for _ in range(INCREMENTS_PER_THREAD):
        with lock:
            counter += 1

threads = [threading.Thread(target=increment) for _ in range(THREAD_COUNT)]
for t in threads:
    t.start()
for t in threads:
    t.join()

expected = THREAD_COUNT * INCREMENTS_PER_THREAD
print(f"Expected: {expected}")
print(f"Actual:   {counter}")
