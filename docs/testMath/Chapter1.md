---
title: 多项式
---

数域
====

我们依次引入群，环，域。

群
--

1.  如果一个代数结构$<S,*>$满足封闭性，我们称之为原群

2.  若原群中的二元运算是可结合的，我们称之为半群

3.  在半群的基础上，增加一个单位元，我们称之为含幺半群

4.  如果还有逆元，那么含幺半群就成为了群

5.  在群的基础上，满足交换律，就得到了阿贝尔群（交换群）

环，交换环，域
--------------

考虑一个代数结构$<R,+,\times>$，如果$<R,+>$是阿贝尔群，$<R,\times>$是含幺半群，且乘法对加法满足分配律，我们称这个代数结构为环。

如果$<R,\times>$还有交换律，我们称之为交换环。

如果$<R,\times>$也是阿贝尔群，那么我们称之为域。

数域
----

这时，我们可以理解数域，**整数环**，**一元多项式环**，这些说法了。

任一数域必定包含$0,1$。

最小的数域是有理数域。

多项式
======

首先引入一些概念

多项式$f(x)$最高次项的次数称作多项式的次数。

多项式的次数有以下性质

1.  $\deg(f(x) \pm g(x)) = \max(\deg f(x) ,\deg g(x))$

2.  $\deg(f(x)g(x)) = \deg f(x) + \deg g(x)$

与整数环上类似，多项式也有带余除法，并可以引出因式和整除的概念。

综合除法
--------

带余除法中，我们考虑$g(x) = x - c$时的情形

**（余数定理）：**$g(x) = x - c \Rrightarrow r(x) = f(c)$

设$f(x) = \sum_{i = 0}^n a_i x^i , q(x) = \sum_{i = 0}^{n - 1} b_i x^i$由余数定理$f(x) = q(x) g(x) + f(c)$应用待定系数我们有

$$b_{n - 1} = a_n$$ $$b_{n - 2} = a_{n - 1} + b_{n - 1} c$$ $$\cdots$$

这时我们就得到了综合除法的计算方法

如果我们继续对$q(x)$应用综合除法，我们最终会得到一个关于$(x - c)$的多项式。

多项式的根
----------

$x = c$是$f(x)$的根$\Leftrightarrow (x - c) | f(x)$证明根据余数定理即得。

根据余数定理，令$f(c) = 0$即得

$\deg f(x) \leq n$，且$f(x) \neq 0$则$f(x)$有不超过$n$个根

根据上一定理反设有超过$n$个根即得矛盾

$f(x),g(x) \in \mathbb{F}[x],\deg f(x) \leq n,\deg g(x) \leq n$，若$f(x)$和$f(x)$在$n + 1$个点取值相同，那么这两个多项式相同

构造$h(x) = f(x) - g(x)$则其有$n + 1$个零点，那么$h(x) = 0$

Lagrange 插值多项式
-------------------

我们考虑这样的问题：给定平面上的$n + 1$个点$(a_i,b_i)$，求出一个经过这$n +1$个点的多项式函数。根据上述定理，这个多项式显然是唯一的。

我们考虑这个问题的简化版本，如果$b_i \neq 0,b{j \neq i} = 0$，我们求出满足条件的函数$f_i$，必然有
$$f_i(x) = c(x - a_1)\cdots(x - a_{i - 1})(x - a_{i + 1})\cdots(x - a_n)$$
代入条件$f_i(x_i) = b_i$，我们得到
$$c = \frac{b_i}{(a_i - a_1)\cdots(a_i - a_{i -1})(a_i - a_{i + 1})\cdot(a_i - a_n)}$$
这时我们令$f(x) = \sum_{i = 1}^n f_i(x)$就得到了要求的Lagrange多项式

如果令$F(x) = \prod_{i = 1}^{n + 1} (x - a_i)$我们可以得到更加优雅的形式
$$f(x) = \sum_{i = 1}^n\frac{b_i F(x)}{(x - a_i)F^\prime(a_i)}$$

最大公因式
==========

我们首先定义最大公因式为可以整除两个多项式的所有公因式的因式。

下面考虑最大公因式的存在性与唯一性，唯一性由两个多项式互相整除，之间只能相差一个倍数给出，存在性由Eucildean算法给出。

欧几里得算法的过程
------------------

我们进行辗转相除，设$r_3(x) = 0$ $$f(x) = q_1(x) g(x) + r_1(x)$$
$$g(x) = q_2(x)r_1(x) + r_2(x)$$ $$r_1(x) = q_3(x)r_2(x) + r_3(x)$$
假设$r_3(x) = 0$我们就得到了最大公因式$r_2(x)$

Bezout等式
----------

对于任意$f(x),g(x)$存在$u(x),v(x) \in \mathbb{F}$使得$$u(x)f(x) + v(x)g(x) = \gcd(f(x),g(x))$$

我们只考虑上面欧几里得算法的简单情况
$$\gcd(f(x),g(x)) = r_2(x) = g(x) - q_2(x)r_1(x) = g(x) - q_2(x)(f(x) - q_1(x)g(x))$$
将这个式子略加整理，我们就得到了
$$r_2(x) = -q_2(x)f(x)+ (q_1(x)q_2(x) + 1) g(x)$$
其他情况类似，可以递归导出。

根据$f(x),g(x)$求$u(x),v(x)$的过程也可以用矩阵描述，更加简洁。

**值得注意的一件事是这里的$u(x),v(x)$均不是唯一的，可以给出下面的例子**
$$[u(x) + g(x)]f(x) + [v(x) - f(x)]g(x) = \gcd(f(x),g(x))$$

因式分解
========

互素
----

下面在多项式环上引入互素的概念，如果两个多项式的最大公因式为$1$那么我们称这两个多项式互素。

$f(x),g(x)$互素等价于存在$u(x),v(x) \in \mathbb{F}[x]$使得$u(x)f(x) + v(x)g(x) = 1$

注意互素是一个与数域无关的概念，如果数域$\mathbb F \in \mathbb K$，那么在$\mathbb F[x]$中互素的两个多项式在$\mathbb K[x]$中一定互素

下面介绍互素的一些性质

若$f(x),g(x)$互素且$f_1(x) | g(x),f_2(x)|g(x)$那么一定有$f_1(x)f_2(x)|g(x)$

根据性质条件，我们设$g(x) = f_1(x)s_1(x) = f_2(x)s_2(x), u(x)f_1(x) + v(x)f_2(x) = 1$
$$g(x) = g(x) \times 1 = g(x)u(x)f_1(x) + g(x)v(x)f_2(x) = f_1(x)f_2(x) (u(x)s_1(x) + v(x)s_2(x))$$
这说明了$f_1(x)f_2(x) | g(x)$

设$\gcd(f(x),g(x)) = 1,f(x) | g(x)h(x)$则有$f(x) | h(x)$

$$u(x)f(x) + g(x)v(x) = 1$$ 再次应用上一性质证明过程中的变形技巧。
$$h(x) = h(x)u(x)\mathbf{f(x)} + \mathbf{f(x)g(x)}v(x)$$

设$\gcd(f(x),g(x)) = d(x)$那么$\gcd(\frac{f(x)}{d(x)} , \frac{g(x)}{d(x)}) = 1$

设$\gcd(f(x),g(x)) = d(x)$那么$\gcd(f(x)t(x), g(x)t(x)) = t(x)d(x)$

设$\gcd(f_1(x),g(x)) = 1, \gcd(f_2(x),g(x)) = 1$则有$\gcd(f_1(x)f_2(x),g(x)) = 1$

根据Bezout等式，我们有 $$u_1(x)f_1(x) + v_1(x)g(x) = 1$$
$$u_2(x)f_2(x) + v_2(x)g(x) = 1$$ 两式相乘即得对应结论的Bezout等式

不可约多项式
------------

如果一个多项式$f(x)$不能写成两个次数更低的多项式的乘积，那么我们称$f(x)$为不可约多项式。

从这个定义中，我们可以看出来，不可约多项式在多项式环中的地位和素数在数论中的地位相近。

同互素的概念不同，不可约多项式是一个和数域有关的概念。

我们将不可约多项式的性质列举如下

1.  若$f(x) \in \mathbb{F}[x]$不可约，则$\forall c \in \mathbb F,c \neq 0$，$cf(x)$不可约

2.  若两个数域$\mathbb{F \in K}$，$f(x)$在$\mathbb{K}[x]$上不可约，那么在$\mathbb {F}[x]$上一定不可约。（数域的扩充为因式分解提供了更多可能性）

3.  设$f(x) \in \mathbb F[x]$是不可约多项式，且$f(x) | g(x)h(x)$那么一定有$f(x)|g(x)$或$f(x)|h(x)$

4.  设$f(x) \in \mathbb F[x]$是不可约多项式，则$f(x)|g(x)$或$\gcd(f(x),g(x)) = 1$

### $\mathbb C[x]$上的不可约多项式

**代数基本定理：**复数域上的$n$次多项式必定有一个根。

由此可自然地推出$n$次多项式一个有$n$个根，在这里整理几种证明

由代数基本定理可知，在$\mathbb F[x]$上，不可约多项式即为一次多项式。

### $\mathbb R[x]$上的不可约多项式

首先在实数域上有虚根成对定理

实数域上一元$n$次方程虚根成对出现

共轭运算与幂运算交换，对原方程取共轭即得。

因此，$\mathbb R[x]$上的不可约多项式为一次多项式和满足$b^2 < 4ac$的二次多项式

### $\mathbb Q[x]$上的不可约多项式

首先我们指出，在$\mathbb Q[x]$上的多项式与在$\mathbb Z[x]$上的多项式无本质差别，只相差一个整数倍。我们考虑$\mathbb Z[x]$上的情况。

设$f(x) \in \mathbb Z[x], f(x) = a_nx^n + a_{n - 1}x^{n - 1} + \cdots + +a_1 x + a_0$若$f(\frac rs) = 0$，其中$r,s \in \mathbb Z$则
$$r | a_0 , s | a_n$$

将方程$f(\frac rs) = 0$两边同时乘以$s^n$并调整，得到下述方程
$$a_nr^n + a_{n - 1} r^{n-1} s + \cdots + a_1 r s^{n - 1} + a_0 s^n = 0$$
这时由互素条件，我们有$s | a_n, r | a_0$

于是我们给出了判别多项式是否有有理根的做法。
注意没有有理根并不意味着不可约，例如$f(x) = (x - 1) ^3$。

Vieta定理
=========

我们直接给出结论 $$\sum_{i = 1}^{n} x_i = - \frac{a_{n-1}}{a_n}$$
$$\sum_{1 \leq i_1 \leq \cdots \leq i_k \leq n} x_{i_1}x_{i_2}\cdots x_{i_n} = (-1)^k \frac{a_{n - k}}{a _ n}$$
$$\prod_{i = 1}^n = (-1)^n \frac{a_0}{a_n}$$

整数环知识
==========

为了对比整数环和多项式环上的性质，我们复习一些数论知识。

不定方程
--------

中国剩余定理
------------

我们考虑模线性同余方程组，其中整数$m_i$互素，$a_i$任取 $$\left\{
      \begin{array}{l}
      x \equiv a_1 \pmod{m_1} \\
      x \equiv a_2 \pmod{m_2} \\
      \cdots\\
      x \equiv a_n \pmod{m_n} \
      \end{array}
    \right.$$

方程组的解为
$$x \equiv \sum_{i = 1}^n a_i \frac{N}{m_i} [(\frac{N}{m_i})^{-1}]_{m_i} \pmod N$$

而我们在一元多项式环上，也有带余除法的性质，因此CRT在多项式环上也有对应表现。比如Lagrange插值多项式。

重新考虑插值问题，也可以理解为一个模线性同余方程组。

$$\left\{
      \begin{array}{l}
      f(x) \equiv b_1 \pmod{x - a_1} \\
      f(x) \equiv b_2 \pmod{x - a_2} \\
      \cdots\\
      f(x) \equiv b_{n + 1} \pmod{x - a_{n + 1}} \
      \end{array}
    \right.$$

而结果
$$f(x) = \sum_{i = 1}^{n + 1} b_i \frac{F(x)}{(x - a_i)} * [(\frac{F(x)}{x - a_i}) _{a_i}]^{-1}$$
也有着高度的一致性。

有必要讨论一下多项式环上的中国剩余定理。在多项式环上，已经有了素数，不可约多项式的概念，
而两者的不一致处来自于我们所求的插值多项式是在模$\prod_{i = 1}^{n + 1}(x - x_i)$的意义下进行的，与中国剩余定理求最小值的情况类似。

多项式内容补充
==============

重因式
------

为了讨论重因式，首先需要引入多项式的**形式微商**，这里的形式微商套用了数学分析中的概念，但是避开了连续性等问题。

多项式的形式微商满足分析中我们熟知的微分运算法则

设$f(x) \in \mathbb{F}[x]$，若$\mathbb{F}[x]$内的不可约多项式$p(x)$是$f(x)$的$k$重因式，那么$p(x)$是$f^\prime(x)$的$k - 1$重因式。

按假设$f(x) = p^k(x) q(z)$，且$p(x) \nmid q(x)$这时，我们有

$$f^\prime(x) = kp^{k-1}(x)p^\prime(x)q(x) + p^k(x)q^\prime(x)$$
故有$p^{k-1}(x) \mid f^\prime(x)$，我们下面只需要证明$p^k \nmid f^\prime (x)$，先设$f^\prime(x) = p^k(x)q_1(x)$，于是有

$$kp^\prime(x) q(x) + p(x)q^\prime(x) = p(x) q_1(x)$$

于是$p(x) \mid kp^\prime (x)$，$\deg p(x) > \deg p'(x)$矛盾

根据该定理容易证明下面两个推论

不可约多项式$p(x)$是$f(x)$的$k$重零点的充要条件是$p(x) \mid f^{(i)}(x), (i = 0,1,\cdots,k-1)$，但$p(x) \nmid f^{(k)}(x)$

在$f(x) \in \mathbb{K}[x]$的素因式的标准分解式中仅出现不可约多项式的一次方幂的充要条件是
$$(f(x),f'(x)) = 1$$

首先，$\mathbb {K}[x]$中的一次多项式都是不可约多项式，若将上面的结论应用到$p(x) = x - a$这一特殊情况，我们就可以得到对$k$重零点的讨论。

多项式环上的中国剩余定理
------------------------

### 理想

对于一个环来说，**理想**是一个类似于线性空间的子空间的概念。

设$I$为$\mathbb{K}[x]$的一个子集，若满足以下条件

1.  $f(x),g(x) \in I$，则$f(x) - g(x) \in I$

2.  若$f(x) \in I$，则对任意$g(x) \in \mathbb{K}[x]$，有$g(x)f(x) \ in I$

则我们称$I$为$f(x)$的一个**理想**

$\{0\}$和$\mathbb{K}[x]$都是理想，我们称之为**平凡理想**，其他理想称为**非平凡理想**，$\{0\}$又称**零理想**。

对任意$f(x)\in \mathbb{K}[x]$定义

$$(f(x)) = \{u(x)f(x) \mid u(x) \in \mathbb{K}[x]\}$$

容易验证其为$\mathbb{K}[x]$上的一个理想，称为$f(x)$生成的**主理想**

下面的命题将所有理想化归到主理想讨论。

设$I$是$\mathbb{K}[x]$的一个非零理想，则存在$\mathbb{K}[x]$内的首一多项式$f(x)$，使得$I = (f(x))$

这里暂不深入讨论

### 同余

设$I$是$f(x)$的一个理想，如果$f(x),g(x)\in \mathbb{K}[x]$，且$g(x) - f(x) \in I$，则称$g(x)$与$f(x)$模$I$同余

设$I$为非平凡理想，则$I = (m(x))$其中，$m(x) \in \mathbb {K}[x]$，且满足$\deg m(x) \geq 1$，这时有

$$g(x) \equiv f(x) \mod I \Leftrightarrow m(x) \mid (g(x) - f(x))$$

所以我们写$g(x) \equiv f(x) \mod m(x)$称$g(x)$与$f(x)$模$m(x)$同余。

首先可以验证同余有以下性质

1.  反身性

2.  对称性

3.  传递性

因此同余关系是等价关系，$\mathbb{K}[x]$内的多项式也按模$m(x)$同余划分成互不相交的同余类

### 中国剩余定理

首先给出一个引理

设$q_1(x),\cdot,q_r(x)$是$\mathbb{K}[x]$中两两互素且次数大于等于$1$的多项式，则对任一$i(1\leq i \leq r)$，存在多项式$h_i(x) \in \mathbb{K}[x]$，使得
$$h_i(x) \equiv 1 \mod q_i(x), h_i(x) \equiv 0 \mod q_j(x)$$

对任一$j \neq i$，有$(q_i(x),q_j(x)) = 1$，于是存在$u_j(x),v_j(x) \in \mathbb{K}[x]$，使得$u_j(x)q_i(x) + v_j(x)q_j(x) = 1$，令
$$h_i(x) = \prod_{j = 1,j \neq i} ^{r} v_j \cdot q_j$$

显然，我们有$h_i(x) \equiv 0 \mod q_j(x) (j \neq i)$且

$$h_i(x) = \prod_{j \neq i}(1 - u_j q_i) = 1 + u q_i \equiv 1 \mod q_i$$

根据这个引理，中国剩余定理的构造就显然了。

多项式与数域
------------

本章中，我们设数域$\mathbb{K}$是数域$\mathbb{F}$的扩域

多项式之间的整除关系不随数域的扩大而改变

设在数域$\mathbb{F}[x]$中$f(x) \mid g(x)$，则存在$h(x) \in \mathbb{F}[x]$，使得$g(x) = f(x)h(x)$，自然$h(x) \in \mathbb{K}[x]$，于是在数域$\mathbb K[x]$上，也有$f(x) | g(x)$

值得我们考虑的是，当数域缩小的时候，多项式之间的整除关系是否会改变。

多项式之间的整除关系不随数域的扩大和缩小改变

数域扩大的情况已证。

设$f(x),g(x) \in \mathbb{F}[x]$而在数域$\mathbb K$中$f(x) \mid g(x)$，由此根据$\mathbb{K}[x]$中的带余除法，$\exists q(x) \in \mathbb{K}[x]$使得$g(x) = q(x)\cdot f(x)$
，若$q(x)$的系数中有不属于$\mathbb F$的系数，那么$g(x)$的系数也会出现不属于$\mathbb F$的系数，与$g(x)\in \mathbb{F}[x]$矛盾。

多项式的首1最大公因式不随数域的改变而改变。

在数域$\mathbb{K}$中，由Bezout等式$\gcd_{\mathbb F} = u(x)f(x) + v(x)g(x)$，而$gcd_{\mathbb K} \mid (u(x)f(x) + v(x)g(x)) = \gcd_{\mathbb{F}}$，另一方面$\gcd_{\mathbb{F}} \in \mathbb{K}[x]$，因此$\gcd_{\mathbb{F}} \mid \gcd_{\mathbb{K}}$

而多项式的可约性是随着数域的改变而改变的。


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