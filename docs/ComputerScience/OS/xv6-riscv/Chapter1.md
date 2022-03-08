---
title: Ch1
---

Shell is a user program, not part of the kernel. The xv6 shell is a simple implementation of the essence of the Unix Bourne shell.

## Processes and memory

A process may create a new process using the **fork** system call. Fork gives the new process exactly the same memory contents as the calling process.

The **exit** system call causes the calling process to stop executing and to release resources such as memory and open files.

The **wait** system call returns the PID of an exited or killed child of the current process and copies the exit status of the child to the address passed to wait.

*the parent and child are executing with different memory and different registers*

The **exec** system cal replaces the calling process's memory with a new memory image loaded from a file stored in the file systme. Exec takes two arguments: the name of the file containing the executable and an array of string arguments.

## I/O and File descriptors

**cat** doesn't know whether it is reading from a file, console or a pipe.

