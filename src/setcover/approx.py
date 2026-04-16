"""Greedy approximation for Set Cover."""

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


def solve_approx(universe, subsets):
    """Return a greedy set cover."""
    start = perf_counter()
    universe_set, normalized_subsets = _normalize_input(universe, subsets)

    uncovered = set(universe_set)
    chosen = []

    while uncovered:
        best_index = None
        best_gain = set()

        for index, subset in enumerate(normalized_subsets):
            gain = subset & uncovered
            if len(gain) > len(best_gain):
                best_index = index
                best_gain = gain

        if best_index is None or not best_gain:
            raise ValueError("Greedy solver could not cover the remaining universe.")

        chosen.append(best_index)
        uncovered -= best_gain

    return {
        "solution": chosen,
        "cost": len(chosen),
        "time": perf_counter() - start,
    }
