# Person 3 - Knapsack

This folder is Person 3's workspace for the 0/1 Knapsack pipeline.

## Expected Structure

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

## Backend Responsibility

Person 3 is responsible for building the full Knapsack backend flow so `main.py` can later call:

- input loading
- exact solving
- approximation solving
- analysis
- visualization

The Knapsack pipeline should follow the same structure already used by Set Cover.

## Frontend Responsibility

The shared frontend now exists in:

```text
frontend/
├── index.html
├── styles.css
└── app.js
```

What is already done for Knapsack:

- Knapsack input can already be entered visually through an item table and capacity field.

What Person 3 still needs to do next:

1. implement Knapsack step-by-step visualization inside the shared frontend
2. make the final Knapsack output stay pinned in the output panel after the run

Important frontend rule:

- The visualization should show item choice and capacity usage visually instead of plain text only.

## Documentation Rule

Whenever the Knapsack work changes, update:

- `README.md`
- `person3_Knapsack.md`
- this file
- `frontend/README.md` if the shared frontend flow changes
- `DEMO.md` for the Knapsack speaking section
