---
title: 项目计划
---

为 xv6 实现网络支持。

## 需要做的事情

- 实现网卡驱动
    - xv6 lab network
    - e1000 的驱动程序
- 实现网络协议栈
    - lab中的代码已经实现了 Ethernet, ARP, IP, UDP, DNS，把这堆结构整明白
    - 重新实现一个网络协议栈，实现上述 lab 中的所有功能
    - *完成 TCP 协议*
- 实现 Socket API
    - lab 中要求完成用 socket 收发 udp 的部分，把这里补上
    - 如果写出来了 TCP，整个收发 TCP 的功能
- 实现应用层工具
    - 实现 Ping、DNS，这些在 lab 的代码中已经有了，重新实现一个。

## 已经有的资源

- [一个已经做好的lab](https://github.com/duguosheng/xv6-labs-2020/tree/net)
- [lab 的原始代码] (https://github.com/mit-pdos/xv6-riscv-fall19/tree/net/kernel)

## 各个部分需要的知识

- 准备：了解 xv6
    - 完成 xv6 book Chapter 12
    - Chapter 3-6
    - network lecture
- 实现网卡驱动
    - 整明白那个lab中的 `e1000.c` 是怎么工作的
    - `spinlock.c`
- 实现网络协议
    - lab中的代码已经实现了 Ethernet, ARP, IP, UDP, DNS，整明白这些协议的作用
- 实现应用层工具
    - socket， DNS
  
