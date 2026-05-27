#include <stdio.h>
#include <unistd.h>
#include <sys/wait.h>

int main() {
  printf("Parent: PID = %d\n", getpid());
  printf("Parent: creating child process using fork()...\n");

  pid_t pid = fork();

  if (pid < 0) {
    // fork failed
    printf("Parent: fork failed!\n");
  } else if (pid == 0) {
    // Child process
    printf("Child: PID = %d\n", getpid());
    printf("Child: running 'ls -l' using execlp()\n");
    execlp("ls", "ls", "-l", NULL);

    // Runs only if exec fails
    printf("Child: exec failed\n\n");
  } else {
    // Parent process
    printf("Parent: PID of the child = %d\n", pid);
    printf("Parent: waiting for child... using wait()\n\n");
    wait(NULL);
    printf("\nParent: child finished.\n");
  }

  return 0;
}
