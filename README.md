# 🔬 Bacterial Foraging Optimization (BFO)

**Student:** Jamal Samkhanian  
**Course:** Artificial Intelligence  
**Instructor:** Dr. Roya Namiranian  

📄 Persian version of this document:  
➡️ [نسخه فارسی – BFO](sandbox:/mnt/data/BFO_FA_FULL.md)

---

## 🎯 Introduction – Biological Metaphor in AI
**Bacterial Foraging Optimization (BFO)** is a **metaheuristic optimization algorithm** introduced by  
**Kevin M. Passino (2002)** and inspired by the food-searching behavior of *E. coli* bacteria.

📌 **Biomimicry:**  
https://en.wikipedia.org/wiki/Biomimicry

📌 **Optimization:**  
https://en.wikipedia.org/wiki/Mathematical_optimization

📌 **Metaheuristic:**  
https://en.wikipedia.org/wiki/Metaheuristic

---

## 🌱 Core Idea
Bacterial behavior includes:
- Random motion (Tumble)
- Directed motion (Run)
- Reproduction
- Elimination and dispersal

📌 **Chemotaxis:**  
https://en.wikipedia.org/wiki/Chemotaxis

---

## 🔄 Algorithm Phases

### 1️⃣ Chemotaxis
Local search based on fitness improvement.

```javascript
if (newFitness > currentFitness) {
    run();
} else {
    tumble();
}
```

### 2️⃣ Swarming
Collective movement toward optimal regions.

📌 **Swarm Intelligence:**  
https://en.wikipedia.org/wiki/Swarm_intelligence

### 3️⃣ Reproduction
Best bacteria survive and reproduce.

### 4️⃣ Elimination & Dispersal
Avoidance of local optima.

📌 **Local Optimum:**  
https://en.wikipedia.org/wiki/Local_optimum

---

## 🏭 Industrial Applications
- Warehouse robot routing
- Power system scheduling
- Structural optimization
- Neural network training

📌 **Artificial Neural Network:**  
https://en.wikipedia.org/wiki/Artificial_neural_network

---

## ⚙️ Advantages & Challenges

### Advantages
- Robust against local optima
- Multi-objective capability
- Scalable

### Challenges
- Many parameters
- Computational cost

---

## 🎓 Conclusion
BFO demonstrates how simple biological behaviors can solve complex engineering problems.

---

## 📚 References
- Passino, K. M. (2002)
- IEEE Transactions
- GeeksForGeeks  
https://www.geeksforgeeks.org/bacterial-foraging-optimization-algorithm/
