---
title: Review 1
---

## Search Problems

A search problem consist of

- A **state space** $S$
- An **initial state** $S_0$
- **Action** $A(s)$ in each state
- **Transition model** $Result(s,a)$
    - A successor function
- A **goal test** function $G(s)$
- **Action cost** $c(s,a,s')$

**optimal solution**: has least coat among all solutions

### Search and Models

*A search problem seems reasonable, but it is still a model*

### General Tree Search

- explored set
- frontier: a specific work list(stack, queue, priority queue)

### Graph Search

- Graph search algorithm overlays a growing tree on a graph

## Uninformed Search

### DFS

Frontier is a LIFO **stack**

!!!Remark
    - The DFS isn't complete beacause $m$ could be infinite.
    - DFS is not optimal, it finds the "leftmost" solution

### BFS

Frontier is a FIFO **queue**

!!!Remark
    - BFS is complete.
    - If the costs are equal, BFS is optimal.

### IDFS

**Complete and Optimal**

### UCS

Frontier is a **priority queue** sorted by a cost function $g(n)$, giving the cost from root to $n$. 

**Complete and optimal**.

## Informed Search

### $A^*$ Search

- Combining UCS and Greedy Search
    - sorted by $f(n) = g(n) + h(n)$

#### When Should $A^*$ Terminate

- only stop when we dequeue a goal

#### Is $A^*$ Optimal

!!!Definition

    **Admissible Heuristics: **

    $$ 0 \leq h(n) \leq h^*(n) $$

    $h^*(n)$ is the true cost to a nearest goal

- Assume:
    - $A$ is an optimal goal node, $B$ is a suboptimal goal node
    - $h$ is admissible
- Claim: $A$ will exit the frontier before $B$
  

#### $A^*$ Graph Search

!!!Definition

    **Consistency**: Heuristic "arc" cost $\leq$ actual cost for each arc

    $$ h(n) - h(n') \leq c(n, a, n') $$

!!! Theorem

    Consistency implies admissibility

**Consistency guarantees optimality of $A^*$ graph search**

## Constraint Satisfaction Problems

### What is Search For

- **Planning**: sequences of actions
- **Identification**: assignments to variables

### CSP

A **constraint satisfaction problem** $P= (X, D, C)$

- Variables: $X$
- Domains: $D$
    - Each domain $D_i$ for $X_i$
- Constraints: $C$

### Imporving Backtracking

- Ordering
    - Which **variable** should be assigned next?
    - In what order should its **values** be tried?
- Filtering
    - Can we detect inevitable failure early
- Structure
    - Can we exploit the problem structure

### Dynamic Ording


#### Choosing an Unassigned Variable

- Which variable to assign next? Why?
    - **most constrianed variable**
    - Choose variable that has the fewest consistent values

#### Order Values of a Selected Variable

- What values to try for $Q$ ?
    - **least constrained value**
    - Order values of selected $X_i$ by decreasing number of consistent values of neighboring variables

### Arc Consistency

#### Interleaving Search and Inference

- Filtering: Keep track of domains for unassigned variables and infer new domain reductions

- **Forward checking**: After assigning a variable $X_i$, eliminate inconsistent values from the domains of $X_i$'s neighbors.

#### Arc consistency

!!! Definition

    An arc $X_i \to X_j$ is consistent iff for every $x_i \in Domains_i$, there exists $x_j \in Domains_j$ which can be assigned without violating a constraint.

- **Enforce arc consistency**: Remove values from $Domains_i$ to make arc consistent.
- **Constraint propagation**: reasoning from constraint to constraint

### AC-3

- **Idea**: repeatedly enforce arc consistency on constraint chains.
- **implementation**: A queue to implement "Constraint propagation"
- **only for binary constraints**

- Assume a CSP with:
  - $n$ variables, each with domain size at most $d$, $c$ **binary** constraints.
- The Complexity of AC-3 $O(c \cdot d \cdot d^2)$

## Local Search

### Local Search: Motivation

- Solving CSPs is often NP-hard
- Local search
    - faster and memory efficient
    - incomplete and suboptimal
- Useful method in practice

### Hill Climbing

- "greedy local search"
- Hill Climbing Variants 
    - Stochastic hill climbing: chooses at random from uphill moves.
        - The probability of selection van vary with the steepness
    - Random-restart hill climbing

### Simulated Annealing

- Cooling schedule: a gradual reduction from a high value to 0
    - Exponential cooling often works best, typically at a rate of $0.7 \sim 0.9$

### Local Beam Search

- **Basic idea**: greedily keep $k$ states at all times.
    - Begin with $k$ randomly generated states

- Beam Search: a **path-based** algorithm

### Genetic Algorithm

## Games

### Types of Games

- Games = task environment with more than I agents
- Axes
    - Deterministic or stochastic
    - Perfect information
        - Fully observable
    - Two, or more players?
    - Turn-taking or simultaneous
    - Zero sum?
- 

## Adversarial Search


### Value of a State

- **Value of a state**: the best achievable outcome(utility) from that state

For the not-terminal states:

$$ V(s) = \max_{a \in Action(s)} V(Result(s,a)) $$

For the Terminal states:

$$ V(s) = Utility(s) $$

### Adversarial Game Trees

How do we define best and worst? **Alternate max and min**

### Minimax Properties

- Assume: all future moves will be optimal
- What if MIN does not play optimally?

!!! Definition

    Minimax values produce polices

    $$V_{minimax} \Rightarrow \pi_{max}, \pi_{min}$$

    To play $\pi_{agent}$, $\pi_{opp}$ against each other, which produces utility

    $$V(\pi_{agent}, \pi_{opp}$$

!!! Theorem

    **lower bound against any oppent**

    $$V(\pi_{max}, \pi_{min}) \leq V(\pi_{max}, \pi_{opp}) \quad \forall \pi_{opp}$$

    **best against minimax opponent**

    $$V(\pi_{max}, \pi_{min}) \geq V(\pi_{agent}, \pi_{min}) \quad \forall \pi_{agent}$$


### Alpha-Beta Pruning

