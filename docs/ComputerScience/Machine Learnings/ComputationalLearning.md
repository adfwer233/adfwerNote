--- 
title: 计算学习理论
---

目的：分析学习任务的困难本质，为学习算法提供理论保证。

先说一些约定。给定样例集 $D = \{(x_i,y_i)\}, x_i \in \mathcal{X}$，讨论二分类问题。假设 $\mathcal{X}$ 上的样本服从一个位置的分布 $\mathcal{D}$，$D$ 中的样本为独立同分布采样所得。

$h$ 是 $\mathcal{X} \to \mathcal{Y}$，泛化误差为

$$ E(h; \mathcal{D}) = P_{x \sim \mathcal{D}} (h(x) \neq y) $$

在样本集合 $D$ 上的经验误差为

$$ \hat{E}(h; D)  = \frac{1}{m} \sum_{i = 1}^{m} \mathbb{I} (h(x_i) \neq y_i) $$

这两个东西可以简记为 $E(h)$ 和 $\hat{E}(h)$。通常用 $\epsilon$ 表示训练的误差上限，即 $E(h) \leq \epsilon$

若 $h$ 在 $D$ 上的经验误差为 $0$， 则称 $h$ 与 $D$ 一致，否则称其与 $D$ 不一致。

我们会用到几个常用不等式

!!!Note "常用的不等式"
    - Jenson 不等式：对任意凸函数 $f(x)$，有

    $$ f(E(x)) \leq E(f(x))$$

    - Hoeffding Bound ： 若 $x_1, x_2, \cdots ,x_m$ 为 $m$ 个随机变量，且满足 $0 \leq x_i \leq 1$，则对任何 $\epsilon > 0$，有

    $$ P(\frac{1}{m} \sum_{i = 1}^{m} x_i - \frac{1}{m} \sum_{i = 1}^{m} E(x_i) \geq \epsilon) \leq \exp(-2m\epsilon^2)$$

    $$ P( \vert \frac{1}{m} \sum_{i = 1}^{m} x_i - \frac{1}{m} \sum_{i = 1}^{m} E(x_i) \geq \epsilon \vert) \leq 2\exp(-2m\epsilon^2)$$

    - McDiarmid 不等式：若 $x_1, x_2,\cdots,x_m$ 为 $m$ 个独立随机变量，且对任意的 $1 \leq i \leq m$，函数 $f$ 满足

    $$ \sup_{x_1, \cdots, x_m, x_i'}\vert f(x_1,\cdots,x_m) - f(x_1, \cdots, x_{i - 1}, x_i',\cdots x_m) \vert \leq c_i$$

    则 $\forall \epsilon > 0$， 有

    $$ P(f(x_1,\cdots,x_m) - E(f(x_1, \cdots,x_m)) \geq \epsilon) \leq \exp \left( \frac{-2\epsilon^2}{\sum_i c_i} \right)$$

    $$ P( \vert f(x_1,\cdots,x_m) - E(f(x_1, \cdots,x_m)) \vert \geq \epsilon) \leq  2 \exp \left( \frac{-2\epsilon^2}{\sum_i c_i} \right)$$

## PAC 学习

**Probably Approximately Correct（PAC）学习理论**

概念（concept）是从样本空间 $\mathcal{X}$ 到标记空间 $\mathcal{Y}$ 的映射，若对任何 $(x, y)$ 有 $c(x) = y$ 成立，则称 $c$ 为**目标概念**。所有我们希望学到的**目标概念**的集合称之为**概念类** $\mathcal{C}$

学习算法 $\mathcal{L}$ 所对应的所有可能概念的集合称之为**假设空间**，记为 $\mathcal{H}$

若目标概念 $c \in \mathcal{H}$，则称学习算法 $\mathcal{L}$ 是**可分的**或**一致的**。

我们希望基于学习算法学到的假设 $h$，**尽可能**接近于目标概念 $c$。

!!!Note "PAC Identify"

    对 $0 < \epsilon$，$\delta < 1$，所有 $c \in \mathcal{C}$ 和分布 $\mathcal{D}$，若存在学习算法 $\mathcal{L}$，其输出假设 $h \in \mathcal{H}$ 满足

    $$P(E(h) \leq \epsilon) \geq 1 - \delta$$

    则称学习算法 $\mathcal{L}$ 能从假设空间 $\mathcal{H}$ 中 PAC 辨识概念类 $\mathcal{C}$


!!!Note "PAC Learnable"

    令 $m$ 表示 i.i.d 采样的数目，$0 \leq \epsilon , \delta < 1$，对所有分布 $\mathcal{D}$，若存在学习算法 $\mathcal{L}$ 使得 

    $$\forall m \geq poly(1/\epsilon, 1/\delta, size(x), size(c))$$
    
    $\mathcal{L}$ 能从 $\mathcal{H}$ 中 PAC 辨识 $\mathcal{C}$，则称 $\mathcal{C}$ 对 $\mathcal{H}$ 而言是 PAC 可学习的。

    ???remark
        要使得采样的数目足够大的时候，学习算法是能够学到概念类

!!!Note "PAC Learning Algorithm"

    若学习算法 $\mathcal{L}$ 是 PAC 可学习的，且 $\mathcal{L}$ 的运行时间也是多项式函数

    $$\forall m \geq poly(1/\epsilon, 1/\delta, size(x), size(c))$$

    则称 $\mathcal{C}$ 是高效 PAC 可学习的，$\mathcal{L}$ 为 $\mathcal{C}$ 的 PAC 学习算法

!!!Note "Sample Complexity"

    满足 PAC 学习算法 $\mathcal{L}$ 所需的

    $$\forall m \geq poly(1/\epsilon, 1/\delta, size(x), size(c))$$

    最小的 $m$，称之为学习算法 $\mathcal{L}$ 的样本复杂度

$|\mathcal{H}|$ 有限时，称为有限假设空间，反之称无限假设空间

## 有限假设空间

### 可分情形

首先容易想到一种简单的学习策略，$D$ 中的样例都是由目标概念 $c$ 赋予的，那么我们在有限的假设空间上逐个剔除不符合 $D$ 的假设，直至只剩下一个假设为止。但是问题出现在不一定只剩下一个假设，还可能会有很多个在 $D$ 上与目标概念等效的假设，对于这些假设，我们**无法进一步区分**它们。

既然分不出来，我们自然的想法就是增加样例的数量，使得训练集规模更大来区分它们，这时自然的问题就出现了。

**问题：需要多少样例才能学到有效的假设呢？**

先对泛化误差大于 $\epsilon$ 但是在训练集上表现完美的假设出现的概率进行估计。

这里只需要一些简单的估计，首先对于一个 $\mathcal{D}$ 上随机采样的样例 $(\mathbf{x},y)$，根据泛化误差，显然有

$$ P(h(\mathbf{x}) = y) < 1 - \epsilon$$

这对 $D$ 上所有样本都成立概率

$$ P(h(\mathcal{x}) = y, \forall (\mathbf{x}, y) \in D) < (1 - \epsilon)^m $$

我们也不知道会选出那个 $h$， 反正由次可加性，我们可以得到

$$ P(h \in \mathcal{H}, E(h) \geq \epsilon, \hat{E}(h) = 0)  < \vert \mathcal{H} \vert (1 - \epsilon) ^m < |\mathcal{H}| e^{-m\epsilon}$$

我们自然令

$$ |\mathcal{H}| e^{-m\epsilon} \leq \delta $$

得到 $m$ 的一个下界

$$ m \geq \frac{1}{\epsilon}(\ln |\mathcal{H}| + \ln \frac{1}{\delta}) $$

于是得到了一个结论

**有限假设空间都是 PAC 可学习的**，输出假设 $h$ 的泛化误差随样例数目的增多而收敛到 $0$，收敛速率为 $O(1/m)$

### 不可分情形

简单来说我们推导出了这么一个结果，在依概率意义下：

$$ \max_{h \in \mathcal{H}} \vert E(h) - \hat{E}(h) \vert \to 0  $$

显然当假设空间不可分的时候，学习算法 $\mathcal{L}$ 是无法学到目标概念的 $\epsilon$ 近似的。但是我们可以寻找假设空间中泛化误差最小的假设，根据上面的结论，我们可以找到这个假设的 $\epsilon$ 近似。

!!!note "Agnostic PAC learnable"

    令 $m$ 表示从分布 $\mathcal{D}$ 中独立同分布采样得到的样例数目，对所有分布 $\mathcal{D}$ 若存在学习算法 $\mathcal{L}$ 和多项式函数 $poly$， 使得对于

    $$\forall m \geq poly(1/\epsilon, 1/\delta, size(x), size(c))$$

    $\mathcal{L}$能从假设空间输出满足
    
    $$ P(E(h) - \min_{h' \in \mathcal{H}} E(h') \leq \epsilon) \geq 1 - \epsilon$$

    的 $h$，则称假设空间 $\mathcal{H}$ 不可知 PAC 可学习的。同理也可定义之前那一堆东西。

## VC 维（Vapnik-Chervonenkis dimension）

给定假设空间 $\mathcal{H}$ 和示例集 $D$，$\mathcal{H}$ 中每个假设 $h$ 都能对 $D$ 中示例赋予标记，标记结果可以表示为 

$$ h |_D = \lbrace( h(x_1), \cdots , h(x_m)) \rbrace $$

随着 $m$ 增大，$\mathcal{H}$ 中的假设对所能赋予标记的可能结果数越大，$\mathcal{H}$ 的表示能力越强，对学习任务的适应能力越强

!!!note "增长函数"

    $\forall m \in \mathbb{N}$，假设空间 $\mathcal{H}$ 的增长函数 $\Pi_\mathcal{H}(m)$为

    $$ \Pi_{\mathcal{H}}(m) = \max_{\{x_1,\cdots,x_m \} \ \subseteq \mathcal{X}} \left| \{( h(x_1), \cdots , h(x_m))  \mid h \in \mathcal{H}\} \right| $$

我们可以利用增长函数估计经验误差与泛化误差的关系。

!!!note "VC 维"
    
    假设空间 $\mathcal{H}$ 的 VC 维定义为能被 $\mathcal{H}$ 打散的最大示例集的大小。

    $$VC(\mathcal{H}) = \max \{ m : \Pi_{\mathcal{H}}(m) = 2^m\}$$

**VC 维的定义与数据分布 $\mathcal{D}$ 无关，即使没有数据分布也可以计算 VC 维 **

!!!example "计算 VC 维的两个例子"

    - 实数域中的区间 $[a,b]$
    - 二维实平面上的线性划分

VC 维和增长函数有密切的关系，有如下引理

!!!Note "VC 维和增长函数的关系"

    $$\Pi_{\mathcal{H}} (m) \leq \sum_{i = 0}^{d} \tbinom{m}{i}$$

我们还可以给出一个更为宽松的估计

!!! Note "增长函数的一个上界"
    
    若假设空间 $\mathcal{H}$ 的 VC 维为 $d$，则对任意 $m \geq d$，有

    $$\Pi_{\mathcal{H}}(m) \leq \left( \frac{em}{d} \right)^d$$

实际上就是对上面的那个组合数和的一个估计。

自然我们可以中这个东西去估计泛化误差，直接算得

$$ \epsilon = \sqrt{\frac{8d \ln \frac{2em}{d} + 8 \ln \frac{4}{\delta}}{m}} $$

于是泛化误差界只与样例数目 $m$ 有关，收敛速率为 $O(\frac{1}{\sqrt{m}}$，与数据分布和样例集无关，因此基于 VC 维的泛化误差界是**分布无关的、数据独立的**。

**经验风险最小化（Empirical Risk Minimization，ERM）原则**：设 $h$ 为学习算法 $\mathcal{L}$ 的假设，若 $h$ 满足

$$\hat{E}(h) = \min_{h'\in\mathcal{H}}\hat{E}(h')$$

!!!theorm "定理"

    任何 VC 维有限的假设空间 $\mathcal{H}$ 都是不可知 PAC 可学习的