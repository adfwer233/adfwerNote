---
title: Convolutional Network 1
---

## Convolutional Neural Network

### What if MLP ?

我们需要把矩阵 unfold 成向量， 这时

- 参数太多了
- Spatial info is lost

It is hard to **adapt** scenarios of viewpoint variation, scale variation, illumination conditions and so on.

### Idea 1： Local Connectivity

每个神经元有一个感受野（Receptive field）

- [**Locality Assumption**]: Local information is enough for recognition
- Connect each neuron to only a local region of the input volume

### Idea 2: Parameter Sharing

- [**Shift Invariance Assumption**]: If a feature is useful at spatial position $(x,y)$, then it should also be useful for all positions $(x', y')$
- Share the weights of sliding window over different spatial locations

### Convolutional Neural Network

### Convolution

$$ (f \ast g)(t) = \int_{-\infty}^{\infty} f(\tau)g(t - \tau) \mathrm{d} \tau $$

加权函数$g$对原函数各个部分的重要性进行一个建模。

#### Cross-Correlation

$$ (f \star g)[n] := \sum_{m = -\infty}^{\infty} $$

#### Convolution vs. Cross-Correlation

$$ [f(t) \star g(t)](t) = [\overline{f(-t)} \ast g(t)](t) $$

#### Notations

CNN的输入是一个 tensor，$height \times width \times channels$

卷积核：“滤波器” 、kernel

**Convolution: Local Connnection**

所谓的卷积操作就是将 kernel 在原来的图像上 "slide over"，然后算 dot products.

**Convolution: Parameter Sharing**

做一遍卷积之后，得到一个新的图，我们称它为**特征图**。每一个特征图上的点，都对应一个神经元。

每个神经元都用的同一个卷积核，参数量就是卷积核的大小。我们换一个卷积核，就可以得到另一个特征图，也就是又得到了一个通道。

#### Dilated Convolution （空洞卷积）

这个操作虽然没有扩大卷积核，但是把感受野整大了， 特征图就会变小。

还有一种操作是 Stride Convolution


#### Stride & Padding

这是网络中用于缩小 size 的最重要的技术。

有时我们会在图旁边填一堆零，这个操作称为 Padding

#### Leaky ReLU

$$ \max(0.1x, x) $$

### Convolutional Layer: Hyperparameters

需要以下四个超参数

- \# filters: $D2$
- Receptive field (kernel size): $K$
- Stride: $S$
- The Amount of zero padding

### Pooling

将一个$2 \times 2$的变成一个。

- max pooling
- avarage pooling

*人们曾经认为Pooling能带来平移不变性*。

### Spatial Pyramid Pooling

用不同尺度的格子去做Pooling。然后把他们串起来

### LeNet

> Y. LeCun, L. Bottou, Y. Bengio, Gradient-based learning applied to document recognition, Proc. IEEE, 1998.

这个东西最初被用于文字识别。

### AlexNet

### Visualization

## Backpropagation Algorithm

### Error Computation of Pooling

做一个Expanding，前向传播是一个downSample，这时候整一个upSample，还是有两种方式

- max
- average

### Error Computation of Convolution



## PracticalTraining Strategie

现实中有很多个局部极值。我们希望在比较多的局部极值中找到比较好的局部极值

### Weight Initialization

网络初始值选的不好，可能会导致梯度消失或爆炸之类的东西。甚至会完全无法学习。

### Xavier Initialization

考虑隐藏层中的一个 unit 的值

$$ h_i = \sum_{j = 1}^{n_{in}} W_{ij}x_j $$

对方差啥的进行分析，设边权初始化均值为$0$，方差为$\sigma^2$

$$ E(h_i) = 0 $$

$$ E(h_i^2) = n_{in} \sigma^2 \gamma ^2$$

我们需要保证方差不变

$$\sigma^2 = 1 / n_{in}$$

**He Initialization** : for **ReLu** activations

$$ Var(w) = 2 / n_{in} $$


### Batch Normalization

在一个 batch 中做一个 Normalization，然后加两个 shifting factor。

$$ x \Rightarrow \hat{x} = \frac{x - \mu}{\sigma} \Rightarrow y = \gamma \hat{x} + \beta $$

在做推断的时候，把$\mu$和$\sigma$做一个指数滑动平均（Exponential moving average， EMA）

## Invariance vs. Equivariance

等变性

$$ f(T(x)) = T(f(x)) $$

不变性

$$ f(T(x)) = f(x) $$

### Limitation of CNN

CNN 有一些问题，比如很难处理形变、Background clutter、Flipped、Deformation、Scale variation、Viewpoint variation。

- 首先，这些 limitations 来自 CNN modules 的固定结构

### Solution: Data Argumentation

把能整的活都加入训练数据，它们的 label 都和原来是一样的。

### Advanced Data Augmentation

-  CNNs trained on real-world dataset are bias towards texture.

CNN 会更倾向于学更“简单的”特征，比如学到纹理，于是有了一种数据增广技术 “Stylization”

- CNNs are sensitive to context

比如它会把猴和车在一起识别成人和猴在一起……。我们能做的就是大力增广。

### Deep Networks are not Shift-Invariant

这和 curse of dimensions 有关，维度过高，平移一点点就会撞进没有数据出现的地方。

之前提到过的 max-pooling 也和这种现象有关。


## Still Ongoing

比如我把眼睛和嘴换一下位置置信度还提高了……

> 某大佬：
> “It is actually unfortunate that CNNs work so well, because they have serious shortcomings which will be hard to get rid of.”

有时CNN还不具有重建的能力，比如一个歪着的4，它会给你重建出一个正着的4……