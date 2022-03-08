---
title: "Lecture3: Search 2"
---

## Constraint Satisfaction Problems

!!!Definition

    A constraint satisfaction problem $P = (X,D,C)$

    - Variables: $X = \{X_1,\cdots,X_n\}$
    - Domains: $D = \{D_1,\cdots, D_n\}$
    - Constraints: $C$

    An assignment of values to some or all of the variables

    $$ \{X_i = v_i, X_j = v_j, \cdots\} $$

    A complete assignmet is one in which every variable is assigned

    A **solution** to a CSP is a **consistent and complete** assignment.

!!!Example

    - Map Coloring
    - N-Queens
    - Sudoku
    - The Waltz Algorithm
        - Interpreting line drawings of solid polyhedra

### Constraint Graphs

- Binary CSP: each constraint relates at most two variables
- Binary constraint graph: nodes are variables, arcs show constraints

- General-purpose CSP Algorithms
    - Use the graph structure to speed up search

### Real-World CSPs

- Many real-world problems involve **real-valued** variables

### Backtracking Search

#### Standard Search Formulation

Standard search formulation of CSPs:
- States: the values assigned so far (partial assignments)
- Initial state: the empty assignment
- Successor function:assign a value to an unassigned variable
- Goal test:complete and satisfy all constraints

#### Backtracking Search

**Idea 1:** One variable at a time

- Variable assignments are commutative, so fix ordering

**Idea: 2:** Check constraints as you go

**Backtracking Search = DFS + variable-ording + fail-on-violation**

### Dynamic Ordering

#### Choosing an Unassigned Variable

*Key idea: most constrained variable*

#### Order Values of a Selected Variable

*Key idea: least constrained value*

#### Conflicting Heuristics?

- Most constrained variable (MCV)
- Least constrained value (LCV)

*Combining these ordering ideas makes 1000 queens feasible*

### Arc Consistency

#### Interleaving Search andInference

- Filtering: Keep track of domains for unassigned variables and infer new domain reductions

"Inference": check on the graph

#### Filtering: Forward Checking

"one-setp lookahead"

#### Arc Consistency

!!!definition
    
    An arc $X_i \to X_j$ is consistent iff for every $x_i \in \mathrm{Domains_i}$, there exist $x_j \in \mathrm{Domains_j}$ which can be assigned without violating a constraint

- Enforce arc consistency: Remove values from $Domains_i$ to make arc conststent
- Forward checking: Enforcing consistency of arcs pointing to each new assignment.

#### AC-3

- repeatedly enforce arc consistency on constraint chains

- Assume a CSP with
    - $n$ variables, each with domain size at most $d$, $c$ binary constraints
    - The complexity of AC-3: $O(c\cdot d \cdot d^2)$

### Problem Structure

#### Tree Structured CSPs

!!!Theorem
    if the constraint graph has no loops, the CSP can be solved in linear time $O(nd^2)

    - Compare to general CSPs, where worst-case time is $O(d^n)$

## Local Search

### Hill Climbing

- Sometimes called greedy local search

- Simple and general idea
    - start wherever
    - Repeat: move to the best neighboring state
    - If no neighbors better than current, quit
  
- Problems:
    - Local maximum, shoulder: "flat local maximum"

### Simulated Annealing

### Local Beam Search

*Basic idea: greedily keep $k$ states at all times*

- Information is shared among $k$ search threads.

#### Stochastic Beam Search

### Genetic Algorithm
