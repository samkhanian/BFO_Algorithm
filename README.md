# Bacterial Foraging Optimization (BFO)
> View the Persian version of this research [here](README_FA.md)
**Student:** Jamal Samkhanian  
**Course:** Artificial Intelligence  
**Professor:** Dr. Roya Namirany  

---

## Introduction
Bacterial Foraging Optimization (BFO) is a **nature-inspired optimization algorithm** introduced by Passino in 2002.  

- **Core idea:** Bacteria move intelligently in their environment to find food sources.  
- BFO simulates this behavior to solve **continuous numerical optimization problems**.  
- It is a **population-based** algorithm, meaning multiple bacteria (solutions) explore the search space simultaneously.

---

## Algorithm Steps

### 1. Chemotaxis
- Bacteria move to find food sources.  
- Two types of movement:  
  - **Tumble:** random direction change  
  - **Run:** move in a beneficial direction

### 2. Swarming
- Bacteria attract each other and move collectively toward regions of higher quality.

### 3. Reproduction
- Bacteria are ranked based on success.  
- Successful bacteria reproduce, weak ones are eliminated.

### 4. Elimination and Dispersal
- Some bacteria are randomly eliminated or moved to new locations.  
- Prevents the population from getting stuck in local minima.

---

## Features and Advantages
- **Population-based:** Multiple bacteria explore simultaneously → better coverage of the search space.  
- **Suitable for nonlinear and multidimensional problems.**  
- Resistant to local minima/maxima due to **Elimination/Dispersal**.  
- Applications: engineering optimization, control, scheduling, neural networks, combinatorial problems.

**Limitations:**  
- Many parameters need careful tuning.  
- Convergence speed may be slow in some problems.

---

## Numerical Example: Finding the Minimum of a Function

**Objective function:**  
\[
f(x) = (x-3)^2
\]

- Domain: \(x \in [0, 6]\) (integer values)  
- Goal: Find the minimum value of f(x)

### BFO Execution Steps

1. **Initial positions of bacteria:**

| Bacteria | x Initial |
|----------|-----------|
| B1       | 0         |
| B2       | 1         |
| B3       | 2         |
| B4       | 4         |
| B5       | 5         |

2. **Chemotaxis**  
- Bacteria move to reduce function value.  
- Example B1: 0 → 1 → 2 → 3 → minimum found

3. **Reproduction**  
- Successful bacteria reproduce; weak ones are removed.

4. **Elimination/Dispersal**  
- Bacteria are randomly scattered to avoid getting trapped in local minima.

### Result
- All bacteria converge to **x = 3**  
- Minimum value:  
\[
f(3) = 0
\]

---

**Summary:**  
BFO is a **population-based, multidimensional algorithm suitable for nonlinear problems**, using natural bacterial behavior to explore the search space and converge to the global optimum.
