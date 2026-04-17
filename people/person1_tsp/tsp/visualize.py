
import matplotlib.pyplot as plt
import math


def visualize(dist, solution, output_path="outputs/tsp_visualization.png"):
    n = len(dist)

    coords = []
    for i in range(n):
        angle = 2 * math.pi * i / n
        x = math.cos(angle)
        y = math.sin(angle)
        coords.append((x, y))

    plt.figure(figsize=(7, 7))

    for i in range(len(solution) - 1):
        a = solution[i]
        b = solution[i + 1]

        x1, y1 = coords[a]
        x2, y2 = coords[b]

        plt.plot([x1, x2], [y1, y2], linewidth=2)

    for i, (x, y) in enumerate(coords):
        plt.scatter(x, y, s=200)
        plt.text(x, y, f" {i}", fontsize=12)

    plt.title("TSP Optimal Tour")
    plt.axis("off")
    plt.savefig(output_path)
    plt.close()
