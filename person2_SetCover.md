# Person 2 - Set Cover

## Your Workspace

Your current implementation lives in:

```text
people/person2_setcover/
├── __init__.py
├── README.md
└── setcover/
    ├── __init__.py
    ├── io.py
    ├── exact.py
    ├── approx.py
    ├── analysis.py
    └── visualize.py
```

Your dataset lives in:

```text
data/person2_setcover/
└── sample.json
```

Your controller integration lives in the Set Cover section of `main.py`.

## How The Repo Is Connected

- `main.py` is the shared controller.
- It reads CLI input, selects a topic, loads input data, runs the pipeline, and prints JSON output.
- Each person's topic lives under `people/`.
- Each topic should have the same internal shape:
  - `io.py`
  - `exact.py`
  - `approx.py`
  - `analysis.py`
  - `visualize.py`
- Each topic should have its own sample data under `data/`.
- Plot images should be written into `outputs/`.
- `frontend/` is now the shared UI layer and already includes the first Set Cover frontend implementation.

Your Set Cover implementation is the reference structure for the rest of the repo.

## What Exists So Far

### `io.py`

Loads a JSON Set Cover instance:

```json
{
  "universe": [1, 2, 3, 4, 5, 6],
  "subsets": [
    [1, 2, 3],
    [2, 4],
    [3, 4, 5],
    [4, 5, 6],
    [1, 6],
    [2, 5, 6]
  ]
}
```

### `exact.py`

Implements exact Set Cover using backtracking and returns:

```python
{
    "solution": [0, 3],
    "cost": 2,
    "time": 0.00004
}
```

### `approx.py`

Implements greedy Set Cover by repeatedly choosing the subset that covers the most uncovered elements.

### `analysis.py`

Computes:

```python
len(approx_solution) / len(exact_solution)
```

and returns runtime and cost comparison data.

### `visualize.py`

Uses `matplotlib` to generate a side-by-side coverage comparison and save it to `outputs/`.

### Shared frontend

The shared frontend now includes:

- a Set Cover input table
- Set Cover algorithm playback
- a pinned Set Cover final output panel

This makes Set Cover the reference implementation for the frontend flow as well as the backend structure.

## Current Controller Flow

`main.py` currently supports:

```bash
python3 main.py setcover --input data/person2_setcover/sample.json
python3 main.py setcover --input data/person2_setcover/sample.json --visualize --plot-output outputs/setcover_sample.png
```

Flow:

1. `main.py` receives the `setcover` command.
2. It loads the instance using `people.person2_setcover.setcover.load_instance`.
3. It runs `solve_exact`.
4. It runs `solve_approx`.
5. It runs `analyze`.
6. If requested, it runs `visualize`.
7. It prints the combined JSON result.

## Standard Output Format

Every solver must return:

```python
{
    "solution": [1, 2],
    "cost": 2,
    "time": 0.0011
}
```

For Set Cover:
- `solution` = indices of chosen subsets
- `cost` = number of subsets chosen

## What To Keep Doing

If you extend the Set Cover part later, keep the same structure and only add to it cleanly. Examples:

- more sample datasets in `data/person2_setcover/`
- a better visualization layout
- auto-switching between exact and approximation based on size
- richer CLI options in `main.py`
- richer frontend playback states in `frontend/app.js`

## Rules You Must Follow

- Keep all Set Cover implementation files inside `people/person2_setcover/`.
- Keep Set Cover data files inside `data/person2_setcover/`.
- Update only the Set Cover branch of `main.py` when changing your controller integration.
- Save plots and generated assets into `outputs/`.
- Do not move code back into old `src/` folders.

## Documentation Rule

Every time you add or change functionality, you must also update:

- `README.md` at the repo root
- `person2_SetCover.md`
- `frontend/README.md` if the shared frontend changes

Those updates must explain:

- what changed
- where the files are now
- how the Set Cover flow connects to `main.py`
- how to run the new or updated feature
- how the Set Cover behavior fits into the shared frontend flow

The repo documentation must always match the actual code layout.
