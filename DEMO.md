# Project Demo Script

This file is written as a demo script that all three presenters can read directly during the project presentation.

Important note:

- Set Cover is the only fully implemented backend pipeline right now.
- The frontend input phase is implemented for all three problems.
- TSP and Knapsack sections below are written assuming their owners complete their parts according to [person1_TSP.md](/home/skapyskar/Documents/np-hard-solver-analyzer/person1_TSP.md) and [person3_Knapsack.md](/home/skapyskar/Documents/np-hard-solver-analyzer/person3_Knapsack.md).
- For Set Cover, file and line references below point to the actual current code.
- For TSP and Knapsack, the explanation follows the required structure and algorithm plan defined in the assignment files, so those sections are the intended demo narrative once their implementation is added.
- For the strict Intractability-unit boundary, TSP and Set Cover should still use syllabus wording in explanations. At the same time, the original NP-AA brief asks for exact-vs-approximate comparison, so the project keeps that comparison where needed. Knapsack is being tracked separately.

Alignment rule:

- Whenever any person changes their algorithm, frontend flow, output format, or visualization, they must update their own section in this file in the same round of work so the demo script stays accurate.

## Part 0: Common Opening

Suggested opening:

"Our project is an NP-Hard Problem Solver and Approximation Analyzer. Our goal is to model NP-hard problems, solve small cases exactly, include approximation or heuristic comparison where the project requires it, and visualize how the algorithms behave."

"The project is divided by problem owner. Person 1 handles TSP, Person 2 handles Set Cover, and Person 3 handles Knapsack. The shared controller is at the root, the problem-specific logic lives under `people/`, the sample data lives under `data/`, plots go to `outputs/`, and the browser UI lives under `frontend/`."

"This directly matches the original NP-AA problem statement: understand computational hardness, implement exact and approximate approaches, and explain the trade-off between optimality and efficiency."

## Part 0A: Problem Statement And Why This Project Fits

Suggested narration:

"The original problem statement says that many real-world problems such as routing, scheduling, and resource allocation are NP-hard, so exact solutions become expensive as input size grows."

"Our project matches that requirement in three ways:"

- "We include exact algorithms for small or feasible cases."
- "We include exact search for small inputs."
- "We include approximation or heuristic comparison where the project asks for it."
- "We explain feasibility versus intractability using runtime and growth-of-functions language from the syllabus."

"In terms of the overall project design, our current design covers:"

- "Set Cover exact: subset selection with exponential search"
- "Set Cover approximation: greedy comparison flow"
- "TSP exact: exhaustive search"
- "TSP approximation: project-level heuristic path if implemented"
- "Reduction-based understanding: Vertex Cover less-than-or-equal-to-p Set Cover"
- "Knapsack is being tracked separately from the strict syllabus-bound TSP and Set Cover demo"

"So the architecture and planned implementation are aligned with the original NP-AA brief."

## Part 1: How Everything Is Connected

Suggested narration:

"The full project flow starts from the shared controller in [main.py](/home/skapyskar/Documents/np-hard-solver-analyzer/main.py). At lines 7 to 13, the controller imports the Set Cover pipeline functions from the Person 2 package. In the final version, the same pattern will exist for TSP and Knapsack as well."

"The core execution happens in `run_setcover()` in `main.py`. The input is loaded, then the exact solver is run, then the greedy approximation solver is run, then analysis compares the two outputs, and if requested the visualization is generated."

"The command-line interface is defined in `build_parser()` at lines 48 to 67. Right now the parser has a `setcover` subcommand. In the final project, TSP and Knapsack will add their own subcommands using the same pattern."

"Then `main()` at lines 70 to 84 parses arguments, checks which problem was requested, runs the corresponding pipeline, and prints the final JSON."

## Part 2: Frontend Demo Flow

Suggested narration while showing the UI:

"The frontend is a shared static app in [frontend/index.html](/home/skapyskar/Documents/np-hard-solver-analyzer/frontend/index.html), [frontend/app.js](/home/skapyskar/Documents/np-hard-solver-analyzer/frontend/app.js), and `styles.css`."

"The page structure is split into 3 columns in `index.html`. Lines 33 to 55 are Step 1, where we choose a problem and build the input. Lines 57 to 84 are Step 2, where we visualize the algorithm. Lines 86 to 93 are Step 3, where the final output stays pinned."

"The frontend problem configuration is declared in `app.js` lines 1 to 127. This includes presets and available algorithms for Set Cover, TSP, and Knapsack."

"The UI state is stored at lines 129 to 150. This keeps track of which problem is selected, which preset is active, which algorithm is selected, which iteration we are on, and the current run result."

"The input rendering is split by problem. Set Cover input is rendered at lines 243 to 331 as a subset-versus-universe checkbox table. TSP input is rendered at lines 333 to 405 as a distance matrix. Knapsack input is rendered at lines 407 to 477 as an item table with weight, value, and capacity."

"The general rendering flow is controlled by `render()` at lines 834 to 843. That function refreshes the problem switcher, preset selector, algorithm selector, input panel, visualization panel, and output panel together."

"When we click Run Visualization, the event handler at lines 864 to 876 executes the selected run, stores the result, resets the step index, and redraws the stage and final output."

Suggested application line:

"This frontend is important for the project outcome because it makes the comparison visible, not just printed. Instead of only saying exact and approximate methods differ, we show the input, the iteration process, and the final result side by side."

## Part 3: Person 2 Demo Script - Set Cover

This is the most concrete section because Set Cover is already fully implemented.

### 3.1 What Set Cover Means

Suggested narration:

"In Set Cover, we are given a universe of elements and a collection of subsets. The goal is to choose as few subsets as possible so that every element in the universe is covered."

"This models real-world resource allocation and selection problems, where we want minimum resources that still cover all requirements."

"In our sample input, the universe and subsets are loaded from JSON. The loader is in [people/person2_setcover/setcover/io.py](/home/skapyskar/Documents/np-hard-solver-analyzer/people/person2_setcover/setcover/io.py). At lines 8 to 14, `load_instance()` opens the file, reads the JSON, converts the universe into a Python set, converts each subset into a set, and returns both."

### 3.2 Exact Algorithm: Backtracking

Suggested narration:

"The exact Set Cover algorithm is implemented in [exact.py](/home/skapyskar/Documents/np-hard-solver-analyzer/people/person2_setcover/setcover/exact.py). This algorithm guarantees the minimum number of subsets, but it is exponential in the worst case."

"At lines 8 to 20, `_normalize_input()` first cleans the input. It intersects each subset with the universe, checks whether the union of all subsets can actually cover the universe, and throws an error if some elements are missing."

"The main exact function starts at line 23. At line 25, we start timing the run. At line 26, the input is normalized."

"At lines 31 to 34, the subsets are sorted into an `order` list. The sort key uses larger subsets first. This does not change correctness, but it improves the search order."

"At line 36, `best_solution` starts as `None`. This will store the best cover found so far."

"The recursive search is the nested `backtrack()` function at lines 38 to 66."

Suggested line-by-line explanation:

- Lines 41 to 44: if the currently covered set already equals the whole universe, we found a complete cover. If it is better than the previous best, we store it.
- Lines 46 to 47: if we have processed all candidate subsets, we stop this branch.
- Lines 49 to 50: if we already chose at least as many subsets as the best known solution, we prune this branch because it cannot improve the answer.
- Lines 52 to 56: we compute `remaining_cover`, which is the union of everything currently covered plus all subsets still left to consider. If even that cannot cover the universe, this branch is impossible and gets pruned.
- Lines 58 to 59: select the next subset according to the precomputed order.
- Lines 61 to 64: if that subset adds at least one new uncovered element, we include it, recurse, and then pop it back out. This is the include branch.
- Line 66: recurse again without taking the subset. This is the exclude branch.

"At line 68, the search starts with position 0, nothing covered, and no chosen subsets."

"At lines 70 to 71, if no valid cover was found, an error is raised."

"At lines 73 to 78, the best solution is sorted and returned in the standard format: solution, cost, and runtime."

### 3.3 Greedy Approximation Algorithm

Suggested narration:

"The approximation algorithm is implemented in `people/person2_setcover/setcover/approx.py`. This is a classic greedy Set Cover strategy used for the project-level exact-vs-approximate comparison."

"At each iteration, it looks at every subset, computes how many currently uncovered elements it would add, and chooses the subset with the largest gain."

"This does not guarantee the optimal answer in general, which is why comparing it against the exact solver is useful."

### 3.4 What Happens In The Exact Search

Use this example from the sample input:

- Universe = `{1,2,3,4,5,6}`
- Subsets:
  - `S0 = {1,2,3}`
  - `S1 = {2,4}`
  - `S2 = {3,4,5}`
  - `S3 = {4,5,6}`
  - `S4 = {1,6}`
  - `S5 = {2,5,6}`

Suggested narration:

"At the start, the exact algorithm begins with nothing covered and no chosen subsets."

"The search explores one subset-choice branch at a time. At each state, it decides whether to include the current subset or skip it."

"If a branch already covers the whole universe, it becomes a candidate solution."

"If a branch already uses at least as many subsets as the current best solution, it is pruned."

"If the union of all remaining subsets still cannot cover the universe, that branch is also pruned."

"So what the audience sees in each iteration is not a greedy choice. It is a search state in an exponential subset-selection tree."

### 3.5 Analysis Step

Suggested narration:

"The analysis step is in [analysis.py](/home/skapyskar/Documents/np-hard-solver-analyzer/people/person2_setcover/setcover/analysis.py). It reports both project-comparison data and theory-facing metadata: approximation ratio, exact and approximate runtimes, exact and approximate costs, and also the optimization and decision wording for Set Cover."

### 3.6 Visualization Step

Suggested narration:

"The plot generation is in [visualize.py](/home/skapyskar/Documents/np-hard-solver-analyzer/people/person2_setcover/setcover/visualize.py)."

"At lines 7 and 11, matplotlib is configured for non-interactive image generation, which is useful for scripts and headless environments."

"At lines 17 and 18, the universe and subset labels are prepared."

"The helper at lines 20 to 33 converts a chosen solution into a heatmap matrix. For every subset and every universe element, it stores:

- `0` if the subset was not chosen
- `2` if the subset was chosen and contains that element
- `1` if the subset was chosen but that specific element is not in the subset"

"The visualization shows both the exact solution and the greedy approximation side by side. That makes the exact-vs-approximate comparison easy to explain during the demo."

### 3.7 Set Cover Frontend Walkthrough

Suggested narration while operating the UI:

"The Set Cover frontend editor is built at `frontend/app.js` lines 243 to 331. The code builds a table where rows are subsets and columns are universe elements. Each checkbox directly represents whether that subset contains that element."

"The event handler at lines 299 to 315 updates the internal subset data whenever a checkbox changes. That keeps the UI and the instance in sync."

"The frontend validation for Set Cover happens at lines 495 to 506. It removes duplicates, sorts the input, and checks whether the universe can actually be covered."

"For frontend playback, one mode shows greedy approximation steps and the other shows exact-search states."

"At lines 638 to 659, the final run result is packaged with metadata and a pinned output object."

"At lines 721 to 762, the current Set Cover iteration is rendered visually. The user sees:

- which step we are on
- which subset was chosen
- which elements are covered or still uncovered
- which subsets are selected so far"

"At lines 815 to 831, the final output panel is rendered. This means once the solve button is pressed, the result stays visible on the right side while we keep stepping through the algorithm."

### 3.8 Suggested Closing For Person 2

"So the Set Cover part demonstrates the complete project flow: input loading, exact solving, approximation solving, analysis, backend visualization, and interactive frontend playback."

## Part 4: Person 1 Demo Script - TSP

This section is written as the intended demo once Person 1 completes the TSP implementation according to [person1_TSP.md](/home/skapyskar/Documents/np-hard-solver-analyzer/person1_TSP.md).

### 4.1 What TSP Means

Suggested narration:

"In TSP, we are given cities and pairwise travel costs. The goal is to find the minimum-cost tour that visits every city exactly once and returns to the start."

"This maps directly to real-world routing and logistics, which is one of the examples mentioned in the original problem statement."

"Our TSP input format is defined in `person1_TSP.md` lines 49 to 66. The core input is a distance matrix."

### 4.2 Exact Algorithm: DP With Bitmask

Suggested narration:

"The required TSP method for the syllabus-bound portion is exhaustive search, specified in `person1_TSP.md`. This matches the intractability-unit wording that no polynomial-time method is known in this context."

Suggested line-by-line style explanation for the expected implementation:

- Start from city `0`.
- Generate each possible permutation of the remaining cities.
- Form one full tour from that permutation.
- Compute its total cost edge by edge.
- Compare it with the best tour cost found so far.
- Keep the minimum-cost tour as the exact answer.

"During the demo, Person 1 can explain each iteration as: current candidate permutation, current edge being added to the tour cost, and whether that full route becomes the new best solution."

### 4.3 Analysis Step

Suggested narration:

"The TSP analysis should keep the syllabus wording visible, but if the project comparison path is implemented it can also report exact-vs-approximate comparison metrics."

### 4.5 Visualization Step

Suggested narration:

"The visualization requirement is defined in `person1_TSP.md` lines 119 to 132. If only a distance matrix exists, cities can be placed on a circular layout. If coordinates are added later, the plot can use real geometry."

"For the frontend, the input table already exists in `frontend/app.js` lines 333 to 405. Each cell in the matrix is editable, and the Add City button dynamically grows the matrix."

"The next frontend phase for TSP is already specified in `person1_TSP.md`: show actual graph or route playback iteration by iteration for exhaustive search, then keep the final output pinned."

### 4.6 Suggested Closing For Person 1

"So the TSP part of the project demonstrates how exhaustive search behaves on a classic NP-hard routing problem, and how route construction can be visualized step by step."

## Part 5: Person 3 Demo Script - Knapsack

This section is written as the intended demo once Person 3 completes the Knapsack implementation according to [person3_Knapsack.md](/home/skapyskar/Documents/np-hard-solver-analyzer/person3_Knapsack.md).

### 5.1 What Knapsack Means

Suggested narration:

"In 0/1 Knapsack, we are given item weights, item values, and a bag capacity. We must choose a subset of items that maximizes total value without exceeding the capacity."

"This is a classic model for resource allocation, budget planning, and selection under constraints, which again matches the original NP-AA motivation."

"The required input format is defined in `person3_Knapsack.md` lines 44 to 63."

### 5.2 Exact Algorithm: Dynamic Programming

Suggested narration:

"The required exact algorithm is Dynamic Programming, defined in `person3_Knapsack.md` lines 65 to 80."

"The standard DP state is `dp[i][w]`, which means the maximum value we can achieve using the first `i` items with capacity `w`."

Suggested line-by-line style explanation for the expected implementation:

- Initialize a DP table for items versus capacity.
- For each item, decide whether to exclude it or include it.
- If the item weight is more than the current capacity, it cannot be included.
- Otherwise compute:
  - value without item
  - value with item
- Store the maximum of those two.
- After filling the table, backtrack through the DP table to recover which item indices were chosen.

"During the demo, Person 3 can explain each row as one more item becoming available, and each column as one capacity value being considered."

### 5.3 Approximation: Greedy By Value/Weight Ratio

Suggested narration:

"The required approximation is greedy by value-to-weight ratio, defined in `person3_Knapsack.md` lines 86 to 99."

Suggested iteration explanation:

- Compute `value / weight` for each item.
- Sort items by this ratio in descending order.
- Go through the sorted list one item at a time.
- If the item still fits, include it.
- If it does not fit, skip it.
- Continue until all items are considered.

"This is fast, but because Knapsack is a maximization problem, greedy ratio can miss the optimal combination. That is why the comparison against exact DP matters."

### 5.4 Analysis Step

Suggested narration:

"The analysis requirement is in `person3_Knapsack.md` lines 101 to 118. The recommended ratio is `exact_cost / approx_cost` because higher value is better in Knapsack. If this ratio is above `1.0`, it means the greedy solution was worse than the exact one."

### 5.5 Counterexample To Explain In Demo

Suggested narration:

"A very useful demonstration case is given in `person3_Knapsack.md` lines 201 to 213:

- weights = `[1, 3, 3]`
- values = `[2, 3, 3]`
- capacity = `6`

This is good for viva because it helps explain that greedy choice is not always globally optimal."

### 5.6 Frontend Step

Suggested narration:

"The Knapsack input table is already implemented in `frontend/app.js` lines 407 to 477. Each row is an item, and the table directly shows weight, value, and value-to-weight ratio. The capacity input is at lines 424 to 425, and each table edit updates the live instance state."

"The next phase for Knapsack is already defined in `person3_Knapsack.md` lines 177 to 199: show iteration-by-iteration decision making visually and keep the final result pinned in the output panel."

### 5.7 Suggested Closing For Person 3

"So the Knapsack part shows how a dynamic-programming exact method can be compared against a fast ratio-based greedy approximation, especially on examples where greedy fails."

## Part 6: How To Run During Demo

### Backend Demo

Use:

```bash
python3 main.py setcover --input data/person2_setcover/sample.json
python3 main.py setcover --input data/person2_setcover/sample.json --visualize --plot-output outputs/setcover_sample.png
```

Suggested narration:

"The first command runs the backend pipeline and prints the final JSON. The second command also generates a plot image and saves it into `outputs/`."

### Frontend Demo

Use:

```bash
python3 -m http.server 8000
```

Then open:

```text
http://localhost:8000/frontend/
```

Suggested narration:

"On the frontend, we can switch between Set Cover, TSP, and Knapsack. Right now all three support structured input entry, and Set Cover already supports full step-by-step playback and pinned output."

## Part 7: Final Combined Closing

Suggested closing:

"Overall, our project is designed around one shared architecture and three separate NP-hard problems. The common structure makes the project easier to maintain, compare, and demonstrate. Set Cover already shows the full end-to-end syllabus-aligned model, and TSP and Knapsack follow the same shared structure with their own implementations."

"So in terms of the expected learning outcomes, this project helps us understand NP-hardness, implement exact methods that fit the syllabus boundary, and explain tractability versus intractability with actual code, outputs, and visual explanation."

"The only remaining gap right now is implementation completeness: Set Cover is already fully demonstrated, while TSP and Knapsack still need to complete their backend and frontend visualization phases to fully match the final project outcome."
