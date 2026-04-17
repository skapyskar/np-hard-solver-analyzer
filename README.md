# NP-Hard Problem Solver & Approximation Analyzer

A Python-based academic project that demonstrates exact algorithms, approximation methods, analysis, and visualization for major NP-Hard problems.

The complete project is controlled through:

main.py

This file acts as the central runner for all implemented problem pipelines using command-line arguments.

---

# Problems Implemented

* Travelling Salesman Problem (TSP)
* Set Cover Problem
* Knapsack Problem

Each problem includes:

* Input loading
* Exact solving method
* Approximation / heuristic method
* Comparative analysis
* Optional visualization

---

# Project Structure

```text
np-hard-solver-analyzer/
├── main.py
├── README.md
├── person1_TSP.md
├── person2_SetCover.md
├── person3_Knapsack.md
│
├── data/
│   ├── person1_tsp/
│   │   └── sample.json
│   ├── person2_setcover/
│   │   └── sample.json
│   └── person3_knapsack/
│       └── sample.json
│
├── outputs/
│   ├── tsp_visualization.png
│   ├── setcover_visualization.png
│   └── knapsack_visualization.png
│
└── people/
    ├── person1_tsp/
    │   └── tsp/
    │       ├── io.py
    │       ├── exact.py
    │       ├── approx.py
    │       ├── analysis.py
    │       └── visualize.py
    │
    ├── person2_setcover/
    │   └── setcover/
    │       ├── io.py
    │       ├── exact.py
    │       ├── approx.py
    │       ├── analysis.py
    │       └── visualize.py
    │
    └── person3_knapsack/
        └── knapsack/
            ├── io.py
            ├── exact.py
            ├── approx.py
            ├── analysis.py
            └── visualize.py
```

---

# What Each Folder Stores

## main.py

Main project controller.

Handles:

* command-line arguments
* selecting problem pipeline
* loading sample/custom input
* running exact solver
* running approximation solver
* generating analysis
* optional visualization
* printing JSON result

---

## people/

Contains modular implementations for each problem.

### person1_tsp/

Travelling Salesman Problem modules.

### person2_setcover/

Set Cover modules.

### person3_knapsack/

Knapsack modules.

---

## data/

Stores input datasets in JSON format.

Examples:

```text
data/person1_tsp/sample.json
data/person2_setcover/sample.json
data/person3_knapsack/sample.json
```

---

## outputs/

Stores generated charts and visualizations.

Examples:

```text
outputs/tsp_visualization.png
outputs/setcover_visualization.png
outputs/knapsack_visualization.png
```

---

# Install Dependencies

Run:

```bash
pip install matplotlib
```

If pip is not configured:

```bash
python -m pip install matplotlib
```

Optional:

```bash
pip install --upgrade pip
```

---

# How To Run

Run all commands from project root.

---

# Show All Available Commands

```bash
python main.py -h
```

---

# Travelling Salesman Problem (TSP)

## Run Default Dataset

```bash
python main.py tsp
```

## Run With Visualization

```bash
python main.py tsp --visualize
```

## Custom Input

```bash
python main.py tsp --input data/person1_tsp/sample.json
```

## Custom Plot Output

```bash
python main.py tsp --visualize --plot-output outputs/my_tsp.png
```

---

# Set Cover Problem

## Run Default Dataset

```bash
python main.py setcover
```

## Run With Visualization

```bash
python main.py setcover --visualize
```

## Custom Input

```bash
python main.py setcover --input data/person2_setcover/sample.json
```

## Custom Plot Output

```bash
python main.py setcover --visualize --plot-output outputs/my_setcover.png
```

---

# Knapsack Problem

## Run Default Dataset

```bash
python main.py knapsack
```

## Run With Visualization

```bash
python main.py knapsack --visualize
```

## Custom Input

```bash
python main.py knapsack --input data/person3_knapsack/sample.json
```

## Custom Plot Output

```bash
python main.py knapsack --visualize --plot-output outputs/my_knapsack.png
```

---

# Example Output Format

```json
{
  "problem": "tsp",
  "input_file": "data/person1_tsp/sample.json",
  "exact": {
    "solution": [0,1,3,2,0],
    "cost": 80,
    "time": 0.0021
  },
  "approx": {
    "solution": [0,1,3,2,0],
    "cost": 80,
    "time": 0.0003
  },
  "analysis": {
    "ratio": 1.0,
    "city_count": 4
  }
}
```

---

# Algorithms Used

## TSP

* Exact: Exhaustive Search
* Approximation: Nearest Neighbor

## Set Cover

* Exact: Subset Search / Backtracking
* Approximation: Greedy Selection

## Knapsack

* Exact: Dynamic Programming
* Approximation: Greedy by Value/Weight Ratio

---

# Educational Objective

This project demonstrates:

* NP-Hard problem complexity
* Exact vs approximate solutions
* Runtime comparison
* Optimization tradeoffs
* Real dataset execution through Python CLI

---

# Team Ownership

* Chanakya bansal 24bce0694: TSP
* Person 2: Set Cover
* Person 3: Knapsack

---

# Recommended Demo Commands

```bash
python main.py tsp
python main.py tsp --visualize
python main.py setcover
python main.py setcover --visualize
python main.py knapsack
python main.py knapsack --visualize
```

---

# Notes

* All generated images are saved in outputs/
* All datasets are stored in data/
* Each problem is modular and independent
* main.py acts as unified project controller
