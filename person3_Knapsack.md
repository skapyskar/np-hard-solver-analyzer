# Person 3 - Knapsack Problem (0/1)

## Your Workspace

Your work must stay inside:

```text
people/person3_knapsack/
├── __init__.py
├── README.md
└── knapsack/
    ├── __init__.py
    ├── io.py
    ├── exact.py
    ├── approx.py
    ├── analysis.py
    └── visualize.py
```

You must also add:

```text
data/person3_knapsack/
└── sample.json
```

You will update `main.py` only for your own Knapsack controller section.

## How The Repo Is Connected

- `main.py` is the project controller at the root.
- Each person owns a separate topic folder under `people/`.
- Every topic should follow the same internal package shape.
- Each topic should add its own data folder under `data/`.
- Visualization output should go to `outputs/`.
- `frontend/` is now the shared UI layer for the project.

Your job is to build the Knapsack part in the same style already used by Person 2 for Set Cover.

## What You Must Build

Create the Knapsack package under `people/person3_knapsack/knapsack/` with these files:

### `io.py`

Load a JSON instance for 0/1 Knapsack.

Recommended input format:

```json
{
  "weights": [2, 3, 4, 5],
  "values": [3, 4, 5, 6],
  "capacity": 8
}
```

Required function:

```python
def load_instance(path):
    # Returns weights, values, capacity
```

### `exact.py`

Implement the exact 0/1 Knapsack solver.

Required:
- Dynamic Programming

Optional:
- Backtracking for very small inputs

Required function:

```python
def solve_exact(weights, values, capacity):
    # Returns {"solution": [indices], "cost": total_value, "time": float}
```

For Knapsack:
- `solution` = chosen item indices
- `cost` = total value achieved

### `approx.py`

Implement a greedy approximation.

Required:
- sort by value/weight ratio
- select items while capacity allows

Required function:

```python
def solve_approx(weights, values, capacity):
    # Returns {"solution": [indices], "cost": total_value, "time": float}
```

### `analysis.py`

Compare exact and approximate results.

Recommended ratio:

```python
exact_cost / approx_cost
```

Because this is a maximization problem, a ratio above `1.0` means greedy performed worse than exact.

Required function:

```python
def analyze(exact_result, approx_result):
    # Returns ratio, times, and costs in a dict
```

### `visualize.py`

Use `matplotlib` to show:

- item weights
- item values
- which items were chosen by exact vs greedy
- capacity context where useful

Required function:

```python
def visualize(weights, values, exact_solution, approx_solution, capacity, output_path=None):
    # Saves a plot to outputs/ or another requested path
```

### `__init__.py`

Export the main functions so `main.py` can import them cleanly.

## Controller Integration

You must add a `knapsack` branch in `main.py` using the same pattern used by Set Cover:

1. Add a `knapsack` subcommand.
2. Add `--input`.
3. Add `--visualize`.
4. Add `--plot-output`.
5. Use `data/person3_knapsack/sample.json` as the default input.
6. Load data, run exact, run approx, run analysis, optionally run visualization.
7. Print the final result as JSON.

The root controller output should look like:

```python
{
    "problem": "knapsack",
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
    "cost": 13,
    "time": 0.0008
}
```

## Frontend Responsibility

The shared frontend now exists under:

```text
frontend/
├── index.html
├── styles.css
└── app.js
```

The input editor phase is already done for Knapsack in the shared frontend through an item table and capacity input.

Your next frontend phase is to complete Knapsack steps 2 and 3:

1. visualize the Knapsack algorithm iteration by iteration inside the shared frontend
2. keep the final Knapsack output pinned in the output panel after the run finishes

Required frontend expectation:

- Show item selection and capacity usage visually instead of reducing the algorithm to plain text only.
- Reuse the shared three-stage frontend layout rather than creating a separate page or separate app.
- Keep Knapsack-specific frontend logic organized inside the shared frontend files.

## Recommended Counterexample To Test

Use an example where greedy by ratio fails so the analysis is meaningful.

Example:

```python
weights = [1, 3, 3]
values = [2, 3, 3]
capacity = 6
```

This is useful for both testing and viva explanation.

## Rules You Must Follow

- Only create or edit files inside `people/person3_knapsack/`, `data/person3_knapsack/`, and your Knapsack section in `main.py`.
- Do not modify Person 1 or Person 2 code.
- Keep your file and module layout parallel to the existing Set Cover implementation.
- Make the implementation runnable from the project root.
- Write plots into `outputs/`.

## Documentation Rule

Every time you add or change functionality, you must also update:

- `README.md` at the repo root
- `person3_Knapsack.md`
- `frontend/README.md` if your work changes the shared UI

Those updates must describe:

- what was added
- where it lives in the directory structure
- how it connects to `main.py`
- how to run it
- how it connects to the shared frontend if frontend behavior changed

Documentation updates are part of the task, not optional cleanup.

## Goal

This file should be enough for someone to build the entire Knapsack section in the same structure and integration style already established in the repository, and then finish the remaining shared-frontend visualization/output phase for Knapsack.
