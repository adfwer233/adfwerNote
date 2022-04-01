---
title: "Lecture 6"
---

## 正则语言的判定性质

### 基本问题

- 给出正则语言 $L$ 和字符串 $w$，如何判定 $w \in L$
- 给定正则语言 $L$，怎样判断 $L$ 是否为空，$L = \emptyset$ ?
    - 若某一终态可达，则该语言非空
- 给出两个正则语言，判定 $L_1 = L_2$ ?
- 给定正则语言 $L$，判断 $L$ 是否无限
    - DFA 上是否有环
- 怎样判定语言是非正则的？
    - Pumping Lemma

## Pumping Lemma

!!! Theorem

    给定一无限正则语言，存在一个正整数 $m$，对 $\forall w \in L$，$\vert w \vert \geq m$，$\exists x,y,z,w = xyz$，满足：

    <center>
    $\vert xy \vert \leq m$ 且 $\vert y \vert \geq 1$
    </center>
    有
    $$w_i = xy^iz \in L, i = 0,1,2,\cdots$$

