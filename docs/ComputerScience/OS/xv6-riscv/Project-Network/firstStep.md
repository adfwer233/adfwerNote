---
title: "配置环境"
---

> ref: https://pdos.csail.mit.edu/6.828/2019/tools.html

找一个 Linux 的环境，WSL 或者是 Ubuntu

```
sudo apt-get install git build-essential gdb-multiarch qemu-system-misc gcc-riscv64-linux-gnu binutils-riscv64-linux-gnu 
sudo apt-get install riscv64-unknown-elf-gcc
```

可以用下列代码检验安装是否正确。
```cmd
$ riscv64-unknown-elf-gcc --version
riscv64-unknown-elf-gcc (GCC) 9.2.0
$ qemu-system-riscv64 --version
QEMU emulator version 4.1.0
```

把 xv6 的代码 `clone` 下来

```
git clone https://github.com/mit-pdos/xv6-riscv.git
```

切到 `xv6-riscv` 那个文件夹里

```
make qemu
```

这时就打开了 xv6。

