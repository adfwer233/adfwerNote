---
title: xv6 lab-network1
---

## Goals

我们会用一个叫 E1000的 虚拟网络设备来解决网络通信

收发 packet 是由 xv6 和 E1000 的一段共享内存来管理，这段内存被实现为一个 "queue of descripters as circular arrays"。
> A common abbreviation is to refer to the receive data structures as RX and the transmit data structures as TX.

当收到 packet 的时候，E1000 会生成一个中断，用于接收的代码必须 scan the RX queue 处理每一个到来的 packet，并且把它的 mbuf 通过调用 `net_rx()` 整到协议层。Struct rx_desc 描述了 descriptor 的格式，你需要分配一个新的 mbuf 并把它写进 descriptor 中，使得 E1000 知道在之后到达 array 的这个地方时应该将 next payload 扔到那。

发送 packet 时，协议层会调用 `e1000_transmit()` 来发送请求。这个东西需要将 mbuf 整到队列里。和上面同理的还有一个 struct tx_desc，我们需要保证 mbufs 最终在传输结束后被释放。

除了读写那个 circular arrays of descriptors，还需要通过 memory mapped I/O 来和 E1000 交互，来监测合适新的 descriptors 在 receive path 中可用的，并 inform E1000 transmit path 中有新的 descriptors。 

## 初始化硬件设备

> https://pdos.csail.mit.edu/6.828/2019/readings/hardware/8254x_GBe_SDM.pdf

得把 Chapter1-4.1， 14 看一看。

### PCI 总线
### E1000 initialization

## 