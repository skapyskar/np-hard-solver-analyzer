# Frontend

The shared frontend now lives in this folder as a no-build static app:

```text
frontend/
├── README.md
├── index.html
├── styles.css
└── app.js
```

## What Exists Right Now

- Input editors for all three problems:
  - TSP distance matrix editor
  - Set Cover subset-vs-universe coverage table
  - Knapsack item table
- Shared layout for:
  - problem selection
  - algorithm/stage panels
  - final output
- Full step-by-step visualization is implemented for Set Cover only in this phase.
- TSP and Knapsack already use the same frontend structure, but their visualization stages are placeholders until their owners complete them.

## Syllabus Boundary And Project Scope

For the Intractability-unit portion of the project, the shared frontend should stay close to syllabus wording when presenting TSP and Set Cover. At the same time, the original project brief still asks for exact-vs-approximate comparison, so Set Cover currently demonstrates both modes in the shared frontend.

- Set Cover should still explain exact subset selection clearly
- TSP should still explain exhaustive search clearly
- Project-level exact vs approximation comparison is allowed where needed to satisfy the original NP-AA brief

Knapsack is being tracked separately from this strict boundary.

## How To Run

Open [index.html](/home/skapyskar/Documents/np-hard-solver-analyzer/frontend/index.html) in a browser.

If you prefer serving it locally:

```bash
python3 -m http.server 8000
```

Then visit:

```text
http://localhost:8000/frontend/
```

## Current Phase Split

### Phase A: Input UX

Completed for:
- TSP
- Set Cover
- Knapsack

### Phase B: Visualization + Final Output

Completed for:
- Set Cover

Still required from the problem owners:
- TSP owner must implement visualization and persistent final output for TSP.
- Knapsack owner must implement step visualization and persistent final output for Knapsack.
