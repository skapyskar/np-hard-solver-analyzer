# Person 1 - TSP

This folder is Person 1's workspace for the Travelling Salesman Problem pipeline.

## Expected Structure

```text
people/person1_tsp/
├── __init__.py
├── README.md
└── tsp/
    ├── __init__.py
    ├── io.py
    ├── exact.py
    ├── analysis.py
    └── visualize.py
```

## Backend Responsibility

Person 1 is responsible for building the full TSP backend flow so `main.py` can later call:

- input loading
- exact solving
- analysis
- visualization

The TSP pipeline should follow the same shared structure, but for the syllabus-bound portion it must use TSP wording from the Intractability unit.

## Frontend Responsibility

The shared frontend now exists in:

```text
frontend/
├── index.html
├── styles.css
└── app.js
```

What is already done for TSP:

- TSP input can already be entered visually through a distance-matrix table.

What Person 1 still needs to do next:

1. implement TSP exhaustive-search step-by-step visualization inside the shared frontend
2. make the final TSP output stay pinned in the output panel after the run

Important frontend rule:

- Since TSP is graph-based, the visualization should show a route/graph view rather than falling back to a plain table.
- Use syllabus wording: exhaustive search, factorial/exponential growth, no polynomial-time method known.

## Documentation Rule

Whenever the TSP work changes, update:

- `README.md`
- `person1_TSP.md`
- this file
- `frontend/README.md` if the shared frontend flow changes
- `DEMO.md` for the TSP speaking section
