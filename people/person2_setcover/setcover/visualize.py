"""Visualization for Set Cover coverage."""

from __future__ import annotations

import os

os.environ.setdefault("MPLCONFIGDIR", "/tmp/matplotlib")

import matplotlib

matplotlib.use("Agg")
import matplotlib.pyplot as plt


def visualize(universe, subsets, exact_solution, approx_solution, output_path=None):
    """Render exact vs greedy chosen sets as a coverage heatmap."""
    universe_list = sorted(universe)
    subset_labels = [f"S{i}" for i in range(len(subsets))]

    def build_matrix(selected):
        matrix = []
        chosen = set(selected)
        for index, subset in enumerate(subsets):
            row = []
            for element in universe_list:
                if index not in chosen:
                    row.append(0)
                elif element in subset:
                    row.append(2)
                else:
                    row.append(1)
            matrix.append(row)
        return matrix

    fig, axes = plt.subplots(
        1,
        2,
        figsize=(12, max(4, len(subsets) * 0.6)),
        sharey=True,
        constrained_layout=True,
    )
    panels = [
        ("Exact Set Cover", exact_solution),
        ("Greedy Approximation", approx_solution),
    ]

    for axis, (title, solution) in zip(axes, panels):
        image = axis.imshow(build_matrix(solution), aspect="auto", cmap="YlGn", vmin=0, vmax=2)
        axis.set_title(title)
        axis.set_xticks(range(len(universe_list)))
        axis.set_xticklabels(universe_list)
        axis.set_xlabel("Universe Elements")
        axis.set_yticks(range(len(subset_labels)))
        axis.set_yticklabels(subset_labels)
        axis.set_ylabel("Subsets")

        for row, subset in enumerate(subsets):
            for col, element in enumerate(universe_list):
                marker = "X" if element in subset else ""
                axis.text(col, row, marker, ha="center", va="center", fontsize=8, color="black")

    cbar = fig.colorbar(image, ax=axes, shrink=0.8, ticks=[0, 1, 2])
    cbar.ax.set_yticklabels(["Not chosen", "Chosen, no element", "Chosen, covers"])
    if output_path:
        fig.savefig(output_path, bbox_inches="tight")
    else:
        fig.savefig("setcover_visualization.png", bbox_inches="tight")

    plt.close(fig)
    return fig
