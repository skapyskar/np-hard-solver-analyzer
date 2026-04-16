from __future__ import annotations

import argparse
import json
from pathlib import Path

from src.setcover import analyze, solve_approx, solve_exact, visualize


def load_setcover_instance(path):
    with open(path, "r", encoding="utf-8") as handle:
        payload = json.load(handle)

    universe = set(payload["universe"])
    subsets = [set(subset) for subset in payload["subsets"]]
    return universe, subsets


def run_setcover(instance_path, make_plot=False, plot_path=None):
    universe, subsets = load_setcover_instance(instance_path)
    exact_result = solve_exact(universe, subsets)
    approx_result = solve_approx(universe, subsets)
    analysis_result = analyze(exact_result, approx_result)

    result = {
        "problem": "setcover",
        "input_file": str(instance_path),
        "exact": exact_result,
        "approx": approx_result,
        "analysis": analysis_result,
    }

    if make_plot:
        try:
            visualize(
                universe,
                subsets,
                exact_result["solution"],
                approx_result["solution"],
                output_path=plot_path,
            )
            result["visualization"] = {
                "status": "generated",
                "output": plot_path or "interactive window",
            }
        except RuntimeError as exc:
            result["visualization"] = {
                "status": "skipped",
                "reason": str(exc),
            }

    return result


def build_parser():
    parser = argparse.ArgumentParser(description="NP-Hard Problem Solver & Approximation Analyzer")
    subparsers = parser.add_subparsers(dest="problem", required=True)

    setcover_parser = subparsers.add_parser("setcover", help="Run the Set Cover pipeline")
    setcover_parser.add_argument(
        "--input",
        default="data/setcover/sample.json",
        help="Path to a JSON Set Cover instance",
    )
    setcover_parser.add_argument(
        "--visualize",
        action="store_true",
        help="Render the exact vs greedy coverage chart",
    )
    setcover_parser.add_argument(
        "--plot-output",
        help="Optional output image path for the visualization",
    )
    return parser


def main():
    parser = build_parser()
    args = parser.parse_args()

    if args.problem == "setcover":
        result = run_setcover(
            Path(args.input),
            make_plot=args.visualize,
            plot_path=args.plot_output,
        )
        print(json.dumps(result, indent=2))


if __name__ == "__main__":
    main()
