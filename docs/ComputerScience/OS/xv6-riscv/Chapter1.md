---
title: Ch1
---

Shell is a user program, not part of the kernel. The xv6 shell is a simple implementation of the essence of the Unix Bourne shell.

## Processes and memory

A process may create a new process using the **fork** system call. Fork gives the new process exactly the same memory contents as the calling process.

**在父进程中，`fork` 返回子进程的 PID。子进程中返回 0。**

The **exit** system call causes the calling process to stop executing and to release resources such as memory and open files.

The **wait** system call returns the PID of an exited or killed child of the current process and copies the exit status of the child to the address passed to wait.

*the parent and child are executing with different memory and different registers*

The **exec** system cal replaces the calling process's memory with a new memory image loaded from a file stored in the file systme. Exec takes two arguments: the name of the file containing the executable and an array of string arguments.

## I/O and File descriptors

**cat** doesn't know whether it is reading from a file, console or a pipe.

**文件描述符** 是一个小整数，代表一个可以由进程获取或写入的内核管理对象。一个进程可以由如下的方式获得一个 file descriptors：

- opening a file, directory, or device
- creating a pipe
- duplicating an existing descriptor 

就是说，fc 将 file, pipes, devices 都抽象成字节流，看起来没啥差别。

在 xv6 的内部，每一个进程都会维护一个表，这个表以 fd 为索引，我们约定：

- 进程从文件描述符0 读数据
- 向文件描述符 1 写数据
- 向文件描述符 2 写错误信息

Shell 就是用这个玩意来实现重定向，Shell 会保证自己有三个文件描述符打开，这些文件描述符默认是 console 的 fd

这些 system call
- read / write 读写数据
- cat 把"文件"复制到标准输出
- close 释放一个 dc

文件描述符和 fork 相互作用，使得I/O重定向容易被实现，fork 会复制父进程的那个表和它的内存，这样子进程打开的文件和父进程一样。如果是用 `exec` 内存会被替换，但是 fd 那个表保留。

于是 Shell 可以通过 `fork` 实现 I/O 重定向，在子进程中重新打开那些 fd，然后调用 exec 运行新程序。

下面的代码实现了 `cat < input.txt`

```cpp
char *argv[2];
argv[0] = "cat";
argv[1] = 0;

if (fork() == 0) { // in the sub process
    close (0); // release fd 
    open("input.txt", O_RDONLY); // Read only, in the src kernel/fcntl.h
    exec("cat", argv); // 重定向后 cat 
}
```

为什么 `fork` 和 `exec` 是分开调用的：为了让Shell 重定向子进程的 I/O，而不干扰父进程的 I/O设置。

!!! Remark
    虽然 `fork` 复制了文件描述符表，但是底层文件的偏移都是父子共享的，比如下面的代码会向 fd 1 中写 "hello world \n"。

    ```c
    if (fork() == 0)
    {
        write(1, "hello ", 6);
        exit(0);
    }
    else
    {
        wait(0);
        write(1, "world\n", 6);
    }
    ```

System call **dup** 会复制一个 fd，返回一个新的 fd，指向同一个 I/O 对象，共享一个偏移量，就像被 fork 的 fd 一样。

除非两个文件描述符是由 `fork` 或者 `dup` 调用产生的，否则不会共享偏移量，即使打开的是同一个文件。

有了 `dup`，Shell 可以实现这样的命令

<center>
`ls existing-file non-existing-file > tmp1 2>&1`
</center>
这里 `2>&1` 表示 2 是 1 的复制，即重定向错误信息（2）到标准输出（1）。

## Pipes

所谓管道是一个小的内核缓冲区，可以把它当成**一对** fd 扔给进程，一个读一个写，这提供了一种进程间的通信方法。

下面的代码会运行程序 `wc`，标准输入连接到读取端。

```cpp
int p[2];  // 存管道
char *argv[2];
argv[0] = "wc";
argv[1] = 0;
pipe(p); // 整个管道，也就是一对 fd
if (fork() == 0)
{
    close(0);  // 释放文件描述符0
    dup(p[0]); // 复制一个p[0](管道读端)，此时文件描述符0（标准输入）也引用管道读端，故改变了标准输入。
    close(p[0]);
    close(p[1]);
    exec("/bin/wc", argv); // wc 从标准输入读取数据
}
else
{
    close(p[0]);
    write(p[1], "hello world\n", 12);
    close(p[1]);
}

```

!!!Question

    这里为什么改变了标准输入？

    `open` 是线性扫描，扫到一个处于释放状态的 fd 就给他 open
!!! Warning

    没有管道的话，read 会等待数据被写入或是所有指向写端的文件描述符关闭。事实上，如果没数据写入，读会无限阻塞。

    这就是上面一定要把管道给关掉的原因，如果wc的一个文件描述符仍然引用了管道的写端，那么wc将永远看不到文件的关闭（被自己阻塞）。

xv6的shell实现了管道，如`grep fork sh.c | wc -l`，shell的实现类似于上面的代码，这里插一段Shell的代码分析，它位于 `user/sh.c` 中

```cpp
// Parsed command representation
#define EXEC  1
#define REDIR 2
#define PIPE  3
#define LIST  4
#define BACK  5

#define MAXARGS 10

struct cmd {
  int type;
};

struct execcmd {
  int type;
  char *argv[MAXARGS];
  char *eargv[MAXARGS];
};

struct redircmd {
  int type;
  struct cmd *cmd;
  char *file;
  char *efile;
  int mode;
  int fd;
};

struct pipecmd {
  int type;
  struct cmd *left;
  struct cmd *right;
};

struct listcmd {
  int type;
  struct cmd *left;
  struct cmd *right;
};

struct backcmd {
  int type;
  struct cmd *cmd;
};

int fork1(void);  // Fork but panics on failure.
void panic(char*);
struct cmd *parsecmd(char*);

// Execute cmd.  Never returns.
void
runcmd(struct cmd *cmd)
{
  int p[2];
  struct backcmd *bcmd;
  struct execcmd *ecmd;
  struct listcmd *lcmd;
  struct pipecmd *pcmd;
  struct redircmd *rcmd;

  if(cmd == 0)
    exit(1);

  switch(cmd->type){        // 哪种 command ？
  default:
    panic("runcmd");

  case EXEC:                      // exec 那种 command
    ecmd = (struct execcmd*)cmd;                               
    if(ecmd->argv[0] == 0)
      exit(1);
    exec(ecmd->argv[0], ecmd->argv);                
    fprintf(2, "exec %s failed\n", ecmd->argv[0]);
    break;

  case REDIR:                     // 需要经过重定向的 command
    rcmd = (struct redircmd*)cmd;
    close(rcmd->fd);                             // 释放对应的 fd
    if(open(rcmd->file, rcmd->mode) < 0){        // 打开文件， 失败报错
      fprintf(2, "open %s failed\n", rcmd->file);
      exit(1);
    }
    runcmd(rcmd->cmd);                           
    break;

  case LIST:
    lcmd = (struct listcmd*)cmd;
    if(fork1() == 0)
      runcmd(lcmd->left);
    wait(0);
    runcmd(lcmd->right);
    break;

  case PIPE:
    pcmd = (struct pipecmd*)cmd;
    if(pipe(p) < 0)
      panic("pipe");
    if(fork1() == 0){
      close(1);
      dup(p[1]);
      close(p[0]);
      close(p[1]);
      runcmd(pcmd->left);
    }
    if(fork1() == 0){
      close(0);
      dup(p[0]);
      close(p[0]);
      close(p[1]);
      runcmd(pcmd->right);
    }
    close(p[0]);
    close(p[1]);
    wait(0);
    wait(0);
    break;

  case BACK:
    bcmd = (struct backcmd*)cmd;
    if(fork1() == 0)
      runcmd(bcmd->cmd);
    break;
  }
  exit(0);
}

```

大概来说，这段代码是 Shell 的命令调用部分，开始那几个结构体声明了各种命令，注意到这里的命令实际上是一个链式结构，可以层层调用。

## File system

system call : 

- `chdir` cd in linux
- `mkdir`
- `mknod`: Create a new device file
    - When a process later open a device file, the kernel diverts read and write system calls to the kernel device implemention instead of passing them to the file system

一个文件的文件名与文件本身是不同的，底层的同一个文件可能有多个 name，称之为 `links`。每个 link 由 directory 中的一个 `entry` 组成， 每个 `entry` 由一个文件名和一个指向底层文件（inode）的引用构成。

inode 中包含了一个文件的 ‘metadata’

- type (file or directory or device)
- length
- location of the files content on dist
- number of links to a file

`fstat` 是一个系统调用，它检索一个 file descriptor 指向的 inode 的一些信息

```cpp
#define T_DIR 1 // Directory
#define T_FILE 2 // File
#define T_DEVICE 3 // Device

struct stat {
  int dev; // File system’s disk device
  uint ino; // Inode number
  short type; // Type of file
  short nlink; // Number of links to file
  uint64 size; // Size of file in bytes
};
```

!!!Question

    What is the inode number?

`link` 是一个系统调用，它创建另一个 file system name 指向一个已经存在的 inode，下面的指令创建了一个文件，named both a and b

```shell
open("a", O_CREATE|O_WRONLY);
link("a", "b");
```

`unlink` 是一个系统调用，它 'removes a name from the file system'。文件的 inode 和文件内容占据的磁盘空间只在文件的 `link count` 为零时被释放。

!!!Remark

	下面的指令是一种惯用的创建临时 inode 且 with no name 的方式，创建的 inode 会在进程关闭 `fd` 或退出时被清理掉

	```cpp
	fd = open("/tmp/xyz", O_CREATE|O_RDWR);
	unlink("/tmp/xyz");
	```

!!! Remark

	cd 是 shell 的命令，是放在 shell 中的。如果 `cd` 按照常规指令的方式来运行，那么 `shell` 会 `fork` 一个子进程，子进程的目录改变但是父进程的目录没有改变。

## Real World



!!! Warning

	Xv6 does not provide a notion of users or of protecting one user from another; In Unix terms, all xv6 processes run as root