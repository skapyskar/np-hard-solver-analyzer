"""Analysis helpers for Set Cover comparisons."""

from __future__ import annotations


def analyze(exact_result, approx_result):
    """Compare exact and greedy outputs."""
    exact_cost = exact_result["cost"]
    approx_cost = approx_result["cost"]

    ratio = float("inf") if exact_cost == 0 and approx_cost > 0 else 1.0
    if exact_cost:
        ratio = approx_cost / exact_cost

    return {
        "ratio": ratio,
        "exact_time": exact_result["time"],
        "approx_time": approx_result["time"],
        "exact_cost": exact_cost,
        "approx_cost": approx_cost,
    }
