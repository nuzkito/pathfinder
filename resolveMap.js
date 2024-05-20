import Result from "./Result.js"
import breadthFirstSearch from "./breadthFirstSearch.js"
import depthFirstSearch from "./depthFirstSearch.js"
import greedyBestFirstSearch from "./greedyBestFirstSearch.js"

export default function resolveMap(map, algorithm) {
    if (algorithm === 'depth-first search') {
        return depthFirstSearch(map)
    }

    if (algorithm === 'breadth-first search') {
        return breadthFirstSearch(map)
    }

    if (algorithm === 'greedy best-first search') {
        return greedyBestFirstSearch(map)
    }

    return new Result()
}
