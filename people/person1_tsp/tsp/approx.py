
import time


def solve_approx(dist):
    start = time.perf_counter()

    n = len(dist)
    visited = [False] * n
    path = [0]
    visited[0] = True
    current = 0
    total_cost = 0

    for _ in range(n - 1):
        nearest = None
        nearest_cost = float("inf")

        for city in range(n):
            if not visited[city] and dist[current][city] < nearest_cost:
                nearest = city
                nearest_cost = dist[current][city]

        path.append(nearest)
        visited[nearest] = True
        total_cost += nearest_cost
        current = nearest

    path.append(0)
    total_cost += dist[current][0]

    end = time.perf_counter()

    return {
        "solution": path,
        "cost": total_cost,
        "time": end - start,
    }

