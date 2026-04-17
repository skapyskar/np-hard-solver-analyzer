# NP-Hard Problem Solver & Approximation Analyzer

This repository is organized by problem owner. Each team member works inside a dedicated folder under `people/`, while the project root contains the shared control layer, common datasets, and output artifacts.

## Current Structure

```text
np-hard-solver-analyzer/
├── main.py
├── README.md
├── person1_TSP.md
├── person2_SetCover.md
├── person3_Knapsack.md
├── data/
│   └── person2_setcover/
│       └── sample.json
├── outputs/
│   └── .gitkeep
├── frontend/
│   ├── README.md
│   ├── index.html
│   ├── styles.css
│   └── app.js
└── people/
    ├── person1_tsp/
    ├── person2_setcover/
    │   ├── README.md
    │   └── setcover/
    │       ├── __init__.py
    │       ├── io.py
    │       ├── exact.py
    │       ├── approx.py
    │       ├── analysis.py
    │       └── visualize.py
    └── person3_knapsack/
```

## How Everything Connects

- `main.py` is the top-level controller.
- `main.py` reads command-line arguments, selects a problem pipeline, loads input data, runs the exact and approximation solvers, performs analysis, and optionally triggers visualization.
- Each person's implementation lives inside their own folder under `people/`.
- Problem-specific input files live under `data/<person_topic>/`.
- Generated plots and future exported assets go into `outputs/`.
- `frontend/` now contains the shared UI layer as a static browser app.

At the moment, the Set Cover pipeline is the only completed topic:

- `main.py` imports the Set Cover functions from `people/person2_setcover/setcover/`.
- `people/person2_setcover/setcover/io.py` loads JSON input.
- `exact.py` computes the optimal solution using backtracking.
- `approx.py` computes the greedy approximation.
- `analysis.py` compares exact vs approximate results and computes the ratio.
- `visualize.py` generates a plot using `matplotlib`.

The same connection pattern should be followed later for TSP and Knapsack so the root controller can call each topic in a consistent way.

For frontend work, the shared UI now has this phase split:

- Input editing is implemented for Set Cover, TSP, and Knapsack.
- Step-by-step visualization and pinned final output are implemented for Set Cover.
- TSP and Knapsack still need their own visualization + final-output stages added by their problem owners.

## Development Phases So Far

### Phase 1: Project Direction

- The repository was chosen for the NP-AA project.
- The work was divided by problem domain instead of by role.
- Three problem owners were defined:
  - Person 1: TSP
  - Person 2: Set Cover
  - Person 3: Knapsack

### Phase 2: Shared Architecture

- The repository was restructured so each person's work lives in a separate folder under `people/`.
- The root level was kept for shared control files such as `main.py`, project documentation, future frontend code, datasets, and outputs.
- `frontend/` was reserved as a placeholder for later integration.

### Phase 3: Set Cover Pipeline

- The Person 2 Set Cover implementation was created under `people/person2_setcover/setcover/`.
- A sample dataset was added under `data/person2_setcover/sample.json`.
- `main.py` was wired to execute the Set Cover flow from the root.
- Visualization output was set up to save plots into `outputs/`.

### Phase 4: Documentation Alignment

- The main README now reflects the actual folder structure and control flow.
- The assignment files for Person 1, Person 2, and Person 3 are updated to match the current architecture.
- Each assignment file now explicitly requires the contributor to update documentation whenever new work is added.

### Phase 5: Shared Frontend Foundation

- `frontend/index.html`, `frontend/styles.css`, and `frontend/app.js` were added as the initial shared UI.
- The frontend now supports structured input editing for:
  - Set Cover via a subset-vs-universe table
  - TSP via a distance matrix table
  - Knapsack via an item table with capacity input
- The frontend now supports step-by-step visualization and pinned final output for Set Cover.
- TSP and Knapsack use the same frontend shell, but their visualization stages are intentionally left as the next phase of work.

## How To Use The Project Right Now

### Backend CLI

Run the currently implemented Set Cover pipeline from the repository root:

```bash
python3 main.py setcover --input data/person2_setcover/sample.json
```

Generate the Set Cover visualization:

```bash
python3 main.py setcover --input data/person2_setcover/sample.json --visualize --plot-output outputs/setcover_sample.png
```

What this does:

- Loads the Set Cover instance from `data/person2_setcover/sample.json`
- Runs the exact solver
- Runs the greedy approximation solver
- Computes the approximation ratio and runtime comparison
- Prints the final result as JSON
- Optionally saves a visualization image into `outputs/`

### Frontend

Open [frontend/index.html](/home/skapyskar/Documents/np-hard-solver-analyzer/frontend/index.html) in a browser.

Or serve the repo root locally:

```bash
python3 -m http.server 8000
```

Then visit:

```text
http://localhost:8000/frontend/
```

What the frontend currently supports:

- Structured input editing for Set Cover, TSP, and Knapsack
- Set Cover algorithm playback with per-iteration visualization
- A pinned final output panel that remains visible after solving
- Placeholder visualization panels for TSP and Knapsack that mark the next work phase clearly

## Output Format

The controller currently prints a JSON object like this:

```json
{
  "problem": "setcover",
  "input_file": "data/person2_setcover/sample.json",
  "exact": {
    "solution": [0, 3],
    "cost": 2,
    "time": 0.00004
  },
  "approx": {
    "solution": [0, 3],
    "cost": 2,
    "time": 0.00001
  },
  "analysis": {
    "ratio": 1.0,
    "exact_time": 0.00004,
    "approx_time": 0.00001,
    "exact_cost": 2,
    "approx_cost": 2
  },
  "visualization": {
    "status": "generated",
    "output": "outputs/setcover_sample.png"
  }
}
```

## Rules For Future Updates

- Keep each topic inside its own `people/personX_topic/` folder.
- Keep the root `main.py` as the shared controller.
- Add each topic's sample data under `data/<person_topic>/`.
- Save generated images and exported artifacts under `outputs/`.
- When a new topic or feature is added, update this README so the current structure, completed phases, and usage instructions stay accurate.
- Frontend work should continue through the shared `frontend/` layer rather than splitting into separate mini-apps.

## Next Frontend Phase

The current shared UI establishes a common three-step flow:

1. input editing
2. algorithm visualization
3. pinned final output

Work remaining:

- Person 1 must implement TSP visualization and pinned final output inside the shared frontend flow.
- Person 3 must implement Knapsack visualization and pinned final output inside the shared frontend flow.
- Person 2 can continue improving Set Cover playback so it stays the reference implementation for frontend behavior as well as backend structure.
