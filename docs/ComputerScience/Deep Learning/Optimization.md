---
title: Optimization
---

## Optimization

$$ \arg \min_\theta O(D;\theta) = \sum_{i = 1}^{n} L(y_i. f(x_i); \theta) +\Omega(\theta) $$

**Basic idea**: Go down a hill

### First-Order Method

- First-order Taylor approximation of objective function

$$ g = \nabla_\theta J(\theta) $$

$$ J(\theta - \eta g) = J(\theta) - \eta g^Tg \leq J(\theta) $$

Repeat this step and we get the **Gradient Descent**

一个缺点：它会在梯度为 $0$ 的地方卡住

#### Learning Rate

学习率调不好会整出一堆事来，甚至凸优化时都能整发散。

#### Convex Function

为了保证 GD 算法的收敛性，我们需要假设目标函数是凸的。

#### Convergence Rate

现在假设 $J(\theta)$ 是凸的、可微的、Lipchitz-$L$ 连续的。

梯度下降的方式

$$ \theta^{t + 1} = \theta^t - \eta \nabla J(\theta^t) $$

一通大力推导，我们可以得到

$$ \frac{1}{T} \sum_{t = 1}^{T - 1} J(\theta^t) - J(\theta^*) \leq \frac{R^2}{2 \eta T} + \frac{\eta L^2}{2} $$

取 $\eta = \frac{R}{L \sqrt{T}}$ 

$$ \frac{1}{T} \sum_{t = 1}^{T - 1} J(\theta^t) - J(\theta^*) \leq \frac{RL}{\sqrt{T}} $$

于是我们得到了一个收敛率为 $\frac{1}{\sqrt{T}}$ 的算法。

### Second-Order Method

一阶方法在一些地方会出现问题

- Maximum
- Minimum
- Saddle Point

如果我们能对 Hessian 矩阵进行特征值分解，我们可以分类这几种状况

#### Newton's Method

- 优点：收敛快
- 缺点：Hessian矩阵算出来需要 $O(d^2)$ 的时间和 $O(d^3)$ 的空间

#### Conjugate Gradient Descent (CGD)

#### Quasi-Newton Method

## Optimization in Deep Learning

我们想要寻找 Low and flat basin 的极小值点，为了它的泛化能力和其他的啥玩意。

### Stochastic Gradient Descent (SGD)

所谓随机是指每次 shuffle 一下数据集，随机选一个 minibatch 整 GD。

- Stochasticity helps escaping from saddle points
- Much faster than full batch method such as GD

收敛率理论上还是 $O(1/\sqrt{T})$ 的。

#### Problem with SGD

- 梯度不稳定，可能会有噪声
- 逃离局部极值和鞍点困难
- 如果优化问题的条件不好，Loss function has high **condition number** （就是它那个等值线对应的椭圆可能很“扁”）

#### SGD with Monentum

SGD 中是

$$ \Delta^t = \nabla J^t(\theta^t) $$

做一个指数滑动平均， 得到了 SGD with Momentum

$$ \Delta^t = \beta \Delta^{t - 1} + \nabla J^t(\theta^t) $$

- 解决了一些噪声的问题

#### Nesterov Momentum

**SGD with Momentum**

$$ \Delta^t = \beta \Delta^{t - 1} + \nabla J^t(\theta^t) $$

**Nesterov Momentum**

$$ \tilde{\theta}^t = \theta^t - \beta \Delta^{t - 1} $$

$$ \Delta^t = \beta \Delta^{t - 1} + \nabla J^t(\tilde{\theta}^t)$$

> Y. Nesterov. A method for unconstrained convex minimization problem with the rate of convergence o(1/k^2), 1983


### Adaptive Method: AdaGrad, RMSProp, Adam, Nadam

#### AdaGrad

**SGD with Momentum**

$$ \Delta^t = \beta \Delta^{t - 1} + \nabla J^t(\theta^t) $$

**AdaGrad**

$$ r^t = r^{t -1} + \nabla J^t(\theta^t) \odot \nabla J^t (\theta^t) $$

$$ h^t = \frac{1}{\sqrt{r^t} + \delta} $$

（自适应学习率，$\delta$ 是为了防止除零）

$$ \Delta^t = h^t \odot \nabla J^t(\theta^t) $$

一个问题就是这玩意可能走一走走不动了……

#### RMSProp

变成指数滑动平均

$$ r^t = \rho r^{t - 1} + (1 - \rho)\nabla J^t(\theta^t) \odot \nabla J^t (\theta^t) $$

> *Similar to the (forget) gates in Highway Networks/LSTMs.*

#### RMSProp with Momentum

把 RMSProp 和 SGD with Momentum 缝合一下

#### Adaptive Momentum: Adam

*RMSProp with Momentum*

$$ \Delta^t = \beta\Delta^{t-1}  + h^t \odot \nabla J^t(\theta^t) $$

*Adam*

$$ s^t = \epsilon s^{t -1} + (1 - \epsilon) \nabla J^t (\theta^t) $$

$$ \Delta^t = h^t \odot s^t $$

它给 SGD 用的 Momentum 也加了个 adaptive。

- Suggested defaults: $\epsilon = 0.9$ and $\rho = 0.999$

- **Default optimization method** for most deep learning systems.

#### Nesterov Adaptive Momentum: Nadam

顾名思义

### New Adaptive Method: AMSGrad

#### Problem of Exponential Moving Average

- On some convex functions, RMSProp or Adam may fail.



## The Next Frontier: Nonconve Optimization