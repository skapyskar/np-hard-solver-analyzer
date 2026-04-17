# Person 1 - TSP Change Log

This file records all completed work for the Travelling Salesman Problem (TSP) module.

---

## 10 Apr 2026 — Project Structure Initialized

Added folders:

people/person1_tsp/
people/person1_tsp/tsp/
data/person1_tsp/

Added files:

people/person1_tsp/**init**.py
people/person1_tsp/tsp/**init**.py
people/person1_tsp/README.md

Purpose:

Created dedicated workspace for Person 1 TSP implementation following the shared project architecture.

---

## 11 Apr 2026 — Input Loader Added

File:

people/person1_tsp/tsp/io.py

Added functionality:

* Load JSON TSP instance file
* Parse distance matrix input
* Return matrix to solver pipeline

Supported input format:

{
"dist": [
[0,10,15,20],
[10,0,35,25],
[15,35,0,30],
[20,25,30,0]
]
}

---

## 12 Apr 2026 — Exact Solver Implemented

File:

people/person1_tsp/tsp/exact.py

Added functionality:

* Exhaustive search / brute force TSP solver
* Evaluates all possible tours
* Returns minimum-cost route

Output format:

{
"solution": [...],
"cost": number,
"time": float
}

Theory wording used:

* Exact algorithm
* Exhaustive search
* Factorial growth O(n!)

---

## 13 Apr 2026 — Approximation Solver Added

File:

people/person1_tsp/tsp/approx.py

Added functionality:

* Nearest Neighbor heuristic
* Fast route generation
* Used for comparison with exact solver

Note:

Kept separate from syllabus exact method.

---

## 14 Apr 2026 — Analysis Module Added

File:

people/person1_tsp/tsp/analysis.py

Added functionality:

* Exact route cost
* Runtime metrics
* Number of cities
* Approximation comparison ratio
* Exact vs heuristic timing

---

## 15 Apr 2026 — Visualization Added

File:

people/person1_tsp/tsp/visualize.py

Added functionality:

* Circular city layout using matplotlib
* Draw optimal route edges
* Label city nodes
* Save graph in outputs folder

Output file:

outputs/tsp_visualization.png

---

## 16 Apr 2026 — Main Controller Integrated

File modified:

main.py

Added command:

python main.py tsp

Added CLI options:

python main.py tsp --input ...
python main.py tsp --visualize
python main.py tsp --plot-output ...

Shared output format:

{
"problem": "tsp",
"input_file": "...",
"exact": {...},
"approx": {...},
"analysis": {...}
}

---

## 17 Apr 2026 — Default Sample Data Added

File:

data/person1_tsp/sample.json

Added sample matrix for testing and demo.

---

# Frontend Status

Already available:

* TSP distance matrix editor
* Algorithm selector
* Solve button
* Output panel

Pending TSP frontend tasks:

1. Implement exhaustive-search step-by-step playback
2. Keep final TSP result pinned after execution
3. Use graph/route view instead of plain table

Frontend files:

frontend/index.html
frontend/styles.css
frontend/app.js

---

# Backend Commands

Run TSP:

python main.py tsp

Run TSP with visualization:

python main.py tsp --visualize

Run custom input:

python main.py tsp --input data/person1_tsp/sample.json

---

# Files Owned by Chanakya

people/person1_tsp/
data/person1_tsp/
main.py (TSP section only)
frontend/app.js (TSP logic only if modified)

