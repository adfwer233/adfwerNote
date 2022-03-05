---
title: Feedforward Network
---

## Multilayer Perceptrons

### Neuron and Perception

$$\hat{y} = g(\theta_0 + \sum_{i = 1}{d} x_i \theta_i)$$

符号函数在数学上处理起来是比较困难的，因为它的梯度性质不是很好，无法进行基于梯度的优化方式

### Perceptron Learning Algorithm

!!! Algorithm
    - 初始化 $\theta = 0$
    - For $t = 1 ... T_0$
      - 在 training set 中抽取$(x_t,y_t)$
      - 计算$\hat{y} = sgn(x_t \cdot \theta)$
      - 若$\hat{y} \neq y_t$，之后更新为$\theta = \theta + y_t x_t$

感知机学习算法是收敛的。为证明需要引入两个基本的量

- $\gamma$ : the best-cast margin
- $R$: the length of the longest vector

!!! Theorem
    The PLA converges after no more than $(\frac{R}{\gamma})^2$ misclassifications. If class are **linearly separable**.

虽然这个算法可以收敛，但是这个**linearly separable**显然是一个不现实的假设。这反映了理论与现实之间的差距。

### Perceptron: Boolean Functions

感知机的局限性：它不能组装。比如说XOR这个Boolean Function，它的结果线性不可分，用一个感知机无法完成任务。此时我们想将感知机组装起来，从而能表示XOR。

如果用了一个多层的感知机，那样学习就出现了问题。

“Deep Learning is just layering！”

### Multilayer Perceptrons (MLP)

- MLP is universal to represent arbitrarily complex Boolean functions
- The connections in MLP can be **sparse** - a phenomenon in the Brain

注意这里的图是一个稀疏的图。

感知机不仅能近似 Boolean 函数，还能近似各种连续函数。

!!!warning
    这只有 expressiveness ，但是没有归纳出 learnability!

MLP的结构大概有

- Input Layer
- Hidden Layers
- Output Layers

### Activation Functions

我们只能采用逐元素注入的方式，在每一个感知机上都整一个非线性激活函数。

Sigmoid function

$$
    g(z) = \frac{1}{1 + e^{-z}}
$$


后来人们整出来了$\tanh$和$ReLU$作为激活函数。

**Softmax function**：建模一个**Categorical分布**

$$
g(z)_i = \frac{e^{z_i}}{\sum_{j = 1}^{k} e^{z_j}}
$$

它有一些问题

- Winner takes all，会导致神经网络“over confident”
- May cause numerical overflow

于是为了数值稳定性，通常这么算

$$
g(z)_i = \frac{e^{z_i - z_m}}{\sum_{j = 1}^k e^{z_j - z_m}}, m = argmax(z_j)
$$

### Loss Functions

**Entropy**: $H(q) = -\sum_{j = 1}{k} q_j \log q_j$

**Cross-entropy**: $H(q, p) = - \sum_{j = 1}^{k} q_j \log p_j$

**Relative-entropy**: $KL(q||p) = H(q, p) - H(q)$


## Backpropagation Algorithm

### Gradient-Based Training

$$
\arg min_\theta O(D;\theta) = \sum_{i = 1}^{m} L(y_i, f(x_i); \theta) + \Omega(\theta)
$$

算法分为三步

- ForwardPropagation()
- BackwardPropagation()
- Parameter Updates

### Gradient Descent

不管是啥，计算梯度，然后梯度下降。

关键问题是，如何计算**隐藏层中参数的导数**。

### Step1： Forward Propagation

**随机初始化**，然后开始算

### Step2： Forward Propagation

#### BP Algorithm

关键思想：**Chain rule**

- Uses dynamic programming (**table filling**)
- Avoids re-computing repeated subexpressions (in dependency)
- Speed vs memory tradeoff. (**sensitive to #sample $m$**)

#### Computing the Residual

对于每一个结点，计算**residual**

$$
\delta_i^{(l)} := \frac{\partial}{\partial z_i^{(l)}} J(\theta, b; x, y)
$$

$$
\delta_{i}^{(n_l)} = 
$$

应用链式法则

$$
\frac{\partial J(\theta,b;x,y)}{\partial z_l} = \sum_{j = 1}^{s_{l + 1}} \frac{\partial J(\theta,b;x,y)}{z_{l + 1}} \frac{\partial z_j^{(l +1)}}{\partial z_i^{(l)}}
$$

注意到

$$
z_j^{l + 1} = \sum_{i = 1}^{s_l} \theta_{ji}^{(l)} a_i^{(l)} + b_j^{(l)}
$$

于是得到了

$$
\delta_i = \sum_{j = 1}^{(l + 1)} \delta_j^{(l + 1)} \theta_{ji}^{(l)} g'(z_i^{(l)})
$$

利用链式法则很容易算出来

$$
\frac{\partial}{\partial \theta_{ij}^{(l)}} J = a_j^{(l)}\delta_i^{(l + 1)}
$$

$$
\frac{\partial}{\partial b_{i}^{(l)}} J = \delta_i^{(l + 1)}
$$

然后整个参数更新就完了。

## Automatic Differentiation

关键思想还是：**Chain Rule**

创建一个对应于梯度的计算图，搞出每一个算子对应的梯度，然后往回算。

## Pratical Training Strategies

### Stochastic Gradient Descent

- 随机选取一个 mini-batch 去做梯度下降

### SGD with Momentum

做一个**指数滑动平均**

- $\theta_{ij}^{(l)} = \theta_{ij}^{(l)} - \eta\Delta$
- $\Delta = \beta \Delta + \frac{\partial}{\partial \theta_i} J(\theta, b)$

### Learning Rate Decay

在 SGD 中我们将 learning rate $\eta$ 视为一个超参数去调参。

- Exponential decay strategy
- $1/t$ decay strategy

### Weight Decay

将一个 regularization 加到 Loss function 中去求导。

### Dropout

将神经元以一定的概率 Dropout 。

### Weight Initialization

- 初始化非常重要

## Autoencoders

- Unsupervised approach for learning a lower-dimensional feature representation from unlabeled training data.

我们把输入先 encode 再 decode，追求重建误差最小化。从而希望能够从无标记的数据中学习到低维特征。

这个 encoder 和所有 decoder 可以换成各种神经网络。

后来我们将输入的数据经过 encoder 后输入一个 supervised model。这是一个典型的 Fine-tune 的模型。

### Sparse Autoencoder

把先验知识注入进来

$$
L(x, \hat{x}) + \Omega(z) = ||x = \hat{x}|| + \lambda \sum |z_j|
$$

### Denoising Autoencoder (DAE)

先给 Original data 加噪声，然后扔进 encoder 去重建。

### Contractive Autoencoders (CAE)

通过加一个 penalty 让学到的特征在一个很小的邻域内。

$$ \Omega(z) = \vert $$

### Variational Autoencoders (VAE)

这玩意是一个生成式模型。

## Expressiveness of Deep Networks