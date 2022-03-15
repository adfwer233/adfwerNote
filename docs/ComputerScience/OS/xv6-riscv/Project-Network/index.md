---
title: 项目计划
---

为 xv6 实现网络支持。

## 需要做的事情

- 实现网卡驱动
    - xv6 lab network
    - e1000 的驱动程序
- 实现较为底层的网络协议
    - Ethernet、ARP
    - IPv4 & ICMPv4
- *实现 TCP/UDP 协议*
- 实现 Socket API

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

