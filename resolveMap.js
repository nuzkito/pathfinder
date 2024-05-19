import Result from "./Result.js"
import depthFirstSearch from "./depthFirstSearch.js"

export default function resolveMap(map, algorithm) {
    if (algorithm === 'depth-first search') {
        return depthFirstSearch(map)
    }

    return new Result()
}
