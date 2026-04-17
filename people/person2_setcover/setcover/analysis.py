"""Analysis helpers for Set Cover comparisons."""

from __future__ import annotations


def analyze(exact_result, approx_result, universe, subsets):
    """Compare exact and approximate outputs and report project metadata."""
    exact_cost = exact_result["cost"]
    approx_cost = approx_result["cost"]

    ratio = float("inf") if exact_cost == 0 and approx_cost > 0 else 1.0
    if exact_cost:
        ratio = approx_cost / exact_cost

    return {
        "ratio": ratio,
        "method": "Exact subset selection (exponential search)",
        "approx_method": "Greedy Set Cover approximation",
        "problem_type": "Optimization version of Set Cover",
        "decision_form": "Can all elements be covered using at most k subsets?",
        "universe_size": len(universe),
        "subset_count": len(subsets),
        "exact_time": exact_result["time"],
        "approx_time": approx_result["time"],
        "exact_cost": exact_result["cost"],
        "approx_cost": approx_result["cost"],
    }
