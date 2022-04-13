---
title: Lecture 7
---

## Longest common subsequence

## Optimal binary search trees

!!! Definition

    Given a sequence $K = (k_1, \cdots, k_n)$ of $n$ distinct keys in sorted order, and $n + 1$ dummy keys, $d_0,\cdots d_n$ for values not in $K$, we wish to build a binary search tree.

    $d_i$ represents all values between $k_i$ and $k_{i + 1}$

    For each key $k_i$, we have a probability $p_i$ that a serach will be for $k_i$; and for each dummy key $d_i$, we have a probability $q_i$

    $$\sum_{i = 1}^n p_i + \sum_{i = 0}^{n} q_i = 1$$

    Expected cost of a search in a binary search tree T

    $$T = 1 + \sum_{i = 1}^n depth_T(k_i) \ p_i + \sum_{i = 0}^n depth_T(d_i) \ q_i$$

### The optimal structure

!!! note "Obs"

    The subtree of the optimal binary search tree is optimal.

### The translation equation

Define $e[i,j]$ as the expected cost of searching an optimal binary search tree.

!!! notions

    $w(i,j)$ the sum of probabilities:
    
    $$w(i,j) = \sum_{k=i}^j p_k + \sum_{k = i-1}^{j} q_k$$

We have the translation equation

$$e(i, j) = e(i, r - 1) + e(r + 1, j) + w(i,j) \quad \text{for some } r \in (i, j)$$

### Time complexity

This is a $O(n^3)$ solution. A tiny optimization can make the complexity to $O(n^2)$. 

*1974, A. V. Aho, J. E. Hopcroft, and J. D. Ullman*

## Greedy Algorithm

### Activity-selection

!!! Question

    Suppose we have a set of $n$ activities, activity $a_i$ has a given start time $s_i$ and a end time $f_i$. 
    
    The Goal is to find the number of maximum-size of mutually compatible activities.

!!! Theorem

    Consider any $S_k \neq \emptyset$, Let $a_m$ be the activity in $S_k$ with the **earliest** finish time.

    Then $a_m$ is used in some maximum-size subset of mutually compatible activities of $S_k$

    !!! Proof

        Suppose that $A_k$ is a maximum-size subset, construst a new optimal solution $A_k'$ containing $a_m$

        