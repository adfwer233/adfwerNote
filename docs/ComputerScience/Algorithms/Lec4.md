---
title: Lecture4 
---

## Building a heap

对应的算法：
```
A.heap-size = A.length

for i = A.length / 2 downto 1
    MAX-HEAPIFY(A, i)
```

这实际上是一个线性的算法，我们下面来说明它是线性的。

考虑一个高为 $\log n$ 的堆，考虑它的第 $h$ 层

!!!Property
    An n-element heap has height $\lfloor \log n \rfloor$ and at most $\lceil n / 2^{h+1} \rceil$ nodes of any height $h$.

There is a upper bound

$$ \sum_{h = 0}^{\lfloor \log n \rfloor} \frac{n}{2^{h+1}}O(h)  = O \left( n\sum_{h = 0}^{\lfloor \log n \rfloor} \frac{h}{2^h} \right) = O\left( n\sum_{h = 0}^{\infty} \frac{h}{2^h} \right) = O(n)$$

## Quick sort

### Expected time analysis

Let $T(n)$ be the random variable for the running time of RANDOMIZED-QUICKSORT

Define the **indicator random variable**

$$
X_k = 1_{it generate spilt $k$ and $n - k - 1$}
$$

We have 

$$ E(X_k) = P{X_k = 1} = \frac{1}{n} $$

$$ E(T(n)) = E(\sum_{k = 0}^{n - 1} X_k(T_k) + T(n -k - 1) + \Theta(n)) $$

$$ E[T(n)] = \frac{2}{n} \sum_{k = 0}^{n - 1} E[T(k)] + \Theta(n) $$

Assume that $E[T(n)] = O(n \log n)$

$$ E[T(n)] \leq \frac{2}{n} \sum_{k=2}^{n-1} ak \log k + \Theta(n) \leq \frac{2a}{n} (\frac{1}{2}n^2\log n - \frac{1}{8}n^2) + \Theta = O(n\log n)$$

!!!Remark

    $$ \sum_{k=2}^{n-1} k \log k \leq \frac{1}{2}n^2 \log n - \frac{1}{8} n^2$$

maybe the following inequality also works

$$ \sum_{k=2}^{n-1} k \log k \leq \frac{n(n-1)}{2} \log n $$

!!!Lemma
    Let $X$ be # comparisons in Partition over entire execution of Quciksort on an $n$-element array. Then the running time of QuickSort is $O(n + X)$

We define the indicator

$$ X_{ij} = I_A$$

$A$ means that $z_i$ is compared to z_j

We have the partition of random variable

$$ X = \sum_{i = 1}^{n - 1} \sum_{j = i +1}^{n} X_{ij}$$

We have the following Expection

$$E[X_{ij}] = \frac{2}{j - i + 1}$$

Then by the linearity of Expection

$$ E[X] =\sum_{i = 1}^{n - 1} \sum_{j = i +1}^{n} \frac{2}{j - i + 1} $$

By the knowledge of harmonic series

$$E[x] = O(n\log n)$$

### Why the quicksort quick

it compare with a continue array in memory

<center>
**It hit the crash more often !**
</center>