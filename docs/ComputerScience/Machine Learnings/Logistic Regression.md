---
title: Logistic回归和最大熵模型
---

# Logistic Regression

!!!definition
    设$X$是连续性随机变量，$X$服从Logistic分布是指$X$具有下列分布函数

    $$
    F(x) = \frac{1}{1 + e^{-(x - \mu)/ \gamma}}
    $$

    该式中，$\mu$为位置参数，$\gamma > 0$是形状参数

这个分布函数长得像一个S型的曲线

## 二项Logistic回归模型

!!!definition
    二项Logistic回归模型是如下条件概率分布

    $$P(Y = 1| X) = \frac{\exp(w\cdot x + b)}{1 + exp(w\cdot x + b)}$$

    $$P(Y = 0| X) = \frac{1}{1 + exp(w\cdot x + b)}$$

有时为了方便可以讲输入向量concate个1，然后就变成了

$$P(Y = 1| X) = \frac{\exp(w\cdot x)}{1 + exp(w\cdot x)}$$

$$P(Y = 0| X) = \frac{1}{1 + exp(w\cdot x)}$$

!!!definition
    一个事件发生的概率为$p$，它发生的几率（odd）定义为$\frac{p}{1 - p}$，对数几率（log odds）定义为$\log \frac{p}{1- p}$。

在Logistic回归中，对数几率为$w\cdot x$，是$x$的线性函数。换一个角度看，考虑对输入$x$分类的线性函数，可以用上述概率分布将其转换为$[0,1]$中的一个概率值。

## 模型参数估计

设$P(Y=1|X) = \pi(x)$，则对应的似然函数可以如下推导

$$L(x) = \prod_{i = 1}^{N} P(Y = y_i | x_i) = \prod (\pi(x_i))^{y_i} (1 - \pi(x_i))^{1 - y_i}$$

自然可以导出对数似然函数

$$G(w) = \sum_{i = 1}^N y_i \log \frac{\pi(x_i)}{1 - \pi(x_i)} + \log(1 - \pi(x_i))$$

根据上述我们得到的几率和关于$x$线性函数的结果

$$G(w) = \sum_{i=1}^N y_i(w \cdot x_i) - \log(1 + exp(w \cdot x_i))$$

自然的想法是对参数$w$进行统计推断，求上述函数关于$w$的最大值，通常采用的方法是梯度下降法和拟牛顿法。

## 多项Logistic回归

设有$k$个取值，对应的$k$分类器只需要把Logistic回归中的$\exp(w\cdot x)$改成$\sum_{i=1}^{k} \exp(w\cdot x_i)$。

# 最大熵模型

这里说的熵和我们在信息论中学到的熵的概念是一致的。也就是

$$H(X) = - \sum_{x \in \mathcal{R}} p(x) \log P(x)$$

## 一种几何解释

假设一个随机变量有$n$个取值$x_1,\cdots x_n$，有限制条件$\sum_{i=1}^{N} p(x_i) = 1$。我们将其看作一个$n$维Eucild空间中的simplex，我们的目的就是在这个simplex上最大化熵。

## 最大熵模型

首先回忆信息论的一些知识。

!!!definition
    对于服从联合分布$p(x,y)$的一对离散型随机变量，其联合熵（joint entropy）$H(x,y)$定义为
    
    $$H(X,Y) = -\sum_{x\in\mathcal{X}} \sum_{x\in\mathcal{Y}} p(x,y)\log p(x,y)$$
    
    我们还定义条件熵为

    $$H(Y|X) = -\sum_{x \in \mathcal{X}} p(x) H(Y|X = x) = - E_{p(x,y)} \log p(Y|X)$$

现在我们有一个训练数据集

$$T = \lbrace (x_1,y_1),(x_2,y_2), \cdots (x_n,y_n) \rbrace$$

设$f(x,y)$为$x,y$满足某一个关系的特征函数。考虑其关于经验分布的期望值

$$E_{\tilde{P}}(f) = \sum \tilde{P}(x,y) f(x,y)$$

其关于模型分布$P(X,Y)$和经验边缘分布的期望值

$$E_P(f) = \sum \tilde{P} (x) P(y|x) f(x,y)$$

假设模型学到了训练数据集的知识，也就是$E_P = E_\tilde{P}$。

我们可以从这个经验训练数据集中获得一个经验分布$\tilde{P}(X,Y)$，以及经验边缘分布$\tilde{P}(X)$。我们的目的是希望找到一个概率分布，使得对应的条件熵最大化。这里有两个概率分布，最优化下面的条件熵。

$$H(P) = - \sum_{x,y} \tilde{P}(x) P(y|x) \log P(y|x)$$

也就是计算上面那个条件熵的时候求和里面的熵用对应的模型去算。

## 最大熵模型的学习

### Lagrange对偶性

按照优化的一般惯例，我们最小化$-H(P) = \sum_{x,y} \tilde{P}(x) P(y|x) \log P(y|x)$。

我们用求解对偶函数的方式求解这个东西。

### MLE

可以证明求解对偶函数的最优化问题等价于求解对应最大熵模型的极大似然估计。