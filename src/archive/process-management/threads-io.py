import threading
import time

REQUEST_COUNT = 10
REQUEST_DELAY = 0.5

def fetch(index):
    time.sleep(REQUEST_DELAY)
    print(f"  Request {index} done")

print(f"Simulating {REQUEST_COUNT} requests, each taking {REQUEST_DELAY}s\n")

print("Sequential:")
start = time.time()
for i in range(REQUEST_COUNT):
    fetch(i)
sequential_time = time.time() - start
print(f"Total: {sequential_time:.2f}s\n")

print("Threaded:")
start = time.time()
threads = [threading.Thread(target=fetch, args=(i,)) for i in range(REQUEST_COUNT)]
for t in threads:
    t.start()
for t in threads:
    t.join()
threaded_time = time.time() - start
print(f"Total: {threaded_time:.2f}s")
print(f"\nSpeedup: {sequential_time / threaded_time:.1f}x")
