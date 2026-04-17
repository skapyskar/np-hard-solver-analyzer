def analyze(exact_result, dist, approx_result=None):
    result = {
        "problem_type": "Travelling Salesman Problem",
        "method": "Exact exhaustive search",
        "city_count": len(dist),
        "exact_cost": exact_result["cost"],
        "exact_time": exact_result["time"],
    }

    if approx_result:
        ratio = approx_result["cost"] / exact_result["cost"]

        result.update({
            "approx_method": "Nearest Neighbor heuristic",
            "approx_cost": approx_result["cost"],
            "approx_time": approx_result["time"],
            "ratio": ratio,
        })

    return result
