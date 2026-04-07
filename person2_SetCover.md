# 👤 Person 2 — Set Cover Problem

## 🗂️ Your Folder
```
src/setcover/
├── exact.py
├── approx.py
├── analysis.py
└── visualize.py
```
Also contribute to: `main.py` (your section), `data/setcover/`

---

## 📌 Your Responsibility
Implement the **full pipeline** for Set Cover:
- Exact solution (small inputs)
- Greedy approximation (large inputs)
- Analysis (compare both)
- Visualization (show which sets cover the universe)

---

## 🧩 Problem Recap
- **Universe U** = set of all elements (e.g., {1, 2, 3, 4, 5})
- **Collection S** = list of subsets (e.g., {1,2}, {2,3,4}, {4,5})
- **Goal:** Pick the fewest subsets from S that together cover all of U

---

## ⚙️ What to Build

### `exact.py` — Exact Set Cover
**Algorithm: Backtracking**
- Try all combinations of subsets
- Find the minimum number of subsets that cover U
- Time complexity: O(2ⁿ) where n = number of subsets

```python
def solve_exact(universe, subsets):
    # Returns: {"solution": [list of chosen set indices], "cost": int, "time": float}
```

---

### `approx.py` — Greedy Approximation ⭐ (Core deliverable)
**Algorithm: Greedy Set Cover**
- At each step, pick the subset that covers the **most uncovered elements**
- Repeat until universe is fully covered
- Approximation ratio: `O(log n)` where n = |U|

```python
def solve_approx(universe, subsets):
    # Returns: {"solution": [list of chosen set indices], "cost": int, "time": float}
```

---

### `analysis.py` — Compare Results
- Approximation ratio = `len(greedy_solution) / len(exact_solution)`
- Record runtime of both
- Print comparison

```python
def analyze(exact_result, approx_result):
    # Returns: {"ratio": float, "exact_time": float, "approx_time": float}
```

---

### `visualize.py` — Coverage Visualization
- Show the universe as elements
- Highlight which sets were chosen (exact vs greedy)
- Use `matplotlib` — simple bar/grid or Venn-style diagram

```python
def visualize(universe, subsets, exact_solution, approx_solution):
    # Visual comparison of coverage
```

---

## 📅 Your Day-by-Day Plan

| Day | Task |
|-----|------|
| Apr 7 | Repo setup, agree on input/output format with team |
| Apr 8–9 | `exact.py` — Backtracking exact solver |
| Apr 10–11 | `approx.py` — Greedy Set Cover |
| Apr 12 | `analysis.py` — timing + approximation ratio |
| Apr 13 | `visualize.py` — coverage diagram |
| Apr 14 | Integration with `main.py`, fix bugs |
| Apr 15 | Report: Set Cover section + PPT slides |
| Apr 16 | Final polish, demo recording |

---

## 📦 Input Format (agree with team on Day 1)
```python
universe = {1, 2, 3, 4, 5}

subsets = [
    {1, 2},
    {2, 3, 4},
    {4, 5},
    {1, 3, 5}
]
```

---

## 📤 Output Format (STRICT — same across all members)
```python
{
    "solution": [1, 2],   # indices of chosen subsets
    "cost": 2,            # number of sets chosen
    "time": 0.0011        # seconds
}
```

---

## 🎤 Viva Questions You Should Own

- What is the Set Cover problem? Give a real-world example.
- Why is Set Cover NP-hard?
- How does the Greedy algorithm work for Set Cover?
- What is the approximation ratio of Greedy Set Cover? Why is it `O(log n)`?
- When would the greedy solution equal the optimal solution?

---

## 📚 Syllabus Modules You Cover
| Module | Concept |
|--------|---------|
| Module 1 | Greedy algorithms |
| Module 2 | Backtracking (exact solver) |
| Module 7 | NP-hardness, Approximation ratio analysis |

---

## ⚠️ Rules
- Only work inside `src/setcover/` (don't touch tsp or knapsack)
- Push to GitHub **daily**
- All functions must return the standard dict format
- Coordinate with team on `data/setcover/` input file format
