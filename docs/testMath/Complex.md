---
author:
- adf wer
title: 复变函数期末复习
---

复数、复平面、复变函数
======================

解析函数
========

为了讨论解析函数，我们首先需要在复变函数中引入可微与可导的概念，并引入区域中解析函数的概念

设函数$w = f(z)$在区域$D$内处处可微，则称$f(z)$在区域$D$内解析

解析函数的概念是与区域的概念密切联系的，函数在某点处解析，其意义是指
$f(z)$在该点的某个邻域内解析，在闭域$\bar D$上解析，指的是在包含$\bar D$的某区域解析

通过解析的概念我们可以引入奇点

若函数$f(z)$在某点处不解析，但是在$z_0$的任意邻域内总有$f(z)$的解析点，则称$z_0$为$f(z)$的奇点

如果一个函数是可微的，那么它的实部和虚部应当不是互相独立的，而必须符合一定的条件。
考虑导数的定义式，容易有
$$f'(z) = \lim_{\Delta x \to 0 \\ \Delta y \to 0}\frac{\Delta u + i \Delta v}{\Delta x + i \Delta y}$$
我们分别令$\Delta x = 0, \Delta y = 0$，就能得到如下关系
$$f'(z) = u'x + i u'y = v'_y - i u'y$$
比较实部和虚部得到一个偏微分方程组，称为Cauchy-Riemann方程

**（可微的必要条件）**设函数$f(z)$在区域$D$内有定义，且在$D$内一点处可微，那么必定有

1.  偏导数$u'_x,u'_y,v'_x,v'_y$存在

2.  满足Cauchy-Riemann方程

该定理不充分的条件的一个例子是$f(z) = \sqrt{|xy|}$

我们给出可微的一个充要条件

函数$f(z)$在区域内一点可微的充要条件为

1.  二元函数$u(x,y),v(x.y)$在该点处可微

2.  该点处满足Cauchy-Riemann方程

于是我们也得到了解析的一个充要条件

值得注意的是，Cauchy-Riemann方程也可以化为形式导数的形式
$$\frac{\partial }{\partial \overline{z}} f(z) = 0$$

在复平面上解析的函数称为整函数

初等函数
--------

### 初等单值函数

首先讨论的函数是指数函数，设

我们定义这样的函数为$f(z)= \exp (z)$：

1.  $f(z)$为整函数

2.  满足$f'(z) = f(z)$

3.  当$y = 0$时，$f(z) = e^x$

我们给出了一个构造$e^z = e^x(cos y + i \sin y$，利用偏微分方程的工具可以证明该函数的唯一性。我们将$e^z$定义为$\exp(z)$

$$e^z = e^{z + 2k\pi i}$$

这一点是值得注意的，另外，这个性质还有逆定理，若$e^{z + \omega} = e^z$，那么可以证明$\omega = 2k\pi ij$

有了指数函数之后可以在复平面上引入三角函数
$$\sin z = \frac{e^{iz} - e^{-iz}}{2i} \quad \cos z = \frac{e^{iz} + e^{-iz}}{2}$$

三角函数的零点集没有发生变化

在复数域内不能断言$|\sin z| \leq 1, |\cos z| \leq 1$

双曲函数的定义是类似的
$$\sinh z = \frac{e^z -  e^{-z}}{2} \quad \cosh z = \frac{e^z + e^{-z}}{2}$$

### 初等多值函数

为了方便对多值函数的讨论，首先给出下述定义

设函数$f(z)$在区域$D$内有定义，且对$D$内不同的两点$z_1,z_2$，都有$f(z_1) \neq f(z_2)$，则称函数$f(z)$在$D$内是单叶的

显然，单叶满变换就是一一变换，先来讨论根式函数

根式函数$w = \sqrt[n]{z}$为幂函数$z = w^n$的反函数

首先找出单叶性区域，变换$z = w^n$将射线$\theta = \phi$映射到$\theta = n\phi$，将圆周$\rho = \rho_0$映射到圆周$\rho = \rho_0^n$。特别地，该变换将角形$-\frac{\pi}{n} < \phi < \frac{\pi}{n}$变成了平面除去负实轴的区域。一般地，平面上$n$个这样的角形都有该性质。

复变函数的积分
==============

幂级数
======

Laurent级数与孤立奇点
=====================

在圆环域$r < |z - a| < R$内解析的函数一棵可以展开称Laurent级数
$$f(z) = \sum_{n = -\infty}^{+\infty} c_n(z - a)^n$$ 其中
$$c_n = \frac{1}{2\pi i} \int_{\Gamma} \frac{f(\zeta)}{(\zeta - a) ^{n + 1}} \mathrm{d}\zeta$$
$\Gamma$ 为圆周$|\zeta = a| = \rho$，并且展式是唯一的

下面举一些经典例子

函数$f(z) = \frac{1}{(z - 1)(z - 2)}$

留数
====

<script type="text/javascript" id="MathJax-script" async
  src="https://cdnjs.cloudflare.com/ajax/libs/mathjax/3.0.0/es5/tex-mml-chtml.js">
</script>
<script>
MathJax = {
  tex: {
    inlineMath: [['$', '$'], ['\\(', '\\)']]
  }
};
</script>
<script id="MathJax-script" async
  src="https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-chtml.js">
</script>