---
title: "Lecture9: Reasoning 1"
---

## Probabilistic Reasoning

- Probabilistic Reasoning = Modeling + Inference

## Bayesian Network

- Product rule of probability implies joint distrubution of $K$ variables
- A Bayesian network is a directed acyclic graph that specifies a joint distribution as a product of local conditional distributions, one for each node
    - $$p(x_1,\cdots,x_k) = \prod_{s= 1}^K p(x_s\mid \textbf{x}_{\Gamma(s)})$$
    - $\Gamma(s)$ denotes the set of parents of $x_s$
    - **White-Box** model