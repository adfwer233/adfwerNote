---
title: "Lecture2: Search1"
---

## Search Problems

- state space  $S$
- initial state $s_0$
- Action $A(s)$
- Transition model $Result(s,a)$
- goal test $G(s)$
- Action cost $c(s,a,s')$

## Uninformed Search

### Uniform Cost Search Properties

**Strategy: expand lowest $g(n)$ := cost from root to $n$**

Frontier is a **priority queue** sorted by $g(n)$

> **Complete** when $\epsilon > 0$


## Informed Search

### Heuristic Search

A heuristic is
- A function that estimates how close a state is to a goal
- Example: Manhattan distance, Euclidean distance for pathing

### A* Tree Search

**Strategy: Combining UCS and Greedy Search**
- Sorted by $f(n) = g(n) + h(n)$
    - $g(n)$: uniform cost by path cost
    - $h(n)$: greedy function

#### When Should A* Terminate

**Only stop wehn we dequeue a goal**

#### Optimality

Admissible Heuristics: A heuristic $h$ is admissible if:

$$ 0 \leq h(n) \leq h^*(n) $$

!!!Theorem "Optimality of A^* search"

Assume:
- $A$ is an optimal goal node, $B$ is a suboptimal goal node
- $h$ is admissible

Claim: $A$ will exit the frontier before $B$

#### Efficiency

A^* explores all state $s$ satisfying

$$ g(s) \leq g(s_{goal}) - h(s) $$

A^* is more efficient than UCS.

### A^* Graph Search

**Admissibility:**

**Consistency:** heuristic "arc" $\leq$ actual cost for each arc

$$ h(n) - h(n') \leq c(n, a, n')  $$