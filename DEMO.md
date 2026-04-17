# Project Demo Script

This file is written as a demo script that all three presenters can read directly during the project presentation.

Important note:

- Set Cover is the only fully implemented backend pipeline right now.
- The frontend input phase is implemented for all three problems.
- TSP and Knapsack sections below are written assuming their owners complete their parts according to [person1_TSP.md](/home/skapyskar/Documents/np-hard-solver-analyzer/person1_TSP.md) and [person3_Knapsack.md](/home/skapyskar/Documents/np-hard-solver-analyzer/person3_Knapsack.md).
- For Set Cover, file and line references below point to the actual current code.
- For TSP and Knapsack, the explanation follows the required structure and algorithm plan defined in the assignment files, so those sections are the intended demo narrative once their implementation is added.

Alignment rule:

- Whenever any person changes their algorithm, frontend flow, output format, or visualization, they must update their own section in this file in the same round of work so the demo script stays accurate.

## Part 0: Common Opening

Suggested opening:

"Our project is an NP-Hard Problem Solver and Approximation Analyzer. The main goal is to compare exact algorithms with approximation or heuristic algorithms, analyze their outputs, and visualize both the input and the solving process."

"The project is divided by problem owner. Person 1 handles TSP, Person 2 handles Set Cover, and Person 3 handles Knapsack. The shared controller is at the root, the problem-specific logic lives under `people/`, the sample data lives under `data/`, plots go to `outputs/`, and the browser UI lives under `frontend/`."

"This directly matches the original NP-AA problem statement: solve NP-hard problems exactly for small inputs, use approximations or heuristics for scalability, compare optimal and approximate solutions, and analyze the trade-off between quality and runtime."

## Part 0A: Problem Statement And Why This Project Fits

Suggested narration:

"The original problem statement says that many real-world problems such as routing, scheduling, and resource allocation are NP-hard, so exact solutions become expensive as input size grows."

"Our project matches that requirement in three ways:"

- "We include exact algorithms for small or feasible cases."
- "We include approximation or heuristic approaches for faster solving."
- "We compare both using cost, runtime, and approximation ratio."

"In terms of algorithmic scope, the problem statement asks for Dynamic Programming, Backtracking, Greedy, heuristic approximation, and approximation-ratio analysis. Our current design covers all of these:"

- "Set Cover exact: backtracking"
- "Set Cover approximation: greedy"
- "TSP exact: DP with bitmask plus optional backtracking for very small cases"
- "TSP approximation: nearest neighbor heuristic"
- "Knapsack exact: dynamic programming"
- "Knapsack approximation: greedy by value-to-weight ratio"

"So the architecture and planned implementation are aligned with the original NP-AA brief."

## Part 1: How Everything Is Connected

Suggested narration:

"The full project flow starts from the shared controller in [main.py](/home/skapyskar/Documents/np-hard-solver-analyzer/main.py). At lines 7 to 13, the controller imports the Set Cover pipeline functions from the Person 2 package. In the final version, the same pattern will exist for TSP and Knapsack as well."

"The core execution happens in `run_setcover()` at lines 16 to 45. At line 17, the input is loaded. At lines 18 and 19, the exact and approximate solvers are run. At line 20, the analysis step compares those outputs. At lines 22 to 28, the result dictionary is assembled into one standard JSON object. Then, if visualization is requested, lines 30 to 43 generate the plot and add visualization metadata to the output."

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

"This frontend is important for the project outcome because it makes the trade-off visible, not just printed. Instead of only saying exact and approximate algorithms are different, we show the input, the iteration process, and the final result side by side."

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

"The approximation algorithm is in [approx.py](/home/skapyskar/Documents/np-hard-solver-analyzer/people/person2_setcover/setcover/approx.py). This is a classic greedy strategy. It does not always give the optimal answer, but it runs much faster."

"Again, lines 8 to 20 normalize and validate the input."

"The main function starts at line 23. At line 28, all universe elements are initially marked as uncovered. At line 29, we initialize the chosen subset list."

"The main greedy loop is at lines 31 to 46."

Suggested line-by-line explanation:

- Line 31: keep iterating until every element is covered.
- Lines 32 to 33: reset the best candidate subset for the current iteration.
- Lines 35 to 39: for each subset, compute `gain`, meaning how many currently uncovered elements it would newly cover. If this gain is better than the best one so far, store that subset.
- Lines 41 to 42: if no subset can add anything new, the instance cannot be completed.
- Line 44: add the best subset index to the chosen solution.
- Line 45: remove the newly covered elements from `uncovered`.

"Finally, at lines 47 to 51, the chosen subset indices, total subset count, and runtime are returned."

### 3.4 What Happens In Every Greedy Iteration

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

"At the start, all 6 elements are uncovered."

"Iteration 1: the greedy algorithm checks every subset and asks which one covers the largest number of uncovered elements. `S0`, `S2`, and `S3` each cover 3 new elements, but because the code only replaces the best choice when the gain is strictly larger, the first max encountered stays selected. So it picks `S0`. Covered becomes `{1,2,3}` and uncovered becomes `{4,5,6}`."

"Iteration 2: now the algorithm checks gains again with respect to only `{4,5,6}`. `S3` covers all 3 of them, which is the best possible gain. So it picks `S3`. Now the whole universe is covered."

"The greedy result becomes `[0,3]` with cost `2`."

### 3.5 Analysis Step

Suggested narration:

"The comparison step is in [analysis.py](/home/skapyskar/Documents/np-hard-solver-analyzer/people/person2_setcover/setcover/analysis.py). At lines 8 and 9, the exact and approximate costs are extracted. At lines 11 to 13, the approximation ratio is computed as `approx_cost / exact_cost`. Then at lines 15 to 21, the result dictionary is returned with ratio, times, and costs."

"If greedy matches exact, the ratio is `1.0`. If greedy uses more subsets, the ratio becomes greater than `1.0`."

### 3.6 Visualization Step

Suggested narration:

"The plot generation is in [visualize.py](/home/skapyskar/Documents/np-hard-solver-analyzer/people/person2_setcover/setcover/visualize.py)."

"At lines 7 and 11, matplotlib is configured for non-interactive image generation, which is useful for scripts and headless environments."

"At lines 17 and 18, the universe and subset labels are prepared."

"The helper at lines 20 to 33 converts a chosen solution into a heatmap matrix. For every subset and every universe element, it stores:

- `0` if the subset was not chosen
- `2` if the subset was chosen and contains that element
- `1` if the subset was chosen but that specific element is not in the subset"

"At lines 35 to 45, we create a two-panel figure: one for the exact solution and one for the greedy solution."

"At lines 47 to 60, each panel is drawn. `imshow()` paints the matrix, axis labels are added, and an `X` marker is placed wherever a subset contains a universe element."

"At lines 62 to 63, the color bar legend is added. At lines 64 to 67, the figure is saved to the requested output path."

### 3.7 Set Cover Frontend Walkthrough

Suggested narration while operating the UI:

"The Set Cover frontend editor is built at `frontend/app.js` lines 243 to 331. The code builds a table where rows are subsets and columns are universe elements. Each checkbox directly represents whether that subset contains that element."

"The event handler at lines 299 to 315 updates the internal subset data whenever a checkbox changes. That keeps the UI and the instance in sync."

"The frontend validation for Set Cover happens at lines 495 to 506. It removes duplicates, sorts the input, and checks whether the universe can actually be covered."

"For frontend playback, the greedy steps are built at lines 508 to 552. This mirrors the backend greedy logic, but in addition to the final answer, it stores a step object after each iteration so the user can move through the process."

"For frontend exact playback, lines 554 to 636 enumerate the search states of the backtracking process and store them as a step sequence."

"At lines 638 to 659, the final run result is packaged with metadata and a pinned output object."

"At lines 721 to 762, the current Set Cover iteration is rendered visually. The user sees:

- which step we are on
- which subset was chosen
- which elements are covered or still uncovered
- which subsets are selected so far"

"At lines 815 to 831, the final output panel is rendered. This means once the solve button is pressed, the result stays visible on the right side while we keep stepping through the algorithm."

### 3.8 Suggested Closing For Person 2

"So the Set Cover part demonstrates the complete flow: input loading, exact algorithm, approximation algorithm, analysis, backend visualization, and interactive frontend playback."

## Part 4: Person 1 Demo Script - TSP

This section is written as the intended demo once Person 1 completes the TSP implementation according to [person1_TSP.md](/home/skapyskar/Documents/np-hard-solver-analyzer/person1_TSP.md).

### 4.1 What TSP Means

Suggested narration:

"In TSP, we are given cities and pairwise travel costs. The goal is to find the minimum-cost tour that visits every city exactly once and returns to the start."

"This maps directly to real-world routing and logistics, which is one of the examples mentioned in the original problem statement."

"Our TSP input format is defined in `person1_TSP.md` lines 49 to 66. The core input is a distance matrix."

### 4.2 Exact Algorithm: DP With Bitmask

Suggested narration:

"The required exact TSP algorithm is DP with bitmask, specified in `person1_TSP.md` lines 68 to 83. The reason for using bitmask DP is that it gives an exact answer while being much more efficient than brute force for moderate sizes."

"The standard DP state is `dp[mask][i]`, meaning the minimum cost to start from the source city, visit exactly the set of cities represented by `mask`, and finish at city `i`."

Suggested line-by-line style explanation for the expected implementation:

- First, initialize DP with the base state where only the start city is visited.
- Then iterate through all masks.
- For each mask, iterate through all ending cities `i` that are included in that mask.
- Try extending the path to each unvisited city `j`.
- Update `dp[mask | (1 << j)][j]` with the smaller cost.
- After all states are processed, add the return edge back to the start city and take the minimum.

"During the demo, Person 1 can explain each DP iteration as: current visited set, current ending city, next city being considered, and the updated best cost."

### 4.3 Approximation / Heuristic: Nearest Neighbor

Suggested narration:

"The required heuristic is Nearest Neighbor, defined in `person1_TSP.md` lines 85 to 100. At every step, it moves from the current city to the nearest unvisited city."

Suggested iteration explanation:

- Start from city 0.
- Look at all unvisited cities.
- Choose the one with the minimum distance from the current city.
- Mark it visited.
- Repeat until all cities are visited.
- Finally return to the starting city.

"This method is fast and easy to visualize, but it is not always optimal. That is exactly why comparing it against the exact DP solution is useful."

### 4.4 Analysis Step

Suggested narration:

"The TSP analysis format is defined in `person1_TSP.md` lines 102 to 117. The expected ratio is `approx_cost / exact_cost`. If the heuristic tour is longer than the optimal one, the ratio will be greater than `1.0`."

### 4.5 Visualization Step

Suggested narration:

"The visualization requirement is defined in `person1_TSP.md` lines 119 to 132. If only a distance matrix exists, cities can be placed on a circular layout. If coordinates are added later, the plot can use real geometry."

"For the frontend, the input table already exists in `frontend/app.js` lines 333 to 405. Each cell in the matrix is editable, and the Add City button dynamically grows the matrix."

"The next frontend phase for TSP is already specified in `person1_TSP.md` lines 179 to 201: show actual graph or route playback iteration by iteration, then keep the final output pinned."

### 4.6 Suggested Closing For Person 1

"So the TSP part of the project demonstrates how we compare an exact dynamic-programming solution with a fast heuristic, and how route construction can be visualized step by step."

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

"Overall, our project is designed around one shared architecture and three separate NP-hard problems. The common structure makes the project easier to maintain, compare, and demonstrate. Set Cover already shows the full end-to-end model, and TSP and Knapsack follow the same design with their own exact algorithms, approximation strategies, analysis, visualization, and frontend playback."

"So in terms of the expected learning outcomes, this project helps us understand NP-hardness, implement both exact and approximate methods, and analyze the trade-off between optimality and efficiency with actual code, outputs, and visual explanation."

"The only remaining gap right now is implementation completeness: Set Cover is already fully demonstrated, while TSP and Knapsack still need to complete their backend and frontend visualization phases to fully match the final project outcome."
