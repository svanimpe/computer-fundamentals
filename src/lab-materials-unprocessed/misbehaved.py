# Misbehaved script that ignores SIGINT and SIGTERM.
import signal
import time

def handle_signal(signum, frame):
    pass

signal.signal(signal.SIGINT, handle_signal)
signal.signal(signal.SIGTERM, handle_signal)

dots = 1
while True:
    print("Working" + "." * dots)
    dots = (dots % 3) + 1
    time.sleep(1)
