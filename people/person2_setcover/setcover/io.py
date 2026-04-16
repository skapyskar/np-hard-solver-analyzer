"""Input helpers for Set Cover instances."""

from __future__ import annotations

import json


def load_instance(path):
    with open(path, "r", encoding="utf-8") as handle:
        payload = json.load(handle)

    universe = set(payload["universe"])
    subsets = [set(subset) for subset in payload["subsets"]]
    return universe, subsets
