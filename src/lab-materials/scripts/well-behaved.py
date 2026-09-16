# Well behaved script that gracefully shuts down on SIGINT or SIGTERM.
import signal
import threading
import time

stop_event = threading.Event()

def handle_signal(signum, frame):
    print("\nShutting down...")
    stop_event.set()

signal.signal(signal.SIGINT, handle_signal)
signal.signal(signal.SIGTERM, handle_signal)

dots = 1
while not stop_event.is_set():
    print("Working" + "." * dots)
    dots = (dots % 3) + 1
    time.sleep(1)
