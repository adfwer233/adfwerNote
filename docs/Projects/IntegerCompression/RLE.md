---
title: Run-Length encoding
---

# RLE(Run-Length encoding) 行程编码

这是一种用于处理含有连续重复数据的编码算法

## 原始的RLE算法
这很简单，比如原始数据为$AAAAAABBBCDD$，我们就将它编码为$6A3B1C2D$。

解码也非常简单，读一个数据重数$x$，读一个数据块值$a$，然后向Buffer中写$x$次$a$。重复这一过程直至结束。
