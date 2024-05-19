import Result from "./Result.js"
import breadthFirstSearch from "./breadthFirstSearch.js"
import depthFirstSearch from "./depthFirstSearch.js"

export default function resolveMap(map, algorithm) {
    if (algorithm === 'depth-first search') {
        return depthFirstSearch(map)
    }
    if (algorithm === 'breadth-first search') {
        return breadthFirstSearch(map)
    }

    return new Result()
}
