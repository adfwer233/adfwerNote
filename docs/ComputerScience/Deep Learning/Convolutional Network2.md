---
title: Convolutional Network 2
---

## Standard Architectures

### Highway Networks

$$ y = H(x,W_H) \cdot T(x, W_T) + x \cdot C(x, W_C) $$

### Residual Network (ResNet)

- Deeper models are harder to optimize. **It is an optimization issue!**

#### Residual Block

在原有的 Plain layers 上“飞线”，加一个原有的输入$x$。

### Improving ResNet

#### ResNeXt

- Should we prefer deeper or wider networks ?

#### DenseNet

提出了 Dense block， 一个 block 中的卷积层可以向后直连。

## Lightweight Architectures

> Hardware engineersuffers from the model size

### Network Compression

> S. Han, H. Mao, W. J. Dally. Deep Compression: Compressing Deep Neural Networks with Pruning, Trained Quantization and Huffman Coding, ICLR’16. (Best Paper)

#### Pruning

把一些神经元之间的连线干掉，然后再Turning

#### Quantization and Encoding

用 k-means 的思想对 Weights 进行聚类。

#### Huffman Encoding

给 Weights 整个 Huffman encoding。

### Lottery Ticket Hypothesis

> J Frankle, et al. The Lottery Ticket Hypothesis: Finding Sparse,Trainable Neural Networks. ICLR 2019 (Best Paper)

### Group Convolution

**轻量化网络的核心技术**

给输入的 Channels 分一下组。

### Depthwise Serparable Convolution

$$\#Group = \#Channel$$

- Depthwise convolution makes each channel highly independent
    - How to fuse them together? **1x1 Convolution (change #channels)**

## Advanced CNN Modules

### Transpose Convolution

**结构化输出任务**

**Downsampling and Upsampling inside the network.**

这里的 Transpose Convolution 是一种把特征图变大的方式， “fractionally strided convolution”

### 3D Convolution



### Attention in CNN 

## Representation Learning

## AutoML: Neural Architecture Search