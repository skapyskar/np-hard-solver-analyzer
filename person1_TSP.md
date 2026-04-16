# Person 1 - TSP (Travelling Salesman Problem)

## Your Workspace

Your work must stay inside:

```text
people/person1_tsp/
├── __init__.py
├── README.md
└── tsp/
    ├── __init__.py
    ├── io.py
    ├── exact.py
    ├── approx.py
    ├── analysis.py
    └── visualize.py
```

You must also add:

```text
data/person1_tsp/
└── sample.json
```

You will update `main.py` only for your own TSP controller section so the root-level runner can call your pipeline.

## How The Repo Is Connected

- `main.py` is the shared controller for the full project.
- Each person owns one problem domain inside `people/`.
- Each topic should expose a consistent pipeline:
  - input loading
  - exact solver
  - approximation solver
  - analysis
  - visualization
- Input files go under `data/<person_topic>/`.
- Plot images and other generated artifacts go under `outputs/`.
- `frontend/` exists as a placeholder for later work and should not be implemented yet.

Your job is to make TSP follow the same structure and flow already used by Person 2 for Set Cover.

## What You Must Build

Create the TSP package under `people/person1_tsp/tsp/` with these files:

### `io.py`

Load a JSON instance and return the data needed by the solvers.

Recommended input format:

```json
{
  "dist": [
    [0, 10, 15, 20],
    [10, 0, 35, 25],
    [15, 35, 0, 30],
    [20, 25, 30, 0]
  ]
}
```

If you support coordinates for plotting, you may extend the file later, but keep the base format simple.

### `exact.py`

Implement the exact TSP solver.

Required:
- DP with bitmask as the main exact method

Optional:
- brute-force/backtracking for very small inputs

Required function:

```python
def solve_exact(dist):
    # Returns {"solution": path, "cost": number, "time": float}
```

### `approx.py`

Implement the approximation or heuristic solver.

Required:
- Nearest Neighbor heuristic

Optional:
- 2-opt improvement

Required function:

```python
def solve_approx(dist):
    # Returns {"solution": path, "cost": number, "time": float}
```

### `analysis.py`

Compare exact and approximate outputs.

Required function:

```python
def analyze(exact_result, approx_result):
    # Returns ratio, times, and costs in a dict
```

Recommended ratio:

```python
approx_cost / exact_cost
```

### `visualize.py`

Create a TSP route plot using `matplotlib`.

If the dataset contains only a distance matrix, you may:
- use a simple circular layout for plotting, or
- add optional coordinates to the input file

Required function:

```python
def visualize(dist, exact_solution, approx_solution, output_path=None):
    # Saves or renders a route comparison figure
```

### `__init__.py`

Export the main functions so `main.py` can import them cleanly.

## Controller Integration

You must add a TSP branch in `main.py` using the same pattern used for Set Cover:

1. Parse a `tsp` subcommand.
2. Accept `--input`.
3. Accept `--visualize`.
4. Accept `--plot-output`.
5. Load the TSP instance from `data/person1_tsp/sample.json` by default.
6. Run exact, approximation, analysis, and optional visualization.
7. Print the final result as JSON.

The result format should stay consistent with the existing controller output:

```python
{
    "problem": "tsp",
    "input_file": "...",
    "exact": {...},
    "approx": {...},
    "analysis": {...},
    "visualization": {...}  # only when requested
}
```

## Strict Output Format For Solvers

Every solver must return:

```python
{
    "solution": [...],
    "cost": 80,
    "time": 0.0023
}
```

For TSP:
- `solution` = route/path
- `cost` = total route cost

## Rules You Must Follow

- Only create or edit files inside `people/person1_tsp/`, `data/person1_tsp/`, and your TSP section in `main.py`.
- Do not modify Person 2 or Person 3 code.
- Keep your module names parallel to the Set Cover structure so the repo stays uniform.
- Make the implementation runnable from the project root.
- Keep generated images in `outputs/`.

## Documentation Rule

Every time you add or change project functionality, you must also update:

- `README.md` at the repo root
- `person1_TSP.md`

Those updates must describe:

- what was added
- where it lives in the directory structure
- how it connects to `main.py`
- how to run it

Do not leave the documentation behind the code. Keep both in sync in the same round of work.

## Goal

This file should be sufficient for someone to build the complete TSP section in the same style as the current Set Cover section, without needing any extra setup instructions.
