---
title: Context-Free Grammer
---

## Pushdown automaton

**A stack is valuable because it can hold an unlimited amount of information.**

!!!Warning
    Deterministic and nondeterministic pushdown automata are not equivalent in power

### Formal Definition of A Pushdown Automaton

!!!Definition

    Q pushdown automaton is a 6-tuple $(Q, \Sigma, \Gamma, \delta, q_0, F)$，where $Q, \Sigma,\Gamma,F$ are all finite sets,and

    - $\Gamma$ is the stack alphabet
    - $\delta: Q \times \Sigma_\epsilon \times \Gamma_\epsilon \to \mathcal{P}(Q \times \Gamma_\epsilon)$ is the transition function

!!!Remark

    We can put a special symbol $\$$ to show if the stack is empty

### Equivalence with Context-Free Grammars

!!!Theorems

    A language is context free if and only if some pushdown automaton recognizes it.

**If a language is context free, then some pushdown automaton recognizes it.**

**Proof Idea:**

- The PDA’s nondeterminism allows it to guess the sequence of correct substitutions.
- PDA needs to find the variables in the intermediate string and make substitutions
- The way is to keep only part of the intermediate string on the stack.

**If a pushdown automaton recognizes some language, then it is context free.**

**Proof Idea:** The variables of $G$ are $\{A_{pq}\mid p, q \in Q\}$, $A_{pq}$ representing the string generated from state $p$ to state $q$

## Non-Context-Free Languages

