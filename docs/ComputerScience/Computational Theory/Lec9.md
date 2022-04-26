---
title: Lecture 9
---

## PDA 介绍

状态转移的记号

$$ a, b \to c$$

$a,b,c$ 分别为输入符号，栈弹出符号，栈压入符号。

- $b,c$ 均允许 $\epsilon$，$b \to \epsilon$ 表示 pop，$\epsilon \to \epsilon$ 表示 No change。
- 出现不容许的迁移时，会停机且拒绝输入串。

### 状态转移函数

$$\delta(q_1, a, b) = \{(q_2, w)\}$$

这里的 $w$ 为压入串，比如 $w = cdf$ 时，依次将 $fdc$ 压入栈中。

## PDA 的定义

!!! Definition
    
    PDA 为七元组 $P = (Q, \Sigma, \Gamma, \delta , q_0 ,Z_0, F)$

    - 有限状态集合：$Q$
    - 有限输入字母表：$\Sigma$
    - 有限栈字符：$\Gamma$
    - 转移函数：$\delta$
    - 初始状态：$q_0$
    - 栈初始符号：$Z_0$
    - 终态集合：$F$

    空栈型 PDA 为六元组，没有终态集合

一个字符串被 DFA 拒绝，如果满足：

- 输入字符串不能读完
- 或最后不能落在 PDA 的终态

字符串接受与否，与栈中元素无关。

## PDA 的即时描述

!!! Definition
    
    PDA 的即时描述（ID）是一个三元组

    $$(q,w,\gamma)$$

    分别为：当前状态，未读剩余输入，栈中当前符号

    $\gamma$ 从左到右为栈从栈顶到栈底

!!! Definition

    设 PDA $P = (Q, \Sigma, \Gamma, \delta , q_0 ,Z_0, F)$，$\vdash_P$ 或 $\vdash$ 满足

    若 $(p,\alpha) \in \delta(q, a, X)$

    则 $(q ,aw, X\beta) \vdash (p, w, \alpha\beta)$


!!! Definition

    $\vdash^*_P$ 或者 $\vdash^*$ 定义为 ID 的传递闭包

!!! Theorem

    若 $(q, x, \alpha) \vdash^* (p, y, \beta)$
    
    那么，对于任意的 $w \in \Sigma^*$ 且 $\gamma \in \Gamma^*$
    
    $$(q, xw, \alpha \gamma) \vdash^* (p, yw, \beta \gamma)$$

## PDA 的语言

!!! Definition "终态型 PDA 的语言"

    $$L(M) = \lbrace w \mid w \in \Sigma^* (q_0, w, z_0) \vdash^*_M (q_f,\epsilon,u), u\in \Gamma^* \rbrace$$

!!! Definition "空栈型 PDA 的语言"

    $$N(M) = \lbrace w\mid (q_0, w, Z_0) \vdash^* (q,\epsilon,\epsilon), q\in Q \rbrace$$

!!! Theorem 

    上述两种 PDA 接受的语言的集合相同。

## PDA 与 CFG 的关系

### CFG 转换 PDA

设 CFG $G = (V,T,P,S)$，构造一个空栈型 PDA：

$$M = (\{q\}, T, V \cup T, \delta, q, S)$$

转移函数 $\delta$ 定义如下：

- 对每一个 $A \in V$
    - $$\delta(q,\epsilon, A) = \{(q, \beta) \mid A \to \beta \in P\}$$
- 对每一个 $a \in T$
    - $$\delta(q, a, a) = \{(q, \epsilon)\}$$

### PDA 转换 CFG

设 PDA $M = (Q, \Sigma, \Gamma, \delta , q_0 ,Z_0)$
构造CFG $G = (V \Sigma, P, S)$，其中 $V = \{S\} \cup \{[p\times q] \mid p, q \in Q, X \in \Gamma\}$

