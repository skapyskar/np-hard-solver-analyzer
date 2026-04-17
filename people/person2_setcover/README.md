# Person 2 - Set Cover

This folder is the reference implementation for the Set Cover pipeline.

## Implemented Modules

- `setcover/exact.py`
- `setcover/approx.py`
- `setcover/analysis.py`
- `setcover/visualize.py`
- `setcover/io.py`

## Backend Status

Set Cover is currently the only completed backend topic wired into `main.py`.

Run from the project root:

```bash
python3 main.py setcover --input data/person2_setcover/sample.json --visualize --plot-output outputs/setcover_sample.png
```

## Frontend Status

The shared frontend now includes Set Cover support for all three UI stages:

1. structured input editing through a subset-vs-universe table
2. step-by-step algorithm visualization
3. pinned final output after solving

Set Cover should remain the reference behavior for the other frontend implementations.

## Ongoing Responsibility

Person 2 should keep improving Set Cover cleanly inside the shared structure:

- backend logic stays under `people/person2_setcover/`
- shared frontend behavior stays under `frontend/`
- documentation stays synchronized across root and workspace files

## Documentation Rule

Whenever Set Cover changes, update:

- `README.md`
- `person2_SetCover.md`
- this file
- `frontend/README.md` if the shared frontend changes
- `DEMO.md` for the Set Cover speaking section
