---
title: Lecture3
---

!!!Question

    $$ T(n) = 4T(n / \sqrt{2}) + O(n^3) $$

    $\log_b a = 4$，这是主定理的第一种情况，$T(n) = n^4$

## Divide and conquer

### Big integers multiplication

#### Divide and conquer

$$ T(n) = 3T(n / 2) + \Theta(n) $$

Case1：$T(n) = \Theta(n^{\log_b a}) = \Theta(n^{\log_2 3})$

### Matrix multiplication

#### Strassen's Divide and Conquer

$$ T(n) = \Theta(n^{\log_2 7}) $$

### Closest pair of points

#### One dimension example

$$ S_1 = \lbrace x \in S \mid x \leq m $$
$$ S_2 = \lbrace x \in S \mid x > m $$

答案为 $S_1$ 中 的最近点对， $S_2$ 中最近点对，$S_1$ 最小减 $S_2$ 最大

#### Two dimension example

## Randomized Algorithms

### Hiring Problem

### Uniform Random Permutation


```
PERMUTE-BY-SORTING

for i = 1 to n
    P[i] = Random(1, n^3)
sort A, using P as sort keys.
```

!!!Lemma 

    Procedure PERMUTE-BY-SORTING produces a uniform random permutation of the input, assuming that all priorities are distinct.

### A Better Random Permutation

```
for i = 1 to n
    swap A[i], A(Random(i, n))
```

