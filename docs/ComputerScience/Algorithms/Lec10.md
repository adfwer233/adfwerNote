---
title: Lecture 10
---

## Fibonacci Heaps

!!! note

    - A Fibonacci heapis a collection of **min-heap-ordered** trees.
    - Trees within Fibonacci heaps are rooted but **unordered**.

!!!note Potential Function

    $$ \Phi(H) = t(H) + 2 m(H) $$

!!!note Maximum degree

    We assume that there is a known upper bound $D(n)$ on the maximum degree of any node in ann-node Fibonacci heap.

### Mergeable-heap operations

!!! note Insert a node
    FIB-HEAP-INSERT(H,X)

    ```
    x.degree = 0, x.p = NULL
    x.child = NULL， x.mark = FALSE

    if H.min == NIL
        create a root list for H contianing just x
        H.min = x
    else insert x into H's root list
        if x.key < H.min.key
            H.min= x
    H.n += 1
    ```

    Just Insert a node into root list.

!!! Uniting two Fibonacci heaps


    ```
    H = MAKE-FIB-HEAP()
    H.min = H1.min
    concatenate the root lists of H2 and H
    if(H1.min == NIL) or (H2.min != NIL and H2.min.key < H1.min.key)
        H.min=H2.min
    H.n=H1.n+H2.n
    return H

    ```