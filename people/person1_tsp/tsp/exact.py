
import time
from itertools import permutations


def solve_exact(dist):
    start = time.perf_counter()

    n = len(dist)
    cities = list(range(1, n))

    best_cost = float("inf")
    best_path = None

    for perm in permutations(cities):
        path = [0] + list(perm) + [0]

        cost = 0
        for i in range(len(path) - 1):
            cost += dist[path[i]][path[i + 1]]

        if cost < best_cost:
            best_cost = cost
            best_path = path

    end = time.perf_counter()

    return {
        "solution": best_path,
        "cost": best_cost,
        "time": end - start,
    }

