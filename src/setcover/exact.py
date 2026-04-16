"""Exact Set Cover solver using backtracking."""

from __future__ import annotations

from time import perf_counter


def _normalize_input(universe, subsets):
    universe_set = set(universe)
    normalized_subsets = [set(subset) & universe_set for subset in subsets]

    if not universe_set:
        return universe_set, normalized_subsets

    covered = set().union(*normalized_subsets) if normalized_subsets else set()
    missing = universe_set - covered
    if missing:
        raise ValueError(f"Universe cannot be fully covered. Missing elements: {sorted(missing)}")

    return universe_set, normalized_subsets


def solve_exact(universe, subsets):
    """Return the minimum-cardinality set cover via backtracking."""
    start = perf_counter()
    universe_set, normalized_subsets = _normalize_input(universe, subsets)

    if not universe_set:
        return {"solution": [], "cost": 0, "time": perf_counter() - start}

    order = sorted(
        range(len(normalized_subsets)),
        key=lambda idx: (-len(normalized_subsets[idx]), idx),
    )

    best_solution = None

    def backtrack(position, covered, chosen):
        nonlocal best_solution

        if covered == universe_set:
            if best_solution is None or len(chosen) < len(best_solution):
                best_solution = chosen.copy()
            return

        if position >= len(order):
            return

        if best_solution is not None and len(chosen) >= len(best_solution):
            return

        remaining_cover = set(covered)
        for index in order[position:]:
            remaining_cover |= normalized_subsets[index]
        if remaining_cover != universe_set:
            return

        subset_index = order[position]
        subset = normalized_subsets[subset_index]

        if subset - covered:
            chosen.append(subset_index)
            backtrack(position + 1, covered | subset, chosen)
            chosen.pop()

        backtrack(position + 1, covered, chosen)

    backtrack(0, set(), [])

    if best_solution is None:
        raise ValueError("No exact cover found for the provided universe and subsets.")

    best_solution.sort()
    return {
        "solution": best_solution,
        "cost": len(best_solution),
        "time": perf_counter() - start,
    }
