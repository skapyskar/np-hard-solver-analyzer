const problemConfigs = {
  setcover: {
    label: "Set Cover",
    summary:
      "Fill the subset-vs-universe table directly. Each row is a subset, each column is a universe element, and the frontend can compare exact search with greedy approximation step by step.",
    algorithms: [
      {
        key: "greedy",
        label: "Greedy Approximation",
      },
      {
        key: "exact",
        label: "Exact Search",
      },
    ],
    presets: {
      small: {
        label: "Small example",
        instance: {
          universe: [1, 2, 3, 4, 5, 6],
          subsets: [
            [1, 2, 3],
            [2, 4],
            [3, 4, 5],
            [4, 5, 6],
            [1, 6],
            [2, 5, 6],
          ],
        },
      },
      medium: {
        label: "Medium example",
        instance: {
          universe: [1, 2, 3, 4, 5, 6, 7, 8],
          subsets: [
            [1, 4, 7],
            [2, 3, 6],
            [1, 2, 5],
            [4, 5, 8],
            [3, 6, 7, 8],
            [2, 4, 8],
          ],
        },
      },
    },
  },
  tsp: {
    label: "TSP",
    summary:
      "Edit the full distance matrix as a table. The project should show exact search for small inputs and an approximation or heuristic path for larger exploration.",
    algorithms: [
      {
        key: "exhaustive-search",
        label: "Exhaustive Search",
      },
      {
        key: "nearest-neighbor",
        label: "Nearest Neighbor",
      },
    ],
    presets: {
      four: {
        label: "4-city matrix",
        instance: {
          dist: [
            [0, 10, 15, 20],
            [10, 0, 35, 25],
            [15, 35, 0, 30],
            [20, 25, 30, 0],
          ],
        },
      },
      five: {
        label: "5-city matrix",
        instance: {
          dist: [
            [0, 7, 13, 19, 8],
            [7, 0, 9, 11, 10],
            [13, 9, 0, 6, 12],
            [19, 11, 6, 0, 14],
            [8, 10, 12, 14, 0],
          ],
        },
      },
    },
  },
  knapsack: {
    label: "Knapsack",
    summary:
      "Enter items in a structured table with weight and value columns. The next phase should animate item decisions and keep the chosen set visible after the run.",
    algorithms: [
      {
        key: "ratio-greedy",
        label: "Greedy by Ratio",
      },
      {
        key: "exact-dp",
        label: "Exact DP",
      },
    ],
    presets: {
      compact: {
        label: "Compact example",
        instance: {
          capacity: 8,
          items: [
            { weight: 2, value: 3 },
            { weight: 3, value: 4 },
            { weight: 4, value: 5 },
            { weight: 5, value: 6 },
          ],
        },
      },
      counterexample: {
        label: "Greedy counterexample",
        instance: {
          capacity: 6,
          items: [
            { weight: 1, value: 2 },
            { weight: 3, value: 3 },
            { weight: 3, value: 3 },
          ],
        },
      },
    },
  },
};

const state = {
  selectedProblem: "setcover",
  selectedPreset: "small",
  selectedAlgorithm: "greedy",
  currentStepIndex: 0,
  runResult: null,
};

const elements = {
  problemSwitcher: document.getElementById("problemSwitcher"),
  problemSize: document.getElementById("problemSize"),
  resetButton: document.getElementById("resetButton"),
  problemMeta: document.getElementById("problemMeta"),
  inputEditor: document.getElementById("inputEditor"),
  algorithmSelect: document.getElementById("algorithmSelect"),
  solveButton: document.getElementById("solveButton"),
  prevStepButton: document.getElementById("prevStepButton"),
  nextStepButton: document.getElementById("nextStepButton"),
  stageSummary: document.getElementById("stageSummary"),
  visualizationArea: document.getElementById("visualizationArea"),
  outputArea: document.getElementById("outputArea"),
};

function deepClone(value) {
  return JSON.parse(JSON.stringify(value));
}

function getProblemConfig() {
  return problemConfigs[state.selectedProblem];
}

function getPresetKeys(problemKey = state.selectedProblem) {
  return Object.keys(problemConfigs[problemKey].presets);
}

function ensureProblemState(problemKey = state.selectedProblem) {
  const config = problemConfigs[problemKey];
  if (!state.instances) {
    state.instances = {};
  }

  if (!state.instances[problemKey]) {
    const presetKey = getPresetKeys(problemKey)[0];
    state.instances[problemKey] = deepClone(config.presets[presetKey].instance);
  }
}

function resetProblemInstance(problemKey = state.selectedProblem, presetKey = state.selectedPreset) {
  const config = problemConfigs[problemKey];
  state.instances[problemKey] = deepClone(config.presets[presetKey].instance);
  state.runResult = null;
  state.currentStepIndex = 0;
}

function getCurrentInstance() {
  ensureProblemState();
  return state.instances[state.selectedProblem];
}

function renderProblemSwitcher() {
  elements.problemSwitcher.innerHTML = "";

  Object.entries(problemConfigs).forEach(([key, config]) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = `chip${state.selectedProblem === key ? " active" : ""}`;
    button.textContent = config.label;
    button.addEventListener("click", () => {
      state.selectedProblem = key;
      state.selectedPreset = getPresetKeys(key)[0];
      state.selectedAlgorithm = problemConfigs[key].algorithms[0].key;
      state.runResult = null;
      state.currentStepIndex = 0;
      ensureProblemState(key);
      render();
    });
    elements.problemSwitcher.appendChild(button);
  });
}

function renderPresetSelect() {
  const config = getProblemConfig();
  elements.problemSize.innerHTML = "";

  Object.entries(config.presets).forEach(([key, preset]) => {
    const option = document.createElement("option");
    option.value = key;
    option.textContent = preset.label;
    option.selected = state.selectedPreset === key;
    elements.problemSize.appendChild(option);
  });
}

function renderAlgorithmSelect() {
  const config = getProblemConfig();
  elements.algorithmSelect.innerHTML = "";

  config.algorithms.forEach((algorithm) => {
    const option = document.createElement("option");
    option.value = algorithm.key;
    option.textContent = algorithm.label;
    option.selected = state.selectedAlgorithm === algorithm.key;
    elements.algorithmSelect.appendChild(option);
  });
}

function renderProblemMeta() {
  const config = getProblemConfig();
  elements.problemMeta.innerHTML = `
    <p class="meta-label">Current editor</p>
    <p>${config.summary}</p>
  `;
}

function renderSetCoverEditor(instance) {
  const universe = instance.universe;
  const subsets = instance.subsets;

  const rows = subsets
    .map((subset, subsetIndex) => {
      const cells = universe
        .map((element) => {
          const checked = subset.includes(element) ? "checked" : "";
          return `
            <td class="checkbox-cell">
              <input
                type="checkbox"
                data-role="setcover-toggle"
                data-subset-index="${subsetIndex}"
                data-element="${element}"
                ${checked}
              />
            </td>
          `;
        })
        .join("");

      return `
        <tr>
          <th scope="row">S${subsetIndex}</th>
          ${cells}
        </tr>
      `;
    })
    .join("");

  elements.inputEditor.innerHTML = `
    <div class="table-card">
      <h3>Set Cover input table</h3>
      <div class="table-wrap">
        <table>
          <thead>
            <tr>
              <th>Subset</th>
              ${universe.map((element) => `<th>${element}</th>`).join("")}
            </tr>
          </thead>
          <tbody>${rows}</tbody>
        </table>
      </div>
      <div class="table-actions">
        <button type="button" class="ghost-button" id="addSubsetButton">Add Subset</button>
        <button type="button" class="ghost-button" id="addUniverseButton">Add Universe Element</button>
      </div>
      <p class="matrix-note">
        Tick each cell when a subset covers that universe element. This keeps the input visual instead of forcing raw JSON.
      </p>
    </div>
  `;

  elements.inputEditor.querySelectorAll('[data-role="setcover-toggle"]').forEach((checkbox) => {
    checkbox.addEventListener("change", (event) => {
      const subsetIndex = Number(event.target.dataset.subsetIndex);
      const element = Number(event.target.dataset.element);
      const targetSubset = new Set(getCurrentInstance().subsets[subsetIndex]);

      if (event.target.checked) {
        targetSubset.add(element);
      } else {
        targetSubset.delete(element);
      }

      getCurrentInstance().subsets[subsetIndex] = Array.from(targetSubset).sort((a, b) => a - b);
      state.runResult = null;
      renderStage();
      renderOutput();
    });
  });

  document.getElementById("addSubsetButton").addEventListener("click", () => {
    getCurrentInstance().subsets.push([]);
    state.runResult = null;
    render();
  });

  document.getElementById("addUniverseButton").addEventListener("click", () => {
    const current = getCurrentInstance();
    const nextElement = current.universe.length ? Math.max(...current.universe) + 1 : 1;
    current.universe.push(nextElement);
    state.runResult = null;
    render();
  });
}

function renderTspEditor(instance) {
  const rows = instance.dist
    .map((row, rowIndex) => {
      const cells = row
        .map(
          (value, colIndex) => `
            <td>
              <input
                type="number"
                min="0"
                value="${value}"
                data-role="tsp-cell"
                data-row="${rowIndex}"
                data-col="${colIndex}"
              />
            </td>
          `,
        )
        .join("");

      return `
        <tr>
          <th scope="row">City ${rowIndex}</th>
          ${cells}
        </tr>
      `;
    })
    .join("");

  elements.inputEditor.innerHTML = `
    <div class="table-card">
      <h3>TSP distance matrix</h3>
      <div class="table-wrap">
        <table>
          <thead>
            <tr>
              <th>From \\ To</th>
              ${instance.dist.map((_, index) => `<th>City ${index}</th>`).join("")}
            </tr>
          </thead>
          <tbody>${rows}</tbody>
        </table>
      </div>
      <div class="table-actions">
        <button type="button" class="ghost-button" id="addCityButton">Add City</button>
      </div>
      <p class="matrix-note">
        TSP input should look like a matrix, not a plain text blob. Symmetry is not enforced automatically, so mirrored distances should be edited together.
      </p>
    </div>
  `;

  elements.inputEditor.querySelectorAll('[data-role="tsp-cell"]').forEach((input) => {
    input.addEventListener("input", (event) => {
      const row = Number(event.target.dataset.row);
      const col = Number(event.target.dataset.col);
      getCurrentInstance().dist[row][col] = Number(event.target.value || 0);
      state.runResult = null;
      renderStage();
      renderOutput();
    });
  });

  document.getElementById("addCityButton").addEventListener("click", () => {
    const current = getCurrentInstance();
    const size = current.dist.length;

    current.dist.forEach((row) => row.push(0));
    current.dist.push(Array.from({ length: size + 1 }, () => 0));
    state.runResult = null;
    render();
  });
}

function renderKnapsackEditor(instance) {
  const rows = instance.items
    .map(
      (item, index) => `
        <tr>
          <th scope="row">Item ${index}</th>
          <td><input type="number" min="0" value="${item.weight}" data-role="knapsack-weight" data-index="${index}" /></td>
          <td><input type="number" min="0" value="${item.value}" data-role="knapsack-value" data-index="${index}" /></td>
          <td class="mono">${(item.value / Math.max(item.weight, 1)).toFixed(2)}</td>
        </tr>
      `,
    )
    .join("");

  elements.inputEditor.innerHTML = `
    <div class="table-card">
      <h3>Knapsack item table</h3>
      <label class="field-label" for="capacityInput">Capacity</label>
      <input id="capacityInput" type="number" min="0" value="${instance.capacity}" />
      <div class="table-wrap">
        <table>
          <thead>
            <tr>
              <th>Item</th>
              <th>Weight</th>
              <th>Value</th>
              <th>Value/Weight</th>
            </tr>
          </thead>
          <tbody>${rows}</tbody>
        </table>
      </div>
      <div class="table-actions">
        <button type="button" class="ghost-button" id="addItemButton">Add Item</button>
      </div>
      <p class="matrix-note">
        Item data belongs in a structured table so the next phase can animate decisions row by row.
      </p>
    </div>
  `;

  document.getElementById("capacityInput").addEventListener("input", (event) => {
    getCurrentInstance().capacity = Number(event.target.value || 0);
    state.runResult = null;
    renderOutput();
  });

  elements.inputEditor.querySelectorAll('[data-role="knapsack-weight"]').forEach((input) => {
    input.addEventListener("input", (event) => {
      const index = Number(event.target.dataset.index);
      getCurrentInstance().items[index].weight = Number(event.target.value || 0);
      state.runResult = null;
      render();
    });
  });

  elements.inputEditor.querySelectorAll('[data-role="knapsack-value"]').forEach((input) => {
    input.addEventListener("input", (event) => {
      const index = Number(event.target.dataset.index);
      getCurrentInstance().items[index].value = Number(event.target.value || 0);
      state.runResult = null;
      render();
    });
  });

  document.getElementById("addItemButton").addEventListener("click", () => {
    getCurrentInstance().items.push({ weight: 1, value: 1 });
    state.runResult = null;
    render();
  });
}

function renderInputEditor() {
  const instance = getCurrentInstance();

  if (state.selectedProblem === "setcover") {
    renderSetCoverEditor(instance);
    return;
  }

  if (state.selectedProblem === "tsp") {
    renderTspEditor(instance);
    return;
  }

  renderKnapsackEditor(instance);
}

function validateSetCover(instance) {
  const universe = [...new Set(instance.universe)].sort((a, b) => a - b);
  const subsets = instance.subsets.map((subset) => [...new Set(subset)].sort((a, b) => a - b));

  const covered = new Set(subsets.flat());
  const missing = universe.filter((element) => !covered.has(element));
  if (missing.length) {
    throw new Error(`Universe cannot be fully covered. Missing elements: ${missing.join(", ")}`);
  }

  return { universe, subsets };
}

function buildGreedySetCoverSteps(instance) {
  const { universe, subsets } = validateSetCover(instance);
  const uncovered = new Set(universe);
  const chosen = [];
  const steps = [];

  while (uncovered.size) {
    let bestIndex = -1;
    let bestGain = [];

    subsets.forEach((subset, index) => {
      const gain = subset.filter((element) => uncovered.has(element));
      if (gain.length > bestGain.length) {
        bestIndex = index;
        bestGain = gain;
      }
    });

    if (bestIndex === -1 || bestGain.length === 0) {
      throw new Error("Greedy solver could not cover the remaining universe.");
    }

    bestGain.forEach((element) => uncovered.delete(element));
    chosen.push(bestIndex);

    steps.push({
      title: `Iteration ${steps.length + 1}`,
      chosenSubset: bestIndex,
      gain: bestGain,
      selected: [...chosen],
      covered: universe.filter((element) => !uncovered.has(element)),
      uncovered: universe.filter((element) => uncovered.has(element)),
      rationale: `Choose S${bestIndex} because it adds the largest new coverage: ${bestGain.join(", ")}.`,
    });
  }

  return {
    mode: "greedy",
    solution: chosen,
    cost: chosen.length,
    steps,
    universe,
    subsets,
  };
}

function enumerateExactSetCovers(instance) {
  const { universe, subsets } = validateSetCover(instance);
  const universeSet = new Set(universe);
  let bestSolution = null;

  const order = subsets
    .map((subset, index) => ({ index, subset }))
    .sort((left, right) => right.subset.length - left.subset.length || left.index - right.index)
    .map((entry) => entry.index);

  const steps = [];

  function backtrack(position, covered, chosen) {
    steps.push({
      title: `Search state ${steps.length + 1}`,
      chosenSubset: chosen.length ? chosen[chosen.length - 1] : null,
      gain: [],
      selected: [...chosen],
      covered: universe.filter((element) => covered.has(element)),
      uncovered: universe.filter((element) => !covered.has(element)),
      rationale:
        bestSolution && chosen.length >= bestSolution.length
          ? "This branch is pruned because it cannot beat the best solution found so far."
          : "Explore this branch of the search tree.",
    });

    if (covered.size === universeSet.size) {
      if (!bestSolution || chosen.length < bestSolution.length) {
        bestSolution = [...chosen];
      }
      return;
    }

    if (position >= order.length) {
      return;
    }

    if (bestSolution && chosen.length >= bestSolution.length) {
      return;
    }

    const subsetIndex = order[position];
    const subset = subsets[subsetIndex];
    const addsCoverage = subset.some((element) => !covered.has(element));

    if (addsCoverage) {
      const nextCovered = new Set(covered);
      subset.forEach((element) => nextCovered.add(element));
      chosen.push(subsetIndex);
      backtrack(position + 1, nextCovered, chosen);
      chosen.pop();
    }

    backtrack(position + 1, new Set(covered), chosen);
  }

  backtrack(0, new Set(), []);

  if (!bestSolution) {
    throw new Error("No exact cover found for the provided universe and subsets.");
  }

  bestSolution.sort((a, b) => a - b);

  steps.push({
    title: "Optimal solution",
    chosenSubset: null,
    gain: [],
    selected: [...bestSolution],
    covered: [...universe],
    uncovered: [],
    rationale: `Best cover found with ${bestSolution.length} subsets.`,
  });

  return {
    mode: "exact",
    solution: bestSolution,
    cost: bestSolution.length,
    steps,
    universe,
    subsets,
  };
}

function buildSetCoverRun(instance, algorithmKey) {
  const startedAt = performance.now();
  const result =
    algorithmKey === "exact" ? enumerateExactSetCovers(instance) : buildGreedySetCoverSteps(instance);
  const elapsedMs = performance.now() - startedAt;

  return {
    type: "setcover",
    algorithm: algorithmKey,
    ...result,
    elapsedMs,
    finalOutput: {
      problem: "setcover",
      algorithm: algorithmKey,
      solution: result.solution,
      cost: result.cost,
      covered_universe: result.universe,
      iterations: result.steps.length,
      runtime_ms: Number(elapsedMs.toFixed(3)),
    },
  };
}

function buildPlaceholderRun(problemKey, algorithmKey, instance) {
  return {
    type: problemKey,
    algorithm: algorithmKey,
    placeholder: true,
    instance,
    finalOutput: {
      problem: problemKey,
      status: "input-ready",
      visualization: "pending-next-phase",
      algorithm: algorithmKey,
    },
  };
}

function runCurrentProblem() {
  const instance = deepClone(getCurrentInstance());

  if (state.selectedProblem === "setcover") {
    return buildSetCoverRun(instance, state.selectedAlgorithm);
  }

  return buildPlaceholderRun(state.selectedProblem, state.selectedAlgorithm, instance);
}

function renderCoveragePills(items, coveredSet) {
  return `
    <div class="coverage-grid">
      ${items
        .map((element) => {
          const covered = coveredSet.has(element);
          return `<div class="coverage-pill ${covered ? "covered" : "uncovered"}">${element}</div>`;
        })
        .join("")}
    </div>
  `;
}

function renderSubsetCards(subsets, selectedSet, coveredSet) {
  return `
    <div class="subset-stack">
      ${subsets
        .map((subset, index) => {
          const newlyCovered = subset.filter((element) => coveredSet.has(element));
          return `
            <div class="subset-card ${selectedSet.has(index) ? "selected" : ""}">
              <div class="subset-title">
                <span>S${index}</span>
                <small>${selectedSet.has(index) ? "selected" : "available"}</small>
              </div>
              <div class="subset-elements">${subset.map((element) => `<span>${element}</span>`).join("")}</div>
              <small>Covered now: ${newlyCovered.length ? newlyCovered.join(", ") : "none"}</small>
            </div>
          `;
        })
        .join("")}
    </div>
  `;
}

function renderSetCoverStage(runResult) {
  const step = runResult.steps[state.currentStepIndex] || runResult.steps[0];
  const coveredSet = new Set(step.covered);
  const selectedSet = new Set(step.selected);

  elements.stageSummary.innerHTML = `
    <p class="meta-label">Playback status</p>
    <p>
      ${runResult.mode === "exact" ? "Exact search" : "Greedy approximation"} step
      <strong>${state.currentStepIndex + 1}</strong> of <strong>${runResult.steps.length}</strong>.
      Current selected subsets: <span class="mono">[${step.selected.join(", ")}]</span>.
    </p>
  `;

  elements.visualizationArea.innerHTML = `
    <div class="legend">
      <span class="legend-item"><span class="swatch selected"></span> selected subset</span>
      <span class="legend-item"><span class="swatch covered"></span> covered element</span>
      <span class="legend-item"><span class="swatch uncovered"></span> uncovered element</span>
    </div>

    <div class="iteration-card">
      <h3>${step.title}</h3>
      <p>${step.rationale}</p>
      <div class="metric-grid">
        <div class="metric"><span>Chosen subset</span><strong>${step.chosenSubset === null ? "-" : `S${step.chosenSubset}`}</strong></div>
        <div class="metric"><span>Newly covered</span><strong>${step.gain.length ? step.gain.join(", ") : "-"}</strong></div>
        <div class="metric"><span>Covered count</span><strong>${step.covered.length} / ${runResult.universe.length}</strong></div>
      </div>
    </div>

    <div class="coverage-card">
      <h3>Universe coverage</h3>
      ${renderCoveragePills(runResult.universe, coveredSet)}
    </div>

    <div class="coverage-card">
      <h3>Subset view</h3>
      ${renderSubsetCards(runResult.subsets, selectedSet, coveredSet)}
    </div>
  `;
}

function renderPlaceholderStage(runResult) {
  const labels = {
    tsp: "TSP route playback",
    knapsack: "Knapsack decision playback",
  };

  elements.stageSummary.innerHTML = `
    <p class="meta-label">Frontend status</p>
    <p>Input editing is complete for ${problemConfigs[state.selectedProblem].label}. Visualization playback and pinned final output logic still need to be implemented by the owner for this problem.</p>
  `;

  elements.visualizationArea.innerHTML = `
    <div class="algo-placeholder">
      <h3>${labels[state.selectedProblem]}</h3>
      <p>
        The shared layout is ready. The next phase should replace this panel with actual iteration-by-iteration visuals for
        <strong>${problemConfigs[state.selectedProblem].label}</strong> using the selected algorithm:
        <span class="mono">${runResult.algorithm}</span>.
      </p>
    </div>
  `;
}

function renderStage() {
  if (!state.runResult) {
    elements.stageSummary.innerHTML = `
      <p class="meta-label">Ready state</p>
      <p>Build the input first, then run the selected algorithm to populate the visualization stage.</p>
    `;
    elements.visualizationArea.innerHTML = `
      <div class="empty-state">
        <p>No run yet. The visualization panel will switch to step playback after the first execution.</p>
      </div>
    `;
    elements.prevStepButton.disabled = true;
    elements.nextStepButton.disabled = true;
    return;
  }

  if (state.runResult.placeholder) {
    renderPlaceholderStage(state.runResult);
    elements.prevStepButton.disabled = true;
    elements.nextStepButton.disabled = true;
    return;
  }

  renderSetCoverStage(state.runResult);
  elements.prevStepButton.disabled = state.currentStepIndex <= 0;
  elements.nextStepButton.disabled = state.currentStepIndex >= state.runResult.steps.length - 1;
}

function renderOutput() {
  if (!state.runResult) {
    elements.outputArea.innerHTML = `
      <div class="empty-state">
        <p>The final output panel stays empty until a run is executed.</p>
      </div>
    `;
    return;
  }

  elements.outputArea.innerHTML = `
    <div class="output-card">
      <div class="status-badge">Pinned result</div>
      <h3>${problemConfigs[state.selectedProblem].label} output</h3>
      <pre>${JSON.stringify(state.runResult.finalOutput, null, 2)}</pre>
    </div>
  `;
}

function render() {
  ensureProblemState();
  renderProblemSwitcher();
  renderPresetSelect();
  renderAlgorithmSelect();
  renderProblemMeta();
  renderInputEditor();
  renderStage();
  renderOutput();
}

elements.problemSize.addEventListener("change", (event) => {
  state.selectedPreset = event.target.value;
  resetProblemInstance();
  render();
});

elements.algorithmSelect.addEventListener("change", (event) => {
  state.selectedAlgorithm = event.target.value;
  state.runResult = null;
  state.currentStepIndex = 0;
  renderStage();
  renderOutput();
});

elements.resetButton.addEventListener("click", () => {
  resetProblemInstance();
  render();
});

elements.solveButton.addEventListener("click", () => {
  try {
    state.runResult = runCurrentProblem();
    state.currentStepIndex = 0;
    renderStage();
    renderOutput();
  } catch (error) {
    elements.stageSummary.innerHTML = `
      <div class="error-card">${error.message}</div>
    `;
    elements.visualizationArea.innerHTML = "";
  }
});

elements.prevStepButton.addEventListener("click", () => {
  if (!state.runResult || state.currentStepIndex <= 0) {
    return;
  }

  state.currentStepIndex -= 1;
  renderStage();
});

elements.nextStepButton.addEventListener("click", () => {
  if (!state.runResult || state.runResult.placeholder) {
    return;
  }

  if (state.currentStepIndex >= state.runResult.steps.length - 1) {
    return;
  }

  state.currentStepIndex += 1;
  renderStage();
});

ensureProblemState("setcover");
ensureProblemState("tsp");
ensureProblemState("knapsack");
render();
