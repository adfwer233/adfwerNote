---
title: What is Torch.nn Really?
---

# What is Torch.nn Really?

> 读官方文档时的一点记录

## MNIST data setup

MNIST中有一些黑白手写数据。

我们可以利用`pathlib`来处理路径的问题，用`requests`来下载数据集。我们只需要 import 对应的 module 就行了。