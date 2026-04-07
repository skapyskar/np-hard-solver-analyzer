# 👤 Person 1 — TSP (Travelling Salesman Problem)

## 🗂️ Your Folder
```
src/tsp/
├── exact.py
├── approx.py
├── analysis.py
└── visualize.py
```
Also contribute to: `main.py` (your section), `data/tsp/`

---

## 📌 Your Responsibility
Implement the **full pipeline** for TSP:
- Exact solution (small inputs)
- Approximation/heuristic (large inputs)
- Analysis (compare both)
- Visualization (plot the route)

---

## ⚙️ What to Build

### `exact.py` — Exact TSP
**Algorithm 1: Backtracking (Brute Force)**
- Try all permutations of nodes
- Track minimum cost path
- Time complexity: O(n!)

**Algorithm 2: DP with Bitmask** ⭐ (Core deliverable)
- `dp[mask][i]` = min cost to visit nodes in `mask`, ending at `i`
- Time complexity: O(n² · 2ⁿ)
- Works well up to ~20 nodes

```python
def solve_exact(dist):
    # Returns: {"solution": path, "cost": int, "time": float}
```

---

### `approx.py` — Approximation
**Algorithm: Nearest Neighbor Heuristic**
- Start from node 0
- Always go to the nearest unvisited node
- Return to start
- Time complexity: O(n²)

**Optional (bonus):** 2-opt improvement
- Swap edges to reduce total cost iteratively

```python
def solve_approx(dist):
    # Returns: {"solution": path, "cost": int, "time": float}
```

---

### `analysis.py` — Compare Results
- Calculate **approximation ratio** = `approx_cost / exact_cost`
- Record runtime of both
- Print comparison table

```python
def analyze(exact_result, approx_result):
    # Returns: {"ratio": float, "exact_time": float, "approx_time": float}
```

---

### `visualize.py` — Plot the Route
- Use `matplotlib`
- Plot nodes as points on 2D plane
- Draw exact route (one color) vs approx route (another color)
- Label nodes

```python
def visualize(coords, exact_path, approx_path):
    # Shows side-by-side or overlaid route comparison
```

---

## 📅 Your Day-by-Day Plan

| Day | Task |
|-----|------|
| Apr 7 | Repo setup, agree on input/output format with team |
| Apr 8–9 | `exact.py` — Backtracking + DP Bitmask |
| Apr 10–11 | `approx.py` — Nearest Neighbor heuristic |
| Apr 12 | `analysis.py` — timing + ratio |
| Apr 13 | `visualize.py` — route plot |
| Apr 14 | Integration with `main.py`, fix bugs |
| Apr 15 | Report: TSP section + PPT slides |
| Apr 16 | Final polish, demo recording |

---

## 📦 Input Format (agree with team on Day 1)
```python
# Distance matrix (2D list)
dist = [
    [0, 10, 15, 20],
    [10, 0, 35, 25],
    [15, 35, 0, 30],
    [20, 25, 30, 0]
]
```

---

## 📤 Output Format (STRICT — same across all members)
```python
{
    "solution": [0, 1, 3, 2, 0],  # path
    "cost": 80,
    "time": 0.0023                 # seconds
}
```

---

## 🎤 Viva Questions You Should Own

- What is the Travelling Salesman Problem?
- Why is TSP NP-hard?
- What is the time complexity of DP bitmask TSP? How does it improve over brute force?
- How does Nearest Neighbor heuristic work? What is its approximation ratio?
- Can TSP be solved optimally for large inputs? Why or why not?

---

## 📚 Syllabus Modules You Cover
| Module | Concept |
|--------|---------|
| Module 1 | Complexity analysis, Divide & Conquer mindset |
| Module 2 | Dynamic Programming (bitmask), Backtracking |
| Module 7 | NP-hardness, Approximation algorithms |

---

## ⚠️ Rules
- Only work inside `src/tsp/` (don't touch setcover or knapsack)
- Push to GitHub **daily**
- All functions must return the standard dict format
- Coordinate with team on `data/tsp/` input file format
