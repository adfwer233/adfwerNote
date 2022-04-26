---
title: Lecture 9
---

## Dynamic tables

!!!Question

    How large should a hash table or an array be?

    **Goal:** Make the table as small as possible, but large enough so that it won't overflow.

    **Dynamic tables**

    - Example: vector in STL

### Analysis

Let $c_i$ be the cost of the $i$th insertion.

$$
c_i = \begin{cases}
    &i \quad \text{if $i - 1 = 2^m$} \\
    &1 \quad \text{otherwise}
\end{cases}
$$

$$
Cost = \sum_{i = 1}^n c_i \leq n + \sum_{j=0}^{\lfloor \lg n\rfloor} 2^j < 3n = \Theta(n)
$$

The average cost of each dynamic-table operation is $\Theta(n)/ n = \Theta(1)$

### Amortized analysis

!!!Definition

    An amortized analysis is any strategy for analyzing a sequence of operations to show that the average cost per operation is small, even though a single operation with in the sequence might be expensive.

    - the **aggregate** method
    - the **accounting** method
    - the **potential** method
## Aggregate analysis

### Incrementing a binary counter

!!! Definition

    incrementing a k-bit binary counter that counts upward from 0.
    

## The accounting method

!!! Definition

    The credit in the bank must not go negative, we require

    $$ \sum_{i=1}^n \hat{c_i} \geq \sum_{i=1}^n c_i $$

    for all $n$

### Accounting analysis of dynamic tables

- Charge an amortized cost of $\hat{c_i} = 3$ for the $i$th insertion.
    - $1$ pays for the immediate insertion
    - $2$ is stored for later table doubling
  
### Incrementing a binary counter

- Charge an amortized cost of $\hat{c_i}$ to set a bit to $1$
    - the other for flip back
- At any point in time, every $1$ in the counter has a dollar of credit on it, and thus we needn't charge anything to reset a bit to 0.

## The potential method

!!! Note "Idea"
    
    View credit stored as the **potential energy** of the dynamic set.

    - Start with an initial data structure $D_0$
    - Operation $i$ transforms $D_{i - 1}$ to $D_i$
    - The cost of operation $i$ is $c_i$
    - Define a **potential function** $\phi$, $\phi(D_0) = 0$, $\phi(D_i) \geq 0 \forall i$
    - The amortized cost $\hat{c_i} $ with respect to $\phi$ is defined to be $\hat{c_i} = c_i + \phi(D_i) - \phi(D_{i -1})$

    If $\Delta \phi_i > 0$, Operation $i$ stores work in the data structure for later use.

!!! note "The amortized costs bound the true costs"

    $$\sum_{i=1}^n \hat{c_i} \geq \sum_{i=1}^{n} c_i$$

### Dynamic table insertion

$$\phi(D_i) = 2 num_i - size_i$$

It's easy to check that it is a potential function.

We calculate $\hat{c_i} = c_i + \phi_{D_i} - \phi_{D_{i-1}} = 3$

### Table contraction

!!!note "When to contract"

    $\alpha(T) = num(T)/size(T) < 1/4$ is a good choice

!!!definition "Potential function"

    $$
        \phi(T) = \begin{cases}
            2 num[T] - size[T]  \quad &\text{if $\alpha(T) \geq 1/2$} \\
            size[T]/2 -num[T] \quad &\text{if $\alpha(T) < 1/2$}
        \end{cases}
    $$

### Incrementing a binary counter

We define the potential of the counter after the $i$th Increament operation to be $b_i$, the number of 1's in the counter after the $i$th operation

## Fibonacci Heaps