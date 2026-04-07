# 👤 Person 3 — Knapsack Problem (0/1)

## 🗂️ Your Folder
```
src/knapsack/
├── exact.py
├── approx.py
├── analysis.py
└── visualize.py
```
Also contribute to: `main.py` (your section), `data/knapsack/`

---

## 📌 Your Responsibility
Implement the **full pipeline** for the 0/1 Knapsack Problem:
- Exact solution using DP
- Greedy approximation
- Analysis (compare both)
- Visualization (weight vs value graph)

---

## 🧩 Problem Recap
- You have `n` items, each with a **weight** and **value**
- Knapsack has a **capacity W**
- **Goal:** Maximize total value without exceeding capacity
- Each item is either taken (1) or not (0) — no fractions

---

## ⚙️ What to Build

### `exact.py` — Exact Knapsack
**Algorithm: Dynamic Programming (2D table)** ⭐ (Core deliverable)
- `dp[i][w]` = max value using first `i` items with capacity `w`
- Time complexity: O(n · W)
- Space: O(n · W)

**Optional: Backtracking** (brute force for comparison)
- Try all 2ⁿ subsets
- Used only for very small inputs

```python
def solve_exact(weights, values, capacity):
    # Returns: {"solution": [list of chosen item indices], "cost": int, "time": float}
    # "cost" here = total value achieved (maximize)
```

---

### `approx.py` — Greedy Approximation
**Algorithm: Greedy by value/weight ratio**
- Sort items by `value / weight` ratio (descending)
- Pick items greedily until capacity is full
- Time complexity: O(n log n)
- Note: This does NOT always give optimal for 0/1 Knapsack (that's the point!)

```python
def solve_approx(weights, values, capacity):
    # Returns: {"solution": [list of chosen item indices], "cost": int, "time": float}
```

---

### `analysis.py` — Compare Results
- Approximation ratio = `exact_value / greedy_value`
  (since we're maximizing, ratio > 1 means greedy got less)
- Record runtime of both
- Show cases where greedy fails

```python
def analyze(exact_result, approx_result):
    # Returns: {"ratio": float, "exact_time": float, "approx_time": float}
```

---

### `visualize.py` — Weight vs Value Graph
- Bar chart: each item's weight and value
- Highlight chosen items (exact vs greedy — different colors)
- Show capacity line on weight chart

```python
def visualize(weights, values, exact_solution, approx_solution, capacity):
    # Bar chart comparison
```

---

## 📅 Your Day-by-Day Plan

| Day | Task |
|-----|------|
| Apr 7 | Repo setup, agree on input/output format with team |
| Apr 8–9 | `exact.py` — DP solution (2D table) |
| Apr 10–11 | `approx.py` — Greedy by ratio |
| Apr 12 | `analysis.py` — timing + value comparison |
| Apr 13 | `visualize.py` — weight/value bar chart |
| Apr 14 | Integration with `main.py`, fix bugs |
| Apr 15 | Report: Knapsack section + PPT slides |
| Apr 16 | Final polish, demo recording |

---

## 📦 Input Format (agree with team on Day 1)
```python
weights  = [2, 3, 4, 5]
values   = [3, 4, 5, 6]
capacity = 8
```

---

## 📤 Output Format (STRICT — same across all members)
```python
{
    "solution": [0, 1, 3],   # indices of chosen items
    "cost": 13,              # total value achieved
    "time": 0.0008           # seconds
}
```

---

## 🎤 Viva Questions You Should Own

- What is the 0/1 Knapsack problem? How is it different from Fractional Knapsack?
- Why is 0/1 Knapsack NP-hard but solvable in pseudo-polynomial time?
- Walk through the DP table construction for a small example.
- Why does the greedy approach fail for 0/1 Knapsack? Give a counterexample.
- What is the approximation ratio of the greedy solution?

---

## 📚 Syllabus Modules You Cover
| Module | Concept |
|--------|---------|
| Module 1 | Greedy algorithms |
| Module 2 | Dynamic Programming, Backtracking |
| Module 7 | NP-hardness, Approximation analysis |

---

## 💡 Counterexample to Keep Ready (for viva)
```
Items:   weight=[1, 3, 3], value=[2, 3, 3], capacity=6

Greedy (by ratio):
  Item 0 ratio=2.0 → take it  (w=1, v=2)
  Item 1 ratio=1.0 → take it  (w=3, v=3)
  Item 2 ratio=1.0 → take it  (w=3, v=3)
  Total weight = 7 > 6, so drop item 2
  Greedy value = 5

DP Exact:
  Take items 1 + 2: weight=6, value=6
  Exact value = 6
```
👉 Greedy missed the optimal. This is your killer viva answer.

---

## ⚠️ Rules
- Only work inside `src/knapsack/` (don't touch tsp or setcover)
- Push to GitHub **daily**
- All functions must return the standard dict format
- Coordinate with team on `data/knapsack/` input file format
