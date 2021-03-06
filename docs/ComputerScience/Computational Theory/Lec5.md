---
title: "Lecture 5"
---

**文法**是一个四元组 $G = (V,T,S,P)$

- $V$ 变量的集合
- $T$ 终结符的集合
- $S$ 开始变量
- $P$ 产生式的集合

- 由变量和终结符构成的字符串称为句型；
- 由终结符构成的字符称为句子

## 线性文法

线性文法：产生式右侧至多有一个变量

右线性文法

$$ A \rightarrow xB \quad or \quad A \rightarrow x$$

左线性文法

$$ A \rightarrow Bx \quad or \quad A \rightarrow x $$

右线性文法或左线性文法称为正则文法

## 正则文法和正则语言

!!!Theorem

    正则文法产生的语言的集合等于正则语言的集合

先证明正则文法 $G$ 产生的语言 $L(G)$ 为正则语言。我们对于一个右线性文法构造一个 NFA，设变量为 $V_i$，产生式为 $V_i \to a_1a_2\cdots a_m V_j$ 或 $V_i \to a_1a_2,\cdots,a_m$

构造NFA，每个变量 $V_i$ 对应其中状态并增加一个终态 $V_F$。对于每个产生式添加转移和中间状态，第一种转移到 $V_j$，第二种转移到 $V_F$

下面证明正则语言为正则文法产生的语言，这通过 NFA 对状态转移添加产生式即可。

## 积自动机


